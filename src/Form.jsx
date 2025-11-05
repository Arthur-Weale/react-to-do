import { useState } from "react";
import './App.css'

export function Form({formElements}){
    const [newItem, setNewItem] = useState({
        todo: ""
    });

    async function handleSubmit(event){
        event.preventDefault();
    
        formElements(newItem);
        setNewItem({todo: ""});

        try {
            
        const response = await fetch("http://localhost:3000/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newItem),
        });
        const result = await response.json()
        console.log(result);

        } catch (error) {
            console.log(error)
        }
    }

    return<form onSubmit={handleSubmit} >
        <label htmlFor="todo">To do</label>
        <input type="text" id='todo' className='todo-entry' name="todo" onChange={(event) =>setNewItem({todo: event.target.value})} value={newItem.todo} />
        <button type="submit" >Add</button>
        </form>
}