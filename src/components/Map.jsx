import React, { useEffect, useRef, useState } from 'react';
import { CgLivePhoto } from 'react-icons/cg';
import polyUtil from 'polyline-encoded';
import { MapContainer, TileLayer, useMap, Polyline } from 'react-leaflet';
import { GEOMETRY_API_URL } from '../store/config';
import { fetchData } from '../api/fetchData';
import { StopMarker } from './index';

/**Direction 去返程
 * StopPosition: [PositionLat, PositionLon] 站點定位
 * Geometry 路線軌跡
 * RouteName 路線名
 */

/**畫出路線並定位 */
function SetPosition({ fly }) {
  const map = useMap();
  if (fly)
    map.flyTo([fly.PositionLat, fly.PositionLon], 13, {
      duration: 2,
    });

  return null;
}

const Map = ({ forthTrip, backTrip, toggleRound, routeName, city }) => {
  const [fly, setFly] = useState({});
  const [isPosition, setIsPosition] = useState(false);
  const [path, setPath] = useState([]);

  // const lineCorrds = path.map(line => [line.lat, line.lng]);
  /** 路線API */
  useEffect(() => {
    const getGeometry = city => {
      fetchData(`${GEOMETRY_API_URL}${city}`)
        .then(data => {
          const filter = data.filter(item => item.RouteUID === routeName);
          const encodedPolyline = filter?.map(dot => dot.EncodedPolyline);
          // const decodedPolyline = L.polyline(
          //   L.PolylineUtil.decode(encodedPolyline, 10)
          // );
          const decodedPolyline = polyUtil.decode(encodedPolyline[0]);
          // const pathLine = decodedPolyline?.getLatLngs();
          // const lineCorrds = pathLine.map(line => [line.lat, line.lng]);
          setPath(decodedPolyline);
        })
        .catch(err => console.error(err));
    };
    getGeometry(city);
  }, [city, routeName]);
  /**選定路線定位到第一站 */
  useEffect(() => {
    if (forthTrip || backTrip) {
      const trip = toggleRound ? forthTrip : backTrip;
      const position = trip?.filter(pos => pos.stopSequence === 1)[0]?.position;
      setFly(position);
      setIsPosition(true);
    }
  }, [forthTrip, backTrip]);

  return (
    <MapContainer
      center={[25.0335748, 121.5618487]}
      zoomControl={true}
      zoom={13}
      scrollWheelZoom={false}
      className='w-[50%] sm:w-full pd:w-[80vw] h-[50vh] lt:h-[60vh] sm:h-50 rounded-lg z-0 relative'
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        maxNativeZoom={15}
      />
      {isPosition && <SetPosition fly={fly} />}

      <Polyline
        smoothFactor={0.5}
        pathOptions={{ color: 'blue' }}
        positions={path}
      />
      {routeName !== ''
        ? (toggleRound ? forthTrip : backTrip)?.map(stop => (
            <StopMarker
              key={stop.stopUID}
              position={[stop.position.PositionLat, stop.position.PositionLon]}
              stopNumber={stop.stopSequence}
              stopName={stop.stopName}
            />
          ))
        : ''}
    </MapContainer>
  );
};

export default Map;
