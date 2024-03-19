import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import LoadingSpinner from "../utilities/Spinner";
import InvoiceCard from "../utilities/InvoiceCard";

type eachParcel = {
  sender: string;
  recipient: string;
  weight: string;
  destination: string;
  price: number;
  coordinates: { lat: number; lon: number };
  isLoading?: boolean;
  isShipped?: boolean;
};

type InvoiceDataType = {
  sender: string;
  recipient: string;
  weight: string;
  destination: string;
  price: number;
  trackingId: string;
};

const AddeachParcelForm = () => {
  const [eachParcel, seteachParcel] = useState<eachParcel>({
    sender: "",
    recipient: "",
    weight: "",
    destination: "",
    price: 0,
    coordinates: { lat: 12098998, lon: 65675578587 },
    isLoading: false,
    isShipped: false,
  });
  const [eachParcelsToShip, seteachParcelsToShip] = useState<eachParcel[]>([]);
  const [isInVoiceShowing, setisInVoiceShowing] = useState(false);
  const BTNref = useRef<null | HTMLButtonElement>(null);
  const [InvoiceData, SetInvoiceData] = useState<InvoiceDataType>({
    sender: "",
    recipient: "",
    weight: "",
    destination: "",
    price: 0,
    trackingId: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    seteachParcel((preveachParcel) => ({
      ...preveachParcel,
      [name]: value,
    }));
  };

  const handleSubmit = (i: number | undefined) => {
    if (i !== undefined) {
      const updatedeachParcels = [...eachParcelsToShip];
      updatedeachParcels[i].isLoading = true;
      seteachParcelsToShip(updatedeachParcels);
      const userID = localStorage.getItem("userID");
      if (userID) {
        let payload = {
          data: {
            destination: eachParcelsToShip[i].destination,
            sender: eachParcelsToShip[i].sender,
            recipient: eachParcelsToShip[i].recipient,
            coordinates: eachParcelsToShip[i].coordinates,
          },
          userID: userID,
        };
        axios
          .post(
            `https://consignmentchika2.onrender.com/Parcels`,
            JSON.stringify(payload),
            {
              headers: {
                "Content-Type": "application/json",
              },
            },
          )
          .then((res) => {
            if (res.status === 200) {
              const updatedeachParcels = [...eachParcelsToShip];
              updatedeachParcels[i].isLoading = false;
              updatedeachParcels[i].isShipped = true;
              //if parcel is shipped , disble button.
              if (updatedeachParcels[i].isShipped && BTNref.current) {
                BTNref.current.disabled = true;
              }
              seteachParcelsToShip(updatedeachParcels);
              setisInVoiceShowing(true);
              SetInvoiceData((prev) => ({
                ...prev,
                sender: eachParcelsToShip[i].sender,
                recipient: eachParcelsToShip[i].recipient,
                weight: eachParcelsToShip[i].weight,
                price: eachParcelsToShip[i].price,
                destination: eachParcelsToShip[i].destination,
                trackingId: res.data.user.parcels[i].trackingNumber,
              }));
            }
          })
          .catch((err) => {
            const updatedeachParcels = [...eachParcelsToShip];
            updatedeachParcels[i].isLoading = false;
            seteachParcelsToShip(updatedeachParcels);
            setisInVoiceShowing(false);
            console.log(err);
          });
      }

      // Reset eachParcel state
      seteachParcel({
        sender: "",
        recipient: "",
        weight: "",
        destination: "",
        price: 0,
        coordinates: { lat: 0, lon: 0 },
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
          sender={InvoiceData.sender}
          recipient={InvoiceData.recipient}
          weight={InvoiceData.weight}
          destination={InvoiceData.destination}
          price={InvoiceData.price}
          trackingId={InvoiceData.trackingId}
        />
      )}
      <form className='mb-8 flex md:flex-row flex-col   items-center justify-center max-w-[100%]  gap-3 '>
        <input
          type='text'
          name='sender'
          value={eachParcel.sender}
          onChange={handleChange}
          placeholder='Sender'
          className='block w-full border border-gray-300 rounded-md py-2 px-3 mb-3'
          required
        />
        <input
          type='text'
          name='recipient'
          value={eachParcel.recipient}
          onChange={handleChange}
          placeholder='Recipient'
          className='block w-full border border-gray-300 rounded-md py-2 px-3 mb-3'
          required
        />
        <input
          type='text'
          name='weight'
          value={eachParcel.weight}
          onChange={handleChange}
          placeholder='Weight (kg)'
          className='block w-full border border-gray-300 rounded-md py-2 px-3 mb-3'
          required
        />
        <input
          type='text'
          name='destination'
          value={eachParcel.destination}
          onChange={handleChange}
          placeholder='Destination'
          className='block w-full border border-gray-300 rounded-md py-2 px-3 mb-3'
          required
        />
        <button
          onClick={() => {
            if (
              eachParcel.destination &&
              eachParcel.recipient &&
              eachParcel.weight
            ) {
              // Generate price for the eachParcel based on weight
              const newprice = parseFloat(eachParcel.weight) * 5; // Assuming price is $5 per kg
              const neweachParcel: eachParcel = {
                ...eachParcel,
                price: newprice,
              };
              seteachParcelsToShip((prevParcels) => [
                ...prevParcels,
                neweachParcel,
              ]);
            }
          }}
          type='button'
          className='bg-blue-500 text-xs w-full text-center text-white py-2 px-4 rounded-md hover:bg-blue-600 flex items-center gap-1'>
          Add eachParcel
        </button>
      </form>

      {/* eachParcel list available for shipping */}
      {eachParcelsToShip.length > 0 && (
        <div className='bg-slate-300 w-full p-3'>
          <h2 className='text-xl font-bold mb-4 text-green-600 uppercase'>
            each Parcels ready to ship (Pending eachParcels)
          </h2>
          <ul className='mb-4 flex flex-col items-cente justify-center'>
            {eachParcelsToShip.map((p, index) => (
              <li
                key={index}
                className=' hover:cursor-pointer flex-wrap hover:odd:bg-gray-500 hover:even:bg-slate-400 border-2 border-neutral-200-300 rounded-md py-2 px-3 mb-2 flex items-center justify-between'>
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
                  ref={BTNref}
                  title='Click to start shipping'
                  type='button'
                  onClick={(e) => {
                    handleSubmit(index);
                    e.preventDefault();
                  }}
                  className={`bg-green-500 text-center w-[10rem] uppercase font-bold  text-[10px] text-white py-2 px-4 rounded-md hover:bg-green-600 mt-2 flex items-center justify-center gap-2 ${
                    eachParcelsToShip[index].isShipped
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  }`}>
                  {p.isShipped ? "shipped" : " not shipped"}
                  {p.isLoading && <LoadingSpinner className='bg-' />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AddeachParcelForm;
