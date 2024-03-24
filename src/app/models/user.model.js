import { model, models, Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    posts:[{ type: Schema.Types.ObjectId, ref: 'Post' }],
},
{timestamps: true},
);

const User = models.User || model('User', userSchema);
export default User;