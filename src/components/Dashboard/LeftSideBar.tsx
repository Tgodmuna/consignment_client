import React from "react";

const LeftSideBar = () => {
  return (
    <aside className='h-full bg-slate-100 w-[25%] ml-4 fixed right-0 rounded-md flex gap-[3rem] flex-col border-2 border-cyan-900 p-3'>
      <h1 className='text-xl text-neutral-500 capitalize text-center'>
        real time parcel tracker
      </h1>

      <div className='bg-slate-50 w-full flex flex-col p-1 rounded-md'>
        <p className='font-semibold text-neutral-300 text-xs'>
          Parcel Status: <span className='font-light'>not avail</span>
        </p>
        <p className='font-semibold text-xs text-neutral-300'>
          Tracking-num: <span className='font-light'>not avail</span>
        </p>
      </div>

      <div className='bg-slate-50 w-full flex flex-col p-1 rounded-md '>
        <h1 className="text-2xl flashig-text text-red-700 capitalize animate-ping">map coming soon</h1>
      </div>
    </aside>
  );
};

export default LeftSideBar;
