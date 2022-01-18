import { Menu } from './';
import React, { useEffect, useState } from 'react';
import { Map, RoutingList } from './';
import { fetchData } from '../api/fetchData';

import { STOP_ETOA_URL, STOP_API_URL, CITY_ROUTES_URL } from '../store/config';
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
  const [routeName, setRouteName] = useState('');
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
  console.log('ROUTENAME', routeName);

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
        })
        .catch(err => console.error(err));
    };
    getData(city);
  }, [city]);

  useEffect(() => {
    if (stopsFilter && estimateFilter) {
      const forthStops = stopsFilter.filter(trip => !trip.Direction);
      const forthTime = estimateFilter.filter(time => !time.Direction);
      const backStops = stopsFilter.filter(trip => trip.Direction);
      const backTime = estimateFilter.filter(time => time.Direction);
      /* 把去程資料調整成我的格式 */
      const forthFilter = forthStops[0]?.Stops.map((item, i) => {
        return {
          stopUID: item.StopUID,
          stopName: item.StopName.Zh_tw,
          stopSequence: item.StopSequence,
          time: forthTime[i].EstimateTime,
          plate: forthTime[i]?.PlateNumb,
        };
      });
      setForthTrip(forthFilter);
      /* 把回程資料調整成我的格式 */
      const backFilter = backStops[0]?.Stops.map((item, i) => {
        return {
          stopUID: item.StopUID,
          stopName: item.StopName.Zh_tw,
          stopSequence: item.StopSequence,
          time: backTime[i].EstimateTime,
          plate: forthTime[i]?.PlateNumb,
        };
      });
      setBackTrip(backFilter);
    }
  }, [routeName]);

  console.log(busData);

  return (
    <section className='flex w-full flex-col justify-center items-center p-2 mt-10'>
      <header className='w-[80vw] flex justify-center items-center flex-col shadow-md'>
        <h1 className='flex p-2 text-2xl justify-center items-center'>
          搜尋公車
        </h1>
        <div className='flex justify-center items-center my-5 w-[70vw]'>
          <Menu
            setSelectedCity={setSelectedCity}
            setIsSelect={setIsSelect}
            setRoutes={setBusData}
          />
          <SearchRoutes
            routes={busData}
            setRouteName={setRouteName}
            isSelect={isSelect}
          />
        </div>
      </header>
      <div className='flex w-[70vw] justify-center items-center'>
        <p className='text-3xl my-10'>路線名稱</p>
      </div>
      <div className='w-[80vw] flex justify-center items-center relative'>
        <Map busData={busData} routeName={routeName} city={city} />
        <div className='w-[50%] mx-10 items-center shadow-lg '>
          <div className='flex w-full justify-around border-b '>
            <button
              className='hover:border-b-2 flex-1 border-blue-700 text-xl w-full'
              onClick={() => setToggleRound(true)}
            >
              去程
            </button>
            <button
              className='hover:border-b-2 flex-1 border-blue-700 text-xl w-full'
              onClick={() => setToggleRound(false)}
            >
              返程
            </button>
          </div>
          <ol className='flex w-full h-[37.5rem] flex-col overflow-scroll'>
            <li className='flex w-full justify-between p-3 border-b-2 '>
              <p>站序</p>
              <p>站名</p>
              <p>預估到站</p>
            </li>
            {city !== 'none' &&
              (toggleRound ? forthTrip : backTrip)?.map(stop => (
                <RoutingList
                  key={stop.stopUID}
                  stopName={stop.stopName}
                  stopSequence={stop.stopSequence}
                  time={stop.time}
                />
              ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Routing;
