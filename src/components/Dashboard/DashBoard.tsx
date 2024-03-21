import { useState, useEffect } from "react";
import SideBar, { MobileSIdeBar } from "./SideBar";
import MainPage from "./MainPage";
import Nav from "./Nav";
import { Outlet, useLocation } from "react-router-dom";

type onLogin = {
  handleLogout: () => void;
};

export const DashBoard = ({ handleLogout }: onLogin) => {
  // Step 1: Create a state to manage the visibility of the welcome message
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);

  useEffect(() => {
    setShowWelcomeMessage(true);
    const timer = setTimeout(() => {
      setShowWelcomeMessage(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleCloseWelcomeMessage = () => {
    setShowWelcomeMessage(false);
  };

  let LOCATION = useLocation();
  const isUser =
    LOCATION.pathname === "/dashboard/settings" ||
    LOCATION.pathname === "/dashboard/OrderList" ||
    LOCATION.pathname === "/dashboard/profile";

  const getState = (v) => {
    return v;
  };

  return (
    <div className='flex md:flex-row flex-col  items overflow-scroll overflow-x-hidden bg-gray-400 md:h-screen'>
      <SideBar handleLogout={handleLogout} />
      <MobileSIdeBar handler={getState} />
      <div className='flex w-[100vw] max-w-[100vw] overflow-scroll overflow-x-hidden  bg-red-400 p-3 flex-col gap-[0.5rem] md:h-screen'>
        <Nav />
        {isUser ? <Outlet /> : <MainPage />}
      </div>
      {/* <LeftSideBar /> */}
      {/* Step 3: Style the welcome message popup */}
      {showWelcomeMessage && (
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white p-4 rounded-md shadow-md'>
            <h1 className='text-2xl font-bold mb-2'>Welcome to Dashboard!</h1>
            <p>This is your dashboard. You can start exploring now.</p>
            <button
              onClick={handleCloseWelcomeMessage}
              className='mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
