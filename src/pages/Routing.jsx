import { Menu, SearchRoutes } from '../components/';
import React, { useCallback, useEffect, useState } from 'react';
import { Map, RoutingList } from '../components/';
import { fetchData } from '../api/fetchData';
import bus from '../asset/bus-hero.jpg';

import { STOP_ETOA_URL, STOP_API_URL, CITY_ROUTES_URL } from '../store/config';

/*     City data format
 *     CityID: 'initial',
 *     CityCode: 'none',
 *     CityName: '--- 請選擇 ---',
 *     City: 'none',
 *     CountyID: 'initial',
 *     Version: '21.08.1',
 */

const Routing = ({ setIsLoading }) => {
  const [routeName, setRouteName] = useState('');
  const [routeValue, setRouteValue] = useState('');

  const [isSelect, setIsSelect] = useState(false); /* 是否有選城市 */
  const [selectedCity, setSelectedCity] = useState('');
  const [toggleRound, setToggleRound] = useState(true);
  const [forthTrip, setForthTrip] = useState([]);
  const [backTrip, setBackTrip] = useState([]);
  const [busData, setBusData] = useState({
    routes: [],
    stops: [],
    estimateTime: [],
  });

  /* 選擇城市 */
  const city = selectedCity.City;
  /* 過濾已選城市的全部站點資料 */
  const stopsFilter = busData?.stops?.filter(
    stop => stop.RouteUID === routeName
  );
  /* 過濾已選城市的全部站點時間預估 */
  const estimateFilter = busData?.estimateTime?.filter(
    time => time.RouteUID === routeName
  );

  // const getData = useCallback(city => {
  //   Promise.all([
  //     fetchData(`${CITY_ROUTES_URL}${city}`),
  //     fetchData(`${STOP_API_URL}${city}`),
  //     fetchData(`${STOP_ETOA_URL}${city}`),
  //   ])
  //     .then(results => {
  //       setBusData({
  //         routes: results[0],
  //         stops: results[1],
  //         estimateTime: results[2],
  //       });
  //       setIsLoading(false);
  //     })
  //     .catch(err => console.error(err));
  // }, []);

  /* 接 api 並整合資料 */
  useEffect(() => {
    if (city === 'none') return;
    setIsLoading(true);
    const getData = city => {
      Promise.all([
        fetchData(`${CITY_ROUTES_URL}${city}`),
        fetchData(`${STOP_API_URL}${city}`),
        fetchData(`${STOP_ETOA_URL}${city}`),
      ])
        .then(results => {
          setBusData({
            routes: results[0],
            stops: results[1],
            estimateTime: results[2],
          });
          setIsLoading(false);
        })
        .catch(err => console.error(err));
    };
    getData(city);
    const interval = setInterval(() => {
      getData(city);
    }, 30000);
    return () => clearInterval(interval);
  }, [city]);

  useEffect(() => {
    if (stopsFilter && estimateFilter) {
      setIsLoading(true);
      const forthStops = stopsFilter.filter(trip => !trip.Direction);
      const backStops = stopsFilter.filter(trip => trip.Direction);

      /* 把去程資料調整成我的格式 */
      const forthFilter = forthStops[0]?.Stops.map((item, i) => {
        return {
          stopUID: item.StopUID,
          stopName: item.StopName.Zh_tw,
          position: item.StopPosition,
          stopSequence: item.StopSequence,
        };
      });
      setForthTrip(forthFilter);
      /* 把回程資料調整成我的格式 */
      const backFilter = backStops[0]?.Stops.map((item, i) => {
        return {
          stopUID: item.StopUID,
          stopName: item.StopName.Zh_tw,
          position: item.StopPosition,
          stopSequence: item.StopSequence,
        };
      });

      setBackTrip(backFilter);
      setIsLoading(false);
    }
  }, [routeName, busData]);

  return (
    <section className='flex w-full flex-col justify-center items-center p-2 mt-2 '>
      <img
        src={bus}
        alt='Bus'
        className='w-full absolute top-0 z-[-100] overflow-hidden bg-cover'
      />

      <header className='w-[80vw] flex justify-center items-center flex-col shadow-lg rounded-2xl bg-white '>
        <h1 className='flex p-2 text-2xl justify-center items-center font-extrabold tracking-[2rem]'>
          搜尋公車
        </h1>
        <div className='flex justify-center items-center my-5 w-[80vw]'>
          <Menu
            setSelectedCity={setSelectedCity}
            setIsSelect={setIsSelect}
            setRoutes={setBusData}
          />
          <SearchRoutes
            routes={busData}
            setRouteName={setRouteName}
            setRouteValue={setRouteValue}
            isSelect={isSelect}
          />
        </div>
      </header>
      <div className='flex w-max justify-center items-center bg-white p-3 m-3 my-10 rounded-[1rem]'>
        <div className='text-3xl font-medium p-3'>
          {routeValue ? (
            <p className='w-fit felx'>
              <span className='text-[#bb3d3d] text-center mr-2 w-fit'>
                {routeValue.split(' ', 1)}
              </span>
              <span className='text-[#ccc]'>|</span>
              <span className='ml-2 text-center w-fit'>
                {routeValue.split(' ').slice(1).join(' ')}
              </span>
            </p>
          ) : (
            '路線名稱'
          )}
        </div>
      </div>
      <div className='w-[80vw] flex justify-center items-center relative'>
        <Map
          forthTrip={forthTrip}
          backTrip={backTrip}
          routeName={routeName}
          city={city}
          toggleRound={toggleRound}
        />
        <div className='w-[50%] h-[60vh] ml-10 flex flex-col justify-center items-center shadow-lg bg-white rounded-lg'>
          <div className='flex w-full justify-around border-b p-3 divide-x-2 '>
            <button
              className='hover:border-b-2 flex-1 border-blue-700 text-xl w-full '
              onClick={() => setToggleRound(true)}
            >
              {routeValue ? `往 ${routeValue.split('-')[1]}` : '去程'}
            </button>
            <button
              className='hover:border-b-2 flex-1 border-blue-700 text-xl w-full '
              onClick={() => setToggleRound(false)}
            >
              {routeValue
                ? `往 ${routeValue.split('-')[0].split(' ', 2)[1]}`
                : '返程'}
            </button>
          </div>
          <ol className='flex w-full h-[91%] flex-col overflow-scroll'>
            <li className='flex w-full justify-center divide-x p-2 border-2'>
              <p className='font-medium flex-[0.2] text-center'>站序</p>
              <p className='font-medium flex-[0.45] text-center'>站名</p>
              <p className='font-medium flex-[0.35] text-center'>預估到站</p>
            </li>
            {city !== 'none' &&
              (toggleRound ? forthTrip : backTrip)?.map(stop => (
                <RoutingList
                  key={stop.stopUID}
                  id={stop.stopUID}
                  stopName={stop.stopName}
                  stopSequence={stop.stopSequence}
                  estimateFilter={estimateFilter}
                  toggleRound={toggleRound}
                />
              ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Routing;
