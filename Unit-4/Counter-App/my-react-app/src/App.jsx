import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "./features/counter/counterSlice";
import Counter from "./features/counter/Counter";

function App() {
  return (
    <div>
      <Counter />
    </div>
  );
}

export default App;
