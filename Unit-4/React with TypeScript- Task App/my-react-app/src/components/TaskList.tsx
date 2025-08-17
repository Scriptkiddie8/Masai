import React from "react";
import type { Task } from "../interfaces/Task";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  toggleComplete: (id: number) => void;
  filter: "all" | "completed" | "incomplete";
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  toggleComplete,
  filter,
}) => {
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true;
  });

  return (
    <ul>
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} toggleComplete={toggleComplete} />
      ))}
    </ul>
  );
};

export default TaskList;
