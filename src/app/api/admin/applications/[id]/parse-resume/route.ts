import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import pdfParse from "pdf-parse/lib/pdf-parse";
import { openai } from "@/src/lib/openai";
import { get } from '@vercel/blob';
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";
import { openAiRateLimit } from "@/src/lib/rate-limit";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.admin) {
    return Response.json({ error: "Unauthorized" }, { status: 403 });
  }
  const userKey =
    session?.user?.email ??
    request.headers.get("x-forwarded-for") ??
    "anonymous";
  const { success, reset } = await openAiRateLimit.limit(
    `openai:${userKey}`
  );
  if (!success) {
    return NextResponse.json(
      {
        error: "Too many AI requests. Please wait and try again.",
        reset,
      },
      { status: 429 }
    );
  }

  const { id } = await params;

  try {
    await prisma.application.update({
      where: { id },
      data: {
        resumeParserStatus: "PROCESSING",
      },
    });

    const application = await prisma.application.findUnique({
      where: { id },
      include: {
        job: true,
        applicant: true,
      },
    });

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }
    console.log(application);

    // Download resume from Blob


    if (!application.resumePathname) {
      throw new Error("Application has no resumePathname");
    }

    const blobResult = await get(application.resumePathname, {
      access: "private",
    });

    if (blobResult.statusCode !== 200) {
      throw new Error("Failed to get private blob");
    }

    const chunks: Uint8Array[] = [];
    const reader = blobResult.stream.getReader();

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      chunks.push(value);
    }

    const resumeBuffer = Buffer.concat(chunks);
    // Extract text from PDF

    const parsedPdf = await pdfParse(resumeBuffer);
    const resumeText = parsedPdf.text;
    console.log(resumeText.slice(0, 500));

    // Call OpenAI
    const aiResponse = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: `
        You are an AI resume screener.

        Score this candidate from 0 to 100 based on how well the resume matches the job.
        Matching only the requirements will give the candidate a 40 at most and the responsibilities will be 40 points as well.
        The last 20 points come from how impressive the candidate you believe will be. Be hypercritical and somewhat forward.

        Job Title:
        ${application.job.title}

        Job Description:
        ${application.job.description}

        Requirements:
        ${application.job.requirements.join("\n")}

        Responsibilities:
        ${application.job.responsibilities.join("\n")}

        Preferences:
        ${application.job.preferences.join("\n")}

        Resume:
        ${resumeText}

        Return only JSON like this:
        {
          "score": 90,
          "resumeStrengths": [
            "Strong contract UI design experience",
            "Proficient with Figma",
            "Experience collaborating with product and engineering"
          ],
          "resumeGaps": [
            "Portfolio quality cannot be verified from resume alone",
            "Systems thinking is not directly mentioned"
          ],
          "resumeExplanation": "Short paragraph explanation."
        }
        Do not use markdown.
        Do not wrap the response in \`\`\`.
      `,
    });

    const text = aiResponse.output_text;
    console.log(text);
    // 4. Calculate/save score
    const result = JSON.parse(text);

    await prisma.application.update({
      where: { id },
      data: {
        resumeScore: result.score,
        resumeParserStatus: "SCORED",
        aiResumeStrengths: result.resumeStrengths,
        aiResumeGaps: result.resumeGaps,
        aiResumeExplanation: result.resumeExplanation,
      },
    });

    return NextResponse.json({
      success: true,
      score: result.score,
      resumeStrengths: result.resumeStrengths,
      resumeGaps: result.resumeGaps,
      resumeExplanation: result.resumeExplanation,
    });
  } catch (error) {
    console.error(error);

    await prisma.application.update({
      where: { id },
      data: {
        resumeParserStatus: "FAILED",
      },
    });

    return NextResponse.json(
      { error: "Resume parser failed" },
      { status: 500 }
    );
  }
}