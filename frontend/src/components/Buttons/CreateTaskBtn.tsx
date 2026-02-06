import { useState } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";

export default function CreateTaskBtn() {
  const [newTaskModal, setNewTaskModal] = useState(false)

  const handleCreateNewTask = () => {
    setNewTaskModal(!newTaskModal)
  }

  return (
    <div className="mt-2">
      <button
        onClick={handleCreateNewTask}
        className="flex items-center gap-4 p-2 rounded-md text-white  cursor-pointer transition duration-300 ease-out hover:bg-options-button-hover ">
        <BsFillPlusCircleFill />
        New Task
      </button>
    </div>
  )
}