import React, { useEffect, useRef, useState } from 'react';
import { Icon, map } from 'leaflet';
import { CgLivePhoto } from 'react-icons/cg';
import { polyUtil } from 'polyline-encoded';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  useMapEvent,
  useMap,
  Polyline,
} from 'react-leaflet';
import { GEOMETRY_API_URL } from '../store/config';
import { fetchData } from '../api/fetchData';
import StopMarker from './StopMarker';

/**Direction 去返程
 * StopPosition: [PositionLat, PositionLon] 站點定位
 * Geometry 路線軌跡
 * RouteName 路線名
 */

const pinIcon = new Icon({
  iconUrl: 'src/asset/bus-stop.png',
  iconRetinaUrl: 'src/asset/pinicon.svg',
  iconSize: [40, 40],
  className: 'stop_pin',
});

const SetPosition = ({ fly }) => {
  const map = useMap();
  map.flyTo([fly.PositionLat, fly.PositionLon], 15, {
    duration: 2,
  });
  // const map = useMapEvent('zoom', () => {
  //   map.setView(latlon, map.getZoom(15), {
  //     duration: 2,
  //   });
  // });

  return null;
};

const Map = ({ forthTrip, backTrip, toggleRound, routeName, city }) => {
  const [fly, setFly] = useState({});
  const [isPosition, setIsPosition] = useState(false);
  const [path, setPath] = useState([]);

  const lineCorrds = path.map(line => [line.lat, line.lng]);

  useEffect(() => {
    const getGeometry = city => {
      fetchData(`${GEOMETRY_API_URL}${city}`)
        .then(data => {
          const filter = data.filter(item => item.RouteUID === routeName);
          const encodedPolyline = filter[0]?.EncodedPolyline;
          const decodedPolyline = L.polyline(
            L.PolylineUtil.decode(encodedPolyline, 5)
          );
          const pathLine = decodedPolyline?.getLatLngs();
          setPath(pathLine);
        })
        .catch(err => console.error(err));
    };

    getGeometry(city);
  }, [city, routeName]);

  useEffect(() => {
    if (forthTrip || backTrip) {
      const trip = toggleRound ? forthTrip : backTrip;
      trip?.forEach(pos =>
        pos.stopSequence === 1
          ? (setFly(pos.position), setIsPosition(true))
          : ''
      );
    }
  }, [forthTrip, backTrip, fly]);

  console.log('forth>>>', forthTrip);
  console.log('back>>>', backTrip);
  // console.log('route', decodedPolyline);
  console.log('path', lineCorrds);

  return (
    <MapContainer
      center={[25.0335748, 121.5618487]}
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
      {isPosition && <SetPosition fly={fly} />}
      {isPosition && (
        <Polyline
          stroke='true'
          opacity={0.3}
          smoothFactor={0.5}
          pathOptions={{ color: 'blue' }}
          positions={lineCorrds}
        />
      )}
      {routeName !== ''
        ? toggleRound &&
          forthTrip?.map(stop => (
            /*<StopMarker             
            key={stop.stopUID}
            position={[stop.position.PositionLat, stop.position.PositionLon]}
            icon={pinIcon}
            stopNumber={stop.stopSequence}
            stopName={stop.stopName}  />*/
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
          ))
        : ''}
    </MapContainer>
  );
};

export default Map;
