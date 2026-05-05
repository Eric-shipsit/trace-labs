// app/api/admin/applications/[id]/resume/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { get } from "@vercel/blob";
import { authOptions } from "@/src/auth";
import { prisma } from "@/src/lib/prisma";

type RouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, { params }: RouteProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.admin) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = await params;

  const application = await prisma.application.findUnique({
    where: { id },
    include: {
      applicant: true,
    },
  });

  if (!application?.resumePathname) {
    return new NextResponse("Resume not found", { status: 404 });
  }

  const result = await get(application.resumePathname, {
    access: "private",
  });

  if (result.statusCode !== 200) {
    return new NextResponse("Resume not found", { status: 404 });
  }

  const first = application.applicant.firstName ?? "applicant";
  const last = application.applicant.lastName ?? "";
  const filename = `${first}-${last}-resume.pdf`;

  return new NextResponse(result.stream, {
    status: 200,
    headers: {
      "Content-Type":
        result.headers.get("content-type") ||
        result.blob.contentType ||
        "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "private, no-store",
    },
  });
}