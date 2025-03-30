import { TaskStatus } from "../types";

interface FiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filterStatus: TaskStatus | "Wszystkie";
  setFilterStatus: (status: TaskStatus | "Wszystkie") => void;
  setSortAsc: (value: boolean) => void;
  setSortType: (selectedType: "date" | "name") => void;
  onAddTask: () => void;
  setCurrentPage: () => void;
}

const Filters = ({
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
  setSortAsc,
  setSortType,
  onAddTask,
  setCurrentPage,
}: FiltersProps) => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-8 sm:mb-12">
      <div className="flex flex-col md:flex-row gap-2 md:items-center w-full">
        <div className="relative w-full md:w-64">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-500">
            🔍
          </span>
          <input
            type="text"
            placeholder="Szukaj po tytule lub opisie..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-3 py-2 text-sm bg-gray-800 border border-gray-600 text-white rounded w-full placeholder-gray-400"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) =>
            setFilterStatus(e.target.value as TaskStatus | "Wszystkie")
          }
          className="bg-gray-800 border border-gray-600 text-white text-sm px-3 py-2 rounded"
        >
          <option value="Wszystkie">Wszystkie</option>
          <option value="Do zrobienia">Do zrobienia</option>
          <option value="W trakcie">W trakcie</option>
          <option value="Zrobione">Zrobione</option>
          <option value="Ukonczone">Ukończone</option>
        </select>

        <select
          onChange={(e) => {
            const val = e.target.value;
            if (val === "asc") {
              setSortAsc(true);
              setSortType("name");
            } else if (val === "desc") {
              setSortAsc(false);
              setSortType("name");
            } else if (val === "date-asc") {
              setSortAsc(true);
              setSortType("date");
            } else if (val === "date-desc") {
              setSortAsc(false);
              setSortType("date");
            }
            setCurrentPage();
          }}
          className="bg-gray-800 border border-gray-600 text-white text-sm px-3 py-2 rounded"
        >
          <option value="default" disabled>
            Sortuj: domyślnie
          </option>
          <option value="asc">Sortuj: A-Z</option>
          <option value="desc">Sortuj: Z-A</option>
          <option value="date-asc">Sortuj: Data rosnąco</option>
          <option value="date-desc">Sortuj: Data malejąco</option>
        </select>
      </div>

      <div className="flex justify-end w-full">
        <button
          onClick={onAddTask}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm w-full md:w-auto"
        >
          Dodaj zadanie
        </button>
      </div>
    </div>
  );
};

export default Filters;
