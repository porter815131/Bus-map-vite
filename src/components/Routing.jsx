import { Menu } from './';
import React, { useEffect } from 'react';
import { Map, RoutingList } from './';

import { getJSON } from '../store/getJson';
import { BUS_API_URL } from '../store/config';

const Routing = () => {
  useEffect(() => {
    const fetchData = async city => {
      try {
        const res = await getJSON(`${BUS_API_URL}/NewTaipei`);

        console.log(res);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <section className='flex w-full flex-col justify-center items-center p-2 mt-10'>
      <header className='w-[80vw] flex justify-center items-center flex-col shadow-md'>
        <h1 className='flex p-2 text-2xl justify-center items-center'>
          搜尋公車
        </h1>
        <div>
          <Menu />
          <input
            type='text'
            className='border-none rounded-md bg-slate-400 m-2 p-2 w-[15rem]'
          />
        </div>
      </header>
      <div className='flex w-[70vw] justify-center items-center'>
        <p className='text-3xl my-10'>路線名稱</p>
      </div>
      <div className='w-[70vw] flex justify-center items-center relative'>
        <Map />
        <RoutingList />
      </div>
    </section>
  );
};

export default Routing;
