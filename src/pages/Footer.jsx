import React from 'react';
import { GiBus } from 'react-icons/gi';

const Footer = () => {
  return (
    <footer className='w-full flex h-fit justify-center items-center border-t-2 bg-[#333] sm:mt-0 text-white'>
      <GiBus size={30} />
      <p className='text-xl sm:text-sm font-semibold'>
        TAIWAN BUS&copy; Jerry Chien 2021, All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;
