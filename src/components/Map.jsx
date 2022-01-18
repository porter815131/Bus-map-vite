import React, { useEffect } from 'react';
import { Icon } from 'leaflet';
import { CgLivePhoto } from 'react-icons/cg';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { GEOMETRY_API_URL } from '../store/config';
import { fetchData } from '../api/fetchData';

const pin = L.icon({
  iconUrl: '../asset/pin-icon.png',
  iconSize: [38, 95],
});

/**Direction 去返程
 * StopPosition: [PositionLat, PositionLon] 站點定位
 * Geometry 路線軌跡
 * RouteName 路線名
 */

const Map = ({ busData, routeName, city }) => {
  useEffect(() => {
    const getGeometry = city => {
      fetchData(`${GEOMETRY_API_URL}${city}`)
        .then(data => console.log(data))
        .catch(err => console.error(err));
    };
    getGeometry(city);
  }, [city]);

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={false}
      className='h-[600px] w-[50%] -z-10'
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
