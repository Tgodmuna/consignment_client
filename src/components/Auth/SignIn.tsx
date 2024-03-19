import axios from "axios";
import React, { useRef, useState } from "react";
import LoadingSpinner from "../utilities/Spinner";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
  });
  const [Message, setMessage] = useState("");
  const [NetworkError, setNetworkError] = useState("");
  const [IsLoading, setIsLoading] = useState(false);
  const BTNref = useRef<HTMLButtonElement>(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    setIsLoading(true);
    axios
      .post(
        "https://consignmentchika2.onrender.com/login",
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
      .then((res) => {
        setIsLoading(false);
        const token = res.data.token;
        const message = res.data.message;
        const status = res.status;
        setMessage(res.data.message);

        if (message === "Login successful" && status === 200) {
          sessionStorage.setItem("login token", token);
          localStorage.setItem("userID", res.data.user.ID);
          navigate("/dashboard");
        }
      })
      .catch((er) => {
        setIsLoading(false);
        setNetworkError(er.message);
      });

    e.preventDefault();
  };

  return (
    <div className='mx-auto pt-16 rounded-xl shadow-md border md:max-w-full flex flex-col items-center justify-centery'>
      <form
        className='md:w-1/2 w-full p-8 rounded-lg flex flex-col items-center justify-center bg-gray-100 border-2 border-cyan-500'
        onSubmit={handleSubmit}>
        <div className='mb-4 w-full'>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            className='w-full border-gray-300 rounded-md px-4 py-2 border'
            placeholder='Email'
            required
          />
        </div>

        <div className='mb-4 w-full'>
          <input
            type='phone'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            className='w-full border-gray-300 rounded-md px-4 py-2 border'
            placeholder='phone'
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

        {/* button */}
        <div className='my-[1rem] pb-5'>
          <button
            ref={BTNref}
            type='submit'
            className={`bg-blue-500 cursor-pointer ${
              IsLoading ? "cursor-not-allowed opacity-70" : "cursor-default"
            } text-white px-4 py-2 rounded-md hover:bg-blue-600 border  items-center flex w-fit gap-2`}>
            Submit
            {IsLoading && <LoadingSpinner className='bg-green-500' />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
