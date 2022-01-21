const axios = require('axios');
const apiKey = process.env.WEATHERAPIKEY;
// console.log(apiKey);
/*
{
    "coord":
        {   "lon":11.58,
            "lat":48.14
        },
    "weather":
        [
            {
                "id":501,
                "main":"Rain",
                "description":"moderate rain",
                "icon":"10d"
            }
        ],
    "base":"stations",
    "main":
        {
            "temp":2.88,
            "feels_like":0.21,
            "temp_min":2.22,
            "temp_max":3.33,
            "pressure":1001,
            "humidity":90
        },
    "visibility":59,
    "wind":
        {
            "speed":1.28,
            "deg":86
        },
    "rain":
        {
            "1h":1.33
        },
    "clouds":
        {
            "all":99
        },
    "dt":1607169472,
    "sys":
        {
            "type":3,
            "id":2002112,
            "country":"DE",
            "sunrise":1607150895,
            "sunset":1607181658
        },
    "timezone":3600,
    "id":2867714,
    "name":"Munich",
    "cod":200
}

*/

async function getWeather(townName) {
    const endpoint = `http://api.openweathermap.org/data/2.5/weather?q=${townName}&units=metric&appid=${apiKey}`;

    try {
      const result = await axios(endpoint);
      const data = result.data;
      // console.log(data);
      return data;
    }
    catch (error) {
      console.log("Error in getting weather data");
      // return '{ "error":"Error getting data from openweathermap" }';
    }
}

var weather = {
    findName: async function (req, res) {
        const townName = req.params.name;
        const found = await getWeather(townName);
        // console.log(found);

        if (found) {
            console.log("Weather found by Town Name: " + townName);
            res.send(found);
        } else {
            console.log("Weather not found by Town Name:" + townName);
            res.status(404).send("Weather not found by Town Name: " + townName);
        }
    },
    findCondition: async function (req, res) {
        const townName = req.params.name;
        const found = await getWeather(townName);
        // console.log(found);

        if (found) {
            console.log("Weather found by Town Name: " + townName);
            res.send("<p><b>Town: </b>" + townName + "</p><p><b>Condition: </b>" + found.weather[0].description + "</p><p><b>Temperature in C: </b>" + found.main.temp + "</p>");
        } else {
            console.log("Weather not found by Town Name:" + townName);
            res.status(404).send("Weather not found by Town Name: " + townName);
        }
    },
};

module.exports = weather;
