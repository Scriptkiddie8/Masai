import React from "react";
import useToggleItems from "../hooks/useToggleItem";

function ToggleComponent() {
  const items = ["A", "B", "C", "D"];
  const [currentItem, toggleItem] = useToggleItems(items, 1);

  return (
    <div>
      <h2>Current Item: {currentItem}</h2>
      <button onClick={toggleItem}>Toggle Item</button>
    </div>
  );
}

export default ToggleComponent;
