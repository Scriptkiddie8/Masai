import React, { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import type { Task } from "./interfaces/Task";
import { Priority } from "./enums/Priority";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "completed" | "incomplete">(
    "all"
  );

  const addTask = (description: string, priority: Priority) => {
    const newTask: Task = {
      id: Date.now(),
      description,
      priority,
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const toggleComplete = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <TaskForm addTask={addTask} />
      <div>
        <label>Filter: </label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
        >
          <option value="all">All Tasks</option>
          <option value="completed">Completed Tasks</option>
          <option value="incomplete">Incomplete Tasks</option>
        </select>
      </div>
      <TaskList tasks={tasks} toggleComplete={toggleComplete} filter={filter} />
    </div>
  );
};

export default App;
