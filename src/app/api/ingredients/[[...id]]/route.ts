import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {

    const { id } = await params;

    const idString = id[0]
    const page = parseInt(id[1])
    
    
    if (!idString) {
      return NextResponse.json({ error: "Ingredient name is required" }, { status: 400 });
    }

    if (idString === "all") {
      try {
        const recipes = await prisma.ingredients.findMany({
          skip: (page - 1) * 80,  // item per page
          take: 80, // total item taken
          where: {
            name: idString !== "all" ? { equals: idString } : undefined, // Show all if cuisine is "all"
          },
        });
        return NextResponse.json(recipes);
      } catch (error) {
          console.log(error);
        return NextResponse.json({ error: "Failed to fetch recipes" }, { status: 500 });
      }
    }

    if (idString !== "all") {
      try {
        const ingredient = await prisma.ingredients.findFirst({
          where: {
            name: {
              equals: idString,
              mode: "insensitive", // Case-insensitive search
            },
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
  

  }
  