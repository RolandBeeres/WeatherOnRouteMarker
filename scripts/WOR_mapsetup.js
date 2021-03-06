﻿
//CONTENT BUILDING -----------------------------------------------------------------------------------------

//Route start & end points - names: RouteStartDot, RouteEndDot
RouteDotStartBorderStyle = function () { //route start end style - scales according to zoom level in USER INTERACTION section
	return [new ol.style.Style({
		zIndex: 2,
		stroke: new ol.style.Stroke({
			color: 'rgba(0,100,0,1)',
			width: WOR.routeDotRadius * 1.2
		})
	})];
};
RouteDotStartInnerStyle = function () { //route start end style - scales according to zoom level in USER INTERACTION section
	return [new ol.style.Style({
		zIndex: 2,
		stroke: new ol.style.Stroke({
			color: 'rgba(0,200,0,1)',
			width: WOR.routeDotRadius
		})
	})];
};
RouteDotEndStyle = function () { //route start end style - scales according to zoom level in USER INTERACTION section
	return [new ol.style.Style({
		stroke: new ol.style.Stroke({
			color: 'rgba(200,0,0,1)',
			width: WOR.routeDotRadius
		})
	})];
};

var createRouteStartEndDots = function () {
	var featureStartDotBorder = new ol.Feature({ // create the feature
		geometry: new ol.geom.Circle([route.waypoints[0].lon, route.waypoints[0].lat]).transform('EPSG:4326', 'EPSG:3857'),
		name: 'RouteStartDot',
		lon: route.waypoints[0].lon,
		lat: route.waypoints[0].lat
	});
	var featureStartDotInner = new ol.Feature({ // create the feature
		geometry: new ol.geom.Circle([route.waypoints[0].lon, route.waypoints[0].lat]).transform('EPSG:4326', 'EPSG:3857'),
		name: 'RouteStartDotInner',
		lon: route.waypoints[0].lon,
		lat: route.waypoints[0].lat
	});
	var feature2 = new ol.Feature({ // create the feature
		geometry: new ol.geom.Circle([route.waypoints[route.waypoints.length - 1].lon, route.waypoints[route.waypoints.length - 1].lat]).transform('EPSG:4326', 'EPSG:3857'),
		name: 'RouteEndDot',
		lon: route.waypoints[route.waypoints.length - 1].lon,
		lat: route.waypoints[route.waypoints.length - 1].lat
	});
	featureStartDotBorder.setId('RouteStartDot');
	featureStartDotInner.setId('RouteStartDotInner');
	feature2.setId('RouteEndDot');
	featureStartDotBorder.setStyle(RouteDotStartBorderStyle());
	featureStartDotInner.setStyle(RouteDotStartInnerStyle());
	feature2.setStyle(RouteDotEndStyle());
	return [featureStartDotBorder, featureStartDotInner, feature2];
};



//ROUTE DOTS (waypoints)
RDstyle = function () { //route start end style - scales according to zoom level in USER INTERACTION section
	return [new ol.style.Style({
		stroke: new ol.style.Stroke({
			color: 'rgba(0,0,0,0.5)',
			width: 6
		})
	})];
};
RDAreastyle = function () { //route start end style - scales according to zoom level in USER INTERACTION section
	return [new ol.style.Style({
		stroke: new ol.style.Stroke({
			color: 'rgba(200,0,0,0.2)',
			width: WOR.routeDotRadius
		})
	})];
};
createRouteDots = function () {
	var features = [];
	if (route.waypoints.length > 2) {
		for (var i = 1; i !== route.waypoints.length - 1; i++) {
			var feature1 = new ol.Feature({ // create the feature
				geometry: new ol.geom.Circle([route.waypoints[i].lon, route.waypoints[i].lat]).transform('EPSG:4326', 'EPSG:3857'),
				name: 'RouteDot',
				routeDotNumber: i,
				lon: route.waypoints[i].lon,
				lat: route.waypoints[i].lat
			});
            feature1.setStyle(RDAreastyle());

			var feature2 = new ol.Feature({ // create the feature
				geometry: new ol.geom.Circle([route.waypoints[i].lon, route.waypoints[i].lat]).transform('EPSG:4326', 'EPSG:3857'),
				name: 'RouteDotArea',
				routeDotNumber: i,
				lon: route.waypoints[i].lon,
				lat: route.waypoints[i].lat
			});

			features.push(feature1);
			features.push(feature2);
		}
	}
	return features;
};


