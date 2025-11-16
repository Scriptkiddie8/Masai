import { useState } from "react";
import { useRef } from "react";
import "./App.css";

function App() {
  const [timer, setTimer] = useState(0);
  const inputRef = useRef(null);

  const handleStart = () => {
    if (inputRef.current !== null) return;

    inputRef.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
  };

  const handleStop = () => {
    clearInterval(inputRef.current);
    inputRef.current = null;
  };

  const handleReset = () => {
    clearInterval(inputRef.current);
    inputRef.current = null;
    setTimer(0);
  };

  return (
    <>
      <h2>Stop-Watch</h2>
      <p>{timer}</p>
      <div style={{ margin: "0 30px" }}>
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </>
  );
}

export default App;
