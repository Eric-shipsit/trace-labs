"use server";

import { redirect } from "next/navigation";
import { prisma } from "../../../../../lib/prisma";

function parseLines(value: FormDataEntryValue | null): string[] {
  if (typeof value !== "string") return [];

  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function createJobPosting(formData: FormData) {
  const title = formData.get("title")?.toString().trim() ?? "";
  const description = formData.get("description")?.toString().trim() ?? "";
  const requirements = parseLines(formData.get("requirements"));
  const responsibilities = parseLines(formData.get("responsibilities"));
  const preferences = parseLines(formData.get("preferences"));
  const type = formData.get("type")?.toString() ?? "";
  const experienceLevel = formData.get("experienceLevel")?.toString() ?? "";
  const role = formData.get("role")?.toString() ?? "";
  const location = formData.get("location")?.toString().trim() ?? "";
  const open = formData.get("open") === "on";


  if (!title || !description || !type || !experienceLevel || !role || !location) {
    throw new Error("Missing required fields.");
  }

  await prisma.job.create({
    data: {
      title,
      description,
      requirements,
      responsibilities,
      preferences,
      type: type as any,
      experienceLevel: experienceLevel as any,
      role: role as any,
      location,
      open,
    },
  });

  redirect("/admin");
}