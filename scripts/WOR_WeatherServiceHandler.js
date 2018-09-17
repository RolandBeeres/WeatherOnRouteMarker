//Handles communication with weather service provider
var demo = { //demo data
    winddir : 0,
    windspeed : 4,
    currentdir : 0,
    currentspeed : 0.1,
    wavedir : 0,
    waveheight : 0.6,
    waveperiod : 4.4,
    temperature : 2
};

var retSimulatedWeatherData = function(){
    var forecasts = [];
        var obj = {
            lat: 75.0, //for wiki reference
            lon: -15.0, //for wiki reference
            time: "2018-07-06T11:00:00.000+0000", //for wiki reference
            winddir: {
                forecast: demo.winddir = getRandomInt(180,360) //adds a bit to make the map look sweet
            },
            windspeed: {
                forecast: demo.windspeed = getRandomInt(0,25)
            },
            currentdir: {
                forecast: demo.currentdir = getRandomInt(180, 270)
            },
            currentspeed: {
                forecast: demo.currentspeed = (getRandomInt(1, 200) / 400)
            },
            wavedir: {
                forecast: demo.wavedir = (demo.winddir - getRandomInt(0,60))
            },
            waveheight: {
                forecast: demo.waveheight = (getRandomInt(1,8)/10) * (demo.windspeed/4)
            },
            waveperiod: {
                forecast: demo.waveperiod += 0
            },
            temperature: {
                forecast: demo.temperature += 1
            }
        };
        forecasts.push(obj);
    return forecasts;
};



getWeatherDataAsync = function (number) { //Simulate request for weather data - thís would be a GET from some endpoint
    route.extensions.weatherdata.push(
        {
            error: 0,
            metocForecast: {
                created: "2018-07-06T08:45:16.542+0000" //for wiki reference
            },
            waypoint:{
                lon: route.waypoints[number].lon,
                lat: route.waypoints[number].lat,
                id: route.waypoints[number].id
            },
            forecasts: retSimulatedWeatherData()
        }
    );
};

getClickmarkerDataAsync = function () {
//Simulate request for weather data - thís would be a GET from some endpoint
    route.extensions.clickmarkerdata = {
        error: 0,
        metocForecast: {
            created: "2018-07-06T08:45:16.542+0000" //for wiki reference
        },
        forecasts: retSimulatedWeatherData()
    };
    console.log("clickmarkerdata:",route.extensions.clickmarkerdata.forecasts);
};
