/* eslint-disable jsx-a11y/anchor-is-valid */

import { FaFacebook, FaInbox, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      id='section8'
      className='bg-gray-900 text-white py-8 relative top-[12rem]'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-wrap justify-between items-center'>
          <div className='w-full md:w-1/3 lg:w-auto mb-4 md:mb-0'>
            <h2 className='text-lg font-semibold'>Contact Us</h2>
            <ul className='mt-2 text-xs text-slate-100 uppercase'>
              <li>
                {" "}
                <span className='text-sm font-bold'>Email:</span>{" "}
                info@trustGold.com
              </li>
              <li>
                <span className='text-sm font-bold'>phone:</span> +447309652806
              </li>
              <li>
                <span className='text-sm font-bold'>address:</span> USA
              </li>
              <li>ISO 9001: 2015, ISO 27001: 2013 Certified Company</li>
              <li> CIN: L63090DL2011PLC221234</li>
            </ul>
          </div>
          <div className='w-full md:w-1/3 lg:w-auto mb-4 md:mb-0'>
            <ul className='mt-2 flex flex-col flex-wrap text-sm  text-slate-50 capitalize '>
              <li className='cursor-pointer'>
                <a href='/'>franchise</a>
              </li>
              <li className='cursor-pointer'>
                <a href='/'>policies</a>
              </li>
              <li className='cursor-pointer'>
                <a href='/'>get in touch</a>
              </li>
              <li className='cursor-pointer'>
                <a href='/solutions'>solutions</a>
              </li>
            </ul>
          </div>
          <div className='w-full md:w-1/3 lg:w-auto flex items-center gap-4'>
            <h2 className='text-lg font-semibold'>Follow Us:</h2>
            <FaTwitter />
            <FaFacebook />
            <FaInbox />
          </div>
        </div>
        <div className='mt-8 text-center text-sm'>
          <p>
            &copy; {new Date().getFullYear()} Logistics Company. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
