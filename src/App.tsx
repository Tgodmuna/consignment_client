/* eslint-disable react/jsx-pascal-case */
import { Route, Routes, useNavigate } from "react-router-dom";
import About from "./components/Section_2/About";
import { CallToAction } from "./components/Section_3/CallToAction";
import OurSevices from "./components/Section_3/OurSevices";
import FAQ from "./components/Section_4/FAQ";
import Index from "./components/Index";
import Tracking from "./components/Section_1/Tracking";
import ShippingForm from "./components/Auth/Registration";
import { DashBoard } from "./components/Dashboard/DashBoard";
import Profile from "./components/Dashboard/Profile";
import OrderList from "./components/Dashboard/OrderList";
import SignInForm from "./components/Auth/SignIn";
import AdminDashboard from "./components/Admin/AdminDashboard";
import Orders from "./components/Admin/Orders";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Clients from "./components/Admin/Users";
import LoadingSpinner from "./components/utilities/Spinner";

export type userDataType = {
  bioData: {
    fullName: string;
    email: string;
    userName: string;
    phoneNumber: string;
    address: string;
    DOB: string;
    permanentAddress: string;
  };
  parcels: [
    {
      parcelLocation: string;
      sender: string;
      receiver: string;
      trackingNumber: string;
      coordinates: {
        lat: number;
        lon: number;
      };
    },
  ];
  ID: number;
};

function App() {
  const [Users, setUsers] = useState<userDataType[] | undefined>([]);
  const [isLoading, setisLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setisAdmin] = useState(false);
  const [, seterrLoginMsg] = useState("");
  const navigate = useNavigate();
  // Determine if the current route is the dashboard
  // const isDashboard =
  //   location.pathname === "/dashboard" ||
  //   location.pathname === "/dashboard/profile" ||
  //   location.pathname === "/dashboard/OrderList" ||
  //   location.pathname === "/dashboard/settings" ||
  //   location.pathname === "/dashboard/dashboard" ||
  //   location.pathname === "/Admin" ||
  //   location.pathname === "/Admin/dashboard" ||
  //   location.pathname === "/Admin/orders" ||
  //   location.pathname === "/Admin/users";

  // get all user's data on mount
  useEffect(() => {
    setisLoading(true);
    axios.get("https://consignmentchika2.onrender.com/users").then((res) => {
      const data = res.data;
      setUsers(data);
      setisLoading(false);
    });
  }, []);

  //authenticate user
  useEffect(() => {
    const Usertoken = sessionStorage.getItem("login-token");
    const AdmiUserToken = sessionStorage.getItem("adminToken");

    if (Usertoken) {
      setIsLoggedIn(true);
    }


    if (AdmiUserToken) {
      setisAdmin(true);
      setIsLoggedIn(true);
    } else {
      seterrLoginMsg("not allowed authentication required");
    }

    // Set loading to false once authentication check is done
    setisLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("login-token");
    setIsLoggedIn(false);
    navigate("/signIn");
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className='App'>
      <Routes>
        {/* if user is authenticated */}
        {isLoggedIn ? (
          <>
            {/* dashboard */}
            <Route
              path='/dashboard'
              element={
                isLoggedIn ? (
                  <DashBoard handleLogout={handleLogout} />
                ) : (
                  <SignInForm />
                )
              }>
              <Route
                path='profile'
                element={
                  <Profile
                    fullName={undefined}
                    email={undefined}
                    userName={undefined}
                    phoneNumber={undefined}
                    address={undefined}
                    dateOfBirth={undefined}
                    permanentAddress={undefined}
                  />
                }
              />
              <Route path='OrderList' element={<OrderList />} />
            </Route>
          </>
        ) : (
          <>
            <Route path='/' element={<Index />} />
            <Route path='/about' element={<About />} />
            <Route path='/service' element={<OurSevices />} />
            <Route path='/tracking' element={<Tracking />} />
            <Route path='/partnerzs' element={<p />} />
            <Route path='/register' element={<ShippingForm />} />
            <Route path='/signIn' element={<SignInForm />} />
            <Route path='/cta' element={<CallToAction />} />
            <Route path='/faq' element={<FAQ />} />
          </>
        )}

        {/* if admin is authenticated */}
        {isAdmin && (
          <Route path='/Admin' element={<AdminDashboard />}>
            <Route path='dashboard' element={<AdminDashboard />} />
            <Route
              path='users'
              element={<Clients USERS={Users} isloadin={isLoading} />}
            />
            <Route path='orders' element={<Orders />} />
          </Route>
        )}
      </Routes>
    </div>
  );
}

export default App;
