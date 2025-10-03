import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const freelancers = await prisma.freelancer.findMany({
      where: { isActive: true }, // solo activos
      select: {
        id: true,
        name: true,
        skills: true,
        profilePic: true,
      },
    });

    return NextResponse.json(freelancers, { status: 200 });
  } catch (error) {
    console.error("Error fetching freelancers:", error);
    return NextResponse.json({ error: "Error al obtener freelancers" }, { status: 500 });
  }
}
