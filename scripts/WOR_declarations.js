var useGPS = true;
var WeatherServiceRequestURL = "";
// var GPSLocationActual = [55.072917200215191, 13.711061468866212] //has latlon of current position. (Timer or listener constantly updating GPS is probably required)
// var GPSRefreshInterval = 5000; //millsec between update vesselactual position
// var GPSRefreshCounter = 0;
var weatherRefreshInterval = (10 * 60 * 1000); //ten minutes
var weatherRefreshCounter = 0;
var weatherFetchComplete = false;
// var CompassHeadingActual = 0.0; //heading of vesselactual
// var CompassHeadingOffset = 0; //set in options
var mapRenderComplete = false;
// var ghostvesselMarker, vesselactualMarker; //both ship icons
var mapZoomLevel = 9;


//User controls to enable disable options:
var control_displaymarkertext = true; //displays marker text (eta day & time)
var control_scale = 0.8; //route marker scaling control.
var control_clickmarkerenabled = true;


// var today = new Date();
// var dd = today.getDate();
// var mm = today.getMonth() + 1; //January is 0!
// var yyyy = today.getFullYear();
// if (dd < 10) {
//    dd = '0' + dd
// }
// if (mm < 10) {
//    mm = '0' + mm
// }
// // today = mm + '/' + dd + '/' + yyyy;
// today = yyyy + '-' + mm + '-' + dd;


var today = "2018-07-08";

//populate a route object and add weather data to it

var route = {
	waypoints: [
	    { id: 0, name: "pos1", legspeedmin: 12, legspeedmax: 13, lon: 13.711061468866212, lat: 55.072917200215191},
	    { id: 1, name: "pos2", legspeedmin: 11, legspeedmax: 12, lon: 12.663240423944345, lat: 54.880610640482985},
	    { id: 2, name: "pos3", legspeedmin: 11, legspeedmax: 12, lon: 12.165501166131834, lat: 54.58569106501511 },
	    { id: 3, name: "pos4", legspeedmin: 11, legspeedmax: 12, lon: 12.005518697218807, lat: 54.535904500233981 },
	    { id: 4, name: "pos5", legspeedmin: 10, legspeedmax: 11, lon: 11.930997774565851, lat: 54.569907839824936 },
	    { id: 5, name: "pos6", legspeedmin: 10, legspeedmax: 11, lon: 11.883514521671373, lat: 54.567784008455305}
	],
	scheduleElement: [ //waypoint weatherdata is saved in extensions
        { waypointId: 0, eta: today + "T11:00:01.000Z"},
        { waypointId: 1, eta: today + "T15:00:01.000Z"},
        { waypointId: 2, eta: today + "T20:00:01.000Z"},
        { waypointId: 3, eta: today + "T01:00:01.000Z"},
        { waypointId: 4, eta: today + "T08:00:01.000Z"},
        { waypointId: 5, eta: today + "T16:00:01.000Z"}
	],
    extensions: {
        weathermarkersettings: [
            {waypointId:0, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:1, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:2, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:3, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:4, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:5, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true}
        ],
        weatherdata: [], //should be populated by async request
        clickmarkerdata: { // same as a single weatherdata entry, populated here as an example.
            error: 0,
            metocForecast: {
                created: "2018-07-06T08:45:16.542+0000" //time of request
            },
            forecasts: [
                {
                    lat: 75.0, //forecast service calculated position
                    lon: -15.0,
                    time: "2018-07-06T11:00:00.000+0000", //forecast actual time
                    winddir: {
                        forecast: 0
                    },
                    windspeed: {
                        forecast: 0
                    },
                    currentdir: {
                        forecast: 0
                    },
                    currentspeed: {
                        forecast: 0
                    },
                    wavedir: {
                        forecast: 0
                    },
                    waveheight: {
                        forecast: 0
                    },
                    waveperiod: {
                        forecast: 0
                    },
                    temperature: {
                        forecast: 0
                    }
                }
            ]
        },
        mapfeatures: { //styling and default values change - faster than asking the map - good for debug
            clickmarker: {
                currentmarkerscale: 0.84,
                wavemarkerscale: 0.94,
                windmarkerscale: 1.5,
                compassscale: 0.8,
                lon: 0,
                lat: 0
            }
        }
    }
};

//TODO: rename WOR object to something that makes sense
var WOR = {
    routeDotRadius: 12, // size of WORM on map
    // windowWidthAtInit: $(window).width(),
    windowWidthAfterResize: 0,
    ShipIconPosition: 0 //position in percentage of the routebar - saved everytime icon is moved - repositioned everytime map and browser is scaled or moved to fit.
};
