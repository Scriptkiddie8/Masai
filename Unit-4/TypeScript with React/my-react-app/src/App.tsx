import React from "react";
import Timer from "./components/Timer";

const App: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>React Timer with TypeScript</h1>
      <Timer />
    </div>
  );
};

export default App;
