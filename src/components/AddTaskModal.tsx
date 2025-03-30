import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTasks } from "../context/TaskContext";

const schema = z.object({
  title: z.string().min(1, "Tytuł jest wymagany"),
  description: z.string().min(1, "Opis jest wymagany"),
  status: z.enum(["Do zrobienia", "W trakcie", "Zrobione"]),
});

type FormData = z.infer<typeof schema>;

interface AddTaskModalProps {
  closeModal: () => void;
}

const AddTaskModal = ({ closeModal }: AddTaskModalProps) => {
  const { addTask } = useTasks();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      status: "Do zrobienia",
    },
  });

  const onSubmit = (data: FormData) => {
    addTask(data.title, data.description, data.status);
    reset();
    closeModal();
  };

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) closeModal();
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={handleBackgroundClick}
    >
      <div className="bg-[#111827] text-white rounded-xl shadow-2xl w-[85%] sm:w-full max-w-md p-6 border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">Dodaj zadanie</h2>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-white text-xl px-1"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-2">
          <div>
            <input
              type="text"
              placeholder="Tytuł"
              {...register("title")}
              className="w-full bg-gray-800 text-white border border-gray-600 px-3 py-2 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            {errors.title && isSubmitted && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>
          <div>
            <textarea
              placeholder="Opis"
              {...register("description")}
              className="w-full bg-gray-800 text-white border border-gray-600 px-3 py-2 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 min-h-[100px]"
            />
            {errors.description && isSubmitted && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>
          <div>
            <select
              {...register("status")}
              className="w-full bg-gray-800 text-white border border-gray-600 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value="Do zrobienia">Do zrobienia</option>
              <option value="W trakcie">W trakcie</option>
              <option value="Zrobione">Zrobione</option>
            </select>
          </div>
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm"
            >
              Utwórz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
