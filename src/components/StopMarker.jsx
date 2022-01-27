import React from 'react';
import { Icon } from 'leaflet';
import { Marker, Popup, Tooltip, useMap } from 'react-leaflet';

const pinIcon = new Icon({
  iconUrl: 'src/asset/circle-stop.png',
  iconRetinaUrl: 'src/asset/circle-stop.png',
  iconSize: [20, 20],
  // iconAnchor: [17, 42],
  className: 'stop_pin',
});

const StopMarker = ({ key, position, stopNumber, stopName }) => {
  return (
    <Marker key={key} icon={pinIcon} position={position}>
      <Tooltip offset={[0, -20]} direction='top' opacity={1}>
        <p className='font-extrabold'>{stopNumber}</p>
        <h1 className='text-base'>{stopName}</h1>
      </Tooltip>
    </Marker>
  );
};

export default StopMarker;
