import { useState } from "react";
import NavBar from "./NavBar";
import { FaBars } from "react-icons/fa";
export const Header = () => {
  const [NavBar_visibility, setNavBar_visibility] = useState(false);

  const handleVisibility = () => {
    setNavBar_visibility(!NavBar_visibility);
  };

  return (
    <header
      className={`Header bg-black max-w-[100vw] top-[-1rem] fixed z-20 py-[1.5rem] px-2 pb-1 h-[5rem] flex justify-between `}>
      {/* logo */}
      <a
        href='kbjbs'
        title='go to home page'
        className='logo animate-pulse text-lime-100 border border-cyan-300 p-2 rounded-md flex items-center font-bold uppercase'>
        TrustGold-logistics
      </a>

      {/* navbar activator */}
      <div className=' md:hidden mt-2 w-fit p-1 '>
        <FaBars
          onClick={() => handleVisibility()}
          size={40}
          className={`hover:text-white  hover:cursor-pointer text-cyan-600`}
        />
      </div>
      {NavBar_visibility && (
        <NavBar
          Navbar_Visibilty={NavBar_visibility}
          setNavBar={handleVisibility}
        />
      )}
    </header>
  );
};
