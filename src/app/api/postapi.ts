import connectDB from "../utils/connestDB";
import Post from '@/app/models/post.model';


const getPost = async () => {
    try{
        await connectDB();

        const posts = await Post.find().populate('user');
        return posts;
    } catch(error:any) {
        throw new Error("Error fetching Data", error);
    }
}
export default getPost; 