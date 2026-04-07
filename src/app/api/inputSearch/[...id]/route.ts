import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string}> }) {

  const {id} = await params;
  
  const searchItem = id[0]
  const verify = id[1]

  if (verify === "ingredients") {
    try {
      const ing = await prisma.ingredients.findMany({
        where: {
          AND: [
            {
              OR: [
                { name: { contains: searchItem as string, mode: "insensitive", } },
              ],
            },
          ],
        },
      });
      return NextResponse.json(ing);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      return NextResponse.json({ error: "Failed to fetch recipes" }, { status: 500 });
    }
  }


  if (verify !== "ingredients") {
    try {
      const recipes = await prisma.recipes.findMany({
        where: {
          AND: [
            {
              OR: [
                { name: { contains: id as string, mode: "insensitive", } },
              ],
            },
          ],
        },
      });
      return NextResponse.json(recipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      return NextResponse.json({ error: "Failed to fetch recipes" }, { status: 500 });
    }
  }

}
