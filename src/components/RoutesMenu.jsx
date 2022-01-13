import React, { useEffect } from 'react';
import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { getJSON } from '../store/getJson';

const classNames = (...classes) => {
  return classes.filter(Boolean).join('');
};

const RoutesMenu = ({ routes, city, setRoutes }) => {
  const [route, setRoute] = useState([]);
  const [state, setState] = useState([]);

  console.log(city);

  useEffect(() => {
    if (city === 'none') setRoutes([]);
    setState(route);
  }, [route, city]);

  console.log(route);
  return (
    <Listbox value={route} onChange={setRoute}>
      {({ open }) => (
        <>
          <Listbox.Label className='ml-20 mx-5 block text-sm font-medium text-gray-700'>
            路線名稱
          </Listbox.Label>
          <div className='mt-1 relative'>
            <Listbox.Button className='z-10 relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'>
              <span className='flex items-center justify-center'>
                <span className='ml-3 block truncate text-2xl w-[27.5rem]'>
                  {state.RouteID !== undefined && city !== 'none'
                    ? `[${state.RouteName.Zh_tw}] ${state.DepartureStopNameZh} - ${state.DestinationStopNameZh}`
                    : '請選擇路線'}
                </span>
              </span>
              <span className='ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                <SelectorIcon
                  className='h-5 w-5 text-gray-400'
                  aria-hidden='true'
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave='transition ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options className='absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
                {routes.map(route => (
                  <Listbox.Option
                    key={route.RouteUID}
                    className={({ active }) =>
                      classNames(
                        active
                          ? 'text-white bg-indigo-600 text-2xl'
                          : 'text-gray-900',
                        ' select-none relative py-2 pl-3 pr-9'
                      )
                    }
                    value={route}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className='flex items-center justify-center'>
                          <span
                            className={classNames(
                              selected ? 'font-semibold' : 'font-normal',
                              'ml-3 block truncate'
                            )}
                          >
                            {`[${route.RouteName.Zh_tw}] ${route.DepartureStopNameZh} - ${route.DestinationStopNameZh}`}
                          </span>
                        </div>

                        {/* 選擇後有打勾的icon */}
                        {/* {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className='h-5 w-5' aria-hidden='true' />
                          </span>
                        ) : null} */}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default RoutesMenu;
