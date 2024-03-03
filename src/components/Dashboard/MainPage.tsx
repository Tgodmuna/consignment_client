import {
  MdCancelPresentation,
  MdOutlineAddCircleOutline,
  MdSignalCellular1Bar,
} from "react-icons/md";
import { GiCheckMark } from "react-icons/gi";
import { CiDeliveryTruck } from "react-icons/ci";
import { useState } from "react";
import AddParcelForm from "./Orders";
import { Outlet } from "react-router-dom";



//todo: conditionally render outLet leater

const MainPage = () => {
  const [IsOrderShowing, setIsOrderShowing] = useState(false);
  return (
    <div className='flex rounded-lg h-auto flex-col self-start mt-[1rem] bg-slate-50 w-[100%] p-3 shadow-lg shadow-gray-500 '>
      <div className='flex flex-col my-4 gap-3'>
        <h1 className='text-3xl font-bold text-start items-start text-cyan-900 capitalize'>
          hello user{" "}
        </h1>
        <p className='text-xs text-neutral-600 w-fit capitalize'>
          {" "}
          here is the overall status of your orders
        </p>
        <button
          onClick={() => setIsOrderShowing(true)}
          type='button'
          className='text-xs hover:bg-green-600 uppercase text-white items-center p-2 w-fit rounded bg-green-400 flex font-semibold border'>
          place shippment
          <MdOutlineAddCircleOutline className='text-cyan-500 text-xl mx-1 hover:scale-105 hover:cursor-pointer' />
        </button>
      </div>
      {IsOrderShowing && <AddParcelForm />}
      <Stat />
      <Outlet />
    </div>
  );
};

export default MainPage;

const Stat = () => {
  const stat = [
    {
      total: 0,
      type: "delivered",
      iconSignal: <MdSignalCellular1Bar size={20} />,
      icon: <GiCheckMark className='m-auto text-white' size={30} />,
    },
    {
      total: 0,
      type: "out for delivery",
      iconSignal: <MdSignalCellular1Bar size={20} />,
      icon: <CiDeliveryTruck size={30} className='text-yellow-900' />,
    },
    {
      total: 0,
      type: "failed delivery",
      iconSignal: <MdSignalCellular1Bar size={20} />,
      icon: <MdCancelPresentation className=' text-red-500' size={30} />,
    },
  ];
  const STATs = stat.map((item, index) => {
    const bg = (): string | undefined => {
      switch (item.type) {
        case "failed delivery":
          return "bg-slate-300";
        case "out for delivery":
          return "bg-blue-500";
        case "delivered":
          return "bg-green-700";
      }
    };
    return (
      <li
        key={index}
        className={`p-2 rounded-md  max-w-[17rem] gap-[2rem] flex flex-wrap justify-between items-center shadow-md border`}>
        <div
          className={` ${bg()} rounded-full w-[3rem] h-[3rem] flex items-center justify-center`}>
          {item.icon}
        </div>

        <div className='flex flex-col'>
          <p className='font-bold text-xs'>{item.total}</p>
          <p className='text-neutral-300 text-[9px] capitalize'>{item.type}</p>
        </div>

        {item.iconSignal}
      </li>
    );
  });

  return (
    <div className='flex flex-col max-w-full'>
      <h1 className='text-xs font-extrabold text-black capitalize my-[1rem]'>
        delivery stats
      </h1>
      <ul className='flex flex-col justify-between  items-center p-2 max-w-full md:flex-row'>
        {STATs}
      </ul>
    </div>
  );
};
