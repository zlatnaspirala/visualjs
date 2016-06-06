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
 HELLO_WORLD.ENGINE.CREATE_MODUL("TSHIRTS");
 
  //HELLO_WORLD.ENGINE.CREATE_MODUL("SLOT");
 
 
  //HELLO_WORLD.ENGINE.CREATE_MODUL("PLATFORMER");
  
 // var PLATFORMER =  HELLO_WORLD.ENGINE.MODULES.ACCESS_MODULE( 'PLATFORMER');
 

// just for demos 

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
 
}

