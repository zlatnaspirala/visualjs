//########################################################
// PLAYER CONTROL AND OTHER KEYBOARD STAFF 
//########################################################


function KEYBOARD( c ){

var ROOT = this;

ROOT.CAPTURE_CHAR = "";
ROOT.LAST_CAPTURE_CHAR = "";

ROOT.ACTION_ON_KEY_DOWN = function(){};

this.CANVAS = c;
this.PROGRAM_NAME = c.id;


 
c.addEventListener('keydown', function(e)
{
    
	
	switch(e.keyCode)
		{
		case 8:
		e.preventDefault();
        SYS.DEBUG.LOG("prevent default for backspace.");   		
		
		}
	
	
	 SYS.DEBUG.LOG(" GAME RUNNING , key pressed: " + e.keyCode );
	 //SYS.SOUND.GEN( 50 , e.keyCode * 20 );
	 
	 if ( typeof PLAYER != 'undefined' ){ 
	 
	 if ( PLAYER.TYPE == "PLATFORMER" ){
	 
	 PLAYER.FREEZ = false;
	 
	switch(e.keyCode)
		{
		case 121:
        SYS.DEBUG.LOG("F10 command -->> Show command line ");   		
		
		case 69:
	 		
		case 37: // left
		    PLAYER.CONTROL.LEFT = true;
			PLAYER.X= PLAYER.SPEED; 
			 if (PLAYER.CONTROL.JUMP === false) {
			setTimeout( function(){PLAYER.POSITION.TRANSLATE_BY_Y(100)},50);
			 }
			 
		break;
		case 38: // up
		
		 if (PLAYER.CONTROL.JUMP === false) {
		 
		   PLAYER.BREAK_AT_MOMENT_STATUS = false;
		 
		    PLAYER.CONTROL.JUMP = true;
			
			PLAYER.Y= PLAYER.SPEED*10; 
			console.log(">>>>>>>" + PLAYER.Y);
			
			setTimeout( function(){
			  while (PLAYER.Y > 0){
			  
			PLAYER.Y = PLAYER.Y - PLAYER.SPEED/5; 
			  
		  }
			PLAYER.Y = -1;
			},100)	
				
				
			
		 }
		 
		break;
		case 39: // right
		
			PLAYER.CONTROL.RIGHT = true;
			PLAYER.X= -PLAYER.SPEED; 
			 if (PLAYER.CONTROL.JUMP === false) {
		 setTimeout( function(){PLAYER.POSITION.TRANSLATE_BY_Y(100)},50);
			 }
			 
		break;
		case 40: // down
		
		break;
		};

		}
	

		else if ( PLAYER.TYPE == "NORMAL" ){
	 
	 	switch(e.keyCode)
		{
		case 121:
        SYS.DEBUG.LOG("F10 command -->> Show command line ");   		
		
		case 69:
	 		
		case 37: // left
		PLAYER.X = PLAYER.X - PLAYER.SPEED;
		PLAYER.POSITION.TRANSLATE_BY_X ( PLAYER.X )
		
		break;
		case 38: // up
		
		PLAYER.Y= PLAYER.Y-PLAYER.SPEED; 
		PLAYER.POSITION.TRANSLATE_BY_Y ( PLAYER.Y )
		
		break;
		case 39: // right
		
		PLAYER.X= PLAYER.X+PLAYER.SPEED; 
		PLAYER.POSITION.TRANSLATE_BY_X ( PLAYER.X )
		
		break;
		case 40: // down
		
		PLAYER.Y= PLAYER.Y+PLAYER.SPEED; 
		PLAYER.POSITION.TRANSLATE_BY_Y ( PLAYER.Y )
		
		break;
		};
	 
	 }
	 
	 
	 
	 }
	 

//@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@
// SPECIAL FOR TEXTBOX
//@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@
SYS.DEBUG.LOG("KEYBOARD-->> Show users types : " + e.keyCode );   		
var keynum;
if(window.event){ keynum = e.keyCode;}else{if(e.which){ keynum = e.which;}}
//console.log(String.fromCharCode(keynum));

if (e.keyCode == 8) {
SYS.DEBUG.LOG("textbox delete last char!");   		
ROOT.CAPTURE_CHAR = remove_last( ROOT.CAPTURE_CHAR );

}
else {
ROOT.CAPTURE_CHAR+=(String.fromCharCode(keynum));
ROOT.LAST_CAPTURE_CHAR = (String.fromCharCode(keynum));
}


ROOT.ACTION_ON_KEY_DOWN();


//@@@@@@@@@@@@@@@@@@@@@@@@@



if (typeof ROOT.TARGET_MODUL != 'undefined' && typeof ROOT.TARGET != 'undefined' ) {
	
   window[ROOT.PROGRAM_NAME].ENGINE.MODULES.ACCESS(ROOT.TARGET_MODUL).GAME_OBJECTS.ACCESS(ROOT.TARGET).TEXTBOX.TEXT = ROOT.CAPTURE_CHAR;
	
}

//local_go.TEXTBOX.TEXT =  ROOT_EVENTS.ROOT_ENGINE.KEYBOARD.CAPTURE_CHAR;
//@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@


}, false);


//##############################################################################//##############################################################################
//##############################################################################//##############################################################################
c.addEventListener('keyup', function(e)
{
    
	 SYS.DEBUG.LOG(" GAME RUNNING , key up : " + e.keyCode );
	 //SYS.SOUND.GEN( 50 , e.keyCode * 20 );
	 
	 if ( typeof PLAYER != 'undefined' ){ 
	 
	 if ( PLAYER.TYPE == "PLATFORMER" ){
	 
	switch(e.keyCode)
		{
		case 121:
        SYS.DEBUG.LOG("F10 command -->> Show command line ");   		
		
		case 69:
	 		
		case 37: // left
 
           PLAYER.CONTROL.LEFT = false;
		   
		  while (PLAYER.X > 0 ){
			  
			PLAYER.X = PLAYER.X - PLAYER.SPEED/5; 
			  
		  }
			
			PLAYER.X = 0;
		
		break;
		case 38: // up
		
			  while (PLAYER.Y > 0){
			  
			PLAYER.Y = PLAYER.Y - PLAYER.SPEED/5; 
			  
		  }
			
			//PLAYER.Y = -1;
			
		    //PLAYER.POSITION.TRANSLATE_BY_Y(100)
		
		break;
		case 39: // right
            PLAYER.CONTROL.LEFT = false;			
		  while (PLAYER.X < 0){
			
			PLAYER.X = PLAYER.X + PLAYER.SPEED/5; 
			  
		  }
			
			PLAYER.X = 0;
		
		break;
		case 40: // down
		
		break;
		};

		}
	
	 
	 
	 
		else if ( PLAYER.TYPE == "NORMAL" ){
	 
	 	switch(e.keyCode)
		{
		case 121:
        SYS.DEBUG.LOG("F10 command -->> Show command line ");   		
		
		case 69:
	 		
		case 37: // left
		PLAYER.X = PLAYER.X - PLAYER.SPEED;
		PLAYER.POSITION.TRANSLATE_BY_X ( PLAYER.X )
		
		break;
		case 38: // up
		
		PLAYER.Y= PLAYER.Y-PLAYER.SPEED; 
		PLAYER.POSITION.TRANSLATE_BY_Y ( PLAYER.Y )
		
		break;
		case 39: // right
		
		PLAYER.X= PLAYER.X+PLAYER.SPEED; 
		PLAYER.POSITION.TRANSLATE_BY_X ( PLAYER.X )
		
		break;
		case 40: // down
		
		PLAYER.Y= PLAYER.Y+PLAYER.SPEED; 
		PLAYER.POSITION.TRANSLATE_BY_Y ( PLAYER.Y )
		
		break;
		};
	 
	 }
	 
	 
	 
	 }

}, false); 


}