//ROUTE LEGS
var createRouteLegs = function () {
	var features = [];

	var lineStyle = function (linecolor) { //route start end style - scales according to zoom level in USER INTERACTION section
		return [new ol.style.Style({
			stroke: new ol.style.Stroke({
				color: linecolor,
				width: 5
			})
		})];
	};
	if (route.waypoints.length > 2) {
		for (var i = 0; i !== route.waypoints.length - 1; i++) {
			var coords = [];

			if (i < route.waypoints.length) { //give angle with the feature
				var start = [route.waypoints[i].lon, route.waypoints[i].lat];
				var end = [route.waypoints[i + 1].lon, route.waypoints[i + 1].lat];
				var rotation = turf.bearing(start, end);
			}

			coords.push([route.waypoints[i].lon, route.waypoints[i].lat]);
			coords.push([route.waypoints[i + 1].lon, route.waypoints[i + 1].lat]);
			var feature1 = new ol.Feature({ // create the feature
				geometry: new ol.geom.LineString(coords).transform('EPSG:4326', 'EPSG:3857'),
				name: 'routeleg',
				routeLegNumber: i,
				legrotation: rotation

			});
			feature1.setId('routeleg' + i);

			var setWarning = false;
			//make routeleg red or green pending on warning
            var legcolor = 'rgba(0,120,0,0.7)'; //default green
            // legcolor = 'rgba(200,0,0,0.7)'; //red
			console.log(route.extensions.weatherdata[0].forecasts[0]);
			try{
                if (route.extensions.weatherdata[i].forecasts[0].waveheight.forecast > route.extensions.weathermarkerwarninglevels.wave) setWarning = true;
                if (route.extensions.weatherdata[i].forecasts[0].windspeed.forecast > route.extensions.weathermarkerwarninglevels.wind) setWarning = true;
                if (route.extensions.weatherdata[i].forecasts[0].currentspeed.forecast > route.extensions.weathermarkerwarninglevels.current) setWarning = true;
			}catch(mapNotLoadedError){}
            // console.log("setWarning:",setWarning, route.extensions.weatherdata[i].forecasts[0].waveheight.forecast, route.extensions.weathermarkerwarninglevels.wave);

            if(setWarning) legcolor = 'rgba(200,0,0,0.7)';
			feature1.setStyle(lineStyle(legcolor));

			features.push(feature1)
		}
		return features;
	}
};




//Weather On Route Marker (WORM) generator

var retWORMTextStyle = function (scale, markertext) {
    var waypointtextoffset = 60;
    if (!scale) scale = 1;
    if (markertext === "nodata") markertext = "";
    var useimage = "images/emptyimage.png";
    var radOff = 0; //text offset in radians
    var WORMTextStyle = new ol.style.Style({
        zIndex: 49,
        image: new ol.style.Icon({
            opacity: 1,
            rotation: 0,
            anchor: [(0.5), (0.5)],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            src: useimage,
            scale: 1
        }),
        text: new ol.style.Text({
            font: 'bold 12px helvetica,sans-serif',
            text: markertext,
            // offsetX: 0,
            offsetY: waypointtextoffset * scale,
            scale: (1 * scale),
            fill: new ol.style.Fill({
                color: '#000'
            }),
            stroke: new ol.style.Stroke({
                color: '#fff',
                width: 1
            })
        })
    });
    return WORMTextStyle;
};

