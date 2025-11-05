import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

const initdb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI) 
        console.log("Database connection initialised succesfully")
    } catch (error) {
        console.log("Database connection failed",error)
    }
}

export default initdb;