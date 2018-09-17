//Handles everything with the controlinterface

//declarations for controlinterface
var controlinterface_clickmarker_enabled = false;
var controlinterface_texttoggle_enabled = false;


function controlinterfacehide(hide){
    if(hide===true){//deny user control
        document.getElementById("mapcontrolinterface").style.opacity = "0.3";
        document.getElementById("mapcontrolinterfacecover").style.left = "0px"; //cover interaction
        document.getElementById("mapcontrolinterface").classList.add('deny-pointerevents');
    }else {
        document.getElementById("mapcontrolinterface").style.opacity = "0.9";
        document.getElementById("mapcontrolinterfacecover").style.left = "-20000px"; //allow interaction
        document.getElementById("mapcontrolinterface").classList.remove('deny-pointerevents');
        if(controlinterface_texttoggle_enabled === true){
            for(var i=0;i!==route.waypoints.length;i++){
                updateRouteWORMTextFunction(i);
            }
        }
    }
}

function buttonToggle(button){ //handles toggle of buttons
    if(button === "clickmarker"){
        if(controlinterface_clickmarker_enabled){
            document.getElementById("button_clickmarker_toggle").classList.remove('toggled');
            controlinterface_clickmarker_enabled = false;
        }else{
            document.getElementById("button_clickmarker_toggle").classList.add('toggled');
            controlinterface_clickmarker_enabled = true;
        }
    }
    if(button === "texttoggle"){
        if(controlinterface_texttoggle_enabled){
            document.getElementById("button_text_always_on_toggle").classList.remove('toggled');
            controlinterface_texttoggle_enabled = false;
            hideMarkerTexts();
        }else{
            document.getElementById("button_text_always_on_toggle").classList.add('toggled');
            controlinterface_texttoggle_enabled = true;
            displayMarkerTexts();
        }
    }
}
