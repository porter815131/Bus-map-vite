import React, { useEffect, useState } from 'react';

const RoutingList = ({
  stopName,
  key,
  stopSequence,
  id,
  toggleRound,
  estimateFilter,
}) => {
  const [forthTime, setForthTime] = useState([]);
  const [backTime, setBackTime] = useState([]);

  useEffect(() => {
    const forth = estimateFilter?.filter(time => !time.Direction);
    const back = estimateFilter?.filter(time => time.Direction);
    setForthTime(forth);
    setBackTime(back);
  }, [estimateFilter]);

  return (
    <li key={key} className='flex w-full justify-between items-center p-2 '>
      <p className='p-2 left-12 relative before:absolute border-2 rounded-[50%] w-10 h-10 text-center align-middle before:left-4 before:top-9 before:h-[1.2rem] before:border-l-gray-200 before:border-l-2 bg-[#3bc15a] text-white'>
        {stopSequence}
      </p>
      <p className='font-bold  text-lg '>{stopName}</p>
      <p
        className={
          estimateFilter?.map(i => i.EstimateTime) &&
          estimateFilter?.map(i => i.EstimateTime) !== undefined
            ? 'p-1 w-[9rem] text-center text-white bg-blue-600 border-gray-200 rounded-xl border-4'
            : 'w-[9rem]'
        }
      >
        {(toggleRound ? forthTime : backTime)?.map(i => {
          if (i.StopUID === id) {
            let min = Math.floor(i.EstimateTime / 60);
            if (min > 0) {
              return `約${min}分鐘`;
            } else if (min === 0) {
              return '進站中';
            } else if (!min) {
              return '未發車';
            }
          }
        })}
      </p>
    </li>
  );
};

export default RoutingList;
