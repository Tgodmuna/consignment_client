import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../utilities/Spinner";
import MapWithMarker from "../utilities/MapWithMarker";

interface Order {
  sender: string;
  recipient: string;
  weight: string;
  destination: string;
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
      console.log(userID);
      axios
        .get(`https://consignmentchika2.onrender.com/userParcels/:${userID}`)
        .then((OrderResponse) => {
          const Orders = OrderResponse.data;
          console.log("orders", Orders);
          setOrderList((prev) => {
            const NewOrderList = [...prev];
            NewOrderList.push(Orders);
            return NewOrderList;
          });
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

  useEffect(() => console.log("persist", OrderList), [OrderList]);

  return (
    <div className='m-auto overflow-auto h-full overflow-x-hidden py-[2rem] flex flex-col items-center justify-center bg-slate-50 w-full'>
      {IsLoading && (
        <LoadingSpinner className='h-[5rem] w-[10rem] bg-green-400' />
      )}
      <h2 className='text-2xl capitalize font-bold mb-4'>
        list of orders made ({OrderList.length})
      </h2>
      <div className='flex'>
        {OrderList.map((order, index) => (
          <div className='flex flex-col gap-3 p-2 bg-green-900'>
            <div key={index} className='bg-gray-100 p-4 rounded-lg'>
              <p className='font-bold'>Sender: {order.sender}</p>
              <p className='font-bold'>Recipient: {order.recipient}</p>
              <p className='font-bold'>Weight: {order.weight} kg</p>
              <p className='font-bold'>Destination: {order.destination}</p>
              <p className='font-bold'>Price: ${order.price.toFixed(2)}</p>
            </div>
            <MapWithMarker coordinates={order.coordinates} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
