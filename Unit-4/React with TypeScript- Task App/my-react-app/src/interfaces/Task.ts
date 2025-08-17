import { Priority } from "../enums/Priority";

export interface Task {
  id: number;
  description: string;
  priority: Priority;
  completed: boolean;
}
