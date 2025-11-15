import mongoose, { Mongoose } from "mongoose";

const { Schema } = mongoose;

//Describes the shape of the data, serves as type-safety protection.
const todoSchema = new Schema({
  userId: { type: String, required: true },
  todo: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

//Defines the model, the shape and identifies the right collection in the database.
export const todoModel = mongoose.model("Todo", todoSchema)


const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true},
});


export const userModel = mongoose.model("User", userSchema);
