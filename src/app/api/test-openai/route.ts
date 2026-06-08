import { NextResponse } from "next/server";
import { openai } from "@/src/lib/openai";

export async function GET() {
  try {
    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: "Reply with only: OpenAI is working",
      max_output_tokens: 20,
    });

    return NextResponse.json({
      success: true,
      message: response.output_text,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "OpenAI test failed",
      },
      { status: 500 }
    );
  }
}