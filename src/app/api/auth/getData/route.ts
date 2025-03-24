import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function GET() {
  const { getUser , isAuthenticated} = getKindeServerSession();
  const user = await getUser();
  const isUserAuthenticated = await isAuthenticated()

  // if (!user) {
  //   return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
  // }

  return NextResponse.json({user, isUserAuthenticated});
}
