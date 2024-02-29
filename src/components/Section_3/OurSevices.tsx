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

  const services = [
    {
      image: "/Assets/images/bike.jpg",
      description:
        "send shipment across UK and more for parcels across categories including heavy goods.Get value addes services like RTO reduction tools, door-step inspection and tracking ",
      link: "bnhbh",
      service: "express parcel service ",
      serviceName: "express parcel service ",
    },
    {
      image: "/Assets/images/warehouse.jpg",
      description:
        "we store inventory across highly optimised locations across the country to fulfill orders originating across both B2c and B2B channels of sale",
      link: "bnhbh",
      service: "warehousing ",
      serviceName: "warehousing",
    },
    {
      image: "/Assets/images/service-6.jpg",
      description:
        "get door2door, port2port express parcel and freight services from UK and over the world our strategic partners include FedEX and Aramex",
      link: "bnhbh",
      service: "cross border service ",
      serviceName: "cross border service ",
    },
    {
      image: "/Assets/images/airplane.webp",
      description:
        "Efficient and secure air freight service designed to deliver your goods quickly and safely to destinations worldwide.",
      link: "bnhbh",
      service: "Air",
      serviceName: "Air Freight",
    },
    {
      image: "/Assets/images/service-2.jpg",
      description:
        "Reliable and cost-effective sea freight service for transporting goods across oceans and continents.",
      link: "bnhbh",
      service: "Sea",
      serviceName: "Sea Freight",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      ListRefs.current.forEach((ListRef, index) => {
        if (ListRef) {
          const imgTop = ListRef.getBoundingClientRect().top;
          const isInView = imgTop < windowHeight * 0.65;
          const isOutview = imgTop > windowHeight * 0.45;
          if (isInView) {
            ListRef.classList.add("Animate");
          } else {
            ListRef.classList.remove("Animate");
          }

          if (isOutview) {
            ListRef.classList.add("Animate-out");
          } else {
            ListRef.classList.remove("Animate-out");
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
      className='flex flex-col justify-between my-[2rem] p-2 items-start Animate md:max-w-[30%] '>
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

  const serviceList = services.map((item, index) => {
    return (
      <div
        key={index}
        className='w-[20rem] bg-slate-200 rounded-md border p-4 mb-4 md:w-[30%] '>
        <img
          src={item.image}
          alt='Service Icon'
          className='w-full object-contain  mx-auto mb-4 md:w-auto'
        />
        <h2 className='text-xs font-semibold text-center mb-2 uppercase md:text-[13px] md: underline'>
          {item.serviceName}
        </h2>
        <p className='text-xs text-gray-600 capitalize text-wrap'>
          {item.description}
        </p>
      </div>
    );
  });

  return (
    <div className='bg-[rgb(16,18,24)] p-2 w-auto flex flex-col' id='section3'>
      <div className='flex flex-col w-fit m-auto'>
        <h1 className='capitalize w-[18rem] mx-1 font-semibold text-[18px] text-center text-slate-200'>
          Trust Gold Tools Set for every logistics
        </h1>
        <div className='w-[18rem] bg-red-900 p-[3px] rounded-xl border border-white m-auto mt-1'></div>
      </div>
      <ul className='flex flex-col flex-wrap md:flex-row md:justify-center items-center '>
        {ServiceToolset}
      </ul>

      <div className='flex flex-wrap w-auto md:items-center md:justify-between md:p-2'>
        {serviceList}
      </div>
    </div>
  );
};

export default OurSevices;
