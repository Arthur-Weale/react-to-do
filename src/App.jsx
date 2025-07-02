//import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useState } from 'react'
import './App.css'



function App() {
  const [message, setMessage] = useState(`Let's build something cool today!`);

  function mms(){
    setMessage(
      message === `Let's build something cool today!` 
      ?`Lets Go!!!` 
      :  `Let's build something cool today!`);
  }
  
  return (
    <>
      <h1>{message}</h1>
      <button onClick={mms}>Change</button>
    </>
  )
}



export default App
