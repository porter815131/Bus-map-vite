import { Menu } from './';
import React, { useEffect, useState } from 'react';
import { Map, RoutingList } from './';

import { getJSON } from '../store/getJson';
import { BUS_API_URL } from '../store/config';
import SearchRoutes from './SearchRoutes';
import RoutesMenu from './RoutesMenu';

/*     City data format
 *     CityID: 'initial',
 *     CityCode: 'none',
 *     CityName: '--- 請選擇 ---',
 *     City: 'none',
 *     CountyID: 'initial',
 *     Version: '21.08.1',
 */

const Routing = () => {
  const [routes, setRoutes] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  const city = selectedCity.City;
  console.log(routes);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getJSON(`${BUS_API_URL}/${city}`);
        setRoutes(res);

        console.log(res);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData(city);
  }, [city]);

  return (
    <section className='flex w-full flex-col justify-center items-center p-2 mt-10'>
      <header className='w-[80vw] flex justify-center items-center flex-col shadow-md'>
        <h1 className='flex p-2 text-2xl justify-center items-center'>
          搜尋公車
        </h1>
        <div className='flex justify-center items-center my-5 w-[70vw]'>
          <Menu setSelectedCity={setSelectedCity} />
          {/* <SearchRoutes selectedCity={selectedCity} /> */}
          <RoutesMenu routes={routes} city={city} setRoutes={setRoutes} />
        </div>
      </header>
      <div className='flex w-[70vw] justify-center items-center'>
        <p className='text-3xl my-10'>路線名稱</p>
      </div>
      <div className='w-[70vw] flex justify-center items-center relative'>
        <Map />
        <ul className='w-[50%] flex flex-col mx-10 items-center'>
          <RoutingList />
        </ul>
      </div>
    </section>
  );
};

export default Routing;
