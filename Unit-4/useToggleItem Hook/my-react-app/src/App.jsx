import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ToggleComponent from "./components/ToggleComponent";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <h1>useToggleItems Custom Hook Demo</h1>
        <ToggleComponent />
      </div>
    </>
  );
}

export default App;
