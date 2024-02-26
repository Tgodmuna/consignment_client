import { FaHome, FaMap, FaPeopleArrows, FaPhone } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { MdWorkOutline } from "react-icons/md";

const NavBar = (prop: { Navbar_Visibilty: boolean }) => {
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

  return (
    <nav
      className={`w-[55%] ${
        prop.Navbar_Visibilty ? "block " : " hidden"
      } h-[100%] bg-black bg-opacity-95  fixed z-50 left-[45vw] top-[-1rem] transition-all  duration-300  p-3 flex flex-col`}>
      {links}
    </nav>
  );
};

export default NavBar;
