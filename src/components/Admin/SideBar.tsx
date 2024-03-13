import React from "react";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();
  return (
    <aside className='bg-gray-800 text-white w-64 hidden md:block'>
      {/* Sidebar Content */}
      <div className='p-4'>
        <h1 className='text-2xl font-bold mb-4'>Admin Dashboard</h1>
        {/* Sidebar Menu */}
        <ul className='space-y-2 flex flex-col gap-[3rem]'>
          <li className=' capitalize block py-2 px-4 hover:bg-gray-700 hover:cursor-pointer rounded'>
            Dashboard
          </li>
          <li
            className=' capitalize block py-2 px-4 hover:bg-gray-700 rounded'
            onClick={() => {
              navigate("users");
            }}>
            Clients
          </li>
          <li className=' capitalize block py-2 px-4 hover:bg-gray-700 rounded'>
            Orders
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
