import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const freelancer = await prisma.freelancer.findUnique({ where: { email } });

    if (!freelancer) {
      return NextResponse.json({ error: "Correo no encontrado" }, { status: 401 });
    }

    // Comparar contraseña encriptada
    const validPassword = await bcrypt.compare(password, freelancer.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 });
    }

    // Actualizar estado activo al iniciar sesión
    const updatedFreelancer = await prisma.freelancer.update({
      where: { id: freelancer.id },
      data: { isActive: true },
    });

    const { password: _, ...freelancerData } = updatedFreelancer;
    return NextResponse.json(freelancerData, { status: 200 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}
