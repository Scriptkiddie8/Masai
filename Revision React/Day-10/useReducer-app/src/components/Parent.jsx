import React, { useCallback } from "react";
import { useState } from "react";
import Child from "./Child";
const Parent = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const handleClick = useCallback(() => {
    console.log("clicked, handleClick");
  }, []);

  return (
    <>
      <input onChange={(e) => setText(e.target.value)} />
      <Child handleClick={handleClick} />
    </>
  );
};

export default Parent;
