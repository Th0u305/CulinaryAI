import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, {params}: {params: Promise<{id : string}>}) {

  const {id} = await params
  

  try {
    const recipes = await prisma.recipes.findUnique({
        where : {
          id : id
        }
    });
    return NextResponse.json(recipes)
    
  } catch (error) {
      console.log(error); 
    return NextResponse.json({ error: "Failed to fetch recipes" }, { status: 500 });
  }
}
