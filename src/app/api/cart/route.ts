import User from "@/app/models/user.model";
import connectDB from "@/app/utils/connestDB";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const { email, _id } = body;

  try {
    await connectDB();

    const user = await User.findOne({ email: email });

    if (!user.cart.includes(_id._id)) {
      user.cart.push(_id._id);
      await user.save();
    } else {
      return NextResponse.json({
        message: "product already exists in cart",
        status: 400,
      });
    }
    return NextResponse.json({message: 'product added successfuly', status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "error adding to cart", status: 500 });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    await connectDB();
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("email");
    const user = await User.findOne({ email: query }).populate("cart");
    const cart = user.cart;
    return NextResponse.json({ cart });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const { email, _id } = body;

  try {
    await connectDB();

    const user = await User.findOne({ email: email });

    await user.cart.pull(_id);
    await user.save();
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ message: "error removing from cart" });
  }
}
