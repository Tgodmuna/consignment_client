import React, { useState } from "react";

interface Parcel {
  sender: string;
  recipient: string;
  weight: string;
  destination: string;
  price: number;
}

const AddParcelForm = () => {
  const [parcel, setParcel] = useState<Parcel>({
    sender: "",
    recipient: "",
    weight: "",
    destination: "",
    price: 0,
  });
  const [parcelsToShip, setParcelsToShip] = useState<Parcel[]>([]);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParcel((prevParcel) => ({
      ...prevParcel,
      [name]: value,
    }));
  };

  const handleSubmit = (i: number | undefined) => {
    if (parcel && i) {
      console.log("parcel container", parcelsToShip);
      //send the selected parcle to server
      fetch("https://chikaconsignment1-1.onrender.com/parcels", {
        method: "POST",
        body: JSON.stringify(parcelsToShip[i]),
      })
        .then((res) =>
          console.log(
            "response body",
            res.json().then((res) => res.body),
          ),
        )
        .catch((err) => console.log("erro", err));
      setParcel({
        sender: "",
        recipient: "",
        weight: "",
        destination: "",
        price: 0,
      });
    }
  };

  return (
    <div className='mx-auto flex flex-col items-center  w-full m-auto'>
      <h2 className='text-2xl font-bold mb-4'>Add Parcel</h2>
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
            if (
              parcel.destination &&
              parcel.price &&
              parcel.recipient &&
              parcel.weight
            ) {
              // Generate price for the parcel based on weight (for demonstration, a simple calculation is used)
              const price = parseFloat(parcel.weight) * 5; // Assuming price is $5 per kg
              const newParcel: Parcel = {
                ...parcel,
                price,
              };
              setParcelsToShip((prevParcels) => [...prevParcels, newParcel]);
            }
          }}
          type='button'
          className='bg-blue-500 text-xs w-full  text-white py-2 px-4 rounded-md hover:bg-blue-600'>
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
                  {/* Display price with 2 decimal places */}
                </p>{" "}
                <button
                  type='button'
                  onClick={(e) => {
                    handleSubmit(index);
                    e.preventDefault();
                  }}
                  className='bg-green-500 w-fit text-xs text-white py-2 px-4 rounded-md hover:bg-green-600 mt-2'>
                  Ship
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
