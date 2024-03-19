import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../utilities/Spinner";

interface Order {
  sender: string;
  recipient: string;
  weight: string;
  parcelLocation: string;
  price: number;
  coordinates?: {
    lat: number;
    lon: number;
  };
}

const OrderList: React.FC = () => {
  const [OrderList, setOrderList] = useState<Order[]>([]);
  const [IsLoading, setIsLoading] = useState(false);

  // on component mount fetch orders list
  useEffect(() => {
    setIsLoading(true);
    const userID = localStorage.getItem("userID");

    if (userID) {
      console.log("user found", userID);
      axios
        .get(`https://consignmentchika2.onrender.com/userParcels`, {
          params: {
            data: userID,
          },
        })
        .then((OrderResponse) => {
          const Orders = OrderResponse.data.userParcels;
          setOrderList(Orders);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      throw new Error("no UserId found");
    }
  }, []);

  return (
    <div className='m-auto overflow-auto h-full overflow-x-hidden py-[2rem] flex flex-col items-center justify-center bg-slate-50 w-full'>
      {IsLoading && (
        <LoadingSpinner className='h-[5rem] w-[10rem] bg-green-400' />
      )}
      <h2 className='text-2xl capitalize font-bold mb-4'>
        list of orders made ({OrderList.length})
      </h2>
      <div className='flex flex-wrap bg-red-900 items-center justify-center h-fill overflow-scroll'>
        {OrderList.map((order, index) => (
          <div
            key={index}
            className='flex flex-col gap-3 p-2 w-[25vw] m-2 bg-slate-200 shadow-lg rounded-md'>
            <p className='font-bold'>Sender: {order.sender}</p>
            <p className='font-bold'>Recipient: {order.recipient}</p>
            <p className='font-bold'>Destination: {order.parcelLocation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
