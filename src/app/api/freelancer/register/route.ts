import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, skills, profilePic, email, password } = body;

    const freelancer = await prisma.freelancer.create({
      data: { name, skills, profilePic, email, password },
    });

    return NextResponse.json(freelancer);
  } catch (error) {
    return NextResponse.json({ error: "Error creando freelancer" }, { status: 500 });
  }
}
