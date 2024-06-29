import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const { MONGODB_URI } = process.env

const ConnectDB = async () => {
    try{
        await mongoose.connect(MONGODB_URI)
        console.log('Database connected')
    }catch(err){
        console.log('Database connection failed')
        console.log(err)
    }
}

export default ConnectDB