import { useState, useEffect } from 'react';
import { FinishTaskBtn } from './Buttons/FinishTaskBtn';
import type { Task, Priority } from '../types/api';
import { BsArrowBarRight } from 'react-icons/bs';
import { createTask, updateTaskById } from '../api/endpoints/Task';

type CreateTaskModalProps = {
  listId: number;
  refetchLists: () => Promise<void>;
  isOpen: boolean;
  onClose: () => void;
  taskToEdit?: Task;
};

const CreateTaskModal = (props: CreateTaskModalProps) => {
  const { listId, refetchLists, isOpen, onClose, taskToEdit } = props;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority | ''>('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description || '');
      setPriority(taskToEdit.priority || '');
      //setDate(taskToEdit.deadline ? new Date(taskToEdit.deadline).toISOString().split('T')[0] : '');
    } else {
      setTitle('');
      setDescription('');
      setPriority('');
      setDate('');
    }
  }, [taskToEdit, isOpen]);

  const buildDateAtMidnightLocal = (yyyyMmDd: string) => {
    const [year, month, day] = yyyyMmDd.split('-').map(Number);
    return new Date(year, month - 1, day, 0, 0, 0);
  };

  const handleSubmit = async () => {
    try {
      let newDate = null;
      if (date !== '') {
        const localDate = buildDateAtMidnightLocal(date);
        newDate = localDate;
      }

      const taskData: any = {
        title: title,
        description,
        deadline: newDate ? newDate.toISOString() : undefined,
        listId: listId,
        finished: taskToEdit ? taskToEdit.finished : false,
      };

      if (priority) {
        taskData.priority = priority;
      }

      // if (taskToEdit) {
      //   await updateTaskById(BigInt(taskToEdit.id), taskData);
      // } else {
      //   await createTask(taskData);
      // }

      onClose();
      await refetchLists();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div
        className={`fixed h-full top-0 right-0 z-99 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
      >
        <div
          className={`top-16 min-w-md right-0 h-full w-full max-w-md bg-bg p-4 shadow-lg transform transition-transform duration-150 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
            } flex flex-col gap-2`}
        >
          <nav className='flex items-center justify-between'>
            <button onClick={onClose} className='hover:bg-options-button-hover w-6 h-6 p-1 text-white rounded-md flex items-center cursor-pointer'>
              <BsArrowBarRight />
            </button>
            <FinishTaskBtn />
          </nav>

          <div className='flex flex-col gap-3'>
            <input
              type='text'
              placeholder='Título'
              className='p-2 rounded text-white font-bold text-3xl bg-transparent  transition duration-200'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <hr className='text-options-button-hover'></hr>

            <div>
              <div className='flex justify-between items-center'>
                <p className='text-white font-semibold text-base'>Data de Conclusão</p>
              </div>

              <div className='flex justify-between items-center'>
                <p className='text-white font-semibold text-base'>Prioridade</p>
              </div>
            </div>

            <hr className='text-options-button-hover'></hr>

            <p className='font-semibold text-white'>Descrição</p>

            <textarea
              placeholder='Descrição'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='p-2 min-h-[100px] resize-y rounded-md bg-transparent text-white border border-options-button-hover focus:outline-none focus:ring ring-white transition duration-200'
            />

            <hr className='text-options-button-hover'></hr>

          </div>
        </div>
      </div>
    </>
  );
};

export default CreateTaskModal;