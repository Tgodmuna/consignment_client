import React, { useState } from "react";

const SignInForm = () => {
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://chikaconsignment1-1.onrender.com/login", {
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
    <div className='mx-auto pt-16 rounded-xl shadow-md border md:max-w-full flex flex-col items-center justify-center RegisterBg'>
      <form
        className='md:w-1/2 w-full p-8 glass-container rounded-lg flex flex-col items-center justify-center bg-gray-100 border-2  input peer-cyan-500'
        onSubmit={handleSubmit}>
        <div className='mb-4 w-full'>
          <input
            type='text'
            name='emailOrPhone'
            value={formData.emailOrPhone}
            onChange={handleChange}
            className='w-full border-gray-300 rounded-md px-4 py-2 border input peer'
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
            className='w-full border-gray-300 rounded-md px-4 py-2 border input peer'
            placeholder='Password'
            required
          />
        </div>

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
