import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, skills, profilePic, email, password } = await req.json();

    // Verificar si ya existe
    const existingFreelancer = await prisma.freelancer.findUnique({ where: { email } });
    if (existingFreelancer) {
      return NextResponse.json({ error: "El correo ya está registrado" }, { status: 400 });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const freelancer = await prisma.freelancer.create({
      data: { name, skills, profilePic, email, password: hashedPassword, isActive: false },
    });

    // No devolver contraseña
    const { password: _, ...freelancerData } = freelancer;
    return NextResponse.json(freelancerData, { status: 201 });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ error: "Error creando freelancer" }, { status: 500 });
  }
}
