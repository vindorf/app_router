import User from "../models/user.model";
import connectDB from "../utils/connestDB";

type Props = {
    email: string;
    _id: string;
}

export const deleteUserPost = async ({email, _id}: Props) => {
    
    try{
        await connectDB();
        const user = await User.findOne({email: email}).populate('posts');
        
            await user.posts.pull(_id);
            await user.save();  
    } catch(error:any) {
        throw new Error('Error deleting Post', error)
    }
}
