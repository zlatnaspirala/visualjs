//###############################################//###############################################
//###############################################//###############################################
// USER PART OF CONFIG CODE APP
/**
Filename : manifest.js
 
 manifest file for visual js Application . 
 !important Use this file just for edit fields , dont press enter for new line.

 created by Nikola Lukic zlatnaspirala@gmail.com
 www.maximumroulette.com 2016
*/
//###############################################//###############################################
//###############################################//###############################################
var APPLICATION = {

NAME : "prototype VISUAL-JS framework 0.5" ,
TYPE : "client" ,
VERSION : "0.9" ,
STATUS : "develop" ,
MULTILANGUAGE : false ,
IMAGE_LOADER_PREFIX : false , // false for fiddle support , we need absolute path . 
EDITOR : false,
EDITOR_AUTORUN : false,
LOCAL_SERVER : "127.0.0.1", 
ACCOUNT_SERVER : "127.0.0.1", ACCOUNT_SERVER_PORT : "3666" , ACCOUNT_SERVER_SECURE : false , ACCOUNT_SERVICE_AUTO_RUN : false,
DEVELOPERS : [ "Nikola Lukic Zlatnaspirala@gmail.com" ] , 

SINGLE_BROADCAST : false , 
MULTIRTC_PEER : true,
BOX2D : true , 

PROGRAM : { 
    CALCULATING_POSITION_BY : "CANVAS", // MONITOR is innerWidth..Height  or CANVAS is  canvas width
	RENDER_SPEED : 5 ,
	UPDATE_SPEED : 5 , 
},

SYSTEM : {
COLOR : "#afa9aa",
HOVER_COLOR : "#5991FF",
TEXT_COLOR : "#000000",
ACTOR_X : "",
ACTOR_Y : "",
},

};