import {model, models,Schema} from 'mongoose';

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    post: {
        type: String,
        required: true,
    },
    user: {type: Schema.Types.ObjectId, ref: 'User'},
},
{timestamps: true}
);


const Post = models.Post || model('Post', postSchema);

export default Post;