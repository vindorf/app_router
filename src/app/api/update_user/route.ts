import User from "@/app/models/user.model";
import connectDB from "@/app/utils/connestDB";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);

  if(!session) {
    return NextResponse.json('login first')
  }
  
  const body = await req.json();
  const { oldEmail, name, email, role } = body;

  try {
    await connectDB();

    const emailExists = await User.findOne({ email: email});

    if(emailExists) {
      return NextResponse.json({message: 'Email occupied', status: 400})

    }

    const updatedUser = await User.findOneAndUpdate(
      { email: oldEmail },
      { name: name, email: email, role: role },
      { new: true }
    );
    if (updatedUser) {
      return NextResponse.json({
        message: "Benutzer erfolgreich aktualisiert",
        status: 200,
        user: updatedUser,
      });
    } else {
      return NextResponse.json({ message: "Benutzer nicht gefunden" });
    }
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
