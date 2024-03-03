import axios from "axios";
import React, { useRef, useState } from "react";
import LoadingSpinner from "../utilities/Spinner";
import InvoiceCard from "../utilities/InvoiceCard";

interface Parcel {
  sender: string;
  recipient: string;
  weight: string;
  destination: string;
  price: number;
  isLoading: boolean;
  isShipped: boolean; // Add a property to track shipping status
}

const AddParcelForm = () => {
  const [parcel, setParcel] = useState<Parcel>({
    sender: "",
    recipient: "",
    weight: "",
    destination: "",
    price: 0,
    isLoading: false,
    isShipped: false,
  });
  const [parcelsToShip, setParcelsToShip] = useState<Parcel[]>([]);
  const [IsLoading, setIsLoading] = useState(false);
  const [isInVoiceShowing, setisInVoiceShowing] = useState(false);
  const [OrderResponse, setOrderResponse] = useState<{
    sender: string;
    recipient: string;
    weight: string;
    destination: string;
    price: number;
    trackingId: string;
  }>({
    sender: "",
    recipient: "",
    weight: "",
    destination: "",
    price: 0,
    trackingId: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParcel((prevParcel) => ({
      ...prevParcel,
      [name]: value,
    }));
  };

  const handleSubmit = (i: number | undefined) => {
    if (i !== undefined) {
      const updatedParcels = [...parcelsToShip];
      updatedParcels[i].isLoading = true;
      setParcelsToShip(updatedParcels);

      axios
        .post(
          "https://chikaconsignment1-1.onrender.com/parcels",
          parcelsToShip[i],
        )
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            const updatedParcels = [...parcelsToShip];
            updatedParcels[i].isLoading = false;
            updatedParcels[i].isShipped = true;
            setParcelsToShip(updatedParcels);
            setisInVoiceShowing(true);
          }
        })
        .catch((err) => {
          const updatedParcels = [...parcelsToShip];
          updatedParcels[i].isLoading = true;
          setParcelsToShip(updatedParcels);
          setisInVoiceShowing(false);
          console.log(err);
        });

      // Reset parcel state
      setParcel({
        sender: "",
        recipient: "",
        weight: "",
        destination: "",
        price: 0,
        isLoading: false,
        isShipped: false,
      });
    }
  };

  return (
    <div className='mx-auto flex flex-col items-center  w-full m-auto'>
      <h2 className='text-2xl font-bold mb-4'>Add Parcel</h2>
      {isInVoiceShowing && (
        <InvoiceCard
          sender={OrderResponse.sender}
          recipient={OrderResponse.recipient}
          weight={OrderResponse.weight}
          destination={OrderResponse.destination}
          price={OrderResponse.price}
          trackingId={OrderResponse.trackingId}
        />
      )}
      <form className='mb-8 flex  items-center justify-center w-[35rem]  gap-3 '>
        <input
          type='text'
          name='sender'
          value={parcel.sender}
          onChange={handleChange}
          placeholder='Sender'
          className='block w-full border border-gray-300 rounded-md py-2 px-3 mb-3'
          required
        />
        <input
          type='text'
          name='recipient'
          value={parcel.recipient}
          onChange={handleChange}
          placeholder='Recipient'
          className='block w-full border border-gray-300 rounded-md py-2 px-3 mb-3'
          required
        />
        <input
          type='text'
          name='weight'
          value={parcel.weight}
          onChange={handleChange}
          placeholder='Weight (kg)'
          className='block w-full border border-gray-300 rounded-md py-2 px-3 mb-3'
          required
        />
        <input
          type='text'
          name='destination'
          value={parcel.destination}
          onChange={handleChange}
          placeholder='Destination'
          className='block w-full border border-gray-300 rounded-md py-2 px-3 mb-3'
          required
        />
        <button
          onClick={() => {
            if (parcel.destination && parcel.recipient && parcel.weight) {
              // Generate price for the parcel based on weight (for demonstration, a simple calculation is used)
              const newprice = parseFloat(parcel.weight) * 5; // Assuming price is $5 per kg
              const newParcel: Parcel = {
                ...parcel,
                price: newprice,
              };
              setParcelsToShip((prevParcels) => [...prevParcels, newParcel]);
            }
          }}
          type='button'
          className='bg-blue-500 text-xs w-full  text-white py-2 px-4 rounded-md hover:bg-blue-600 flex items-center gap-1'>
          Add Parcel
        </button>
      </form>

      {/* parcel list available for shipping */}
      {parcelsToShip.length > 0 && (
        <div className='bg-slate-300 w-full p-3'>
          <h2 className='text-2xl font-bold mb-4 text-green-600 uppercase'>
            parcels ready to ship (Pending Parcels)
          </h2>
          <ul className='mb-4 flex flex-wrap items-cente justify-center'>
            {parcelsToShip.map((p, index) => (
              <li
                key={index}
                className='border-2 border-neutral-200-300 rounded-md py-2 px-3 mb-2 flex items-center gap-3'>
                <p className='text-xs capitalize'>
                  <span className='font-bold text-sm'>Sender:</span> {p.sender}
                </p>
                <p className='text-xs capitalize'>
                  <span className='font-bold text-sm'>Recipient:</span>{" "}
                  {p.recipient}
                </p>{" "}
                <p className='text-xs capitalize'>
                  <span className='font-bold text-sm'>Weight:</span> {p.weight}
                </p>{" "}
                <p className='text-xs capitalize'>
                  <span className='font-bold text-sm'>Destination:</span>{" "}
                  {p.destination}
                </p>{" "}
                <p className='text-xs capitalize'>
                  <span className='font-bold text-sm'>Price:</span> $
                  {p.price.toFixed(2)}{" "}
                </p>{" "}
                <button
                  title='Click to start shipping'
                  type='button'
                  onClick={(e) => {
                    handleSubmit(index);
                    e.preventDefault();
                  }}
                  className='bg-green-500 text-center w-[10rem] uppercase font-bold  text-[10px] text-white py-2 px-4 rounded-md hover:bg-green-600 mt-2 flex items-center justify-center gap-2'>
                  {p.isShipped ? "shipped" : " not shipped"}
                  {p.isLoading && <LoadingSpinner />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AddParcelForm;
