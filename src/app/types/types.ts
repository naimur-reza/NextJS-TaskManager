export interface TaskType {
  id: string;
  name: string;
  description: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  tags: string[];
  completed: boolean;
  reminder: boolean;
}
