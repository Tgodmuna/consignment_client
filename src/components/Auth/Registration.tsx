import React, { useRef, useState, useEffect } from "react";
import LoadingSpinner from "../utilities/Spinner";
import { useNavigate } from "react-router-dom";

const ShippingForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    userName: "",
    phoneNumber: "",
    address: "",
    DateOfBirth: "",
    parmanenentAddress: "",
  });

  const Navigate = useNavigate();

  const [successMsg, setSuccessMsg] = useState("");
  const [errMSG, setErrMSG] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    const payload = JSON.stringify(formData);

    try {
      const response = await fetch(
        "https://consignmentchika2.onrender.com/Register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: payload,
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      setIsLoading(false);

      if (data.message === "New user registered successfully") {
        setSuccessMsg("Account created successfully");
        setShowNotification(true);

        // Automatically navigate to the sign-in page after 2 seconds
        setTimeout(() => {
          Navigate("/signIn");
        }, 2000);
      } else if (data.status === 409) {
        setErrMSG(data.message);
      } else {
        setSuccessMsg("Account created");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setErrMSG(`An error occurred while processing your request and ${error}`);
      setIsLoading(false);
    }
  };

  const BTNref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let timeout;
    if (showNotification) {
      timeout = setTimeout(() => {
        setShowNotification(false);
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [showNotification]);

  const naviSignIn = useNavigate();

  return (
    <div className=' mx-auto pt-[6rem] rounded-xl shadow-md border md:max-w-[100%] flex flex-col items-center justify-center RegisterBg '>
      <form
        className=' glass-container md:w-[50%] p-3  w-full rounded-lg flex flex-col items-center justify-center bg-slate-100 py-4 pt-[3rem] px-2 border-[1px] border-cyan-500 '
        onSubmit={handleSubmit}>
        {/* Success notification */}
        {showNotification && (
          <div className='bg-green-500 text-white px-4 py-2 rounded-md mt-2'>
            {successMsg}
          </div>
        )}

        <div className='mb-4 inputsContainer'>
          <input
            type='text'
            name='fullName'
            value={formData.fullName}
            onChange={handleChange}
            className=' input peer '
            required
          />
          <label className={`label ${formData.fullName ? "hidden" : ""}`}>
            Full Name
          </label>
        </div>

        <div className='mb-4 inputsContainer'>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            className=' input peer '
            required
          />
          <label className={`label ${formData.email ? "hidden" : ""}`}>
            Email
          </label>
        </div>

        <div className='mb-4 inputsContainer'>
          <input
            type='text'
            name='userName'
            value={formData.userName}
            onChange={handleChange}
            className=' input peer '
            required
          />
          <label className={`label ${formData.userName ? "hidden" : ""}`}>
            username
          </label>
        </div>

        <div className='mb-4 inputsContainer'>
          <input
            type='tel'
            name='phoneNumber'
            value={formData.phoneNumber}
            onChange={handleChange}
            className=' input peer '
            required
          />
          <label className={`label ${formData.phoneNumber ? "hidden" : ""}`}>
            Phone Number
          </label>
        </div>

        <div className='mb-4 inputsContainer'>
          <input
            name='address'
            value={formData.address}
            onChange={handleChange}
            className='w-full border-gray-300 rounded-md px-4 py-2 border peer input'
            required
          />
          <label className='label peer-focus:top-[-6rem]'>Address</label>
        </div>

        <div className='mb-4 inputsContainer'>
          <input
            type='date'
            name='DateOfBirth'
            value={formData.DateOfBirth}
            onChange={handleChange}
            className=' input peer '
            required
          />
          <label className={`label ${formData.DateOfBirth ? "hidden" : ""}`}>
            Date of birth
          </label>
        </div>

        <div className='mb-4 inputsContainer'>
          <input
            type='text'
            name='parmanenentAddress'
            value={formData.parmanenentAddress}
            onChange={handleChange}
            className=' input peer '
            required
          />
          <label
            className={`label ${formData.parmanenentAddress ? "hidden" : ""}`}>
            permanent address
          </label>
        </div>

        <p
          className={`${
            errMSG ? "block" : "hidden"
          } text-red-500 text-xs  text-center `}>
          {errMSG}
        </p>

        {/* button */}
        <div className='my-[1rem] pb-5'>
          <button
            ref={BTNref}
            type='submit'
            className={`bg-blue-500 cursor-pointer ${
              isLoading ? "cursor-not-allowed opacity-20" : "cursor-default"
            } text-white px-4 py-2 rounded-md hover:bg-blue-600 border  items-center flex w-fit gap-2`}>
            Submit
            {isLoading && <LoadingSpinner />}
          </button>
        </div>
        <div className='flex'>
          <p className='text-slate-100  capitalize '>Already has an account?</p>
          <span
            onClick={() => {
              naviSignIn("/signIn");
            }}
            className='text-yellow-500 capitalize hover:to-black hover:cursor-pointer '>
            sign in
          </span>
        </div>
      </form>
    </div>
  );
};

export default ShippingForm;
