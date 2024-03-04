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
import Setting from "./components/Dashboard/Setting";

function App() {
  const location = useLocation();

  // Determine if the current route is the dashboard
  const isDashboard =
    location.pathname === "/dashboard" ||
    "/dashboard/profile" ||
    "/dashboard/trackShips" ||
    "/dashboard/settings" ||
    "/dashboard/dashboard";

  // Conditionally render header and footer
  const renderHeader = () => {
    if (isDashboard) {
      return null;
    }
    console.log("loging header");
    return (
      <>
        <Header />
      </>
    );
  };

  const renderFooter = () => {
    if (isDashboard) {
      return null;
    }
    console.log("loging footer");
    return (
      <>
        <Footer />
      </>
    );
  };

  return (
    <div className='App'>
      {renderHeader()}
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/about' element={<About />} />
        <Route path='/service' element={<OurSevices />} />
        <Route path='/tracking' element={<Tracking />} />
        <Route path='/partners' element={<p />} />
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
          <Route path='trackShips' element={<p />} />
          <Route path='shipment' element={<OrderList />} />
          <Route path='settings' element={<Setting />} />
        </Route>
      </Routes>
      {renderFooter()}
    </div>
  );
}

export default App;
