import React, { useEffect, useRef, useState } from 'react';
import { Icon } from 'leaflet';
import { CgLivePhoto } from 'react-icons/cg';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  useMapEvent,
  useMap,
} from 'react-leaflet';
import { GEOMETRY_API_URL } from '../store/config';
import { fetchData } from '../api/fetchData';
import StopMarker from './StopMarker';
import { map } from 'leaflet';

/**Direction 去返程
 * StopPosition: [PositionLat, PositionLon] 站點定位
 * Geometry 路線軌跡
 * RouteName 路線名
 */

function SetPosition({ fly }) {
  const latlon = [fly.PositionLat, fly.PositionLon];
  const map = useMap();
  map.flyTo(latlon, 15, {
    duration: 2,
  });

  // const map = useMapEvent('zoom', () => {
  //   map.setView(latlon, map.getZoom(15), {
  //     duration: 2,
  //   });
  // });

  return null;
}

const pinIcon = new Icon({
  iconUrl: 'src/asset/bus-stop.png',
  iconRetinaUrl: 'src/asset/pinicon.svg',
  iconSize: [40, 40],
  className: 'stop_pin',
});

const Map = ({ forthTrip, backTrip, toggleRound, routeName, city }) => {
  const [fly, setFly] = useState({});
  const [stopPin, setStopPin] = useState();

  useEffect(() => {
    const getGeometry = city => {
      fetchData(`${GEOMETRY_API_URL}${city}`)
        .then(data => console.log(data))
        .catch(err => console.error(err));
    };
    getGeometry(city);
  }, [city]);

  console.log('forth>>>', forthTrip);
  console.log('back>>>', backTrip);

  useEffect(() => {
    if (forthTrip || backTrip) {
      const trip = toggleRound ? forthTrip : backTrip;
      trip.forEach(pos =>
        pos.stopSequence === 1 ? setFly(pos.position) : null
      );
    }
  }, [forthTrip, backTrip]);

  return (
    <MapContainer
      center={stopPin ? stopPin : [25.0335748, 121.5618487]}
      zoomControl={true}
      zoom={13}
      scrollWheelZoom={true}
      className='h-[600px] w-[50%]'
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        maxNativeZoom={15}
      />
      <SetPosition fly={fly} />
      {toggleRound &&
        forthTrip?.map(stop => (
          /*<StopMarker             
            key={stop.stopUID}
            position={[stop.position.PositionLat, stop.position.PositionLon]}
            icon={pinIcon}
            stopNumber={stop.stopSequence}  />*/
          <Marker
            key={stop.stopUID}
            position={[stop.position.PositionLat, stop.position.PositionLon]}
            icon={pinIcon}
          >
            <Tooltip offset={[0, -20]} direction='top' opacity={1}>
              <p className='font-extrabold'>{stop.stopSequence}</p>
              <h1 className='text-base'>{stop.stopName}</h1>
            </Tooltip>
          </Marker>
        ))}
    </MapContainer>
  );
};

export default Map;
