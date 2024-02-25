import { FaBars, FaTimes } from "react-icons/fa";
export const Header = () => {
  return (
    <header
      className={` bg-black text-cyan-600 max-w-[100vw] py-[1.5rem] px-2 h-[5rem] flex justify-between `}>
      {/* logo */}
      <a href='kbjbs' title='go to home page' className='logo'>
        <img
          src='/Assets/images/logo.png'
          alt='logo'
          className='w-[7rem] object-cover'
        />
      </a>

      {/* navbar activator */}
      <div className=' md:hidden border bordeer-cyan-700 w-fit p-1 '>
        <FaBars
          size={30}
          className='text-white hover:text-cyan-600 hover:cursor-pointer'
        />
        <FaTimes
          className='hidden hover:text-cyan-600 hover:cursor-pointer'
          size={30}
        />
      </div>
    </header>
  );
};
