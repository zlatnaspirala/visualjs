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
var SMODULE = HELLO_WORLD.ENGINE.MODULES.ACCESS_MODULE("STARTER"); 


SMODULE.NEW_OBJECT("textbox1" , 30 , 2 , 40 , 10 , 1 );
textbox1.CREATE_TEXTBOX("" , 10 , "black" , "lime") ;
 
SMODULE.NEW_OBJECT("textbox2" , 30 , 15 , 40 , 10 , 1 );
textbox2.CREATE_TEXTBOX("" , 10 , "black" , "lime") ;


	
setTimeout(function(){
	
		   //SYS.SCRIPT.LOAD("starter/templates/login.js")
		   //SYS.SCRIPT.LOAD("starter/templates/peer.js")
	
} , 1)