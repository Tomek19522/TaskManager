import AnimatedPageNumber from "./AnimatedPageNumber";

interface TaskListPaginationProps {
  itemsPerPage: number;
  setItemsPerPage: (items: number) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

const TaskListPagination = ({
  itemsPerPage,
  handlePageChange,
  setCurrentPage,
  setItemsPerPage,
  currentPage,
  totalPages,
}: TaskListPaginationProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-end sm:items-center gap-3 text-sm text-white text-center sm:text-right">
      <div className="flex justify-center sm:justify-end items-center gap-2">
        <span className="text-md">Ilość na stronę</span>
        <div className="relative inline-block">
          <select
            id="rows"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="appearance-none bg-gray-800 border border-gray-600 rounded px-4 py-2 pr-10 text-white"
          >
            <option>3</option>
            <option>5</option>
            <option>10</option>
            <option>20</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="text-md">
        Strona {currentPage} z {totalPages}
      </div>
      <div className="flex justify-center sm:justify-end items-center gap-1">
        <button
          onClick={() => handlePageChange(1)}
          className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded bg-gray-700 hover:bg-gray-600"
        >
          «
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded bg-gray-700 hover:bg-gray-600"
        >
          ‹
        </button>
        <AnimatedPageNumber page={currentPage} />
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded bg-gray-700 hover:bg-gray-600"
        >
          ›
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded bg-gray-700 hover:bg-gray-600"
        >
          »
        </button>
      </div>
    </div>
  );
};
export default TaskListPagination;