//creates a weather marker
var generateWORMText = function (identifier, type, lon, lat, scale, markertext) {
    if (!lon || !lat) { lon = 0; lat = 0; }
    // MARKERTEXT
    var iconFeature = new ol.Feature({
        geometry: new ol.geom.Point([lon, lat]).transform('EPSG:4326', 'EPSG:3857'),
        name: 'WOR_textmarker',
        type: type,
        identifier: identifier,
        src: 'images/emptyimage.png' //just anything
    });
    iconFeature.setStyle(retWORMTextStyle(scale, markertext)); //change stylíng
    iconFeature.setId(type);
    return [iconFeature];
};


var retWORMWaveStyle = function (scale, wavedir, waveheight, markertext) {
    if (!scale) scale = 1;
	wavedir += 45; //offset for wavepointer is pointing lowerright
	var useimage = (waveheight === "") ? 'images/WOR_backdropcircle_nowave.png' : 'images/WOR_backdropcircle.png';
	if(route.extensions.weathermarkerwarninglevels.wave > 0){ //warning status for max waveheight exceeded - 0 is ignored
        if(waveheight > route.extensions.weathermarkerwarninglevels.wave){
            useimage = 'images/WOR_backdropcircle_wavewarning.png';
		}
	}
	if (markertext === "nodata") useimage = "images/WOR_nodata.png"; //fallback
	if (!waveheight || waveheight===0) waveheight = "";
	var radOff = 3.47; //text offset in radians for current and wave indicator
	var WORMWaveStyle = new ol.style.Style({
		zIndex: 50,
		image: new ol.style.Icon({
			opacity: 0.75,
			rotation: degToRad(wavedir + 180),
			anchor: [(0.5), (0.5)],
			anchorXUnits: 'fraction',
			anchorYUnits: 'fraction',
			src: useimage,
			scale: (0.5 * scale)
		}),
		text: new ol.style.Text({
			font: '12px helvetica,sans-serif',
			text: ('' + returnRoundedStr(waveheight)),
			offsetX: calcSinCosFromAngle('x', degToRad(wavedir) + radOff, (40 * scale)),
			offsetY: calcSinCosFromAngle('y', degToRad(wavedir) + radOff, (40 * scale)),
			scale: (1 * scale),
			fill: new ol.style.Fill({
				color: '#000'
			}),
			stroke: new ol.style.Stroke({
				color: '#fff',
				width: 1
			})
		})
	});
	return WORMWaveStyle;
};

var retWORMCurrentStyle = function (scale, currdir, currstr, markertext) {
	if (!scale) scale = 1;
	currdir += 45; //offset for currentpointer is pointing lowerright
	(!currstr) ? currstr = "" : currstr * 1.9438444924574; // make "" if nothing, or meter/sec to knots.
	currstr = returnRoundedStr(currstr);
	var useimage = 'images/WOR_innercircle.png';
    if(route.extensions.weathermarkerwarninglevels.current > 0){ //warning status for max current exceeded - 0 is ignored
        if(currstr > route.extensions.weathermarkerwarninglevels.current){
            useimage = 'images/WOR_innercircle_currentwarning.png';
        }
    }
	if (markertext === "nodata") useimage = "images/emptyimage.png";
	var radOff = 3.25; //text offset in radians for current and wave indicator
	var WORMCurrentStyle = new ol.style.Style({
		zIndex: 51,
		image: new ol.style.Icon({
			opacity: (currstr!=="")?1:0,
			rotation: degToRad(currdir - 180), //currentpointer is pointing lowerright
			anchor: [0.5, 0.5],
			anchorXUnits: 'fraction',
			anchorYUnits: 'fraction',
			src: useimage, //needs path
			scale: (0.5 * scale)
		}),
		text: new ol.style.Text({
			font: '10px helvetica,sans-serif',
			text: ('' + currstr),
			offsetX: calcSinCosFromAngle('x', degToRad(currdir) + radOff, (18 * scale)),
			offsetY: calcSinCosFromAngle('y', degToRad(currdir) + radOff, (18 * scale)),
			scale: (1 * scale),
			fill: new ol.style.Fill({
				color: '#000'
			}),
			stroke: new ol.style.Stroke({
				color: '#fff',
				width: 1
			})
		})
	});
	return WORMCurrentStyle;
};


