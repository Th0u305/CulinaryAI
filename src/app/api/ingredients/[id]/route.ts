import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {

    const { id } = await params;
    
  
    if (!id) {
      return NextResponse.json({ error: "Ingredient name is required" }, { status: 400 });
    }
  
    try {
      const ingredient = await prisma.ingredients.findFirst({
        where: {
          name: {
            equals: id,
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
  