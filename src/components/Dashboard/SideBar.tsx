import React from "react";
import { MdDashboard, MdOutlineManageHistory } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { LuLayoutList } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const navi = useNavigate();

  //links
  const SideLinks: string[] = [
    "dashboard",
    " Shipments",
    "Tracking",
    "setting",
  ];

  const SIDE_LINK = SideLinks.map((item, index) => {
    //append icon base on sidelinks
    const AppendIcons = (): JSX.Element | undefined => {
      switch (item) {
        case "dashboard":
          return <MdDashboard className='icon' />;
        case " Shipment":
          return <MdOutlineManageHistory className='icon' />;
        case "Tracking":
          return <FaMapLocationDot className='icon' />;
        case "order":
          return <LuLayoutList className='icon' />;
        case "setting":
          return <CiSettings className='icon' />;
      }
    };

    //return JSX (each link)
    return (
      <div onClick={() => ""} className='flex flex-col group'>
        <div
          key={index}
          className='peer uppercase group items-center text-xs max-w-full flex gap-2 p-2 mx-3 rounded-md hover:scale-95 transition-all duration-500  hover:text-black'>
          {AppendIcons()}
          {item}
        </div>
        <div className='w-0 opacity-0 group-hover:opacity-95 group-hover:w-full transition-all duration-700 border-2 border-cyan-900 rounded-lg'></div>
      </div>
    );
  });

  return (
    <div className=' flex flex-col h-full fixed self-start left-[0rem] justify-between items-center p-[0rem] border border-l-0 border-b-0 border-t-0 border-cyan-900 border-r-[3px] bg-slate-100 '>
      <h1 className='text-2xl m-2 font-bold uppercase text-neutral-700 w-fit'>
        TrustGold
      </h1>

      <ul className='flex flex-col h-[25rem] gap-[1rem] mt-[3rem]'>
        {SIDE_LINK}
      </ul>

      <RiLogoutCircleLine size={40} />
    </div>
  );
};

export default SideBar;

//mobile sidebar
const MobileSIdeBar = () => {
  //links
  const SideLinks: string[] = [
    "dashboard",
    " Shipment",
    "Tracking",
    "order",
    "setting",
  ];

  const SIDE_LINK = SideLinks.map((item, index) => {
    //append icon base on sidelinks
    const AppendIcons = (): JSX.Element | undefined => {
      switch (item) {
        case "dashboard":
          return <MdDashboard className='icon' />;
        case " Shipment":
          return <MdOutlineManageHistory className='icon' />;
        case "Tracking":
          return <FaMapLocationDot className='icon' />;
        case "order":
          return <LuLayoutList className='icon' />;
        case "setting":
          return <CiSettings className='icon' />;
      }
    };

    //return JSX (each link)
    return (
      <li
        key={index}
        className=' uppercase group items-center text-xs max-w-full flex gap-2 p-2 mx-3 rounded-md hover:scale-95 transition-all duration-500  hover:bg-cyan-900 hover:text-black'>
        {AppendIcons()}
        {item}
      </li>
    );
  });
  return (
    <div className='w-[65%] bg-slate-100 border-2 rounded-md h-[45rem] flex flex-col absolute'>
      {SIDE_LINK}
    </div>
  );
};
