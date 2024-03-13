import axios from "axios";
import React, { useRef, useState } from "react";
import LoadingSpinner from "../utilities/Spinner";
import { useNavigate,  } from "react-router-dom";

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [SuccessMsg, SetsuccessMsg] = useState("");
  const [errMSG, seterrMSG] = useState("");
  const [IsLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (BTNref.current) BTNref.current.disabled = true;
    axios
      .post(
        "https://consignmentchika2.onrender.com/Register",
        JSON.stringify(formData),
      )
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        if (res.data.status === 201) {
          SetsuccessMsg("Account created successfuilly");
          alert(
            "account created successfully,you can now login in using registered Email Addres",
          );
          Navigate("/signIn");
        } else if (res.data.status === 409) {
          seterrMSG(res.data.message);
        } else {
          SetsuccessMsg("Account created");
        }
        if (BTNref.current) BTNref.current.disabled = false;
      })
      .catch((err) => {
        if (BTNref.current) BTNref.current.disabled = false;
        console.log(err);
        seterrMSG(err.message);
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
              IsLoading ? "cursor-not-allowed opacity-20" : "cursor-default"
            } text-white px-4 py-2 rounded-md hover:bg-blue-600 border  items-center flex w-fit gap-2`}>
            Submit
            {IsLoading && <LoadingSpinner />}
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
