import React, { useEffect, useRef, useState } from 'react';
import { SelectorIcon } from '@heroicons/react/solid';
import AsyncSelect from 'react-select';

const SearchRoutes = ({ setRouteName, routes, isSelect }) => {
  const [inputValue, setInputValue] = useState('');

  // 縣市變動即清空 input
  useEffect(() => {
    setInputValue('');
  }, [routes]);

  const inputChangeHandler = e => {
    // console.log(e);
    setRouteName(e.target.value.split(' ', 1)[0]);
    setInputValue(e.target.value);
  };
  // console.log(inputValue?.split(' ', 1)[0]);

  return (
    <div className='flex w-[50%] justify-center items-center mx-5 '>
      <label className='w-10 ml-20 mx-5 block text-sm font-medium text-gray-700'>
        路線
      </label>
      <input
        placeholder='例如: 307'
        value={inputValue}
        className='z-10 relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-2 py-2 text-left cursor-default focus:outline text-xl'
        type='text'
        list='routes'
        name='searchRoutes'
        onChange={inputChangeHandler}
      />
      <datalist
        className='ml-3 truncate  flex justify-center items-center w-min'
        id='routes'
      >
        {isSelect &&
          routes?.routes?.map(list => (
            <option
              key={list.RouteUID}
              value={`${list.RouteUID} [${list.RouteName.Zh_tw}] ${list.DepartureStopNameZh} - ${list.DestinationStopNameZh}`}
            ></option>
          ))}
      </datalist>
      {/* <SelectorIcon
        className='h-5 w-5 text-gray-400 absolute right-6 z-10 '
        aria-hidden='true'
      /> */}
    </div>
  );
};

export default SearchRoutes;
