import mongoose, { Mongoose } from "mongoose";

const { Schema } = mongoose;

//Describes the shape of the data, serves as type-safety protection.
const todoSchema = new Schema({
    todo : String,
    completed: Boolean
})

//Defines the model, the shape and identifies the right collection in the database.
const todoModel = mongoose.model("Todo", todoSchema)

export default todoModel;