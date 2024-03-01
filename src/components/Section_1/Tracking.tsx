import React from "react";
import Shipment from "./Shipment";

const Tracking = () => {
  return (
    <div>
      <div className=' trackBg flex items-center justify-center p-2 flex-col max-w-[100%] md:flex-row md:max-w-[100%] h-fit'>
        <h1 className='text-neutral-50 capitalize  text-xl text-pretty p-2  md:w-[30rem]'>
          Book and track orders anytime, anywhere. Easily book and track orders
          anytime, anywhere with our convenient tracking system. Keep tabs on
          your shipments effortlessly! With our user-friendly interface and
          real-time updates, you can stay informed every step of the way. Enjoy
          peace of mind knowing your packages are in good hands.
        </h1>

        <Shipment />
      </div>
          <div>
              
      </div>
    </div>
  );
};

export default Tracking;
