import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const ingredients = await prisma.ingredients.findMany();
    return NextResponse.json(ingredients);
  } catch (error) {
      console.log(error); 
    return NextResponse.json({ error: "Failed to fetch recipes" }, { status: 500 });
  }
}
