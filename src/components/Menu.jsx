import React, { useEffect } from 'react';
import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { getJSON } from '../store/getJson';

const classNames = (...classes) => {
  return classes.filter(Boolean).join('');
};

const city = [
  {
    CityID: 'initial',
    CityName: '--- 請選擇 ---',
    CityCode: 'none',
    City: 'none',
    CountyID: 'initial',
    Version: '21.08.1',
  },
  {
    CityID: 'A',
    CityName: '臺北市',
    CityCode: 'TPE',
    City: 'Taipei',
    CountyID: 'A',
    Version: '21.08.1',
  },
  {
    CityID: 'B',
    CityName: '臺中市',
    CityCode: 'TXG',
    City: 'Taichung',
    CountyID: 'B',
    Version: '21.08.1',
  },
  {
    CityID: 'C',
    CityName: '基隆市',
    CityCode: 'KEE',
    City: 'Keelung',
    CountyID: 'C',
    Version: '21.08.1',
  },
  {
    CityID: 'D',
    CityName: '臺南市',
    CityCode: 'TNN',
    City: 'Tainan',
    CountyID: 'D',
    Version: '21.08.1',
  },
  {
    CityID: 'E',
    CityName: '高雄市',
    CityCode: 'KHH',
    City: 'Kaohsiung',
    CountyID: 'E',
    Version: '21.08.1',
  },
  {
    CityID: 'F',
    CityName: '新北市',
    CityCode: 'NWT',
    City: 'NewTaipei',
    CountyID: 'F',
    Version: '21.08.1',
  },
  {
    CityID: 'G',
    CityName: '宜蘭縣',
    CityCode: 'ILA',
    City: 'YilanCounty',
    CountyID: 'G',
    Version: '21.08.1',
  },
  {
    CityID: 'H',
    CityName: '桃園市',
    CityCode: 'TAO',
    City: 'Taoyuan',
    CountyID: 'H',
    Version: '21.08.1',
  },
  {
    CityID: 'I',
    CityName: '嘉義市',
    CityCode: 'CYI',
    City: 'Chiayi',
    CountyID: 'I',
    Version: '21.08.1',
  },
  {
    CityID: 'J',
    CityName: '新竹縣',
    CityCode: 'HSQ',
    City: 'HsinchuCounty',
    CountyID: 'J',
    Version: '21.08.1',
  },
  {
    CityID: 'K',
    CityName: '苗栗縣',
    CityCode: 'MIA',
    City: 'MiaoliCounty',
    CountyID: 'K',
    Version: '21.08.1',
  },
  {
    CityID: 'M',
    CityName: '南投縣',
    CityCode: 'NAN',
    City: 'NantouCounty',
    CountyID: 'M',
    Version: '21.08.1',
  },
  {
    CityID: 'N',
    CityName: '彰化縣',
    CityCode: 'CHA',
    City: 'ChanghuaCounty',
    CountyID: 'N',
    Version: '21.08.1',
  },
  {
    CityID: 'O',
    CityName: '新竹市',
    CityCode: 'HSZ',
    City: 'Hsinchu',
    CountyID: 'O',
    Version: '21.08.1',
  },
  {
    CityID: 'P',
    CityName: '雲林縣',
    CityCode: 'YUN',
    City: 'YunlinCounty',
    CountyID: 'P',
    Version: '21.08.1',
  },
  {
    CityID: 'Q',
    CityName: '嘉義縣',
    CityCode: 'CYQ',
    City: 'ChiayiCounty',
    CountyID: 'Q',
    Version: '21.08.1',
  },
  {
    CityID: 'T',
    CityName: '屏東縣',
    CityCode: 'PIF',
    City: 'PingtungCounty',
    CountyID: 'T',
    Version: '21.08.1',
  },
  {
    CityID: 'U',
    CityName: '花蓮縣',
    CityCode: 'HUA',
    City: 'HualienCounty',
    CountyID: 'U',
    Version: '21.08.1',
  },
  {
    CityID: 'V',
    CityName: '臺東縣',
    CityCode: 'TTT',
    City: 'TaitungCounty',
    CountyID: 'V',
    Version: '21.08.1',
  },
  {
    CityID: 'W',
    CityName: '金門縣',
    CityCode: 'KIN',
    City: 'KinmenCounty',
    CountyID: 'W',
    Version: '21.08.1',
  },
  {
    CityID: 'X',
    CityName: '澎湖縣',
    CityCode: 'PEN',
    City: 'PenghuCounty',
    CountyID: 'X',
    Version: '21.08.1',
  },
  {
    CityID: 'Z',
    CityName: '連江縣',
    CityCode: 'LIE',
    City: 'LienchiangCounty',
    CountyID: 'Z',
    Version: '21.08.1',
  },
];

console.log(classNames);

const Menu = ({ setSelectedCity }) => {
  const [selected, setSelected] = useState(city[0]);

  useEffect(() => {
    setSelectedCity(selected);
  }, [selected]);

  console.log(selected);
  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className=' mx-5 block text-sm font-medium text-gray-700'>
            城市
          </Listbox.Label>
          <div className='mt-1 relative'>
            <Listbox.Button className='mr-20 z-10 relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'>
              <span className='flex items-center justify-center'>
                <span className='ml-3 block truncate text-2xl w-[10rem] text-center'>
                  {selected.CityName}
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
                {city.map(city => (
                  <Listbox.Option
                    key={city.CityID}
                    className={({ active }) =>
                      classNames(
                        active
                          ? 'text-white bg-indigo-600 text-2xl'
                          : 'text-gray-900',
                        ' select-none relative py-2 pl-3 pr-9'
                      )
                    }
                    value={city}
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
                            {city.CityName}
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

export default Menu;
