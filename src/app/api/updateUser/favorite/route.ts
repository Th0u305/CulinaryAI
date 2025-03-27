import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT( req: NextRequest) {

  const { kindeId, recipeId } = await req.json();

  if (!kindeId || !recipeId) {
    return NextResponse.json({ error: "Missing kindeId or recipeId" }, { status: 400 });
  }

  try {

    const user = await prisma.usersData.findUnique({
      where : {kindeId},
      select : {
        favoriteRecipeId : true
      }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.favoriteRecipeId.includes(recipeId)) {
      return NextResponse.json({ error: "This recipe is already saved" }, { status: 400 });
    }

    const updatedUser = await prisma.usersData.update({
      where : {kindeId},
      data : {
        favoriteRecipeId : {push : recipeId}
      }
    });
    return NextResponse.json(updatedUser)
  
  } catch (error) {
    console.error("Error fetching ingredient:", error);
    return NextResponse.json({ error: "Failed to fetch ingredient" },{ status: 500 });
  }
}
