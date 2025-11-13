import { useEffect, useState } from 'react'
import './App.css'
import {Form} from './Form'



function App() {
  const [todo, setTodo] = useState([]);

  useEffect(() => {
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
    fetchTodos();
  }, []);

  async function handleDelete(todoId){
    try {
      await fetch(`http://localhost:3000/delete/${todoId}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error)
    }

    setTodo(prev => prev.filter(todo => todo._id !== todoId))
  }

  return (
    <>
      <Form/>
      <ul>
        {todo.map((item) => (
          <li key={item._id}>
            <input type="checkbox" checked={item.complete} />
            {item.todo}
            <button onClick={()=> {handleDelete(item._id)}}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
  //onChange={event => handleCheck(item.id,event.target.checked )}
  //{/* <button onClick={() => HandleDelete(item.id)}>Delete</button> */}
}



export default App
