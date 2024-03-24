import Post from "../models/post.model";
import User from "../models/user.model";
import connectDB from "../utils/connestDB";

type addPostProps = {
    title: string;
    post: string;
    email: string;
    
}

const addPost = async ({email, title, post}: addPostProps) => {
    try{
        await connectDB();
        const user = await User.findOne({email: email});

        const newPost = await new Post({
            title: title,
            post: post,
        })
        await newPost.save();
        await user.posts.push(newPost._id);
        await user.save();
        console.log('Post added successfully', newPost, user)
    } catch(error: any) {
        throw new Error('Error adding Post', error)
    }
}


export default addPost;