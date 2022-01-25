import React, { useEffect, useState } from 'react';

const RoutingList = ({ stopName, key, stopSequence, time }) => {
  return (
    <li key={key} className='flex w-full justify-between items-center p-2 '>
      <p className='p-2 left-12 relative before:absolute border-2 rounded-[50%] w-10 h-10 text-center align-middle before:left-4 before:top-9 before:h-[1.2rem] before:border-l-gray-200 before:border-l-2 bg-[#3bc15a] text-white'>
        {stopSequence}
      </p>
      <p className='font-bold  text-lg '>{stopName}</p>
      <p
        className={
          time
            ? 'p-1 w-[9rem] text-center text-white bg-blue-600 border-gray-200 rounded-xl border-4'
            : 'w-[9rem]'
        }
      >
        {time ? `約${time}分鐘` : ''}
      </p>
    </li>
  );
};

export default RoutingList;
