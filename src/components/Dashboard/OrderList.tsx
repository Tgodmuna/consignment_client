import React, { useEffect, useState } from "react";

interface Order {
  sender: string;
  recipient: string;
  weight: string;
  destination: string;
  price: number;
}

const OrderList: React.FC = () => {
  const [persistedOrders, setPersistedOrders] = useState<Order[]>([]);

  // on component mount fetch orders list and save to local storage
  useEffect(() => {
    fetch("jkjjk").then((res) => {
      res
        .json()
        .then((res) => localStorage.setItem("order", JSON.stringify(res.body)));
    });
  }, []);

  //on component mount deserialize orders and set to PersistedState
  useEffect(() => {
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      setPersistedOrders(JSON.parse(storedOrders));
    }
  }, []);

  useEffect(() => console.log("persist", persistedOrders), [persistedOrders]);

  return (
    <div className='mx-auto'>
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
