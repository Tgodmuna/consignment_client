import { GrAppleAppStore } from "react-icons/gr";
import { BiLogoPlayStore } from "react-icons/bi";
import { useEffect, useState } from "react";
import { FcCancel } from "react-icons/fc";

const Shipment = () => {
  const [PhoneNum, setPhoneNum] = useState<string>("");
  const [TrackingOrderType, setTrackingOrderType] = useState<string | null>(
    null,
  );
  const [phoneNumError, setPhoneNumError] = useState<string | null>(null);
  const [trackingOrderTypeError, setTrackingOrderTypeError] = useState<
    string | null
  >(null);

  const handleOtherType = () => {
    const Orders =
      document.querySelectorAll<HTMLParagraphElement>(".orderType");
    Orders.forEach((p) => {
      p.addEventListener("click", (event: MouseEvent) => {
        const selectedOrder = event.target as HTMLParagraphElement;
        setTrackingOrderType(selectedOrder.innerText);
      });
    });
  };

  useEffect(() => {
    handleOtherType();

    return () => {
      handleOtherType();
    };
  }, [TrackingOrderType]);

  const handleSubmit = () => {
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

    // If both validations pass, submit the form or perform further actions
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
      {/* order type */}
      <div className='flex justify-between items-center border border-cyan-500 p-3 m-2 md:max-w-[100%] '>
        <button
          type='button'
          className=' SubmitBTN text-xs border hover:bg-green-400 hover:text-white hover:border-0 border-green-600 p-2 rounded-lg hover:cursor-pointer  uppercase font-bold font-sans'>
          track order
        </button>
        <button
          type='button'
          className='text-xs border hover:bg-green-400 hover:text-white hover:border-0 border-green-600 p-2 rounded-lg hover:cursor-pointer  uppercase font-bold font-sans'>
          ship order
        </button>
      </div>

      {/* order forms */}
      <div className=''>
        <h1 className='capitalize text-center text-xl text-nowrap font-bold text-neutral-900 m-0'>
          track your order through
        </h1>
        {trackingOrderTypeError && (
          <p className='text-red-500 text-xs'>{trackingOrderTypeError}</p>
        )}

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

        <input
          className='placeholder:uppercase  bg-transparent text-center text-gray-50 p-3 rounded-lg w-[100%]'
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

        <button
          onClick={(e) => {
            handleSubmit();
            e.preventDefault();
          }}
          type='submit'
          className={`w-[10rem] flex items-center justify-center hover:opacity-20 p-3 my-4  rounded-lg bg-black text-white `}>
          Get OTP{" "}
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
