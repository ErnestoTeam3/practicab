import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const freelancer = await prisma.freelancer.findUnique({ where: { email } });

  if (!freelancer || freelancer.password !== password) {
    return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
  }

  return NextResponse.json(freelancer);
}
