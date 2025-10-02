import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { companyName, projectName, projectDesc, profilePic, email, password } = await req.json();

    const existingClient = await prisma.client.findUnique({ where: { email } });
    if (existingClient) {
      return NextResponse.json({ error: "El correo ya está registrado" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newClient = await prisma.client.create({
      data: {
        companyName,
        projectName,
        projectDesc,
        profilePic,
        email,
        password: hashedPassword,
      },
    });

    const { password: _, ...clientData } = newClient;
    return NextResponse.json(clientData, { status: 201 });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ error: "Error al registrar cliente" }, { status: 500 });
  }
}
