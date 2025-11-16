import React from "react";
import { useRef } from "react";

const FocusInput = () => {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.focus();
  };

  //useRef create object with current: null , by default

  return (
    <>
      <input ref={inputRef} placeholder="Type your query..." />
      <button onClick={handleClick}>Focus</button>
    </>
  );
};

export default FocusInput;
