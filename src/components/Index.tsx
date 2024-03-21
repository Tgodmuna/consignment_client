import { Header } from "./Header/Header";
import HeroBanner from "./Section_1/HeroBanner";
import About from "./Section_2/About";
import { CallToAction } from "./Section_3/CallToAction";
import OurSevices from "./Section_3/OurSevices";
import GoldMaterialsShipped from "./Section_3/ServiceRendered";
import FAQ from "./Section_4/FAQ";
import Footer from "./Section_4/Footer";

const Index = () => {
  return (
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
  );
};

export default Index;
