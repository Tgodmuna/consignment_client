import { useEffect, useRef, useState } from "react";
import Typewriter from "../utilities/Typewriter";

const About = () => {
  const aboutImageRefs = useRef<
    [HTMLImageElement | null, HTMLImageElement | null]
  >([null, null]);
  const scrollTextRefs = useRef<
    [HTMLParagraphElement | null, HTMLParagraphElement | null]
  >([null, null]);

  const TypeWriterText = () => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const texts = [
      "are you looking for flexibility?",
      "are you looking for reliability?",
      "are you looking to ease on scale?",
      "now, these are (5) reasons why you have to trust us",
    ];

    useEffect(() => {
      const timer = setTimeout(() => {
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
      }, 3000); // Adjust the delay as needed

      return () => clearTimeout(timer);
    }, [currentTextIndex, texts]);

    return (
      <Typewriter
        text={texts[currentTextIndex]}
        className=' fade-in animate-pulse text-3xl text-neutral-400 w-fit text-wrap capitalize m-2'
        delay={50}
      />
    );
  };

  const reasons = [
    {
      icon: "/Assets/icons/user.svg",
      text: "Over 2.1 billion parcels have been shipped worldwide since our inception.",
      title: "2.1 bn+",
    },
    {
      icon: "/Assets/icons/population.svg",
      text: "We have achieved coverage in the UK and USA, reaching 99.5% of the population.",
      title: "99.5%",
    },
    {
      icon: "/Assets/icons/biz.svg",
      text: "We proudly serve more than 3.4 million businesses globally, providing tailored logistics solutions.",
      title: "3.4 mn+",
    },
    {
      icon: "/Assets/icons/delivery.svg",
      text: "Our global operations have shipped over 2.1 billion tonnes of freight, ensuring timely delivery across continents.",
      title: "2.1 bn+",
    },
    {
      icon: "/Assets/icons/home.svg",
      text: "Our extensive logistics infrastructure spans over 2.1 billion square feet, facilitating seamless movement of goods.",
      title: "2.1 bn+",
    },
  ];

  const reasonsCard = reasons.map((item, index): JSX.Element => {
    return (
      <li
        key={index}
        className=' shadow-red-300 shadow-sm max-w-full max-h-fit rounded-lg border border-gray-400 border-l-red-500 border-l-8 bg-slate-100 my-2 p-2 flex gap-x-1 md:max-w-[30%] md:transform md:hover:scale-95 '>
        <img src={item.icon} alt='icon' className='object-contain' />
        <div className='flex flex-col gap-y-1 md:p-0 md:m-0 md:overflow-hidden'>
          <p className='self-end text-neutral-900 text-lg font-bold'>
            {item.title}
          </p>
          <p className='text-xs w-fit h-fit text-gray-400 capitalize md:text-[12px]'>
            {item.text}
          </p>
        </div>
      </li>
    );
  });

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      aboutImageRefs.current.forEach((aboutImageRef, index) => {
        if (aboutImageRef) {
          const imgTop = aboutImageRef.getBoundingClientRect().top;
          const txtTop =
            scrollTextRefs.current[index]?.getBoundingClientRect().top;
          const isInView =
            imgTop < windowHeight * 0.75 &&
            txtTop &&
            txtTop < windowHeight * 0.75;
          if (isInView) {
            aboutImageRef.classList.add("animate");
            scrollTextRefs.current[index]?.classList.add("animate");
          } else {
            aboutImageRef.classList.remove("animate");
            scrollTextRefs.current[index]?.classList.remove("animate");
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className='service max-w-[100vw] overflow-x-hidden h-auto pb-4 '
      id='section2'>
      {TypeWriterText()}
      <ul className='p-2 md:flex gap-1'>{reasonsCard}</ul>

      <div className='container m-2 pb-4 flex flex-col '>
        <div>
          {" "}
          <h1 className='text-neutral-600 text-center text-3xl uppercase m-2'>
            <span className='font-bold text-red-400 shadow-xl shadow-cyan-100 bg-transparent p'>
              know
            </span>
            <span className='font-bold mx-1 text-cyan-400 shadow-xl shadow-cyan-100 bg-transparent p'>
              our
            </span>{" "}
            <span className='  font-light text-red-400 shadow-lg shadow-cyan-100 bg-transparent p'>
              history
            </span>
          </h1>
        </div>

        <div className='flex flex-col md:flex-row '>
          <p
            ref={(el) => (scrollTextRefs.current[0] = el)}
            className=' scroll_text md:w-full text-wrap  text-justify p-2 text-neutral-700 first-letter:font-sans first-letter:font-bold first-letter:text-lg text-xs text-clip  whitespace-break-spaces'>
            At TrustGold Logistics, we pride ourselves on being a comprehensive
            solution for all your logistics needs. Our extensive range of
            services encompasses logistics, warehousing, air freight, sea
            freight, rail freight, ocean freight, and cargo insurance. With a
            commitment to excellence and reliability, we have become a trusted
            partner for businesses worldwide. Our journey began in the UK, and
            since then, we have grown exponentially, expanding our operations to
            the United States and establishing numerous branches across Europe
            and Asia.
            <img
              className='about_Image object-contain max-w-[100%]'
              src='/Assets/images/ManOnBus.jpg'
              alt='delivery man'
              ref={(el) => (aboutImageRefs.current[0] = el)}
            />
          </p>

          <p
            ref={(el) => (scrollTextRefs.current[1] = el)}
            className=' scroll_text text-wrap  text-justify p-2 text-neutral-700 first-letter:font-sans first-letter:font-bold first-letter:text-lg text-xs text-clip  whitespace-break-spaces'>
            This strategic expansion has allowed us to effectively serve our
            clients in key global markets, ensuring seamless and efficient
            delivery services. What sets FirstInland Logistics apart is our
            dedication to meeting and exceeding the expectations of our clients.
            We understand the complexities of the global supply chain and tailor
            our services to address the unique requirements of each client.
            Whether it's transporting goods via air, sea, rail, or ocean, we
            have the expertise and infrastructure to handle it with precision..
            <img
              ref={(el) => (aboutImageRefs.current[1] = el)}
              className='object-contain max-w-[100%] about_Image'
              src='/Assets/images/full-shot-man-delivering-box.jpg '
              alt='delivery man'
            />
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
