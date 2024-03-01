import { GrAppleAppStore } from "react-icons/gr";
import { BiLogoPlayStore } from "react-icons/bi";
import { ChangeEvent, useEffect, useState } from "react";
import { FcCancel } from "react-icons/fc";
import { FaBus, FaPlane } from "react-icons/fa";

const Shipment = () => {
  const [PhoneNum, setPhoneNum] = useState<string>("");
  const [TrackingOrderType, setTrackingOrderType] = useState<string | null>(
    null,
  );

  //logistics purpose/formType (default: tracking)
  const [isTrackingFormType, setisTrackingFormType] = useState(false);

  //shipping destination type
  const [IsLocalDestinations, setIsLocalDestinations] = useState(true);

  const [phoneNumError, setPhoneNumError] = useState<string | null>(null);
  const [trackingOrderTypeError, setTrackingOrderTypeError] = useState<
    string | null
  >(null);

  //tracking Data
  const [TrackData] = useState({
    trackOrderThru: TrackingOrderType,
    phoneNumber: PhoneNum,
  });

  //shippingData
  const [ShipData, setShipData] = useState({
    shippingType: {
      local_Shipping: {
        pickupPincode: "",
        deliveryPinCode: "",
      },
      internationational_Shipping: {
        pickupPincode: "",
        deliveryCountry: "",
      },
    },
  });

  const handleShippingData = (e: ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setShipData((prevData) => {
      // Splitting the name into parts based on underscores
      const [shippingType, propName] = name.split("_");

      return {
        ...prevData,
        shippingType: {
          ...prevData.shippingType,
          [shippingType]: {
            ...prevData.shippingType[shippingType],
            [propName]: value,
          },
        },
      };
    });
  };

  const handleOrderType = () => {
    const Orders =
      document.querySelectorAll<HTMLParagraphElement>(".orderType");
    Orders.forEach((p) => {
      p.addEventListener("click", (event: MouseEvent) => {
        const selectedOrder = event.target as HTMLParagraphElement;
        setTrackingOrderType(selectedOrder.innerText);
      });
    });
  };

  const handleisTrackingFormType = () => {
    setisTrackingFormType((prev) => !prev);
  };

  const handleIslocalDestinations = () => {
    setIsLocalDestinations((prev) => !prev);
  };

  useEffect(() => {
    handleOrderType();

    return () => {
      handleOrderType();
    };
  }, [TrackingOrderType]);

  const handleTrackOrderSubmit = () => {
    // Phone number validation regex pattern to match all valid phone number formats worldwide
    const phoneNumRegex =
      /^(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

    // Validate phone number
    if (!phoneNumRegex.test(PhoneNum)) {
      setPhoneNumError("Please enter a valid phone number");
      return;
    } else {
      setPhoneNumError(null);
    }

    // Validate tracking order type
    if (!TrackingOrderType) {
      setTrackingOrderTypeError("Please select a tracking order type");
      return;
    } else {
      setTrackingOrderTypeError(null);
    }

    const data = {
      ShipData,
      TrackData,
    };
    fetch("njknj", {
      method: "POST",
      body: JSON.stringify(data),
    });
    console.log("Form submitted successfully");
  };

  useEffect(() => {
    const disableBtn = () => {
      const btn: HTMLButtonElement | null =
        document.querySelector(".SubmitBTN");
      if (btn && (phoneNumError || trackingOrderTypeError)) {
        btn.disabled = true;
        btn.style.opacity = "0.3";
        btn.style.cursor = "not-allowed";
      } else if (btn) {
        btn.disabled = false;
        btn.style.opacity = "1";
      }
    };

    disableBtn(); // Call the function initially
  }, [phoneNumError, trackingOrderTypeError]);

  return (
    <form className='bg-gray-200 m-6 pb-3  p-2 max-w-fit rounded-xl md:mt-[5rem] md:w-[80%] '>
      {/* order type button */}
      <div className='flex justify-between items-center border border-cyan-500 p-3 m-2 md:max-w-[100%] '>
        <button
          onClick={() => {
            handleisTrackingFormType();
          }}
          type='button'
          className={` ${
            !isTrackingFormType ? "bg-black text-cyan-500 animate-pulse" : ""
          } SubmitBTN text-xs border hover:bg-slate-400 hover:text-white hover:border-0 border-green-600 p-2 rounded-lg hover:cursor-pointer  uppercase font-bold font-sans`}>
          track order
        </button>

        <button
          onClick={() => {
            handleisTrackingFormType();
          }}
          type='button'
          className={` ${
            isTrackingFormType ? "bg-black text-cyan-500 animate-pulse" : ""
          } text-xs border hover:bg-slate-400 hover:text-white hover:border-0 border-green-600 p-2 rounded-lg hover:cursor-pointer  uppercase font-bold font-sans`}>
          ship order
        </button>
      </div>

      {/* order form  */}
      <div className=''>
        {/* form heading */}
        {!isTrackingFormType ? (
          <h1 className='capitalize text-center text-xl text-nowrap font-bold text-neutral-900 m-0'>
            track your order through
          </h1>
        ) : (
          <h1 className=' text-center text-xl text-nowrap font-bold text-cyan-500 m-0 capitalize'>
            ship personal courier{" "}
          </h1>
        )}
        {trackingOrderTypeError && (
          <p className='text-red-500 text-xs'>{trackingOrderTypeError}</p>
        )}

        {/* form type second row */}
        {!isTrackingFormType ? (
          <div className=' orderType flex justify-between items-center p-1 border border-gray-400 rounded-xl m-2'>
            <p className='text-slate-400 hover:text-white hover:bg-black text-center capitalize border border-l-0 border-t-0 border-b-0 border-r-gray-500 w-fit m-auto p-1'>
              mobile
            </p>
            <p className='text-slate-400 hover:text-white hover:bg-black text-center uppercase border border-l-0 border-t-0 border-b-0 border-r-gray-500 w-fit m-auto p-1  '>
              awb
            </p>
            <p className='text-slate-400 hover:text-white hover:bg-black text-center capitalize border border-l-0 border-t-0 border-b-0 border-r-gray-500 w-fit m-auto p-1  '>
              order id
            </p>
            <p className='text-slate-400 hover:text-white hover:bg-black text-center uppercase  w-fit  '>
              lrn
            </p>
          </div>
        ) : (
          <div className='flex justify-between items-center border border-cyan-500 p-3 m-2 md:max-w-[100%] '>
            <button
              onClick={() => {
                handleIslocalDestinations();
              }}
              type='button'
              className={` ${
                IsLocalDestinations
                  ? "bg-black text-cyan-500 animate-pulse"
                  : ""
              } SubmitBTN flex items-center gap-2 text-xs border hover:bg-slate-400 hover:text-white hover:border-0 border-green-600 p-2 rounded-lg hover:cursor-pointer  uppercase font-bold font-sans`}>
              local <FaBus color='red' />
            </button>
            <button
              onClick={() => {
                handleIslocalDestinations();
              }}
              type='button'
              className={` ${
                !IsLocalDestinations
                  ? "bg-black text-cyan-500 animate-pulse"
                  : ""
              } text-xs border flex items-center gap-2 hover:bg-slate-400 hover:text-white hover:border-0 border-green-600 p-2 rounded-lg hover:cursor-pointer  uppercase font-bold font-sans`}>
              international <FaPlane color='red' />
            </button>
          </div>
        )}

        {/* shipping destination */}
        {isTrackingFormType ? (
          <div>
            {/* render base on order destination */}

            {/* local */}
            {IsLocalDestinations && (
              <>
                <input
                  className='placeholder:uppercase placeholder:text-cyan-500 border-[2px] border-cyan-500  bg-transparent text-center text-gray-50 p-2 rounded-lg w-[100%]'
                  placeholder='enter pick up pin code'
                  type='number'
                  name='localPinCode'
                  id='lpc'
                  onChange={(e) => {
                    handleShippingData(e);
                  }}
                  value={ShipData.shippingType.local_Shipping.pickupPincode}
                />

                <input
                  className='placeholder:uppercase placeholder:text-cyan-500 border-[2px] border-cyan-500 mt-2  bg-transparent text-center text-gray-50 p-2 rounded-lg w-[100%]'
                  placeholder='enter delivery  pin code'
                  type='number'
                  name='D-pincode'
                  id='D-PinCode'
                  onChange={(e) => {
                    setPhoneNum(e.target.value);
                  }}
                  value={PhoneNum}
                />
              </>
            )}
            {/* international */}
            {!IsLocalDestinations && (
              <>
                <input
                  className='placeholder:uppercase placeholder:text-cyan-500 border-[2px] border-cyan-500  bg-transparent text-center text-gray-50 p-2 rounded-lg w-[100%]'
                  placeholder='enter pick up pin code'
                  type='number'
                  name='countryPickUpPinCode'
                  id='cppc'
                  onChange={(e) => {
                    handleShippingData(e);
                  }}
                  value={PhoneNum}
                />

                <input
                  className='placeholder:uppercase placeholder:text-cyan-500 border-[2px] border-cyan-500 mt-2  bg-transparent text-center text-gray-50 p-2 rounded-lg w-[100%]'
                  placeholder='enter delivery country name'
                  type='number'
                  name='countryDeliveryName'
                  id='cdn'
                  onChange={(e) => {
                    handleShippingData(e);
                  }}
                  value={PhoneNum}
                />
              </>
            )}
          </div>
        ) : (
          <>
            <input
              className='placeholder:uppercase border-[2px] border-slate-400  bg-transparent text-center text-gray-50 p-2 rounded-lg w-[100%]'
              placeholder='enter your mobile number'
              type='tel'
              name='mobile Number'
              id='mob'
              onChange={(e) => {
                setPhoneNum(e.target.value);
              }}
              value={PhoneNum}
            />
            {phoneNumError ? (
              <p className='text-red-500 text-xs'>{phoneNumError}</p>
            ) : (
              ""
            )}
          </>
        )}

        {/* submit btn */}
        <button
          onClick={(e) => {
            handleTrackOrderSubmit();
            e.preventDefault();
          }}
          type='submit'
          className={` capitalize ${
            !IsLocalDestinations && "w-fit uppercase text-xs"
          } w-[10rem] m-auto flex items-center justify-center hover:opacity-20 p-1 my-4  rounded-lg bg-black text-white `}>
          {IsLocalDestinations ? "Get OTP" : "Get O.T.P and start shipment"}
          <FcCancel
            size={40}
            className={`animate-spin  ${
              phoneNumError || trackingOrderTypeError ? "inline" : "hidden"
            }`}
          />
        </button>
        <h1 className='text-center capitalize my-2 text-gray-400'>
          live tracking update & extra on our App
        </h1>
        <div className='flex justify-between items-center '>
          <div className='w-[7rem] rounded-lg border border-gray-400 p-1 hover:opacity-15 m-3 flex'>
            <BiLogoPlayStore size={60} />
            <p className='text-xs'>
              get it on <br />
              <span className='uppercase font-bold'>google store</span>
            </p>
          </div>
          <div className='max-w-[7rem] rounded-lg border border-gray-400 p-1 m-3 hover:opacity-15 flex'>
            <GrAppleAppStore size={60} />
            <p className='text-xs'>
              get it on <br />{" "}
              <span className='uppercase font-bold'>Apple store</span>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Shipment;
