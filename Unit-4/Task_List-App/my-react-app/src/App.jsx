// src/App.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, removeTask, toggleTask } from "./redux/taskSlice";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (input.trim()) {
      dispatch(addTask(input));
      setInput("");
    }
  };

  return (
    <div className="container">
      <h1>Task List</h1>

      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a task"
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? "done" : ""}>
            <span onClick={() => dispatch(toggleTask(task.id))}>
              {task.text}
            </span>
            <button
              className="remove"
              onClick={() => dispatch(removeTask(task.id))}
            >
              clear
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
