import mongoose, { Mongoose } from "mongoose";

const { Schema } = mongoose;

const todoSchema = new Schema({
    todo : String,
    //completed: Boolean
})

const todoModel = mongoose.model("Todo", todoSchema)

export default todoModel;