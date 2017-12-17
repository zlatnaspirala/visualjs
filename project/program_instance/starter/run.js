//###############################################//###############################################
//###############################################//###############################################
// USER PART OF CODE 
/**
Filename : run.js

*/
//###############################################//###############################################
//###############################################//###############################################

// START THE PROGRAM 
// MAIN DRAW INTERVAL SWITCH 

// FOR CANVAS RESIZE_TYPE = FIXED
SYS.DOM.CREATE_SURFACE( "SURF" , "HELLO_WORLD" , 100 , 99.4 , "DIAMETRIC" );

//NOW HELLO_WORLD IS OBJECT WITH ONE CANVAS TAG
HELLO_WORLD.ENGINE.CREATE_MODUL("STARTER");
var STARTER = HELLO_WORLD.ENGINE.MODULES.ACCESS_MODULE("STARTER");
 
 
//SYS.SCRIPT.LOAD("starter/templates/paths.js")

STARTER.NEW_OBJECT("IamNewObject" , 45 , 85 , 15 , 15 , 10);

IamNewObject.CREATE_ANIMATION( SURF , "DRAW_FRAME" ,0 , RESOURCE.Tiles  , 111 , "yes" , 1,11,1,1,1) ;

IamNewObject.TYPE_OF_GAME_OBJECT = 'CUSTOM';
IamNewObject.ANIMATION.DRAW_TYPE = "DIRECT";

 
IamNewObject.CUSTOM = function (s) {


 this.ANIMATION.DRAW(1,1,11,11 , "yes")


}




//IamNewObject.CREATE_COLLISION()



STARTER.NEW_OBJECT("IamNewObject2" , 45 , 85 , 15 , 15 , 10);

IamNewObject2.CREATE_ANIMATION( SURF , "DRAW_FRAME" ,0 , RESOURCE.Tiles  , 1111123123 , "no" , 1,11,1,1,1) ;

IamNewObject2.CREATE_COLLISION()

IamNewObject2.ON_COLLISION  = function ( obj )
{

console.log("COLLIDE WITH" + obj)

}
