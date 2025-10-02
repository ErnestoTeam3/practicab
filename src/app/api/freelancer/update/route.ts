import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req: Request) {
  try {
    const { id, name, skills, profilePic } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "ID requerido" }, { status: 400 });
    }

    const updated = await prisma.freelancer.update({
      where: { id },
      data: { name, skills, profilePic },
    });

    const { password: _, ...freelancerData } = updated; // no devolver la contraseña
    return NextResponse.json(freelancerData, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al actualizar" }, { status: 500 });
  }
}
