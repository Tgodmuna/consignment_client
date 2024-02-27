import { useEffect, useRef } from "react";
import { FaArrowRight } from "react-icons/fa";

const OurSevices = () => {
  const ListRefs = useRef<(HTMLLIElement | null)[]>([null, null]);

  const Toolset = [
    {
      icon: "/Assets/icons/user.svg",
      text: "UK's only online courier solution for all your personal shipping needs. Send from your location to anywhere in the country and internationally with free doorstep pickup and real-time tracking through our app",
      link: "bnhbh",
      title: "personal courier",
    },
    {
      icon: "/Assets/icons/population.svg",
      text: "We provide an integrated logistics solution built on Express Parcel, Cross Border, Warehousing, Freight, and Software value-added services that help brands deliver faster and provide a superior experience",
      link: "bnhbh",
      title: "d2c brands",
    },
    {
      icon: "/Assets/icons/home.svg",
      text: "We provide customized solutions to serve your factory to retailer supply chain end-to-end using our integrated warehousing, technology capabilities, and logistics network that improve reliability and reduce cost",
      link: "bnhbh",
      title: "b2b enterprises",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      ListRefs.current.forEach((ListRef, index) => {
        if (ListRef) {
          const imgTop = ListRef.getBoundingClientRect().top;
          const isInView = imgTop < windowHeight * 0.70;
          if (isInView) {
            ListRef.classList.add("Animate");
          } else {
            ListRef.classList.remove("Animate");
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

const ServiceToolset = Toolset.map((item, index) => (
  <li
    key={index}
    ref={(element) => (ListRefs.current[index] = element)}
    className='flex flex-col justify-between my-[2rem] p-2 items-start Animate'>
    <img src={item.icon} alt='user icon' className='w-[4rem] object-cover' />
    <div className='flex flex-col gap-y-4 p-2'>
      <h1 className='capitalize text-white font-bold'>{item.title}</h1>
      <p className='text-xs whitespace-break-spaces text-slate-300'>
        {item.text}
      </p>
    </div>
    <a
      className='flex items-center gap-1 text-red-500 font-bold capitalize hover:text-white '
      href={`http://${item.link}`}
      target='_blank'
      rel='noopener noreferrer'>
      know more <FaArrowRight />
    </a>
  </li>
));


  return (
    <div className='bg-[rgb(16,18,24)] p-2 w-auto flex flex-col'>
      <div className='flex flex-col'>
        <h1 className='capitalize w-[18rem] mx-1 font-semibold text-[18px] text-center text-slate-200'>
          Trust Gold Tools Set for every logistics
        </h1>
        <div className='w-[18rem] bg-red-900 p-[3px] rounded-xl border border-white m-auto mt-1'></div>
      </div>
      <ul>{ServiceToolset}</ul>
      
    </div>
  );
};

export default OurSevices;
