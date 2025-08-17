import React from "react";
import type { Task } from "../interfaces/Task";

interface TaskItemProps {
  task: Task;
  toggleComplete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, toggleComplete }) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleComplete(task.id)}
      />
      <span
        style={{ textDecoration: task.completed ? "line-through" : "none" }}
      >
        {task.description} ({task.priority})
      </span>
    </li>
  );
};

export default TaskItem;
