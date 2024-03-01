// import { Route, Routes } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header/Header";
import About from "./components/Section_2/About";
import { CallToAction } from "./components/Section_3/CallToAction";
import OurSevices from "./components/Section_3/OurSevices";
import FAQ from "./components/Section_4/FAQ";
import Footer from "./components/Section_4/Footer";
import Index from "./components/Index";
import Tracking from "./components/Section_1/Tracking";
import ShippingForm from "./components/Auth/Registration";

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/about' element={<About />} />
        <Route path='/service' element={<OurSevices />} />
        <Route path='/tracking' element={<Tracking />} />
        <Route path='/partners' element={<p />} />
        <Route path='/register' element={<ShippingForm />} />
        <Route path='/cta' element={<CallToAction />} />
        <Route path='/faq' element={<FAQ />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
