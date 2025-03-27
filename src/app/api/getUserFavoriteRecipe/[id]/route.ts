import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, {params}: {params: Promise<{id : string}>}) {

  const {id} = await params

  try {
    
    const favRecipeId = await prisma.usersData.findUnique({
      where : {
        kindeId : id
      },
      select:{
        favoriteRecipeId : true
      }
    });

    const allFavRecipeIds = favRecipeId?.favoriteRecipeId ?? []
    
    const findRecipe = await prisma.recipes.findMany({
      take : 4,
      where : {id : {in : allFavRecipeIds}}
    })
    
    return NextResponse.json(findRecipe)
    
  } catch (error) {
      console.log(error); 
    return NextResponse.json({ error: "Failed to fetch recipes" }, { status: 500 });
  }
}