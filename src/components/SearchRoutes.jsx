import React, { useEffect, useRef, useState } from 'react';
import { SelectorIcon } from '@heroicons/react/solid';

const SearchRoutes = ({
  setRouteName,
  routes,
  isSelect,
  setRouteValue,
  setIsLoading,
  routeValue,
}) => {
  const [inputValue, setInputValue] = useState('');

  // 縣市變動即清空 input
  useEffect(() => {
    setInputValue('');
    setRouteValue('');
  }, [routes]);

  const inputChangeHandler = e => {
    /**使用 dataset 取 routeName, 不會顯示在 option 上影響使用者體驗 */

    let input = e.target,
      list = input.getAttribute('list'),
      options = document.querySelectorAll('#' + list + ' option'),
      hiddenInput = document.getElementById(
        input.getAttribute('id') + '-hidden'
      ),
      inputVal = input.value;
    hiddenInput.value = inputVal;
    for (let i = 0; i < options.length; i++) {
      let option = options[i];
      if (option.innerText === inputVal) {
        hiddenInput.value = option.getAttribute('data-value');
        break;
      }
    }

    setRouteName(hiddenInput.value.split(' ', 1)[0]);
    setInputValue(e.target.value);
    setRouteValue({
      ...routeValue,
      route: hiddenInput.value.split(' ').slice(1).join(' '),
    });
  };

  return (
    <div className='flex w-[50%] sm:w-full sm:flex-col lt:flex-row justify-center items-center mx-4 sm:my-4 lt:my-2 '>
      <label className='mx-3 block text-sm font-extrabold text-gray-700 '>
        路線
      </label>
      <input
        placeholder='例如: 939、932、棕1…'
        value={inputValue}
        className='z-10 relative w-[80%] sm:w-full h-15 bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-2 py-2 sm:mt-4 lt:mt-0 text-left cursor-pointer focus:outline text-lg sm:text-sm mf:text-lg lt:text-xl'
        type='text'
        list='routes'
        onChange={inputChangeHandler}
        onFocus={() => setInputValue('')}
        id='routeName'
      />
      <datalist className='ml-3 truncate w-min' id='routes'>
        {isSelect &&
          routes?.routes?.map(list => (
            <option
              id={list.RouteUID}
              key={list.RouteUID}
              data-value={`${list.RouteUID} [${list.RouteName.Zh_tw}] ${list.DepartureStopNameZh} - ${list.DestinationStopNameZh}`}
            >
              {`[${list.RouteName.Zh_tw}] ${list.DepartureStopNameZh} - ${list.DestinationStopNameZh}`}
            </option>
          ))}
      </datalist>
      <input type='hidden' name='searchRoutes' id='routeName-hidden' />
    </div>
  );
};

export default SearchRoutes;
