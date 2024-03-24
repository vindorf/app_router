import User from "../models/user.model";
import connectDB from "../utils/connestDB";

export const userPost = async(email: string) => {
console.log('EMAIL', email)
    try{
        await connectDB();
        const user = await User.findOne({email}).populate('posts')
        return user.posts;
    } catch(error: any) {
        throw new Error("Error fetching User Posts", error);
    }
}
