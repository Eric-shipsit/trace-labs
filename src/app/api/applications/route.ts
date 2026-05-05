// src/app/api/applications/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      jobId,
      firstName,
      lastName,
      email,
      phone,
      linkedinUrl,
      portfolioUrl,
      resumeUrl,
      resumePathname,
    } = body;

    if (!jobId || !firstName || !lastName || !email || !resumeUrl || !resumePathname) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    let applicant = await prisma.applicant.findUnique({
      where: { email },
    });

    if (!applicant) {
      applicant = await prisma.applicant.create({
        data: {
          firstName,
          lastName,
          email,
          phone: phone || null,
          linkedinUrl: linkedinUrl || null,
          portfolioUrl: portfolioUrl || null,
        },
      });
    }

    const existingApplication = await prisma.application.findUnique({
      where: {
        jobId_applicantId: {
          jobId,
          applicantId: applicant.id,
        },
      },
    });

    if (existingApplication) {
      return NextResponse.json(
        { error: "You have already applied to this job." },
        { status: 409 }
      );
    }

    const application = await prisma.application.create({
      data: {
        jobId,
        applicantId: applicant.id,
        resumeUrl,
        resumePathname,
      },
    });

    return NextResponse.json({ success: true, application });
  } catch (error) {
    console.error("Application creation failed:", error);
    return NextResponse.json(
      { error: "Application creation failed." },
      { status: 500 }
    );
  }
}