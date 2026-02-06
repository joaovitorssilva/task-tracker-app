import type { Task } from '../types/api'
import { useState } from 'react';
import TaskCard from './Taskcard';
import CreateTaskModal from './CreateTaskModal';
import CreateTaskBtn from './Buttons/CreateTaskBtn';
import ListTitle from './ListTitle';
// import { updateListById } from '../api/endpoints/Lists';

interface ListProps {
  id: number;
  name: string;
  propTasks: Task[];
  refetchLists: () => Promise<void>;
}

const ListComponent = ({ id, name, propTasks, refetchLists }: ListProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleOpenModal = (task: Task | null = null) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingTask(null);
    setIsModalOpen(false);
  };


  // const updateThisList = async (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   try {
  //     const newList = { id, name: nameInput };
  //     await updateListById(newList);
  //     await refetchLists();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <main className= "border border-options-button-hover rounded-md gap-4 px-4 shrink-0">
      <ListTitle initialTitle={name} />

      {/* Display tasks */}
      <div className="flex flex-col gap-4">
        {propTasks.length > 0 ? (
          propTasks.map((task) => (
            <div key={task.id} onClick={() => handleOpenModal(task)}>
              <TaskCard task={task} />
            </div>
          ))
        ) : (
          <p className="text-white">Nenhuma tarefa cadastrada...</p>
        )}
      </div>

      <div onClick={() => handleOpenModal()}>
        <CreateTaskBtn />
      </div>

      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        listId={Number(id)}
        refetchLists={refetchLists}
        taskToEdit={editingTask ?? undefined}
      />
    </main>
  );
};

export default ListComponent