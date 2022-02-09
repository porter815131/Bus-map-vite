import { Menu, SearchRoutes } from '../components/';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Map, RoutingList } from '../components/';
import { fetchData } from '../api/fetchData';
// import bus from '../asset/bus-hero.jpg';

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
  const [routeValue, setRouteValue] = useState({ route: '' });

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
            ...busData,
            routes: results[0],
            stops: results[1],
            estimateTime: results[2],
          });
          setIsLoading(false);
        })
        .catch(err => console.error(err));
    };
    getData(city);

    /**尚無法解決refresh後，路線會消失的問題 */
    /** 
    const interval = setInterval(() => {
      getData(city);
    }, 30000);
    return () => clearInterval(interval);
    */
  }, [city]);

  console.log(busData);
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
    <section className='flex w-full h-screen pd:h-full flex-col justify-between sm:justify-start items-center my-0 sm:mt-5 pd:mb-0'>
      {/* <img src={bus} alt='Bus' className='w-full z-[-100] bg-top bg-cover' /> */}
      <header className='w-[80vw] sm:w-full flex justify-center items-center flex-col shadow-lg sm:shadow-none rounded-2xl sm:rounded-none bg-white mb-4'>
        <h1 className='flex p-2 text-2xl justify-center items-center font-extrabold tracking-[2rem] sm:tracking-tighter'>
          搜尋公車
        </h1>
        <div className='flex sm:flex-col justify-center items-center my-5 w-[80vw]'>
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
            routeValue={routeValue}
          />
        </div>
      </header>
      <div className='flex w-full h-full flex-col justify-center sm:justify-between items-center bg-white mt-8 pd:mt-0 pd:mb-0 '>
        <div className='flex w-max justify-center items-center bg-white p-3 sm:p-1 m-3 my-10 sm:mt-0 rounded-[1rem] border-4 shadow-md'>
          <div className='text-3xl sm:text-sm pd:text-xl font-medium p-3 pd:p-2'>
            {routeValue ? (
              <p className='w-fit felx'>
                <span className='text-[#bb3d3d] text-center mr-2 w-fit'>
                  {routeValue.route.split(' ', 1)}
                </span>
                <span className='text-[#ccc]'>|</span>
                <span className='ml-2 text-center w-fit'>
                  {routeValue.route.split(' ').slice(1).join(' ')}
                </span>
              </p>
            ) : (
              '路線名稱'
            )}
          </div>
        </div>
        <div className='w-[80vw] pd:w-full flex pd:flex-col justify-center items-center relative'>
          <Map
            forthTrip={forthTrip}
            backTrip={backTrip}
            routeName={routeName}
            city={city}
            toggleRound={toggleRound}
          />
          <div className='w-[50%] sm:w-full pd:w-[80vw] h-[60vh] ml-10 pd:ml-0 pd:mb-6 pd:mt-4 flex flex-col justify-center items-center shadow-lg bg-white rounded-lg sm:rounded-none border-2 sm:border-t-2'>
            <div className='flex w-full justify-around border-b p-3 divide-x-2 '>
              <button
                className='hover:border-b-2 flex-1 border-blue-700 text-xl w-full '
                onClick={() => setToggleRound(true)}
              >
                {routeValue ? `往 ${routeValue.route.split('-')[1]}` : '去程'}
              </button>
              <button
                className='hover:border-b-2 flex-1 border-blue-700 text-xl w-full '
                onClick={() => setToggleRound(false)}
              >
                {routeValue
                  ? `往 ${routeValue.route.split('-')[0].split(' ', 2)[1]}`
                  : '返程'}
              </button>
            </div>
            <ol className='flex w-full h-[91%] pd:h-full flex-col overflow-scroll'>
              <li className='flex w-full justify-center divide-x p-2 border-b-[1px] pd:tracking-normal'>
                <p className='font-medium flex-[0.2] text-center'>站序</p>
                <p className='font-medium flex-[0.45] text-center'>站名</p>
                <p className='font-medium flex-[0.35] text-center'>預估到站</p>
              </li>
              {city !== 'none' ? (
                (toggleRound ? forthTrip : backTrip)?.map(stop => (
                  <RoutingList
                    key={stop.stopUID}
                    id={stop.stopUID}
                    stopName={stop.stopName}
                    stopSequence={stop.stopSequence}
                    estimateFilter={estimateFilter}
                    toggleRound={toggleRound}
                  />
                ))
              ) : (
                <div className='grid grid-cols-1 h-[16rem] gap-4 place-items-center'>
                  <div className='text-3xl'>請先選擇縣市及路線</div>
                </div>
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Routing;
