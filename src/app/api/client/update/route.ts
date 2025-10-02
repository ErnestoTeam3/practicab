import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req: Request) {
  try {
    const { id, companyName, projectName, projectDesc, profilePic } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "ID requerido" }, { status: 400 });
    }

    const updated = await prisma.client.update({
      where: { id },
      data: { companyName, projectName, projectDesc, profilePic },
    });

    const { password: _, ...clientData } = updated; // no devolver la contraseña
    return NextResponse.json(clientData, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al actualizar" }, { status: 500 });
  }
}
