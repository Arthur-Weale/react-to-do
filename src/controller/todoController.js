import initdb from "../models/db.js";
import { todoModel } from "../models/schema.js";

//Initially called initdb and establishes a database connection.
await initdb();

//Create
export const insertTodo = async (formData, userId) => {
  try {
    // creates a new todo document in the DB
    const result = await todoModel.create({
      todo: formData.todo, // sets the 'todo' field from formData
      completed: formData.completed || false, // sets the 'completed' field from formData
      userId, // attach the logged-in user's id
    });
    return result; // returns the newly created todo
  } catch (error) {
    console.log(error); // logs any errors during DB operation
    throw error; // propagate error to the route handler
  }
};

//Read
export const getTodos = async (userId) => {
  try {
    //Find the 'todos' from the database for this user only
    const result = await todoModel.find({ userId });
    return result; // Returns the 'todos'
  } catch (error) {
    console.log(error); // logs any errors during search operation
    throw error;
  }
};

//Update
export const editTodo = async (resultCheck, todoId, userId) => {
  try {
    //Finds the todo by id and userId to ensure user owns it
    const updatedTodo = await todoModel.findOneAndUpdate(
      { _id: todoId, userId }, // match by id and userId
      { completed: resultCheck.completed }, // update completed field
      { new: true } // return the updated document
    );

    if (!updatedTodo) throw new Error("Unauthorized or Todo not found");

    return updatedTodo; // Returns the updated todo
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//Delete
export const deleteTodo = async (todoId, userId) => {
  try {
    //Finds the todo by id and userId to ensure user owns it
    const deletedTodo = await todoModel.findOneAndDelete({
      _id: todoId,
      userId,
    });

    if (!deletedTodo) {
      throw new Error("Unauthorized or Todo not found");
    }

    console.log("Todo was deleted");
    return deletedTodo; // Returns the deleted todo
  } catch (error) {
    console.log(error);
    throw error;
  }
};
