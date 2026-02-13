import { BsBellFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";

export function Navbar() {
    return (
        <>
            <nav className='bg-linear-to-r from-bgLight to-bgDark shadow-md flex items-center justify-between w-full px-10 py-3 cursor-pointer text-white'>
                <div>
                    <p className='text-base sm:text-xl font-extrabold tracking-wider'>Minhas Tarefas</p>
                </div>
                <div className='flex gap-3 items-center'>
                    <div >
                        <BsBellFill className="w-full h-6 hover:bg-options-button-hover transition duration-150 ease-in" />
                    </div>
                    <div>
                        <MdAccountCircle className="w-full h-6 hover:bg-options-button-hover transition duration-150 ease-in " />
                    </div>
                </div>
            </nav>
        </>
    );
}