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
    })

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    const filter = user?.savedRecipeId.filter((item)=> item !== recipeId)

    const updatedUser = await prisma.usersData.update({
        where : {kindeId},
        data : {
            savedRecipeId : {set : filter}
        }
    });

    return NextResponse.json(updatedUser)
  
  } catch (error) {
    console.error("Error fetching ingredient:", error);
    return NextResponse.json({ error: "Failed to fetch ingredient" },{ status: 500 });
  }
}
