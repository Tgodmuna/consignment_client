import ShippingForm from "../Auth/Registration";

export const CallToAction = () => {
  return (
    <div className='bg-black p-2 flex flex-col gap-y-5 items-center justify-center py-3'>
      <h1 className='text-white capitalize text-xs font-bold text-center '>
        experience safe , easy and relieable shipping in UK and around the world
      </h1>
      <p className='text-white text-center capitalize font-extralight'>
        sign-up now to start shipping with{" "}
        <span className='text-3xl text-lime-100 uppercase flashing-text'>
          TrustGold
        </span>
      </p>
      <ShippingForm />
    </div>
  );
};
