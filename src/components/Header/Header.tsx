import { useState } from "react";
import NavBar from "./NavBar";
import { FaBars, FaTimes } from "react-icons/fa";
export const Header = () => {
  const [NavBar_visibility, setNavBar_visibility] = useState(false);

  const handleVisibility = () => {
    setNavBar_visibility((prev) => !prev);
  };

  return (
    <header
      className={`Header bg-black max-w-[100vw] top-[-1rem] fixed z-20 py-[1.5rem] px-2 h-[5rem] flex justify-between `}>
      {/* logo */}
      <a href='kbjbs' title='go to home page' className='logo animate-pulse'>
        <img
          src='/Assets/images/logo.png'
          alt='logo'
          className='w-[7rem] object-cover'
        />
      </a>

      {/* navbar activator */}
      <div className=' md:hidden border bordeer-cyan-700 w-fit p-1 '>
        <FaBars
          onClick={() => handleVisibility()}
          size={30}
          className={`${
            NavBar_visibility ? "hidden" : "block"
          }hover:text-white  hover:cursor-pointer text-cyan-600`}
        />
        <FaTimes
          className={`${
            NavBar_visibility ? "block" : "hidden"
          } hover:text-cyan-600 hover:cursor-pointer`}
          size={30}
          onClick={() => handleVisibility()}
        />
      </div>
      <NavBar Navbar_Visibilty={NavBar_visibility} />
    </header>
  );
};
