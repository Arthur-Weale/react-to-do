import { Route, Routes} from "react-router-dom"
import SignIn from "./view/SignIn.jsx";
import SignUp from "./view/SignUp.jsx";
import Todo from "./Todo.jsx"; 

function App(){
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/app" element={<Todo/>} />
    </Routes>
  );
}

export default App;