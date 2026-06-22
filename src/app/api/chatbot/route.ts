import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function vectorToSql(vector: number[]) {
  return `[${vector.join(",")}]`;
}

type RetrievedChunk = {
  id: string;
  content: string;
  documentName: string;
  chunkIndex: number;
  distance: number;
};

export async function POST(request: Request) {
  const { question } = await request.json();

  if (!question || typeof question !== "string") {
    return NextResponse.json(
      { error: "Question is required" },
      { status: 400 }
    );
  }

  const embeddingResponse = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: question,
  });

  const questionEmbedding = embeddingResponse.data[0].embedding;
  const questionEmbeddingSql = vectorToSql(questionEmbedding);

  const chunks = await prisma.$queryRaw<RetrievedChunk[]>`
    SELECT
      dc.id,
      dc.content,
      dc."chunkIndex",
      d.name AS "documentName",
      dc.embedding <=> ${questionEmbeddingSql}::vector AS distance
    FROM "DocumentChunk" dc
    JOIN "Document" d ON d.id = dc."documentId"
    WHERE dc.embedding IS NOT NULL
    ORDER BY dc.embedding <=> ${questionEmbeddingSql}::vector
    LIMIT 5
  `;

  const context = chunks
    .map(
      (chunk, index) =>
        `Source ${index + 1}: ${chunk.documentName}, chunk ${chunk.chunkIndex}\n${chunk.content}`
    )
    .join("\n\n");

  const response = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: `
You are the Trace Labs chatbot.

Answer the user's question using only the provided document context.
If the answer is not in the context, say you do not know based on your current information.

Context:
${context}

Question:
${question}
`,
  });

  return NextResponse.json({
    answer: response.output_text,
    sources: chunks.map((chunk) => ({
      documentName: chunk.documentName,
      chunkIndex: chunk.chunkIndex,
      distance: chunk.distance,
    })),
  });
}