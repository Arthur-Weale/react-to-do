import { useState } from "react";
import './App.css'

export function Form({formElements}){
    const [newItem, setNewItem] = useState('');

    function handleSubmit(event){
        event.preventDefault();
    
        formElements(newItem);
        setNewItem('');
    }

    return<form onSubmit={handleSubmit}>
        <label htmlFor="todo">To do</label>
        <input type="text" id='todo' className='todo-entry' onChange={(event) =>setNewItem(event.target.value)} value={newItem} />
        <button >Add</button>
        </form>
}