import {
  FaHome,
  FaMap,
  FaPeopleArrows,
  FaPhone,
  FaTimes,
} from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { MdWorkOutline } from "react-icons/md";

type proptype = {
  Navbar_Visibilty: boolean;
  setNavBar: () => void;
};
const NavBar = (prop: proptype) => {

  const links = [
    "home",
    "about",
    "service",
    "tracking",
    "support",
    "partner",
  ].map((item, index) => {
    const icon: () => JSX.Element | undefined = () => {
      switch (item) {
        case "home":
          return <FaHome navbar-links />;
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
        key={index}
        className='text-cyan-400 uppercase font-extralight flex gap-2 items-center hover:bg-slate-300 p-2 my-4 rounded-xl'>
        {icon()}
        {item}
      </li>
    );
  });
  console.log(prop.Navbar_Visibilty);

  return (
    <nav
      className={` mt-[1.5rem] w-[55%] opacity-100  h-[100%] bg-black bg-opacity-95  fixed z-50 left-[45vw] top-[-1rem] transition-all  duration-1000  p-3 flex flex-col`}>
      <FaTimes
        className={`hover:text-cyan-600 text-xl text-white self-end hover:cursor-pointer`}
        size={30}
        onClick={() => prop.setNavBar()}
      />
      {links}
    </nav>
  );
};

export default NavBar;
