import { useState } from "react";
import { TaskStatus } from "../types";

interface StatusDotProps {
  status: TaskStatus;
  onChangeStatus: (newStatus: TaskStatus) => void;
  closeTask: () => void;
}

const StatusDot = ({ status, onChangeStatus, closeTask }: StatusDotProps) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const getDotClasses = (status: TaskStatus) => {
    const base = "w-5 h-5 rounded-full border-2 border-gray-500";
    if (status === "Do zrobienia") {
      return base;
    }
    if (status === "W trakcie") {
      return `${base} bg-[conic-gradient(#ec4899_0_33%,transparent_33%)]`;
    }
    if (status === "Zrobione") {
      return `${base} bg-green-500`;
    }
    return base;
  };

  const getLabel = (status: TaskStatus) => {
    return status;
  };

  const statusOptions: TaskStatus[] = ["Do zrobienia", "W trakcie", "Zrobione"];

  return (
    <div className="relative mt-0.5">
      {openMenu && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setOpenMenu(false)}
        />
      )}
      <div className="relative group">
        <button
          disabled={status === "Ukonczone"}
          onClick={() => setOpenMenu((prev) => !prev)}
          className="flex items-center justify-center"
        >
          {status === "Ukonczone" ? (
            <div className="w-5 h-5  rounded-full bg-green-600 border-1 text-black text-xs flex items-center justify-center">
              ✓
            </div>
          ) : (
            <div className={getDotClasses(status)} />
          )}
        </button>
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-md border border-gray-700">
          {getLabel(status)}
        </div>
      </div>
      {openMenu && (
        <div className="absolute z-20 mt-2 bg-gray-800 border border-gray-700 rounded shadow p-2 w-36">
          {statusOptions.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChangeStatus(option);
                setOpenMenu(false);
              }}
              className="flex items-center gap-2 text-sm text-white hover:bg-gray-700 w-full px-2 py-1 rounded"
            >
              <div className={getDotClasses(option)} />
              <span>{getLabel(option)}</span>
            </button>
          ))}
          <button
            onClick={closeTask}
            className="flex items-center gap-2 text-sm text-white hover:bg-gray-700 w-full px-2 py-1 border-t-1 border-t-gray-500 mt-3 pt-3"
          >
            <div className="w-5 h-5  rounded-full bg-green-600 border-1 text-black text-xs flex items-center justify-center">
              ✓
            </div>
            <span>Ukończ</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default StatusDot;
