import React, { useState } from 'react';
import { FaBusAlt } from 'react-icons/fa';
import { HiMenu } from 'react-icons/hi';
import { CgClose } from 'react-icons/cg';

const NavbarItem = ({ title, classProps }) => {
  return <li className={`mx-4 cursor-pointer ${classProps}`}>{title}</li>;
};

const Nav = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <nav className='w-full  flex justify-between items-center h-16 p-6 pt-6 bg-black sticky'>
      <div className='w-min flex justify-center items-center'>
        <FaBusAlt color='white' size={50} />
        <p className='text-3xl text-white'>TWBUS</p>
      </div>

      <ul className='mf:flex hidden flex-initial list-none justify-between items-center'>
        {['Home', 'Route', 'My Favorite'].map((item, index) => (
          <NavbarItem
            key={item + index}
            title={item}
            classProps='text-white text-3xl'
          />
        ))}
      </ul>
      <div className='flex relative justify-end'>
        {toggleMenu ? (
          <CgClose
            fontSize={28}
            className='cursor-pointer mf:hidden text-white'
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <HiMenu
            fontSize={36}
            className=' cursor-pointer mf:hidden text-white'
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <ul className='z-10 fixed top-0 -right-2 p-3 w-[100vw] h-screen shadow-2xl mf:hidden list-none flex flex-col justify-start items-center rounded-md blue-glassmorphism text-black animate-slide-in '>
            <li className='text-6xl w-full my-2'>
              <CgClose onClick={() => setToggleMenu(false)} />
            </li>
            {['Home', 'Route', 'My Favorite'].map((item, index) => (
              <NavbarItem
                key={item + index}
                title={item}
                classProps='text-6xl my-2 text-lg'
              />
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Nav;
