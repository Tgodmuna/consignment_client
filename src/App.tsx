/* eslint-disable react/jsx-pascal-case */
import { Route, Routes, useLocation } from "react-router-dom";
import { Header } from "./components/Header/Header";
import About from "./components/Section_2/About";
import { CallToAction } from "./components/Section_3/CallToAction";
import OurSevices from "./components/Section_3/OurSevices";
import FAQ from "./components/Section_4/FAQ";
import Footer from "./components/Section_4/Footer";
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
  const location = useLocation();
  const [Users, setUsers] = useState<userDataType[] | undefined>([]);
  const [isLoading, setisLoading] = useState(false);

  // Determine if the current route is the dashboard
  const isDashboard =
    location.pathname === "/dashboard" ||
    location.pathname === "/dashboard/profile" ||
    location.pathname === "/dashboard/OrderList" ||
    location.pathname === "/dashboard/settings" ||
    location.pathname === "/dashboard/dashboard" ||
    location.pathname === "/Admin" ||
    location.pathname === "/Admin/dashboard" ||
    location.pathname === "/Admin/orders" ||
    location.pathname === "/Admin/users";

  // Conditionally render header
  const renderHeader = () => {
    if (isDashboard) {
      return null;
    }
    return (
      <>
        <Header />
      </>
    );
  };
  // Conditionally render footer
  const renderFooter = () => {
    if (isDashboard) {
      return null;
    }
    return (
      <>
        <Footer />
      </>
    );
  };

  // get all user's data on mount
  useEffect(() => {
    setisLoading(true);
    axios.get("https://consignmentchika2.onrender.com/users").then((res) => {
      const data = res.data;
      console.log("users from App.js", data);
      setUsers(data);
      setisLoading(false);
    });
  }, []);

  return (
    <div className='App'>
      {renderHeader()}
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/about' element={<About />} />
        <Route path='/service' element={<OurSevices />} />
        <Route path='/tracking' element={<Tracking />} />
        <Route path='/partnerzs' element={<p />} />
        <Route path='/register' element={<ShippingForm />} />
        <Route path='/signIn' element={<SignInForm />} />
        <Route path='/cta' element={<CallToAction />} />
        <Route path='/faq' element={<FAQ />} />

        {/* dashboard */}
        <Route path='/dashboard' element={<DashBoard />}>
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

        {/* admin dashboard */}
        <Route path='/Admin' element={<AdminDashboard />}>
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route
            path='users'
            element={<Clients USERS={Users} isloadin={isLoading} />}
          />
          <Route path='orders' element={<Orders />} />
        </Route>
      </Routes>
      {renderFooter()}
    </div>
  );
}

export default App;
