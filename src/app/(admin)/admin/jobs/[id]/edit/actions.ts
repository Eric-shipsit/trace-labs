"use server";

import { prisma } from "@/src/lib/prisma";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";

export async function updateJobPosting(formData: FormData) {
  const id = formData.get("id")?.toString() ?? "";
  const title = formData.get("title")?.toString().trim() ?? "";
  const description = formData.get("description")?.toString().trim() ?? "";
  const location = formData.get("location")?.toString().trim() ?? "";
  const type = formData.get("type")?.toString() ?? "";
  const experienceLevel = formData.get("experienceLevel")?.toString() ?? "";
  const role = formData.get("role")?.toString() ?? "";
  const open = formData.get("open") === "on";

  if (!id || !title || !description || !location || !type || !experienceLevel || !role) {
    throw new Error("Missing required fields.");
  }

  await prisma.job.update({
    where: { id },
    data: {
      title,
      description,
      location,
      type: type as any,
      experienceLevel: experienceLevel as any,
      role: role as any,
      open,
    },
  });

  redirect("/admin");
}


export async function deleteJobPosting(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session?.user || !session.user.admin) {
    redirect("/");
  }

  const id = formData.get("id")?.toString();

  if (!id) {
    throw new Error("Missing job id");
  }

  await prisma.job.delete({
    where: { id },
  });

  redirect("/admin");
}