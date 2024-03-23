import mongoose from 'mongoose';
const DB_URL = process.env.MONGODB_URL;

const connectDB = async () => {
    try{

       mongoose.connect(DB_URL)
       console.log('DB connected')

    } catch(error) {
        console.log('Error connecting DB', error)
    }
}


export default connectDB;