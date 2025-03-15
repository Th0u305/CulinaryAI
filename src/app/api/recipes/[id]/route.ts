import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest, 
  { params }: { params: { id: string } }
) {
  const { id } = params; // Extracting the ID from params

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const recipe = await prisma.recipes.findUnique({
    where: {
      id: id,
    },
  });

  return NextResponse.json(recipe);
}
