import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const { getUser , isAuthenticated} = getKindeServerSession();
  const isUser = await getUser();
  const isUserAuthenticated = await isAuthenticated()

  if (!isUser) {
    return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
  }

  const user = await prisma.usersData.findUnique({
    where : {
      kindeId : isUser.id
    },
  });

  return NextResponse.json({user, isUserAuthenticated});
}
