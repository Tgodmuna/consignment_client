import React, { useState } from "react";
import PropTypes from "prop-types";

const InvoiceCard = ({
  sender,
  recipient,
  weight,
  destination,
  price,
  trackingId,
}) => {
  const [isNotshowing, setisNotshowing] = useState(false);

  return (
    <div
      className={`${
        isNotshowing && "hidden"
      } overlay-container flex flex-col  w-max-w-[45%] `}>
      <div className='invoice-card'>
        <h2>Shipment Details</h2>
        <p>
          Your shipment from{" "}
          <span className='font-bold uppercase'>{sender}</span> to {recipient}{" "}
          has been set to ship to
          <span className='font-bold uppercase'>{destination}</span>.
        </p>
        <ul className=' text-xs capitalize flex flex-col items-center gap-3 justify-center'>
          <li>Estimated delivery time: 3-5 business days</li>
          <li>Price: ${price.toFixed(2)}</li>
          <li>Tracking ID: {trackingId}</li>
          <li>weight: {weight}</li>{" "}
        </ul>
        <p className='font-light text-xs text-rose-600 capitalize'>
          Note that all your shipping details are sent to your registered Email
          address and do not share your tracking details with any body to avoid
          otherwise
        </p>
        <button
          type='button'
          onClick={() => {
            setisNotshowing((prev) => !prev);
            console.log(isNotshowing);
          }}
          className='close-button'>
          Close
        </button>
      </div>
    </div>
  );
};

InvoiceCard.propTypes = {
  sender: PropTypes.string.isRequired,
  recipient: PropTypes.string.isRequired,
  weight: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  trackingId: PropTypes.string.isRequired,
};

export default InvoiceCard;
