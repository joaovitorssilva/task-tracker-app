import { BsFillCalendarWeekFill } from "react-icons/bs";
import type { Task } from "../types/api";
import { FinishTaskBtn } from "./Buttons/FinishTaskBtn";

interface TaskCardProps {
    task: Task;
}

function TaskCard({ task }: TaskCardProps) {
    const getPriorityStyles = (priority: string) => {
        switch (priority) {
            case 'LOW':
                return 'bg-lowPrio text-lowPrioText';
            case 'MEDIUM':
                return 'bg-mediumPrio text-mediumPrioText';
            case 'HIGH':
                return 'bg-highPrio text-highPrioText';
            default:
                return 'bg-veryHighPrio text-veryHighPrioText';
        }
    }

    const getPriorityText = (priority: string) => {
        switch (priority) {
            case 'LOW':
                return 'Baixa Prioridade';
            case 'MEDIUM':
                return 'Média Prioridade';
            case 'HIGH':
                return 'Alta Prioridade';
              case 'VERY_HIGH':
                return 'Altíssima Prioridade'
            default:
                return priority;
        }
    }
    

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', { 
            day: 'numeric', 
            month: 'numeric', 
            year: 'numeric' 
        }).toUpperCase();
    }

    return (
        <div className=" rounded-lg p-2 mb-4 border border-line max-w-[480px]">

            {/* Header with Priority and Finish Button */}
            <div className="flex justify-between items-center mb-3">
                <button className={`px-4 py-2 rounded-md text-sm font-semibold ${getPriorityStyles(task.priority)}`}>
                    {getPriorityText(task.priority)}
                </button>

                <FinishTaskBtn/>
               
            </div>

            {/* Task Title */}
            <h3 className="text-white text-base md:text-lg font-semibold mb-1">
                {task.title}
            </h3>

            {/* Task Description */}
            <p className="text-white mb-3 text-sm md:text-base">
                {task.description}
            </p>

            {/* Date */}
            <div className="text-date-text inline-flex items-center gap-2 bg-[#E0E0E0] px-2 py-1.5 rounded-md">
                <span className="text-base">
                    <BsFillCalendarWeekFill/>
                </span>
                <span className=" text-[13px] font-semibold">
                    {task.expectedFinishDate 
                        ? formatDate(task.expectedFinishDate)
                        : formatDate(task.createdAt)
                    }
                </span>
            </div>
        </div>
    )
}

export default TaskCard