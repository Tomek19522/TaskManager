export type TaskStatus =
  | "Do zrobienia"
  | "W trakcie"
  | "Zrobione"
  | "Ukonczone";

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
}
