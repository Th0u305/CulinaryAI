import { NextRequest, NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

export async function PUT( req: NextRequest) {
  const { kindeId, recipeId } = await req.json();


  if (!kindeId || !recipeId) {
      return NextResponse.json({ error: "Missing kindeId or recipeId" }, { status: 400 });
  }

  try {
    // const updatedUser = await prisma.usersData.delete({
    //   where : {kindeId},
    //   select : {
    //     savedRecipeId : {push : recipeId}
    //   }
    // });
    // return NextResponse.json(updatedUser)
  } catch (error) {
    console.error("Error fetching ingredient:", error);
    return NextResponse.json({ error: "Failed to fetch ingredient" },{ status: 500 });
  }
}
