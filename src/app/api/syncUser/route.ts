import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {

    // Get user data from Kinde
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    
    
    if (req.method !== "POST") {
      return NextResponse.json({error : "Wrong method"}, {status : 500})
    }

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const verify = await prisma.usersData.findUnique({
      where : {
        kindeId : user.id
      }
    })
        
    if (verify) {
      return NextResponse.json("OK");
    }
    

    try {
      const dbUser = await prisma.usersData.create({
        data :{
          kindeId: user.id,
          email: user.email,
          name: user.given_name || user.family_name || "",
        }
      });
      return NextResponse.json(dbUser)
    } catch (error) {
      console.error(error);
      NextResponse.json({ error: "Failed to sync user" }, {status : 500});
    }
  }