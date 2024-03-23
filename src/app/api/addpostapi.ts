import Post from "../models/post.model";
import connectDB from "../utils/connestDB";

type addPostProps = {
    title: string;
    post: string;
    
}

const addPost = async ({title, post}: addPostProps) => {
    try{
        await connectDB();

        const newPost = await new Post({
            title: title,
            post: post,
        })
        await newPost.save();
        console.log('Post added successfully')
    } catch(error: any) {
        throw new Error('Error adding Post', error)
    }
}


export default addPost;