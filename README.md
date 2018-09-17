# WeatherOnRouteMarker
Copyright 2018 - Danish Maritime Authority

Please read the license agreement and notice text file.

#### Weather On Route Marker or WORM
The Weather On Route Marker was developed by Danish Maritime Authority 2017,
by the department of E-Navigation, during the EfficienSea2 project, which has received funding from 
The European Union’s Horizon 2020 Research and Innovation Programme under Grant Agreement no. 636329
https://efficiensea2.org/

#### Demonstrator
The prototype was used as a demonstrator for: 
https://efficiensea2.org/wp-content/uploads/2018/04/Deliverable-4.5-and-D4.10-Operational-METOC-and-Ice-Chart-Service.pdf

The original prototype can be found here: 
https://github.com/maritime-web/BalticWeb-WOR


#### Route and RTZ
All references to "route" and "RTZ" is related to the "Route Sharing Format", which was developed during
"MONALISA" project (http://stmvalidation.eu/projects/) and can be found here: http://cirm.org/rtz/index.html.
In short, the RTZ is an XML document containing route information such waypoint coordinates, ETA, ETD, etc.
In this demonstration, the interesting RTZ bits reformatted into JSON and hardcoded. The intention here
was also to create awareness of the RTZ.

#### Plugins
OpenLayers - https://openlayers.org/ - base map - using openstreetmap
Turf - http://turfjs.org/ - very useful tool to math around with geostuff in OL

#### About the code
All code is as vanilla as possible to ensure that every part is easily understandable for developers. 
Please do not comment on crappy code, may I suggest accepting it as a charm instead.
