import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "./auth/[...nextauth]/route";

export async function GET(request: NextRequest) {
  const requestUrl = request.url;
  const session = await getServerSession(authOptions)
  console.log(session)

  return NextResponse.json({
    message: "Hello from the API",
    request: requestUrl,
  });
}