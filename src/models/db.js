import mongoose from "mongoose";
import dotenv from "dotenv"

//Reads enviroment variables and stores them in the process.env object.
dotenv.config();

const initdb = async()=>{
    try {
        //Initialised mongodb connection
        await mongoose.connect(process.env.MONGO_URI) 
        console.log("Database connection initialised succesfully")
    } catch (error) {
        console.log("Database connection failed",error)
    }
}

export default initdb;