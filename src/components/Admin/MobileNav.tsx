import React from "react";
import { useNavigate } from "react-router-dom";

const MNavBar = () => {
  const navigate = useNavigate();

  return (
    <nav className='bg-gray-800  text-white md:hidden '>
      <div className=' m-auto flex justify-between items-center px-4 py-2'>
        {/* Navbar Menu */}
        <ul className='flex space-x-4 m-auto'>
          <li
            onClick={() => {
              navigate("/Admin");
            }}
            className=' capitalize block py-2 px-4 hover:bg-gray-700 rounded'>
            dashboard
          </li>
          <li
            className=' capitalize block py-2 px-4 hover:bg-gray-700 rounded'
            onClick={() => {
              navigate("/Admin/users");
            }}>
            clients{" "}
          </li>
          <li className=' capitalize block py-2 px-4 hover:bg-gray-700 rounded'>
            orders
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MNavBar;
