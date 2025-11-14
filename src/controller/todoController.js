import initdb from "../models/db.js";
import todoModel from "../models/schema.js"

//Initially called initdb and establishes a database connection.
await initdb();

//Create
export const insertTodo = async (formData) => {
  try {
    await initdb(); // initializes the database connection
    const result = await todoModel.create({// creates a new todo document in the DB
      todo: formData.todo, // sets the 'todo' field from formData
      completed: formData.completed, // sets the 'completed' field from formData
    });
    return result; // returns the newly created todo
  } catch (error) {
    console.log(error); // logs any errors during DB operation
  }
};


//Read
export const getTodos = async()=> {
    try {
        const result = await todoModel.find();//Find the 'todos' from the database.
        return result; //Returns the 'todos'.
    } catch (error) {
      console.log(error); // logs any errors during search operation
    }
}

//Update
export const editTodo = async (resultCheck, editedTodo) => {
  try {
    const updatedTodo = await todoModel.findByIdAndUpdate(editedTodo,{ //Finds the 'todo' to update by using the todo's id
        completed: resultCheck.completed //Changes the the completed property.
    },
    {new: true})//This tells mongoose to return the updatedTodo and this a required arg.
    return updatedTodo; //Returns the updated todo.
  } catch (error) {
    console.log(error);
  }
};

//Delete
export const deleteTodo = async (id) => {
  try {
    const deletedTodo = await todoModel.findByIdAndDelete(id)//Finds the todo id and delete the to-do with the matching id.
    if(deletedTodo){ //A check to see if todo was deleted.
        console.log("Todo was deleted");
        return deleteTodo;
    }else{
        console.log("Failed to delete todo");
    }
  } catch (error) {
    console.log(error);
  }
};