//import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useEffect, useState } from 'react'
import './App.css'



function App() { 
  const [newItem, setNewItem] = useState('');
  const [items, setItems] = useState(()=>{
    const items = localStorage.getItem('items')
    if(items === null) return []

    return JSON.parse(items)
  });

  function handleSubmit(event){
    event.preventDefault();

    setItems((currentItems) =>{
      return [...currentItems, {id:crypto.randomUUID(), listItem: newItem, complete: false}]
    })
    setNewItem('');
  }

  useEffect(()=> {
    localStorage.setItem('items', JSON.stringify(items))
  }, [items])

  function handleCheck(id, complete){
    setItems(currentItems => {
      return currentItems.map(item =>{
        if(item.id === id){
          return {...item, complete}
        }
        return item
      })
    })
  }

  function HandleDelete(id){
    setItems((currentItems)=>{
      return currentItems.filter(item => (item.id !== id))
    })

  }
  
  return (
    <>
      <form onSubmit={handleSubmit}>
          <label htmlFor="todo">To do</label>
      <input type="text" id='todo' className='todo-entry' onChange={(event) =>setNewItem(event.target.value)} value={newItem} />
      <button >Add</button>
      </form>
      <ul >
        {items.map(item => (
          <li key={item.id}>
            <input type="checkbox" checked={item.complete} onChange={event => handleCheck(item.id,event.target.checked )} />
            {item.listItem} 
            <button onClick={() => HandleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  )
}



export default App
