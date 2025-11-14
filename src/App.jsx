import { useEffect, useState } from 'react'
import './App.css'
import {Form} from './Form'

function App() {
  //Stores todo state from the database, the data is received in a array.
  const [todo, setTodo] = useState([]);

  //Fetches todo from the database
  const fetchTodos = async () => {
    const response = await fetch("http://localhost:3000/");
    try {
      if (!response.ok) {
        throw new Error("fetching todo failed");
      }
      const data = await response.json();
      setTodo(data);
    } catch (error) {
      console.log(error);
    }
  };

  //Calls the fetchtodo when the page mounts.
  useEffect(() => {
    fetchTodos();
  }, []);

  //Function handles delete and called the delete method.
  async function handleDelete(todoId){
    try {
      await fetch(`http://localhost:3000/delete/${todoId}`, {
        method: "DELETE",
      });
      fetchTodos();
    } catch (error) {
      console.log(error)
    }

    //Simple filters todos from the deleted ones
    setTodo(prev => prev.filter(todo => todo._id !== todoId))
  }

  //This function sends checkbox information to the database when the checkbox is interacted with.
  const handleCheck = async (event, idToEdit)=>{
    try {
      await fetch(`http://localhost:3000/edit/${idToEdit}`, {
        method: "PUT",
        headers: {
          "Content-Type": "Application/Json",
        },
        body: JSON.stringify({completed: event.target.checked}),
      });
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <>
      <Form fetchTodos={fetchTodos}/>
      <ul>
        {todo.map((item) => (
          <li key={item._id}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={(e)=> handleCheck(e,item._id)}
            />
            {item.todo}
            <button
              onClick={() => {
                handleDelete(item._id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App
