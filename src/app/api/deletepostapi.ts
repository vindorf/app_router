import Post from "../models/post.model";
import connectDB from "../utils/connestDB";


const deletePost = async (_id:string) => {
    try{ 
        await connectDB();

        const deleteOnePost = await Post.findByIdAndDelete(_id);
        return deleteOnePost;
        
    } catch(error:any) {
        throw new Error('Error deleting Post', error)
    }
}
 export default deletePost;