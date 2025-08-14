import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup"
import Login from "./components/Login";
import Home from "./components/Home"

function App() {
  return (
    <>
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/home" element={<Home/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App;
