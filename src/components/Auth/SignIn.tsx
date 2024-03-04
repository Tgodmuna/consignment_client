import axios from "axios";
import { error } from "console";
import React, { useState } from "react";

const SignInForm = () => {
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });
  const [Message, setMessage] = useState("");
  const [IsRegistered, setIsRegistered] = useState(undefined);
  const [NetworkError, setNetworkError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    axios
      .post("https://chikaconsignment1-1.onrender.com/login", formData)
      .then((res) => {
        console.log(res);
        setMessage(res.data.message);
        setIsRegistered(res.data.success);
      })
      .catch((er) => setNetworkError(er.message));
    e.preventDefault();
  };

  return (
    <div className='mx-auto pt-16 rounded-xl shadow-md border md:max-w-full flex flex-col items-center justify-centery'>
      <form
        className='md:w-1/2 w-full p-8 rounded-lg flex flex-col items-center justify-center bg-gray-100 border-2 border-cyan-500'
        onSubmit={handleSubmit}>
        <div className='mb-4 w-full'>
          <input
            type='text'
            name='emailOrPhone'
            value={formData.emailOrPhone}
            onChange={handleChange}
            className='w-full border-gray-300 rounded-md px-4 py-2 border'
            placeholder='Email or Phone Number'
            required
          />
        </div>

        <div className='mb-4 w-full'>
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            className='w-full border-gray-300 rounded-md px-4 py-2 border'
            placeholder='Password'
            required
          />
        </div>

        <p
          className={`${
            Message === "No record" ? "block" : "hidden"
          } text-red-500`}>
          no user with {Message} found,try signin up
        </p>
        <p className={`${NetworkError ? "block text-red-500" : "hidden"}`}>
          {NetworkError}
        </p>

        <div className='mb-4 w-full'>
          <button
            type='submit'
            className='w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 border border-blue-500'>
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
