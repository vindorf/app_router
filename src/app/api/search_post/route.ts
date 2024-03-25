import Post from "@/app/models/post.model";
import connectDB from "@/app/utils/connestDB";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: NextRequest, res: NextResponse) {
    const session = await getServerSession( authOptions);
    console.log('SESSIONSERVER', session)
    // if(!session) {
    //     return NextResponse.json('Login first')
    // }
    try{
        await connectDB();
        const searchParams = req.nextUrl.searchParams;
        const query = searchParams.get('id');
        const posts = await Post.find({user: query}).populate('user');
        return NextResponse.json(posts);
    } catch(error: any) {
        return NextResponse.json({ error: error })
    }
    
} 