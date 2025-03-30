import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import { Task, TaskStatus } from "../types";
import StatusDot from "./StatusDot";
import Menu from "./Menu";

interface TaskItemProps {
  task: Task;
}

const TaskItem = ({ task }: TaskItemProps) => {
  const { removeTask, updateTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [showActionsMenu, setShowActionsMenu] = useState(false);

  const updateStatus = (newStatus: TaskStatus) => {
    updateTask({ ...task, status: newStatus });
  };
  const closeTask = () => {
    updateTask({ ...task, status: "Ukonczone" });
  };

  const saveChanges = () => {
    updateTask({ ...task, title: editTitle, description: editDescription });
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setIsEditing(false);
  };

  return (
    <div className="bg-[#111827] mb-4 sm:mb-6 border border-gray-700 rounded-lg px-6 py-3 text-sm text-white flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 hover:bg-gray-800 transition-colors">
      <div className="flex justify-between items-center w-full sm:hidden">
        <div className="flex items-center gap-2">
          <StatusDot
            status={task.status}
            onChangeStatus={updateStatus}
            closeTask={closeTask}
          />
          <div className="break-words font-semibold pr-4 w-full sm:w-[180px]">
            {isEditing ? (
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="bg-gray-900 text-white border border-gray-600 rounded px-2 py-1 w-full"
              />
            ) : (
              task.title
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400 whitespace-nowrap">
          <div className="text-gray-400 pl-8 pr-4 whitespace-nowrap">
            {task.createdAt.toDateString()}
          </div>
          {isEditing ? (
            <div className="flex flex-col gap-1">
              <button
                onClick={saveChanges}
                className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded"
              >
                Zapisz
              </button>
              <button
                onClick={cancelEdit}
                className="bg-gray-700 hover:bg-gray-600 text-white text-sm px-3 py-1 rounded"
              >
                Anuluj
              </button>
            </div>
          ) : (
            <Menu
              label="⋯"
              show={showActionsMenu}
              toggle={() => setShowActionsMenu((prev) => !prev)}
              actions={[
                {
                  label: "Edytuj",
                  onClick: () => {
                    setIsEditing(true);
                    setShowActionsMenu(false);
                  },
                },
                {
                  label: "Usuń",
                  onClick: () => removeTask(task.id),
                  danger: true,
                },
              ]}
            />
          )}
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-row sm:items-start sm:justify-between w-full gap-3">
        <div className="flex items-center gap-2 shrink-0">
          <StatusDot
            status={task.status}
            onChangeStatus={updateStatus}
            closeTask={closeTask}
          />
          <div className="break-words font-semibold pr-4 w-full sm:w-[180px]">
            {isEditing ? (
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="bg-gray-900 text-white border border-gray-600 rounded px-2 py-1 w-full"
              />
            ) : (
              task.title
            )}
          </div>
        </div>
        <div className="flex-1 justify-center bg-red">
          {isEditing ? (
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="bg-gray-900 text-white border border-gray-600 rounded px-2 py-1 w-full min-h-[60px]"
            />
          ) : (
            task.description
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400 whitespace-nowrap shrink-0">
          <div className="text-gray-400 pl-8 pr-4 whitespace-nowrap">
            {task.createdAt.toDateString()}
          </div>
          {isEditing ? (
            <div className="flex flex-col gap-1">
              <button
                onClick={saveChanges}
                className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded"
              >
                Zapisz
              </button>
              <button
                onClick={cancelEdit}
                className="bg-gray-700 hover:bg-gray-600 text-white text-sm px-3 py-1 rounded"
              >
                Anuluj
              </button>
            </div>
          ) : (
            <Menu
              label="⋯"
              show={showActionsMenu}
              toggle={() => setShowActionsMenu((prev) => !prev)}
              actions={[
                {
                  label: "Edytuj",
                  onClick: () => {
                    setIsEditing(true);
                    setShowActionsMenu(false);
                  },
                },
                {
                  label: "Usuń",
                  onClick: () => removeTask(task.id),
                  danger: true,
                },
              ]}
            />
          )}
        </div>
      </div>
      <div className="text-gray-300 sm:hidden">
        {isEditing ? (
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="bg-gray-900 text-white border border-gray-600 rounded px-2 py-1 w-full min-h-[60px]"
          />
        ) : (
          task.description
        )}
      </div>
    </div>
  );
};

export default TaskItem;
