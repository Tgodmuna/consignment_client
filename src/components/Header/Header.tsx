import { useState } from "react";
import NavBar from "./NavBar";
import { FaBars, FaMap, FaPeopleArrows, FaPhone } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { MdWorkOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const [NavBar_visibility, setNavBar_visibility] = useState(false);

  const handleVisibility = () => {
    setNavBar_visibility(!NavBar_visibility);
  };

  //links
  const links = [
    "about",
    "service",
    "tracking",
    "support",
    "partner",
  ].map((item, index) => {
    const icon: () => JSX.Element | undefined = () => {
      switch (item) {
        case "about":
          return <FcAbout navbar-links />;
        case "service":
          return <MdWorkOutline navbar-links />;

        case "tracking":
          return <FaMap navbar-links />;
        case "support":
          return <FaPhone navbar-links />;
        case "partner":
          return <FaPeopleArrows navbar-links />;
        default:
          break;
      }
    };

    return (
      <li
        onClick={() => navigate(`/${item}`)}
        key={index}
        className='text-cyan-400 uppercase font-extralight flex gap-2 items-center hover:border-[2px] border-cyan-600 p-2 my-4 rounded-xl mx-3 hover:cursor-pointer hover:animate-pulse'>
        {icon()}
        {item}
      </li>
    );
  });

  return (
    <header
      className={`Header bg-black max-w-[100vw] top-[-1rem] fixed z-20 py-[1.5rem] px-2 pb-1 h-[5rem] flex justify-between `}>
      {/* logo */}
      <a
        href='/'
        title='go to home page'
        className='logo animate-pulse text-lime-100 border border-cyan-300 p-2 rounded-md flex items-center font-bold uppercase'>
        TrustGold-logistics
      </a>

      <ul className='md:flex justify-between items-center p-2  hidden '>
        {links}
      </ul>

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
