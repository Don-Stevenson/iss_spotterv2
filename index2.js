const { nextISSTimesForMyLocation } = require("./iss_promised");

const printPassTimes = passTimes => {
  passTimes.forEach(element => {
    const datetime = new Date(0);
    datetime.setUTCSeconds(element.risetime);
    const minutes = Math.floor(element.duration / 60);
    const seconds = element.duration - minutes * 60;
    console.log(`The next pass will be at ${datetime}
for a total time of ${minutes}:${seconds} (mins:secs)!
`);

  });

};

nextISSTimesForMyLocation()
  .then(passTimes => {
    printPassTimes(passTimes);
  })
  .catch(error => {
    console.error(error.message);
  });
