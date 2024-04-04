import User from "@/app/models/user.model";
import connectDB from "@/app/utils/connestDB";
import bcrypt from 'bcrypt';
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";


export async function POST(req: NextRequest, res: NextResponse) {
    const session = await getServerSession(authOptions);
    if(!session) {
        return NextResponse.json('login first');
    }
    const body = req.json();
    const {email, password} = await body;

    const hashedPw = await bcrypt.hash(password, 10)

    try{
        await connectDB();

        const user = await User.findOneAndUpdate({email: email}, {password: hashedPw}, {new: true});
        await user.save();
        return NextResponse.json( {message: 'update successfully', user})

    } catch(error) {
        return NextResponse.json({ error: error });
    }
}