var retWORMWindStyle = function (scale, winddir, windstr, markertext, wavedir) { //windstr is m/s - wavedir is needed to make offset greater if pointing south so text doesnt overlap. 
	if (!scale) scale = 1;
	// var waypointtextoffset = 60;
	(!windstr) ? windstr = 1 : windstr * 1.9438444924574; // make 1 knot if nothing, or meter/sec to knots.
	var markerImageNamePath = "images/wind/";

	var warnImg = "";
    if(route.extensions.weathermarkerwarninglevels.wind > 0){ //warning status for max current exceeded - 0 is ignored
        if(windstr > route.extensions.weathermarkerwarninglevels.wind){
            warnImg = "red";
        }
    }

    //Determine wind marker image to display
	if (windstr < 1.9){
		markerImageNamePath += 'mark000'+warnImg+'.png';
	} else if (windstr >= 2 && windstr < 7.5) {
		markerImageNamePath += 'mark005'+warnImg+'.png';
	} else if (windstr >= 7.5 && windstr < 12.5) {
		markerImageNamePath += 'mark010'+warnImg+'.png';
	} else if (windstr >= 12.5 && windstr < 17.5) {
		markerImageNamePath += 'mark015'+warnImg+'.png';
	} else if (windstr >= 17.5 && windstr < 22.5) {
		markerImageNamePath += 'mark020'+warnImg+'.png';
	} else if (windstr >= 22.5 && windstr < 27.5) {
		markerImageNamePath += 'mark025'+warnImg+'.png';
	} else if (windstr >= 27.5 && windstr < 32.5) {
		markerImageNamePath += 'mark030'+warnImg+'.png';
	} else if (windstr >= 32.5 && windstr < 37.5) {
		markerImageNamePath += 'mark035'+warnImg+'.png';
	} else if (windstr >= 37.5 && windstr < 42.5) {
		markerImageNamePath += 'mark040'+warnImg+'.png';
	} else if (windstr >= 42.5 && windstr < 47.5) {
		markerImageNamePath += 'mark045'+warnImg+'.png';
	} else if (windstr >= 47.5 && windstr < 52.5) {
		markerImageNamePath += 'mark050'+warnImg+'.png';
	} else if (windstr >= 52.5 && windstr < 57.5) {
		markerImageNamePath += 'mark055'+warnImg+'.png';
	} else if (windstr >= 57.5 && windstr < 62.5) {
		markerImageNamePath += 'mark060'+warnImg+'.png';
	} else if (windstr >= 62.5 && windstr < 67.5) {
		markerImageNamePath += 'mark065'+warnImg+'.png';
	} else if (windstr >= 67.5 && windstr < 72.5) {
		markerImageNamePath += 'mark070'+warnImg+'.png';
	} else if (windstr >= 72.5 && windstr < 77.5) {
		markerImageNamePath += 'mark075'+warnImg+'.png';
	} else if (windstr >= 77.5 && windstr < 82.5) {
		markerImageNamePath += 'mark080'+warnImg+'.png';
	} else if (windstr >= 82.5 && windstr < 87.5) {
		markerImageNamePath += 'mark085'+warnImg+'.png';
	} else if (windstr >= 87.5 && windstr < 92.5) {
		markerImageNamePath += 'mark090'+warnImg+'.png';
	} else if (windstr >= 92.5 && windstr < 97.5) {
		markerImageNamePath += 'mark095'+warnImg+'.png';
	} else if (windstr >= 97.5) {
		markerImageNamePath += 'mark100'+warnImg+'.png';
	}

	//move the text a bit lower if the wavearrow points down
	if ((wavedir < 55 && wavedir > 0) || (wavedir > 305)) { 
		waypointtextoffset = 56;
	}

	var useimage = markerImageNamePath;
	if (markertext === "nodata") {
		useimage = "images/emptyimage.png";
		markertext = "";
	}

	var WORMWindStyle = new ol.style.Style({
		zIndex: 52,
		image: new ol.style.Icon(({
			opacity: 1,
			rotation: degToRad(winddir -180), //correct 180 degrees for icon
			anchor: [(0.52), (0.25)],
			anchorXUnits: 'fraction',
			anchorYUnits: 'fraction',
			src: useimage, //needs path and windstr to paint correct arrow
			scale: (0.80 * scale)
		}))
	});
	return WORMWindStyle;
};



