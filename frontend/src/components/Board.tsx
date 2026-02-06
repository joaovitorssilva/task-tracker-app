import ListComponent from "./ListComponent";
import { useState } from "react";
import type { List } from "../types/api";
import { createList, findListByName } from "../api/endpoints/Lists";
import { BsFillPlusCircleFill } from "react-icons/bs";

const Board = ({
  lists,
  refetchLists,
}: {
  lists: List[];
  refetchLists: () => Promise<void>;
}) => {
  const [modal, setModal] = useState(false);
  const [listNameInput, setListNameInput] = useState("");

  const openModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setModal(true);
  };

  const closeModal = (e: React.MouseEvent) => {
    e.preventDefault();

    setModal(false);
  };

  const verifySameListName = (listName: string) => {
    for (let i = 0; i < lists.length; i++) {
      if (listName === lists[i].name) {
        return true;
      }
    }
    return false;
  };

  const createThisList = async (e: React.MouseEvent) => {
    try {
      e.preventDefault();

      if (listNameInput.trim() === "") {

        return;
      }

      if (verifySameListName(listNameInput)) {
        return;
      }

      const newList = {
        name: listNameInput.trim(),
      };

      await createList(newList);
      setListNameInput("");
      const createdList = await findListByName(newList.name);
      lists.push(createdList);
      closeModal(e);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-bg flex flex-row flex-nowrap gap-4 overflow-x-auto sm:pt-15 py-4  w-full pt-15">
      {lists.map((list) => (
        <ListComponent
          key={list.id}
          id={list.id}
          name={list.name}
          propTasks={list.tasks}
          refetchLists={refetchLists}
        />
      ))}
      <div className="rounded-md 1flex flex-col gap-4 min-w-[300px] w-[300px] h-min shrink-0 relative top-2">
        <button
          onClick={(e) => openModal(e)}
          className="text-white w-full flex items-center gap-2 font-semibold text-sm p-2 rounded-xl hover:bg-options-button-hover transition duration-300 ease-out cursor-pointer"
        >
          <BsFillPlusCircleFill className="w-6 h-6" />
          Nova Lista
        </button>
      </div>

      {modal && (
        <div
          className="fixed inset-0 bg-black/90 bg-opacity-50 z-50 flex items-center justify-center text-white"
          onClick={(e) => closeModal(e)}
        >
          <div
            className="bg-bg p-4 rounded shadow-lg w-full max-w-md relative flex flex-col gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={(e) => closeModal(e)}
              className="absolute top-2 right-2 text-black text-xl hover:text-red-400 font-extrabold px-2 hover:bg-red-900/20 rounded-full cursor-pointer"
            >
              x
            </button>
            <p>Criar Lista</p>
            <p className="flex mt-4">Nome da Lista:</p>
            <input
              type="text"
              className="p-2 border-2 border-stone-100/10 rounded-xl focus:outline-none focus:ring focus:ring-white hover:ring hover:ring-white transition duration-200"
              onChange={(e) => setListNameInput(e.target.value)}
            />
            <button
              onClick={(e) => createThisList(e)}
              className="mt-6 bg-white text-black font-extrabold p-1 rounded-xl hover:bg-black hover:text-white transition duration-300 ease-out cursor-pointer"
            >
              Criar Lista
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Board;