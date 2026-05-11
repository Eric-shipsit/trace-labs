import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/src/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    const normalizedEmail = email?.trim().toLowerCase();
    const normalizedName = name?.trim();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name: normalizedName,
        email: normalizedEmail,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: "User created" }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}