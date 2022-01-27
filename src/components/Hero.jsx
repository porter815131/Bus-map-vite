import React from 'react';
import bus from '../asset/bus-hero.jpg';
import { IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className='w-[100vw] h-[100vh] relative flex justify-center items-center '>
      <img
        className='w-full absolute -top-20 z-[-100] overflow-hidden bg-cover'
        src={bus}
        alt='Bus'
      ></img>

      <Link
        to='/route'
        className='text-3x text-white bg-red-600 w-40 h-20 flex justify-center items-center rounded-[10rem] hover:scale-[110%] transition'
      >
        <p className='font-semibold text-[1.3rem] p-2'>查詢公車動態</p>
        <IoIosArrowForward />
      </Link>
    </div>
  );
};

export default Hero;
