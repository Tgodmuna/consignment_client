import axios from "axios";
import React, { useEffect, useState } from "react";
import { json } from "stream/consumers";
import LoadingSpinner from "../utilities/Spinner";

interface Order {
  sender: string;
  recipient: string;
  weight: string;
  destination: string;
  price: number;
}

const OrderList: React.FC = () => {
  const [persistedOrders, setPersistedOrders] = useState<Order[]>([]);
  const [IsLoading, setIsLoading] = useState(false);

  // on component mount fetch orders list and save to local storage
  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://chikaconsignment1-1.onrender.com/parcels")
      .then((OrderResponse) => {
        const Orders = OrderResponse.data;
        console.log("orders", Orders);
        localStorage.setItem("order", JSON.stringify(Orders));
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  //on component mount deserialize orders and set to PersistedState
  useEffect(() => {
    const storedOrders = localStorage.getItem("order");
    if (storedOrders) {
      setPersistedOrders(JSON.parse(storedOrders));
    }
  }, []);

  useEffect(() => console.log("persist", persistedOrders), [persistedOrders]);

  return (
    <div className='mx-auto'>
      {IsLoading && <LoadingSpinner className='h-[2rem]' />}
      <h2 className='text-2xl font-bold mb-4'>Placed Orders</h2>
      <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
        {persistedOrders.map((order, index) => (
          <div key={index} className='bg-gray-100 p-4 rounded-lg'>
            <p className='font-bold'>Sender: {order.sender}</p>
            <p className='font-bold'>Recipient: {order.recipient}</p>
            <p className='font-bold'>Weight: {order.weight} kg</p>
            <p className='font-bold'>Destination: {order.destination}</p>
            <p className='font-bold'>Price: ${order.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
