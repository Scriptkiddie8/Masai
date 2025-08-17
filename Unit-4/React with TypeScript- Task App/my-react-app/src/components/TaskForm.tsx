import React, { useState } from "react";
import { Priority } from "../enums/Priority";

interface TaskFormProps {
  addTask: (description: string, priority: Priority) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>(Priority.Low);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;
    addTask(description.trim(), priority);
    setDescription("");
    setPriority(Priority.Low);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
      >
        <option value={Priority.Low}>Low</option>
        <option value={Priority.Medium}>Medium</option>
        <option value={Priority.High}>High</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
