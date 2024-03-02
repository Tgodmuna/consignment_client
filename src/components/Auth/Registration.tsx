import React, { useEffect, useState } from "react";

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

  useEffect(() => console.log(Response), [Response]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://chikaconsignment1-1.onrender.com/register", {
      method: "POST",
      body: JSON.stringify(formData),
    }).then((res) => {
      res
        .json()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    });
  };

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
            type='submit'
            className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 border'>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingForm;
