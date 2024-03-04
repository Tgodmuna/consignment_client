import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import LoadingSpinner from "../utilities/Spinner";
import { useNavigate, useNavigation } from "react-router-dom";

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [Response, setResponse] = useState("");
  const [IsLoading, setIsLoading] = useState(false);

  useEffect(() => console.log(Response), [Response]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (BTNref.current) BTNref.current.disabled = true;
    axios
      .postForm("https://chikaconsignment1-1.onrender.com/register")
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        if (BTNref.current) BTNref.current.disabled = false;
      })
      .catch((err) => {
        if (BTNref.current) BTNref.current.disabled = false;
        console.log(err);
        setIsLoading(false);
      });
  };

  const BTNref = useRef<HTMLButtonElement>(null);
  const naviSignIn = useNavigate();
  return (
    <div className=' mx-auto pt-[6rem] rounded-xl shadow-md border md:max-w-[100%] flex flex-col items-center justify-center RegisterBg '>
      <form
        className=' glass-container md:w-[50%] p-3  w-full rounded-lg flex flex-col items-center justify-center bg-slate-100 py-4 pt-[3rem] px-2 border-[1px] border-cyan-500 '
        onSubmit={handleSubmit}>
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

        {/* button */}
        <div className='my-[1rem] pb-5'>
          <button
            ref={BTNref}
            type='submit'
            className={`bg-blue-500 ${
              IsLoading ? "cursor-not-allowed opacity-20" : "cursor-default"
            } text-white px-4 py-2 rounded-md hover:bg-blue-600 border  items-center flex w-fit gap-2`}>
            Submit
            <LoadingSpinner className={`${!IsLoading && "hidden"}`} />
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
