import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../utilities/Spinner";
import MapWithMarker from "../utilities/MapWithMarker";

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
  const [ErrorMesage, setErrorMesage] = useState("");

  // on component mount fetch orders list
  useEffect(() => {
    setIsLoading(true);
    const userID = sessionStorage.getItem("userID");

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
          setErrorMesage(err.message);
        });
    } else {
      setIsLoading(false);
      throw new Error("no UserId found");
    }
  }, []);

  return (
    <div className=' overflow-scroll h-[40rem] flex-wrap m-auto items-center justify-center bg-slate-50 w-full'>
      {IsLoading && (
        <LoadingSpinner className='h-[5rem] w-[10rem]  m-auto' />
      )}
      <h2 className='text-2xl capitalize font-bold mb-4 text-center'>
        list of orders made ({OrderList.length})
      </h2>
      {ErrorMesage ? (
        <h1 className='text-red-500 text-2xl text-center '>{ErrorMesage}</h1>
      ) : (
        ""
      )}
      {OrderList.map((order, index) => (
        <div
          key={index}
          className='flex flex-col m-auto gap-3 p-2 w-[70vw] my-2 bg-slate-200 shadow-lg rounded-md'>
          <p className='font-bold'>Sender: {order.sender}</p>
          <p className='font-bold'>Recipient: {order.recipient}</p>
          <p className='font-bold'>Destination: {order.parcelLocation}</p>
          <MapWithMarker coordinates={order.coordinates} />
        </div>
      ))}
    </div>
  );
};

export default OrderList;
