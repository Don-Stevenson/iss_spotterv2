const request = require("request-promise-native");

async function fetchMyIP() {
  try {
    return (ip = await request("https://api.ipify.org?format=json"));
  } catch (error) {
    console.error(error);
  }
}

async function fetchCoordsByIP(body) {
  try {
    const ip = await JSON.parse(body).ip;
    return (bodyData = await request(`https://ipvigilante.com/json/${ip}`));
  } catch (error) {
    console.error(error);
  }
}

async function fetchISSFlyOverTimes(body) {
  try {
    const { latitude, longitude } = JSON.parse(body).data;
    const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
    return await request(url);
  } catch (error) {
    console.error(error);
  }
}

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(data => {
      const { response } = JSON.parse(data);
      return response;
    });
};

// async function nextISSTimesForMyLocation() {
//   try {
//     let myIp = await fetchMyIP();
//     let CoordsByIP = await fetchISSFlyOverTimes();
//     return ({ response } = await JSON.parse(myIp, CoordsByIP));
//   } catch (error) {
//     console.error(error);
//   }
// }

module.exports = { nextISSTimesForMyLocation };
