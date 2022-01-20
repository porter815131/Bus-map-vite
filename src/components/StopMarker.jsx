import React from 'react';
import { Icon } from 'leaflet';
import { Marker, Popup, Tooltip } from 'react-leaflet';

const pinIcon = new Icon({
  iconUrl: 'src/asset/bus-stop.png',
  iconRetinaUrl: 'src/asset/bus-stop.png',
  iconSize: [40, 40],
  className: 'stop_pin',
});

const StopMarker = ({ key, position, stopNumber }) => {
  return (
    <Marker key={key} icon={pinIcon} position={position}>
      <Tooltip offset={[0, -20]} direction='top' opacity={1}>
        {stopNumber}
      </Tooltip>
    </Marker>
  );
};

export default StopMarker;
