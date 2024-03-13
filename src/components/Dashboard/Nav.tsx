import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa6";

const Nav = () => {
  return (
      <nav className='max-w-full bg-slate-50 border-slate-300 rounded-lg border-2 flex justify-end '>
      <div className='flex  justify-between items-center w-full md:w-[10rem] '>
        <FaRegBell
          className='hover:scale-50 hover:cursor-pointer hover:text-black text-neutral-500'
          size={30}
        />
        <FaUserAlt
          className='hover:scale-50 hover:cursor-pointer hover:text-black text-neutral-500'
          size={30}
        />
        <div className='w-[3rem] h-[3rem] rounded-full hover:border-cyan-800 hover:cursor-pointer border-2 bg-black bg-opacity-10 p-2'></div>
      </div>
    </nav>
  );
};

export default Nav;
