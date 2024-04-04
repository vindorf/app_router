import User from "@/app/models/user.model";
import connectDB from "@/app/utils/connestDB";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const { oldEmail, name, email, role } = body;

  try {
    await connectDB();
    const updatedUser = await User.findOneAndUpdate(
      { email: oldEmail },
      { name: name, email: email, role: role },
      { new: true }
    );
    if (updatedUser) {
      return NextResponse.json({
        message: "Benutzer erfolgreich aktualisiert",
        user: updatedUser,
      });
    } else {
      return NextResponse.json({ message: "Benutzer nicht gefunden" });
    }
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
