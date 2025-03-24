import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {

  const { id } = await params;
    
  if (!id) {
    return NextResponse.json({ error: "Ingredient name is required" }, { status: 400 });
  }
  try {
    const ingredient = await prisma.ingredients.findMany({
      where: {
        name: id !== "all" ? { equals: id , mode : "insensitive"} : undefined, // Show all if cuisine is "all"
      },
    });

    if (!ingredient) {
      return NextResponse.json({ error: "Ingredient not found" }, { status: 404 });
    }

    return NextResponse.json(ingredient);
  } catch (error) {
    console.error("Error fetching ingredient:", error);
    return NextResponse.json({ error: "Failed to fetch ingredient" }, { status: 500 });
  }
  }
  