import { createContext, useContext, useState, ReactNode } from "react";
import { Task, TaskStatus } from "./../types";

interface TaskContextType {
  tasks: Task[];
  addTask: (title: string, description: string, status: TaskStatus) => void;
  removeTask: (id: number) => void;
  updateTask: (updated: Task) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("Error");
  }
  return context;
};

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (title: string, description: string, status: TaskStatus) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      status,
      createdAt: new Date(),
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const removeTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const updateTask = (updated: Task) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updated.id ? updated : task))
    );
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, removeTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};
