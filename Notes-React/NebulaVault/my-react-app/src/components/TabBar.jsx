import React from "react";

const TabBar = ({ universe, activeUniverse, setActiveUniverse }) => {
  return (
    <div className="tab-bar">
      {universe.map((u) => (
        <button
          key={u}
          className={activeUniverse === u ? "active" : ""}
          onClick={() => setActiveUniverse(u)}
        >
          {u.charAt(0).toUpperCase() + u.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default TabBar;
