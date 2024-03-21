import React, { useState } from "react";
import { userDataType } from "../../App";
import LoadingSpinner from "../utilities/Spinner";
import Map from "./Map";
import { FaAngleDown } from "react-icons/fa6";

type PropType = {
  USERS: userDataType[] | undefined;
  isloadin: boolean;
};
const Clients = ({ USERS, isloadin }: PropType) => {
  const [isexpanded, setisexpanded] = useState<boolean[]>(
    new Array(USERS ? USERS.length : 0).fill(false),
  );

  const handleExpansion = (index: number) => {
    setisexpanded((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <div className='flex flex-col w-full'>
      {isloadin ? (
        <LoadingSpinner />
      ) : (
        <div className='w-[100%] h-screen overflow-scroll p-4'>
          <h1 className='text-2xl  uppercase '>All the available clients</h1>

          <ol className='flex flex-col flex-wrap justify-center gap-5 p-2 w-full m-auto'>
            {USERS?.map((client, index) => {
              return (
                <li
                  key={index}
                  className=' users p-2 flex flex-col justify-around items-center  border-2 rounded-xl border-green-400'>
                  {/* parcels */}
                  <div className=' parcels flex flex-col items-center p-2 w-full'>
                    <h1 className='capitaliz text-left text-xl  underline'>
                      client{" "}
                      <span className='uppercase font-bold 2xl '>
                        {client.bioData.fullName}{" "}
                      </span>{" "}
                      parcels
                    </h1>
                    <ul className='flex flex-col gap-4 border-2 p-2 w-full'>
                      {client.parcels.map((p, index) => {
                        return (
                          <li
                            key={index}
                            className='flex flex-wrap flex-col gap-3 border-slate-900 rounded-md border-2 justify-between p-3 hover:cursor-pointer hover:bg-slate-300'>
                            <h1 className='text-xl capitalize'>{` ${
                              client.bioData.fullName
                            } parcel no. ${index + 1}`}</h1>
                            <div className='flex flex-col '>
                              <p className=' flex items-center gap-4 font-bold text-lg '>
                                destination:
                                <span className='font-light text-xs'>
                                  {p.parcelLocation}
                                </span>
                              </p>

                              <p className=' flex items-center gap-4 font-bold text-2xl '>
                                sender:
                                <span className='font-light text-xs'>
                                  {p.sender}
                                </span>
                              </p>

                              <p className=' flex items-center gap-4 font-bold text-2xl '>
                                reciever:
                                <span className='font-light text-xs'>
                                  {p.receiver}
                                </span>
                              </p>

                              <p className=' flex items-center gap-4 font-bold text-2xl '>
                                tracking number:
                                <span className='font-light text-xs'>
                                  {p.trackingNumber}
                                </span>
                              </p>
                              <p>lat:{p.coordinates.lat.toString()}</p>
                              <p>lat:{p.coordinates.lon.toString()}</p>
                            </div>

                            <FaAngleDown
                              onClick={() => handleExpansion(index)}
                              size={40}
                              className={`text-blue-400 m-auto cursor-pointer ${
                                isexpanded[index] && "transform translate-x-90"
                              }`}
                            />
                            <div
                              className={` h-0 overflow-scroll  ${
                                isexpanded[index]
                                  ? "h-[40vw] block transition-all duration-500 "
                                  : ""
                              }`}>
                              <Map
                                className='h-[35vw]'
                                userId={client.ID}
                                parcelId={client.parcels[index].trackingNumber}
                              />
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </div>
  );
};

export default Clients;
