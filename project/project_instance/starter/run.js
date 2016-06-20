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
// SYS.DOM.CREATE_SURFACE( "SURF" , "HELLO_WORLD" , VIEW.W() , VIEW.H() );


SYS.DOM.CREATE_SURFACE( "SURF" , "HELLO_WORLD" , 100 , 99.4 , "DIAMETRIC" );


//NOW HELLO_WORLD IS OBJECT WITH ONE CANVAS TAG
 HELLO_WORLD.ENGINE.CREATE_MODUL("STARTER");
 
 ACTIVATE_PEER()
 
 
HELLO_WORLD.ENGINE.MODULES.ACCESS_MODULE("STARTER").NEW_OBJECT("IamNewObject" , 5 , 50 , 30 , 20 , 10);

var GENERIC_NAME_OBJECT = "IamJustAGameObject" + SYS.MATH.RANDOM_INT_FROM_TO(1,1000000000);

HELLO_WORLD.ENGINE.MODULES.ACCESS_MODULE("STARTER").NEW_OBJECT( GENERIC_NAME_OBJECT , 35 , 30 , 40 , 20 , 10);
HELLO_WORLD.ENGINE.MODULES.ACCESS_MODULE("STARTER").GAME_OBJECTS.ACCESS(GENERIC_NAME_OBJECT).CREATE_ANIMATION( SURF , "DRAW_FRAME" ,0 , RESOURCE.Tiles  , 45465465456456 , "no" , 1,11,1,1,1) ;



IamNewObject.ON_PEER_CREATED = { "DONE" : function(){
	
	
	
	MAIN_PEER.CHANNEL.SET('LEVEL1')   
	
	MAIN_PEER.CONNECT_TO_CHANNEL()
	 
	
     }

};
	
IamNewObject.CREATE_PEER()


	
setTimeout(function(){
	
		//  SYS.SCRIPT.LOAD("starter/templates/login.js")
	
} , 1)
	
	
/* // just for demos 

if ( window.location.search == "?demo1"){
	
	SYS.SCRIPT.LOAD("starter/demo1.js")
	
}
else if ( window.location.search == "?demo2"){
	
	SYS.SCRIPT.LOAD("starter/demo2.js")
}
else if ( window.location.search == "?demo3"){
	
	SYS.SCRIPT.LOAD("starter/demo3.js")
}
else if ( window.location.search == "?funny"){
	
	SYS.SCRIPT.LOAD("starter/funny.js")
}
else if ( window.location.search == "?tshirts"){
	
	SYS.SCRIPT.LOAD("starter/tshirts_desing.js")
}
else  {
	
 //SYS.SCRIPT.LOAD("starter/platformer.js")
 
} */

