import React, { useState } from 'react';

import { HiMenu } from 'react-icons/hi';
import { CgClose } from 'react-icons/cg';
import { GiBus } from 'react-icons/gi';
import { Link } from 'react-router-dom';

const NavbarItem = ({ title, classProps, path }) => {
  return (
    <li className={`mx-4 cursor-pointer ${classProps}`}>
      <Link to={path}>{title}</Link>
    </li>
  );
};

const Nav = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <nav className='w-full flex justify-between items-center h-20 bg-transparent p-6 pt-6  sticky cursor-pointer'>
      <div className='w-max flex justify-center items-center '>
        <GiBus color='white' size={50} />

        <p className='text-4xl text-white font-extrabold '>TAIWAN BUS</p>
      </div>

      <ul className='mf:flex hidden flex-initial list-none justify-between items-center'>
        {['Home', 'Route', 'My Favorite'].map((item, index) => (
          <NavbarItem
            key={item + index}
            title={item}
            classProps='text-white text-3xl'
            path={item.trim().toLowerCase()}
          />
        ))}
      </ul>
      <div className='flex relative justify-end mf:hidden'>
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
                path={item.trim().toLowerCase()}
              />
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Nav;
