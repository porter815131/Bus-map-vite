import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(
        new Error(`Request took too long time! Timeout after ${s} second`)
      );
    }, s * 1000);
  });
};

const GetAuthorizationHeader = function () {
  // const AppID = import.meta.env.VITE_APP_ID;
  const AppID = '594eb9b317b144dd881f17b914ead36b';

  // const AppKey = import.meta.env.VITE_APP_KEY;
  const AppKey = 'h2gWK-wHTsyfKMRtMQnKnCfQ5FQ';

  const GMTString = new Date().toGMTString();
  const ShaObj = new jsSHA('SHA-1', 'TEXT');
  ShaObj.setHMACKey(AppKey, 'TEXT');
  ShaObj.update('x-date: ' + GMTString);
  const HMAC = ShaObj.getHMAC('B64');
  const Authorization =
    'hmac username="' +
    AppID +
    '", algorithm="hmac-sha1", headers="x-date", signature="' +
    HMAC +
    '"';

  return {
    Authorization: Authorization,
    'X-Date': GMTString,
    'Accept-Encoding': 'gzip',
  }; //如果要將js運行在伺服器，可額外加入 'Accept-Encoding': 'gzip'，要求壓縮以減少網路傳輸資料量
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([
      fetch(url, {
        method: 'GET',
        headers: GetAuthorizationHeader(),
      }),
      timeout(TIMEOUT_SEC),
    ]);

    const data = await res.json();

    if (!res.ok) throw new Error(`${res.Message} ${res.status}`);
    return data;
  } catch (err) {
    throw err;
  }
};
