import TaskList from "./components/TasksList";
import { TaskProvider } from "./context/TaskContext";
import "./index.css";
function App() {
  return (
    <TaskProvider>
      <TaskList />
    </TaskProvider>
  );
}

export default App;
