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
  };

  // console.log(inputValue?.split(' ').slice(1).join(' '));

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
        onChange={inputChangeHandler}
        id='routeName'
      />
      <datalist
        className='ml-3 truncate  flex justify-center items-center w-min'
        id='routes'
        onChange={e => console.log(e)}
      >
        {isSelect &&
          routes?.routes?.map(list => (
            <option
              id={list.RouteUID}
              className='hidden'
              key={list.RouteUID}
              data-value={`${list.RouteUID} [${list.RouteName.Zh_tw}] ${list.DepartureStopNameZh} - ${list.DestinationStopNameZh}`}
            >
              {`[${list.RouteName.Zh_tw}] ${list.DepartureStopNameZh} - ${list.DestinationStopNameZh}`}
            </option>
          ))}
      </datalist>
      <input type='hidden' name='searchRoutes' id='routeName-hidden' />
      {/* <SelectorIcon
        className='h-5 w-5 text-gray-400 absolute right-6 z-10 '
        aria-hidden='true'
      /> */}
    </div>
  );
};

export default SearchRoutes;
