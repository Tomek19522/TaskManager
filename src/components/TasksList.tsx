import { useTasks } from "../context/TaskContext";
import { useState, useEffect } from "react";
import { TaskStatus } from "../types";
import Filters from "./Filters";
import TaskItem from "./TaskItem";
import TaskListPagination from "./TaskListPagination";
import AddTaskModal from "./AddTaskModal";
import NoTaskBox from "./NoTaskBox";

const TaskList = () => {
  const { tasks } = useTasks();
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const [sortType, setSortType] = useState<"date" | "name">("name");
  const [filterStatus, setFilterStatus] = useState<TaskStatus | "Wszystkie">(
    "Wszystkie"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showModal, setShowModal] = useState(false);

  const resetCurrentPage = () => {
    setCurrentPage(1);
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm.toLowerCase());
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      filterStatus === "Wszystkie" ? true : task.status === filterStatus;
    const matchesSearch =
      task.title.toLowerCase().includes(debouncedSearchTerm) ||
      task.description.toLowerCase().includes(debouncedSearchTerm);
    return matchesStatus && matchesSearch;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortType === "date") {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortAsc ? dateA - dateB : dateB - dateA;
    }
    if (sortType === "name") {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      if (titleA < titleB) return sortAsc ? -1 : 1;
      if (titleA > titleB) return sortAsc ? 1 : -1;
      return 0;
    }
    return 0;
  });
  const totalPages = Math.ceil(sortedTasks.length / itemsPerPage) || 1;
  const paginatedTasks = sortedTasks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <div className="px-10 py-20 sm:px-16 lg:px-30 xl:px-40 bg-gray-900 text-white min-h-screen">
      <Filters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        setSortAsc={setSortAsc}
        setSortType={setSortType}
        onAddTask={() => setShowModal(true)}
        setCurrentPage={resetCurrentPage}
      />
      {showModal && <AddTaskModal closeModal={closeModal} />}
      {paginatedTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
      {paginatedTasks.length === 0 && <NoTaskBox />}
      <TaskListPagination
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default TaskList;
