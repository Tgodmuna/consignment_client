import React, { useState } from "react";
import { MdOutlineManageHistory } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { LuLayoutList } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const SideBar = (prop: any) => {
  const navi = useNavigate();

  //links
  const SideLinks: string[] = ["shipment", "settings", "OrderList"];

  const SIDE_LINK = SideLinks.map((item, index) => {
    //append icon base on sidelinks
    const AppendIcons = (): JSX.Element | undefined => {
      switch (item) {
        case "shipment":
          return <MdOutlineManageHistory className='icon' />;
        case "OrderList":
          return <FaMapLocationDot className='icon' />;
        case "order":
          return <LuLayoutList className='icon' />;
        case "settings":
          return <CiSettings className='icon' />;
      }
    };

    //return JSX (each link)
    return (
      <div
        key={index}
        onClick={() => {
          navi(`/dashboard/${item}`);
        }}
        className='flex flex-col group hover:cursor-pointer'>
        <div
          key={index}
          className='peer hover:bg-slate-500 uppercase group items-center text-xs max-w-full flex gap-2 p-2 mx-3 rounded-md hover:scale-95 transition-all duration-500  hover:text-black'>
          {AppendIcons()}
          {item}
        </div>
        <div className='w-0 opacity-0 group-hover:opacity-95 group-hover:w-full transition-all duration-700 border-2 border-cyan-900 rounded-lg'></div>
      </div>
    );
  });

  return (
    <div className=' md:flex flex-col hidden h-full justify-between items-center p-[0rem] border border-l-0 border-b-0 border-t-0 border-cyan-900 border-r-[3px] bg-slate-900 text-slate-200 '>
      <h1 className='text-2xl m-2 font-bold uppercase text-neutral-700 w-fit'>
        TrustGold
      </h1>

      <ul className='flex flex-col h-[25rem] gap-[1rem] mt-[3rem]'>
        <li
          className='uppercase p-2 cursor-pointer'
          onClick={() => {
            navi("/dashboard");
          }}>
          dashboard
        </li>
        {SIDE_LINK}
      </ul>

      <RiLogoutCircleLine
        title='logout'
        className='hover:cursor-pointer hover:scale-105 hover:text-red-500 '
        onClick={() => prop.handleLogout()}
        size={40}
      />
    </div>
  );
};

export default SideBar;

type propType = { handler: (v) => any };
//mobile sidebar
export const MobileSIdeBar = ({ handler }: propType) => {
  const [isActive, setisActive] = useState(true);
  //links
  const SideLinks: string[] = ["settings", "OrderList", "order"];

  handler(setisActive);

  const SIDE_LINK = SideLinks.map((item, index) => {
    //append icon base on sidelinks
    const AppendIcons = (): JSX.Element | undefined => {
      switch (item) {
        case "shipment":
          return <MdOutlineManageHistory className='icon' />;
        case "OrderList":
          return <FaMapLocationDot className='icon' />;
        case "order":
          return <LuLayoutList className='icon' />;
        case "settings":
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
    <div
      className={`w-[65%] ${
        !isActive ? "hidden" : "block"
      } gap-[2.5rem] z-[100] bg-opacity-90 fixed items-center md:hidden bg-gray-300 border-2 rounded-md h-screen flex flex-col`}>
      <FaTimes
        onClick={() => setisActive(false)}
        size={45}
        className='hover:text-green-600 md:hidden block relative left-[-4.5rem]'
      />
      {SIDE_LINK}
    </div>
  );
};