//creates a weather marker
var generateWORM = function (identifier, type, lon, lat, scale, winddir, windstr, currdir, currstr, wavedir, waveheight, markertext) { //type is given so it can be styled.
	if (!lon || !lat) { lon = 0; lat = 0; }

	//display errormarker if no data
	if (winddir === 0 && windstr === 0 && currdir === 0 && currstr === 0 && wavedir === 0 && waveheight === 0 && markertext === 0) {
		markertext = "nodata"; //styling takes care of it from here
	}

    //TODO: cleanup windmarker for markertext items

    //WAVEARROW
	var iconFeature1 = new ol.Feature({
		geometry: new ol.geom.Point([lon, lat]).transform('EPSG:4326', 'EPSG:3857'),
		name: 'WOR_wavemarker',
		type: type,
		identifier: identifier,
		src: 'images/WOR_vessel_backdropcircle.png'
	});
	iconFeature1.setStyle(retWORMWaveStyle(scale, wavedir, waveheight, markertext)); //change stylíng
	iconFeature1.setId(type + '_wavemarker');

	//CURRENTARROW
	var iconFeature2 = new ol.Feature({
		geometry: new ol.geom.Point([lon, lat]).transform('EPSG:4326', 'EPSG:3857'),
		name: 'WOR_currentmarker',
		type: type,
		identifier: identifier,
		src: 'images/WOR_innercircle.png'
	});
	iconFeature2.setStyle(retWORMCurrentStyle(scale, currdir, currstr, markertext));
	iconFeature2.setId(type + '_currentmarker');

	//WINDARROW
	var iconFeature3 = new ol.Feature({
		geometry: new ol.geom.Point([lon, lat]).transform('EPSG:4326', 'EPSG:3857'),
		name: 'WOR_windmarker',
		type: type,
		identifier: identifier,
		src: 'images/wind/mark005.png'
	});
	iconFeature3.setStyle(retWORMWindStyle(scale, winddir, windstr, markertext, wavedir));
	iconFeature3.setId(type + '_windmarker');

	return [iconFeature1, iconFeature2, iconFeature3];
};




var retLoadingIconStyle = function () {
	var WORMLoadinStyle = new ol.style.Style({
		image: new ol.style.Icon(({
			opacity: 1,
			scale:0.3,
			anchor: [(0.5), (0.5)],
			anchorXUnits: 'fraction',
			anchorYUnits: 'fraction',
			src: 'images/loadingicon.png'
		}))
	});
	return WORMLoadinStyle;
};



var retLoadingIcon = function (lonlat) {
	var iconFeature = new ol.Feature({
		geometry: new ol.geom.Point(lonlat).transform('EPSG:4326', 'EPSG:3857'),
		name: 'WOR_loadingicon',
		src: 'images/loading.gif'
	});
	iconFeature.setStyle(retLoadingIconStyle()); //generated style
	iconFeature.setId("WORMLoadingIcon");
	return [iconFeature];

};




//END WEATHER ON ROUTE MARKER (WORM) *****************************************************


var generateRouteLayer = function () {
	var point = new ol.geom.Point([0, 0]).transform('EPSG:4326', 'EPSG:3857'); //transform to EPSG:3857
	var feature = new ol.Feature({ // create the feature
		geometry: point
	});
	var pointStyle = new ol.style.Style({
		stroke: new ol.style.Stroke({
			color: 'rgba(255,0,0,0)',
			width: 200
		})
	});
	var source = new ol.source.Vector({
		features: [feature]
	});
	var routeLayer = new ol.layer.Vector({
		source: source,
		style: [pointStyle],
		name: 'routeLayer'
	});
	return routeLayer;
};














