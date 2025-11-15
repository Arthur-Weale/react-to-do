import { useEffect, useState } from "react";
import "./App.css";
import { Form } from "./Form";

const API_URL = import.meta.env.VITE_API_URL;

function Todo() {
//Stores todo state from the database, the data is received in a array.
const [todo, setTodo] = useState([]);

//Fetches todo from the database
const fetchTodos = async () => {
  const token = localStorage.getItem("token"); // get JWT from localStorage
  try {
    const response = await fetch(`${API_URL}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
async function handleDelete(todoId) {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${API_URL}/delete/${todoId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Delete failed");
    fetchTodos();
  } catch (error) {
    console.log(error);
  }

  setTodo((prev) => prev.filter((todo) => todo._id !== todoId));
}

const handleCheck = async (event, idToEdit) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${API_URL}/edit/${idToEdit}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ completed: event.target.checked }),
    });

    if (!response.ok) throw new Error("Update failed");
    fetchTodos();
  } catch (error) {
    console.log(error);
  }
};

return (
    <>
    <Form fetchTodos={fetchTodos} />
    <ul>
        {todo.map((item) => (
        <li key={item._id}>
            <input
            type="checkbox"
            checked={item.completed}
            onChange={(e) => handleCheck(e, item._id)}
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

export default Todo;
