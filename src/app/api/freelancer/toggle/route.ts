import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req: Request) {
  try {
    const { id, isActive } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "ID requerido" }, { status: 400 });
    }

    const updated = await prisma.freelancer.update({
      where: { id },
      data: { isActive },
    });

    const { password, ...freelancerData } = updated;
    return NextResponse.json(freelancerData, { status: 200 });
  } catch (error) {
    console.error("Error al actualizar disponibilidad:", error);
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}
