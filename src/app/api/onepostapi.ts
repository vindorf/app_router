import Post from "../models/post.model";
import connectDB from "../utils/connestDB";

const onePost = async (id: any) => {
  try {
    await connectDB();
    const post = await Post.findById(id);
    return post;
  } catch (error: any) {
    throw new Error("Error fetching Data", error);
  }
};

export default onePost;
