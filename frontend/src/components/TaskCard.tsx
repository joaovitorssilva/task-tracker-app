import { BsFillCalendarWeekFill, BsCheck2 } from "react-icons/bs";
import type { Task, Priority } from "../types/api";
import { PrioritySelect } from "./PrioritySelect";
import { updateTaskById } from "../api/endpoints/task";

interface TaskCardProps {
    task: Task;
    onClick?: () => void;
    refetchLists: () => Promise<void>;
}

export function TaskCard({ task, onClick, refetchLists }: TaskCardProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
        }).toUpperCase();
    }

    const isLate = () => {
        if (task.finishDate) return false;
        if (!task.expectedFinishDate) return false;

        const now = new Date();
        now.setHours(0, 0, 0, 0);

        const expectedDate = new Date(task.expectedFinishDate);
        expectedDate.setHours(0, 0, 0, 0);

        return expectedDate < now;
    };

    const handleToggleFinish = async (e: React.MouseEvent) => {
        e.stopPropagation();

        try {
            const updates = task.finishDate
                ? { finishDate: null }
                : { finishDate: new Date().toISOString() };

            await updateTaskById(task.id, updates);
            await refetchLists();
        } catch (err) {
            console.error('Failed to update task finish status:', err);
        }
    };

    const handlePriorityChange = async (newPriority: Priority) => {
        if (newPriority === task.priority) return;

        try {
            await updateTaskById(task.id, { priority: newPriority });
            await refetchLists();
        } catch (err) {
            console.error('Failed to update task priority:', err);
        }
    };

    const isTaskFinished = !!task.finishDate;

    return (
        <div
            onClick={onClick}
            className={`rounded-lg border p-2 cursor-pointer transition duration-300 ease-out ${isTaskFinished
                ? 'border-line bg-transparent opacity-40'
                : isLate()
                    ? 'border-line hover:border-white hover:bg-linear-to-r from-[#553434] to-[#381D1D] transition duration-300 ease-out'
                    : 'border-line hover:border-white hover:bg-linear-to-r from-[#393939] to-[#232323] transition duration-300 ease-out'
                }`}
        >
            {/* Header with Priority and Finish Button */}
            <div className="flex justify-between items-center mb-3">
                <div onClick={(e) => e.stopPropagation()}>
                    <PrioritySelect
                        value={task.priority}
                        onChange={handlePriorityChange}
                        mode="badge"
                    />
                </div>

                <button
                    onClick={handleToggleFinish}
                    className="flex items-center gap-2 transition duration-300 ease-out group"
                    title={isTaskFinished ? 'Marcar como não concluída' : 'Marcar como concluída'}
                >
                    <span className={`w-8 h-8 rounded-full border border-dashed flex items-center justify-center transition duration-300 ease-out ${isTaskFinished
                        ? 'border-lowPrioText text-lowPrioText group-hover:border-[#15C384] group-hover:text-[#15C384]'
                        : 'border-white text-white group-hover:border-[#15C384] group-hover:text-[#15C384]'
                    }`}>
                        <BsCheck2 className="w-4 h-4" />
                    </span>
                    <span className={`transition duration-300 ease-out ${isTaskFinished
                        ? 'text-lowPrioText group-hover:text-[#15C384]'
                        : 'text-white group-hover:text-[#15C384]'
                    }`}>
                        {isTaskFinished ? 'Finalizado' : 'Finalizar'}
                    </span>
                </button>

            </div>

            {/* Task Title */}
            <h3 className={`text-white text-base md:text-[19.2px] font-semibold mb-1 ${isTaskFinished ? 'line-through' : ''
                }`}>
                {task.title}
            </h3>

            {/* Task Description */}
            <p className={`text-white mb-3 text-[13.3px] md:text-base ${isTaskFinished ? 'line-through' : ''
                }`}>
                {task.description}
            </p>

            {/* Date */}
            <div className={`inline-flex items-center gap-2 px-2 py-1.5 rounded-md ${isLate()
                ? 'bg-redLight text-danger'
                : 'text-date-text bg-[#E0E0E0]'
                }`}>
                <span className="text-base">
                    <BsFillCalendarWeekFill />
                </span>
                <span className="text-[13px] font-semibold">
                    {task.expectedFinishDate
                        ? formatDate(task.expectedFinishDate)
                        : formatDate(task.createdAt)
                    }
                </span>
            </div>
        </div>
    )
}
