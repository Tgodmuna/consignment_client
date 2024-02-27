import Typewriter from "../utilities/Typewriter";
import Shipment from "./Shipment";

const HeroBanner = () => {
  //typeWriter handler
  const WritesUp = (): JSX.Element => {
    return (
      <div className='mt-[4rem]'>
        <Typewriter
          className={
            " uppercase text-center underline text-2xl font-sans  font-bold transition-all duration-300 p-1  text-gray-300"
          }
          text='international logistics'
          delay={100}
        />
        <Typewriter
          className='text-gray-300 font-light font-serif w-full  text-xl text-center capitalize '
          text='We are the largest fully integrated
logistics '
          delay={100}
        />
        <Typewriter
          className='text-green-700  italic uppercase text-3xl font-extrabold text-center'
          text='services provider'
          delay={400}
        />
      </div>
    );
  };

  return (
    <section className={`banner  pb-2`}>
      <div className='slide1'>
        {WritesUp()}
        <ul className=' Service_type flex  flex-wrap text-neutral-500 mt-2 uppercase w-full'>
          <li>express parcel</li>
          <li>ptl</li>
          <li>ftl</li>
          <li>cross border</li>
          <li>supply-chain</li>
        </ul>
      </div>
      <Shipment />
    </section>
  );
};

export default HeroBanner;
