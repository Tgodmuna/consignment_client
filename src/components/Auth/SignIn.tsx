import axios from "axios";
import React, { useRef, useState } from "react";
import LoadingSpinner from "../utilities/Spinner";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [Message, setMessage] = useState("");
  const [NetworkError, setNetworkError] = useState("");
  const [IsLoading, setIsLoading] = useState(false);
  const [isAdmin, setisAdmin] = useState(false);
  const [isShipper, setisShipper] = useState(true);
  const BTNref = useRef<HTMLButtonElement>(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const navigate = useNavigate();
  const isAdminLogin = () => {
    setisAdmin(true);
    setisShipper(false);
  };
  const isShipperLogin = () => {
    setisShipper(true);
    setisAdmin(false);
  };

  const handleSubmit = (e) => {
    setIsLoading(true);
    const shipperLogins = {
      email: formData.email,
      password: formData.password,
    };
    const userLogins = {
      email: formData.email,
      password: formData.password,
    };
    axios
      .post(
        `https://consignmentchika2.onrender.com/${isAdmin ? "admin/login" : "login"
        }`,
        isAdmin ? JSON.stringify(shipperLogins)  : JSON.stringify(userLogins),
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
        setMessage(res.data.message);

        if (message === "Login successful" && res.status === 200) {
          sessionStorage.setItem("login-token", token);
          sessionStorage.setItem("userID", res.data.user.ID);
          navigate("/dashboard");
        } else if (
          res.data.admin.username === "Eric Purucker" &&
          res.status === 200
        ) {
          sessionStorage.setItem("adminToken", res.data.admin._id);
          navigate("/Admin");
        }
      })
      .catch((er) => {
        setIsLoading(false);
        setNetworkError(er.message);
      });

    e.preventDefault();
  };

  return (
    <form
      className={`form- max-w-[30rem] max-h-[20%] m-auto w-full mt-[2rem] p-8 rounded-lg flex flex-col items-center justify-center gap-[2rem] bg-gray-100 ${
        isAdmin && "bg-gray-900 text-white"
      } border-2 border-cyan-500`}
      onSubmit={handleSubmit}>
      {/* switch */}
      <div className='w-[15rem]  relative p-2 flex rounded border bg-green-400 justify-between items-center'>
        <button
          onClick={isShipperLogin}
          className={` ${
            isShipper
              ? "bg-black transition-all duration-500 text-white animate-pulse"
              : ""
          } w-[5rem] p-2 rounded-full border-slate-500 uppercase bg-slate-50 text-neutral-900 text-xs`}>
          Shipper
        </button>

        <button
          onClick={isAdminLogin}
          className={`w-[5rem] ${
            isAdmin
              ? "bg-black  transition-all duration-500  text-white animate-pulse"
              : ""
          } p-2 rounded-full border-slate-500 bg-slate-50 uppercase text-neutral-900 text-xs`}>
          admin
        </button>
      </div>
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
          type='password'
          name='password'
          className='w-full border-gray-300 rounded-md px-4 py-2 border'
          placeholder='password'
          required
        />
      </div>

      {isAdmin && (
        <div className='mb-4 w-full text-black'>
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            className='w-full border-gray-300 rounded-md px-4 py-2 border'
            placeholder='password'
            required
          />
        </div>
      )}

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
  );
};

export default SignInForm;
