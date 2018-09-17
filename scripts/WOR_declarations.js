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



//populate a route object and add weather data to it
var route = {
	waypoints: [
	    { id: 0, name: "pos1", legspeedmin: 12, legspeedmax: 13, lon: 13.711061468866212, lat: 55.072917200215191},
	    { id: 1, name: "pos2", legspeedmin: 11, legspeedmax: 12, lon: 12.663240423944345, lat: 54.880610640482985},
	    { id: 2, name: "pos3", legspeedmin: 11, legspeedmax: 12, lon: 12.165501166131834, lat: 54.58569106501511 },
	    { id: 3, name: "pos4", legspeedmin: 11, legspeedmax: 12, lon: 12.005518697218807, lat: 54.535904500233981 },
	    { id: 4, name: "pos5", legspeedmin: 10, legspeedmax: 11, lon: 11.930997774565851, lat: 54.569907839824936 },
	    { id: 5, name: "pos6", legspeedmin: 10, legspeedmax: 11, lon: 11.883514521671373, lat: 54.567784008455305},
        { id: 6, name: "pos7" , lat:54.690767709515086, lon:11.097107045352459, legspeedmin:12.0, legspeedmax:12.0 },
        { id: 7, name: "pos8" , lat:54.73307885319812, lon:10.910339467227459, legspeedmin:12.0, legspeedmax:12.0 },
        { id: 8, name: "pos9" , lat:54.81123803693475, lon:10.815124567598106, legspeedmin:12.0, legspeedmax:12.0 },
        { id: 9, name: "pos10" , lat:54.94817945474816, lon:10.892028864473103, legspeedmin:12.0, legspeedmax:12.0},
        { id: 20, name: "pos21" , lat:55.06368971377992, lon:11.001892145723104, legspeedmin:12.0, legspeedmax:12.0},
        { id: 21, name: "pos22" , lat:55.09932565348626, lon:11.031189076602457, legspeedmin:12.0, legspeedmax:12.0},
        { id: 22, name: "pos23" , lat:55.13074274034585, lon:11.023864801973104, legspeedmin:12.0, legspeedmax:12.0},
        { id: 23, name: "pos24" , lat:55.203953257858956, lon:11.056823786348104, legspeedmin:12.0, legspeedmax:12.0},
        { id: 24, name: "pos25" , lat:55.258251200585136, lon:11.11541748046875, legspeedmin:12.0, legspeedmax:12.0},
        { id: 25, name: "pos26" , lat:55.33539358023353, lon:11.04949951171875, legspeedmin:12.0, legspeedmax:12.0},
        { id: 26, name: "pos27" , lat:55.39575172119609, lon:11.034851130098103, legspeedmin:12.0, legspeedmax:12.0},
        { id: 27, name: "pos28" , lat:55.528630522571916, lon:10.88470458984375, legspeedmin:12.0, legspeedmax:12.0},
        { id: 28, name: "pos29" , lat:55.56799271187336, lon:10.87371826171875, legspeedmin:12.0, legspeedmax:12.0},
        { id: 29, name: "pos30" , lat:55.677584411089526, lon:10.782165583223104, legspeedmin:12.0, legspeedmax:12.0},
        { id: 30, name: "pos31" , lat:55.8290586571982, lon:10.82199102267623, legspeedmin:12.0, legspeedmax:12.0},
        { id: 31, name: "pos32" , lat:55.9533006081123, lon:10.990447998046875, legspeedmin:12.0, legspeedmax:12.0},
        { id: 32, name: "pos33" , lat:56.184291950877935, lon:11.235809326171875, legspeedmin:12.0, legspeedmax:12.0},
        { id: 33, name: "pos34" , lat:56.42402921356165, lon:11.506805475801231, legspeedmin:12.0, legspeedmax:12.0},
        { id: 34, name: "pos35" , lat:56.74368683100866, lon:11.847381591796875, legspeedmin:12.0, legspeedmax:12.0},
        { id: 35, name: "pos36" , lat:56.765771041900194, lon:11.86569219455123, legspeedmin:12.0, legspeedmax:12.0},
        { id: 36, name: "pos37" , lat:56.807895787933944, lon:11.852874755859375, legspeedmin:12.0, legspeedmax:12.0},
        { id: 37, name: "pos38" , lat:56.88900287480368, lon:11.78878789767623, legspeedmin:12.0, legspeedmax:12.0},
        { id: 38, name: "pos39" , lat:57.312679641643115, lon:11.510467529296875, legspeedmin:12.0, legspeedmax:12.0},
        { id: 39, name: "pos40" , lat:57.58263266108483, lon:11.329193143174052, legspeedmin:12.0, legspeedmax:12.0},
        { id: 40, name: "pos41" , lat:58.044942267236735, lon:11.023406982421875, legspeedmin:12.0, legspeedmax:12.0},
        { id: 41, name: "pos42" , lat:58.2594341522053, lon:10.785827692598104, legspeedmin:12.0, legspeedmax:12.0},
        { id: 42, name: "pos43" , lat:58.269065573473284, lon:10.090026967227459, legspeedmin:12.0, legspeedmax:12.0},
        { id: 43, name: "pos44" , lat:57.881763535005064, lon:8.918151967227459, legspeedmin:12.0, legspeedmax:12.0},
        { id: 44, name: "pos45" , lat:57.547277805277474, lon:7.064209431409835, legspeedmin:12.0, legspeedmax:12.0},
        { id: 45, name: "pos46" , lat:57.61010690095057, lon:5.672607645392418, legspeedmin:12.0, legspeedmax:12.0},
        { id: 46, name: "pos47" , lat:57.93040616355009, lon:3.6511239409446703, legspeedmin:12.0, legspeedmax:12.0},
        { id: 47, name: "pos48" , lat:58.63884074229304, lon:1.8054203689098347, legspeedmin:12.0, legspeedmax:12.0},
        { id: 48, name: "pos49" , lat:59.048089174591354, lon:0.8386234939098359, legspeedmin:12.0, legspeedmax:12.0},
        { id: 49, name: "pos50" , lat:59.40036502701412, lon:-0.36254882812500056, legspeedmin:12.0, legspeedmax:12.0},
        { id: 50, name: "pos51" , lat:59.67513720086862, lon:-1.1828608810901642, legspeedmin:12.0, legspeedmax:12.0},
        { id: 51, name: "pos52" , lat:59.82273177141681, lon:-1.7102046310901644, legspeedmin:12.0, legspeedmax:12.0},
        { id: 52, name: "pos53" , lat:59.96234340448083, lon:-2.794189229607583, legspeedmin:12.0, legspeedmax:12.0},
        { id: 53, name: "pos54" , lat:59.947675272740184, lon:-4.302978403866291, legspeedmin:12.0, legspeedmax:12.0},
        { id: 54, name: "pos55" , lat:59.45996518643071, lon:-8.023681193590164, legspeedmin:12.0, legspeedmax:12.0},
        { id: 55, name: "pos56" , lat:56.86498936139634, lon:-10.01586891710758, legspeedmin:12.0, legspeedmax:12.0},
        { id: 56, name: "pos57" , lat:55.44147932744326, lon:-9.9884033203125, legspeedmin:12.0, legspeedmax:12.0},
        { id: 57, name: "pos58" , lat:54.749990905725895, lon:-10.449828878045086, legspeedmin:12.0, legspeedmax:12.0},
        { id: 58, name: "pos59" , lat:54.29943061914821, lon:-10.567016601562502, legspeedmin:12.0, legspeedmax:12.0},
        { id: 59, name: "pos60" , lat:53.981935096373036, lon:-10.552368052303791, legspeedmin:12.0, legspeedmax:12.0},
        { id: 60, name: "pos61" , lat:53.64680863677836, lon:-10.520324707031252, legspeedmin:12.0, legspeedmax:12.0},
        { id: 61, name: "pos62" , lat:53.40079908393702, lon:-10.39947509765625, legspeedmin:12.0, legspeedmax:12.0},
        { id: 62, name: "pos63" , lat:53.25425974053633, lon:-10.084533635526896, legspeedmin:12.0, legspeedmax:12.0},
        { id: 63, name: "pos64" , lat:53.23015288621062, lon:-9.820861760526897, legspeedmin:12.0, legspeedmax:12.0},
        { id: 64, name: "pos65" , lat:53.20109715974547, lon:-9.635696397162977, legspeedmin:12.0, legspeedmax:12.0},
        { id: 65, name: "pos66" , lat:53.198903461457775, lon:-9.390335069037974, legspeedmin:12.0, legspeedmax:12.0},
        { id: 66, name: "pos67" , lat:53.210419081048286, lon:-9.199905395507812, legspeedmin:12.0, legspeedmax:12.0},
        { id: 67, name: "pos68" , lat:53.222479748984455, lon:-9.11195755004883, legspeedmin:12.0, legspeedmax:12.0},
        { id: 68, name: "pos69" , lat:53.23193403084895, lon:-9.072360988939183, legspeedmin:12.0, legspeedmax:12.0},
        { id: 69, name: "pos70" , lat:53.247412624068915, lon:-9.037113186204806, legspeedmin:12.0, legspeedmax:12.0},
        { id: 70, name: "pos71" , lat:53.2534381740893, lon:-9.029331207275389, legspeedmin:12.0, legspeedmax:12.0},
        { id: 71, name: "pos72" , lat:53.261927274414404, lon:-9.035053249681367, legspeedmin:12.0, legspeedmax:12.0},
        { id: 72, name: "pos73" , lat:53.26603430444354, lon:-9.043715000152586, legspeedmin:12.0, legspeedmax:12.0},
        { id: 73, name: "pos74" , lat:53.26750589316086, lon:-9.04514551075408, legspeedmin:12.0, legspeedmax:12.0},
        { id: 74, name: "pos75" , lat:53.26867799443775, lon:-9.047740101814268, legspeedmin:12.0, legspeedmax:12.0},
        { id: 75, name: "pos76" , lat:53.26898598647119, lon:-9.048526883070735, legspeedmin:12.0, legspeedmax:12.0}

	],
	scheduleElement: [ //waypoint weatherdata is saved in extensions
        { waypointId: 0, eta: "2018-07-08" + "T11:00:01.000Z"},
        { waypointId: 1, eta: "2018-07-08" + "T15:00:01.000Z"},
        { waypointId: 2, eta: "2018-07-08" + "T20:00:01.000Z"},
        { waypointId: 3, eta: "2018-07-08" + "T01:00:01.000Z"},
        { waypointId: 4, eta: "2018-07-08" + "T08:00:01.000Z"},
        { waypointId: 5, eta: "2018-07-08" + "T16:00:01.000Z"},
        { waypointId: 6, eta: "2018-07-08" + "T18:00:01.000Z"},
        { waypointId: 7, eta: "2018-07-08" + "T20:00:01.000Z"},
        { waypointId: 8, eta: "2018-07-08" + "T23:00:01.000Z"},
        { waypointId: 9, eta: "2018-07-09" + "T01:00:01.000Z"},
        { waypointId: 10, eta: "2018-07-09" + "T06:00:01.000Z"},
        { waypointId: 21, eta: "2018-07-09" + "T10:00:01.000Z"},
        { waypointId: 22, eta: "2018-07-09" + "T16:00:01.000Z"},
        { waypointId: 23, eta: "2018-07-09" + "T20:00:01.000Z"},
        { waypointId: 24, eta: "2018-07-09" + "T22:00:01.000Z"},
        { waypointId: 25, eta: "2018-07-10" + "T03:00:01.000Z"},
        { waypointId: 26, eta: "2018-07-10" + "T07:00:01.000Z"},
        { waypointId: 27, eta: "2018-07-10" + "T09:00:01.000Z"},
        { waypointId: 28, eta: "2018-07-10" + "T11:00:01.000Z"},
        { waypointId: 29, eta: "2018-07-10" + "T14:00:01.000Z"},
        { waypointId: 30, eta: "2018-07-10" + "T18:00:01.000Z"},
        { waypointId: 31, eta: "2018-07-10" + "T21:00:01.000Z"},
        { waypointId: 32, eta: "2018-07-10" + "T23:00:01.000Z"},
        { waypointId: 33, eta: "2018-07-11" + "T05:00:01.000Z"},
        { waypointId: 34, eta: "2018-07-11" + "T09:00:01.000Z"},
        { waypointId: 35, eta: "2018-07-11" + "T10:00:01.000Z"},
        { waypointId: 36, eta: "2018-07-11" + "T11:00:01.000Z"},
        { waypointId: 37, eta: "2018-07-11" + "T12:00:01.000Z"},
        { waypointId: 38, eta: "2018-07-11" + "T13:00:01.000Z"},
        { waypointId: 39, eta: "2018-07-11" + "T14:00:01.000Z"},
        { waypointId: 40, eta: "2018-07-11" + "T15:00:01.000Z"},
        { waypointId: 41, eta: "2018-07-11" + "T16:00:01.000Z"},
        { waypointId: 42, eta: "2018-07-11" + "T17:00:01.000Z"},
        { waypointId: 43, eta: "2018-07-11" + "T18:00:01.000Z"},
        { waypointId: 44, eta: "2018-07-11" + "T19:00:01.000Z"},
        { waypointId: 45, eta: "2018-07-11" + "T20:00:01.000Z"},
        { waypointId: 46, eta: "2018-07-11" + "T21:00:01.000Z"},
        { waypointId: 47, eta: "2018-07-11" + "T22:00:01.000Z"},
        { waypointId: 48, eta: "2018-07-11" + "T23:00:01.000Z"},
        { waypointId: 49, eta: "2018-07-12" + "T02:00:01.000Z"},
        { waypointId: 50, eta: "2018-07-12" + "T03:00:01.000Z"},
        { waypointId: 51, eta: "2018-07-12" + "T04:00:01.000Z"},
        { waypointId: 52, eta: "2018-07-12" + "T05:00:01.000Z"},
        { waypointId: 53, eta: "2018-07-12" + "T06:00:01.000Z"},
        { waypointId: 54, eta: "2018-07-12" + "T08:00:01.000Z"},
        { waypointId: 55, eta: "2018-07-12" + "T10:00:01.000Z"},
        { waypointId: 56, eta: "2018-07-12" + "T11:00:01.000Z"},
        { waypointId: 57, eta: "2018-07-12" + "T12:00:01.000Z"},
        { waypointId: 58, eta: "2018-07-12" + "T15:00:01.000Z"},
        { waypointId: 59, eta: "2018-07-12" + "T17:00:01.000Z"},
        { waypointId: 60, eta: "2018-07-12" + "T20:00:01.000Z"},
        { waypointId: 61, eta: "2018-07-12" + "T22:00:01.000Z"},
        { waypointId: 62, eta: "2018-07-12" + "T23:00:01.000Z"},
        { waypointId: 63, eta: "2018-07-13" + "T01:00:01.000Z"},
        { waypointId: 64, eta: "2018-07-13" + "T02:00:01.000Z"},
        { waypointId: 65, eta: "2018-07-13" + "T04:00:01.000Z"},
        { waypointId: 66, eta: "2018-07-13" + "T06:00:01.000Z"},
        { waypointId: 67, eta: "2018-07-13" + "T07:00:01.000Z"},
        { waypointId: 68, eta: "2018-07-13" + "T08:00:01.000Z"},
        { waypointId: 69, eta: "2018-07-13" + "T09:00:01.000Z"},
        { waypointId: 70, eta: "2018-07-13" + "T11:00:01.000Z"},
        { waypointId: 71, eta: "2018-07-13" + "T14:00:01.000Z"},
        { waypointId: 72, eta: "2018-07-13" + "T16:00:01.000Z"},
        { waypointId: 73, eta: "2018-07-13" + "T18:00:01.000Z"},
        { waypointId: 74, eta: "2018-07-13" + "T19:00:01.000Z"},
        { waypointId: 75, eta: "2018-07-13" + "T20:00:01.000Z"}
	],
    extensions: {
	    weathermarkerwarninglevels:{
	        wave:3.5,
            wind:20,
            current:0.4
        },
        weathermarkersettings: [
            {waypointId:0, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:1, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:2, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:3, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:4, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:5, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:6, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:7, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:8, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:9, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:10, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:21, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:22, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:23, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:24, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:25, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:26, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:27, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:28, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:29, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:30, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:31, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:32, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:33, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:34, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:35, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:36, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:37, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:38, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:39, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:40, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:41, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:42, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:43, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:44, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:45, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:46, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:47, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:48, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:49, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:50, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:51, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:52, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:53, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:54, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:55, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:56, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:57, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:58, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:59, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:60, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:61, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:62, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:63, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:64, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:65, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:66, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:67, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:68, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:69, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:70, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:71, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:72, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:73, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:74, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
            {waypointId:75, nextwaypointdistance: 0.0, zoomdisplay: 0, visible: true},
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
    windowWidthAfterResize: 0,
    ShipIconPosition: 0 //position in percentage of the routebar - saved everytime icon is moved - repositioned everytime map and browser is scaled or moved to fit.
};



