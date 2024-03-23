import User from "../models/user.model";
import connectDB from "../utils/connestDB";
import bcrypt from 'bcrypt';


type Props = {
    name: string;
    email: string;
    password: string;
}

const registerUser = async ({name, email, password}: Props) => {

    try{
        await connectDB();

        const existingUser = await User.findOne({email});
        if(existingUser) {
            return {error: 'User already exist',user: existingUser}
        };

        const hash = await bcrypt.hash(password, 10);

        const user = await new User({
            name,
            email,
            password: hash,
            role: "user"
        });
        await user.save();
        console.log('User created server successfully')
        return {user: user}
    } catch(error:any) {
        console.error('Error creating user:', error.message);
        throw new Error('Error creating User', error)
    }
}

export default registerUser;
