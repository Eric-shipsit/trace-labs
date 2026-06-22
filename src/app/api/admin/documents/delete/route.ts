
import { NextResponse } from "next/server";
import { del } from "@vercel/blob";
import { prisma } from "@/src/lib/prisma";

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const documentIds = body.documentIds as string[];

    if (!Array.isArray(documentIds) || documentIds.length === 0) {
      return NextResponse.json(
        { error: "No document IDs provided" },
        { status: 400 }
      );
    }

    const documents = await prisma.document.findMany({
      where: {
        id: {
          in: documentIds,
        },
      },
      select: {
        id: true,
        url: true,
        pathname: true,
      },
    });

    if (documents.length === 0) {
      return NextResponse.json(
        { error: "No matching documents found" },
        { status: 404 }
      );
    }

    await prisma.documentChunk.deleteMany({
      where: {
        documentId: {
          in: documentIds,
        },
      },
    });

    await prisma.document.deleteMany({
      where: {
        id: {
          in: documentIds,
        },
      },
    });

    await Promise.allSettled(
      documents.map((document) => del(document.pathname || document.url))
    );

    return NextResponse.json({
      success: true,
      deletedCount: documents.length,
    });
  } catch (error) {
    console.error("Failed to delete documents:", error);

    return NextResponse.json(
      { error: "Failed to delete documents" },
      { status: 500 }
    );
  }
}