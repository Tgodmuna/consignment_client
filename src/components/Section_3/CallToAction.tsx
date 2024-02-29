import { useNavigate } from "react-router-dom";

export const CallToAction = () => {
  const navigate = useNavigate();
  return (
    <div
      id='section6'
      className='bg-black p-2 flex flex-col gap-y-5 items-center justify-center py-3'>
      <h1 className='text-white capitalize text-xs font-bold text-center md:text-xl md:w-full'>
        experience safe , easy and relieable shipping in UK and around the world
      </h1>
      <p className='text-white text-center capitalize font-extralight md:text-pretty'>
        sign-up now to start shipping with{" "}
        <span className='text-3xl text-lime-100 uppercase flashing-text'>
          TrustGold
        </span>
      </p>

      <div className='flex   '>
        <button
          type='button'
          onClick={() => navigate("register")}
          className='rounded-lg text-center p-2 capitalize text-black bg-white hover:text-white hover:bg-green-300 '>
          start shipment
        </button>
      </div>
    </div>
  );
};
