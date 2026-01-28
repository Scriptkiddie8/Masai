import { useState } from "react";
import "./App.css";
import FetchData from "./components/FetchData";
import Login from "./components/Login";

function App() {
  const [isLoggin, setIsLoggin] = useState(false);

  return (
    <>
      {isLoggin ? <FetchData /> : <Login onLogin={() => setIsLoggin(true)} />}
    </>
  );
}

export default App;
