import User from "@/app/models/user.model";
import connectDB from "@/app/utils/connestDB";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest, res: NextResponse) {
    const session = await getServerSession(authOptions);
    if(!session) {
        return NextResponse.json('Login first')
    }
  const email = req.body;

  try {
    await connectDB();
    const deletedUser = await User.findOneAndDelete(email);
    return NextResponse.json(deletedUser);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
