import { useEffect, useState } from 'react'
import './App.css'
import {Form} from './Form'



function App() { 
  
  const [items, setItems] = useState(()=>{
    const items = localStorage.getItem('items')
    if(items === null) return []

    return JSON.parse(items)
  });

  function addFormElements(listItem){
      setItems((currentItems) =>{
      return [...currentItems, {id:crypto.randomUUID(), listItem, complete: false}]
    })
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
      <Form formElements={addFormElements}/>
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
