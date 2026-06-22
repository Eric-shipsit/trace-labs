import { put } from "@vercel/blob";
import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.admin) {
    return Response.json({ error: "Unauthorized" }, { status: 403 });
  }

  const formData = await request.formData();

  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json(
      { error: "No file provided" },
      { status: 400 }
    );
  }

  const safeFileName = file.name.replace(/\s+/g, "-");

  const blob = await put(`chatbot/files/${safeFileName}`, file, {
    access: "private",
  });

  const extension = file.name.split(".").pop()?.toUpperCase();

  const document = await prisma.document.create({
    data: {
      name: file.name,
      fileType: extension ?? "UNKNOWN",
      url: blob.url,
      pathname: blob.pathname,
      status: "UPLOADED",
    },
  });

  return NextResponse.json(document);
}