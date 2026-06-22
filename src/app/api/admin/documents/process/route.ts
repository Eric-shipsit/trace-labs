import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";
import pdf from "pdf-parse/lib/pdf-parse";
import mammoth from "mammoth";
import OpenAI from "openai";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function vectorToSql(vector: number[]) {
  return `[${vector.join(",")}]`;
}

function chunkText(text: string, chunkSize = 1200, overlap = 200) {
  const chunks: string[] = [];
  let start = 0;

  while (start < text.length) {
    const chunk = text.slice(start, start + chunkSize).trim();

    if (chunk.length > 0) {
      chunks.push(chunk);
    }

    start += chunkSize - overlap;
  }

  return chunks;
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.admin) {
    return Response.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { documentIds } = await request.json();

  if (!Array.isArray(documentIds) || documentIds.length === 0) {
    return NextResponse.json(
      { error: "No documents selected" },
      { status: 400 }
    );
  }

  const documents = await prisma.document.findMany({
    where: {
      id: {
        in: documentIds,
      },
    },
  });

  const results = [];

  for (const document of documents) {
    try {
      // 1. Load document metadata from database
      await prisma.document.update({
        where: { id: document.id },
        data: {
          status: "PROCESSING",
          errorMessage: null,
        },
      });

      // 2. Download the file from Vercel Blob
      // Private Blob stores require authenticated reads. This uses your server-side Blob token.
      const fileResponse = await fetch(document.url, {
        headers: process.env.BLOB_READ_WRITE_TOKEN
          ? {
              Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
            }
          : undefined,
      });

      if (!fileResponse.ok) {
        throw new Error(`Failed to download file: ${document.name}`);
      }

      const arrayBuffer = await fileResponse.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // 3. Extract raw text
      const extension = document.name.split(".").pop()?.toLowerCase();

      let rawText = "";

      if (extension === "pdf") {
        const parsedPdf = await pdf(buffer);
        rawText = parsedPdf.text.trim();
      } else if (extension === "docx") {
        const result = await mammoth.extractRawText({
          buffer,
        });

        rawText = result.value.trim();
      } else if (extension === "txt") {
        rawText = buffer.toString("utf8").trim();
      } else {
        throw new Error(`Unsupported file type: ${extension}`);
      }

      if (!rawText) {
        throw new Error(
          `No text could be extracted from this ${extension?.toUpperCase()} file.`
        );
      }

      // 4. Split text into chunks
      const chunks = chunkText(rawText);

      // 5. Generate embeddings
      const embeddingResponse = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: chunks,
      });

      const embeddings = embeddingResponse.data.map((item) => item.embedding);

      await prisma.documentChunk.deleteMany({
        where: {
          documentId: document.id,
        },
      });

      for (let index = 0; index < chunks.length; index++) {
        const content = chunks[index];
        const embedding = embeddings[index];
        const embeddingSql = vectorToSql(embedding);

        await prisma.$executeRaw`
          INSERT INTO "DocumentChunk" (
            "id",
            "documentId",
            "chunkIndex",
            "content",
            "embedding",
            "createdAt"
          )
          VALUES (
            gen_random_uuid()::text,
            ${document.id},
            ${index},
            ${content},
            ${embeddingSql}::vector,
            NOW()
          )
        `;
      }

      await prisma.document.update({
        where: { id: document.id },
        data: {
          status: "READY",
          chunkCount: chunks.length,
          processedAt: new Date(),
          errorMessage: null,
        },
      });

      results.push({
        documentId: document.id,
        name: document.name,
        status: "READY",
        textLength: rawText.length,
        chunkCount: chunks.length,
        embeddingCount: embeddings.length,
        embeddingDimensions: embeddings[0]?.length ?? 0,
      });
    } catch (error) {
      await prisma.document.update({
        where: { id: document.id },
        data: {
          status: "FAILED",
          errorMessage:
            error instanceof Error ? error.message : "Unknown error",
        },
      });

      results.push({
        documentId: document.id,
        name: document.name,
        status: "FAILED",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  return NextResponse.json({
    success: true,
    processed: results.length,
    results,
  });
}