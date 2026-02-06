import { useState } from "react"
import { BsCheck2 } from "react-icons/bs"

export function FinishTaskBtn() {
  const [isFinished, setIsFinished] = useState(false)

  const handleFinishTask = () => {
    setIsFinished(!isFinished)
  }

  return (

    <button
      onClick={handleFinishTask}
      className={`text-white px-5 py-2 text-base font-normal flex items-center gap-2 cursor-pointer 
  ${isFinished ? ' bg-green-800' : 'bg-transparent'} `}
    >
      <BsCheck2 className="border w-[32px] h-[32px] p-1 border-dashed rounded-full text-white" />
      Finalizar

    </button>
  )
}