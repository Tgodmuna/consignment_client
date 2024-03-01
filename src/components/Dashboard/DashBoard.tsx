import React from "react";
import SideBar from "./SideBar";
import MainPage from "./MainPage";
import Nav from "./Nav";
import LeftSideBar from "./LeftSideBar";

export const DashBoard = () => {
  return (
    <div className='flex items-center overflow-scroll overflow-x-hidden justify-center bg-gray-400 h-screen'>
      <SideBar />
      <div className='flex flex-col gap-[0.5rem] h-screen  ml-[-6.4rem] w-[60%]'>
        <Nav />
        <MainPage />
      </div>
      <LeftSideBar />
    </div>
  );
};
