import React, { useEffect, useState } from 'react';

const RoutingList = ({ stopName, key, stopSequence, time }) => {
  return (
    <li key={key} className='flex w-full justify-between items-center '>
      <p>{stopSequence}</p>
      <p>{stopName}</p>
      <p>{time}</p>
    </li>
  );
};

export default RoutingList;
