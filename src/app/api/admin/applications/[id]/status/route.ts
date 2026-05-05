import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

const allowedStatuses = [
  "PENDING",
  "REVIEWING",
  "INTERVIEW",
  "REJECTED",
  "ACCEPTED",
] as const;

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await req.json();

  const status = body.status as (typeof allowedStatuses)[number];

  if (!allowedStatuses.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const updated = await prisma.application.update({
    where: {
      id,
    },
    data: {
      status,
    },
    select: {
      id: true,
      status: true,
    },
  });

  return NextResponse.json(updated);
}