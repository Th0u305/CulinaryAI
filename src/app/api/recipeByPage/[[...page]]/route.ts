import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: Promise<{ page?: string[] }> }) {
  const { page } = await params;
  
  const pages = page?.[0] ? parseInt(page[0]) : 1;
  const cuisine = page?.[1] ? page[1] : "all";
  
  // if (isNaN(pages) || pages === 0 || typeof cuisine !== "string") {
  //   return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  // }
  
  try {
    const recipes = await prisma.recipes.findMany({
      skip: (pages - 1) * 12, // item per page
      take: 12, // total item taken
      where: {
        country: cuisine !== "all" ? { equals: cuisine , mode : "insensitive"} : undefined, // Show all if cuisine is "all"
      },
    });

    return NextResponse.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return NextResponse.json({ error: "Failed to fetch recipes" }, { status: 500 });
  }
}
