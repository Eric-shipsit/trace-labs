// app/api/resume/upload/route.ts
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4 MB
const ALLOWED_TYPES = new Set(["application/pdf"]);

function sanitizeFileName(fileName: string) {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file");
    const jobId = formData.get("jobId");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "No file uploaded." },
        { status: 400 }
      );
    }

    if (typeof jobId !== "string" || !jobId.trim()) {
      return NextResponse.json(
        { error: "Missing jobId." },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: "Only PDF files are allowed." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File must be 4 MB or smaller." },
        { status: 400 }
      );
    }

    const safeFileName = sanitizeFileName(file.name);
    const pathname = `resumes/${jobId}/${Date.now()}-${safeFileName}`;

    const blob = await put(pathname, file, {
      access: "private",
      addRandomSuffix: false,
      contentType: "application/pdf",
    });

    return NextResponse.json({
      success: true,
      pathname: blob.pathname,
      url: blob.url,
      downloadUrl: blob.downloadUrl ?? null,
      size: blob.size,
      contentType: blob.contentType,
      uploadedAt: blob.uploadedAt,
    });
  } catch (error) {
    console.error("Resume upload failed:", error);

    return NextResponse.json(
      { error: "Upload failed." },
      { status: 500 }
    );
  }
}