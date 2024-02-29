// import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header/Header";
import HeroBanner from "./components/Section_1/HeroBanner";
import About from "./components/Section_2/About";
import { CallToAction } from "./components/Section_3/CallToAction";
import OurSevices from "./components/Section_3/OurSevices";
import GoldMaterialsShipped from "./components/Section_3/ServiceRendered";
import FAQ from "./components/Section_4/FAQ";
import Footer from "./components/Section_4/Footer";

function App() {
  return (
    <>
      <div className='App'>
        <Header />
        <HeroBanner />
        <About />
        <OurSevices />
        <GoldMaterialsShipped />
        <CallToAction />
        <FAQ />
        <Footer />
      </div>
      {/* <Routes>
        <Route path='/register'  element={<ShippingForm />} />
      </Routes> */}
    </>
  );
}

export default App;
