import { fetchData } from './fetchData';

const CITY_ROUTES_URL = 'https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/';

export const getCityRoutes = (city = '') => {
  fetchData(`${CITY_ROUTES_URL}${city}`).then(data => {
    return data;
  });
};
