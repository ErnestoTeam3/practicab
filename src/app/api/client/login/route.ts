import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const client = await prisma.client.findUnique({ where: { email } });

    if (!client) {
      return NextResponse.json({ error: "Correo no encontrado" }, { status: 401 });
    }

    const validPassword = await bcrypt.compare(password, client.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 });
    }

    const { password: _, ...clientData } = client;
    return NextResponse.json(clientData, { status: 200 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}
