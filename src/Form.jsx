import { useState } from "react";
import './App.css'

export function Form({fetchTodos}){
    //Initialises state stores the todo in an object.
    const [newItem, setNewItem] = useState({
        todo: "",
        completed: false
    });

    //Handles todo submition when add button is pressed.
    async function handleSubmit(event){
        event.preventDefault();
        setNewItem({todo: "", completed: false});

        try {
        //Executes a post request to the url below and submits todo to the backend.
        await fetch(`${import.meta.env.VITE_API_URL}/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newItem),
        });
        //Calls fetchTodo from App.jsx to have the todo render todos from the database.
        fetchTodos();
        } catch (error) {
            console.log(error)
        }
    }

    return<form onSubmit={handleSubmit} >
        <label htmlFor="todo">To do</label>
        <input type="text" id='todo' className='todo-entry' name="todo" onChange={(event) =>setNewItem({todo: event.target.value, completed: false})} value={newItem.todo} />
        <button type="submit" >Add</button>
        </form>
}