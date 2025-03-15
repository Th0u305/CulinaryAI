import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const recipes = await prisma.recipes.findMany();
    return NextResponse.json(recipes);
  } catch (error) {
      console.log(error);
    return NextResponse.json({ error: "Failed to fetch recipes" }, { status: 500 });
  }
}
