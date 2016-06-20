//###############################################//###############################################
//###############################################//###############################################
// USER PART OF CODE 
/**
Filename : login.js
This is part of visual-js canvas2d game engine

important : if you use this login template you must start up >node program.js

free for use 
*/
//###############################################//###############################################
//###############################################//###############################################


HELLO_WORLD.ENGINE.CREATE_MODUL("LOGIN");

var LOGIN_MODULE = HELLO_WORLD.ENGINE.MODULES.ACCESS_MODULE("LOGIN"); 

LOGIN_MODULE.NEW_OBJECT("Background_Login_Form" , 25 , 20 , 50 , 70 , 10);
Background_Login_Form.DRAG = false;
Background_Login_Form.CREATE_ANIMATION( SURF , "DRAW_FRAME" , 0 , RESOURCE.loadingBlock  , 1238767868763 , "no" , 1,11,1,1,1) ;

LOGIN_MODULE.NEW_OBJECT("Email_Login_Form" , 40 , 32 , 20 , 10 , 10);
Email_Login_Form.CREATE_TEXTBOX("enter email" , 10 , "black" , "#AEE7FF");
Email_Login_Form.TEXTBOX.BACKGROUND_OPACITY = 0.75;
Email_Login_Form.TEXTBOX.font = '21px Arial';

LOGIN_MODULE.NEW_OBJECT("Password_Login_Form" , 40 , 44 , 20 , 10 , 10);
Password_Login_Form.CREATE_TEXTBOX("enter password" , 10 , "black" , "#AEE7FF");
Password_Login_Form.TEXTBOX.BACKGROUND_OPACITY = 0.75;
Password_Login_Form.TEXTBOX.font = '21px Arial';

LOGIN_MODULE.NEW_OBJECT("BTN_LOGIN_Login_Form" , 30 , 62 , 20 , 10 , 10);
BTN_LOGIN_Login_Form.CREATE_TEXTBOX("login" , 10 , "black" , "#AEE7FF");
BTN_LOGIN_Login_Form.TEXTBOX.BACKGROUND_OPACITY = 0.75;
BTN_LOGIN_Login_Form.TEXTBOX.font = '21px Arial';

LOGIN_MODULE.NEW_OBJECT("BTN_REGISTER_Login_Form" , 51 , 62 , 20 , 10 , 10);
BTN_REGISTER_Login_Form.CREATE_TEXTBOX("register" , 10 , "black" , "#AEE7FF");
BTN_REGISTER_Login_Form.TEXTBOX.BACKGROUND_OPACITY = 0.75;
BTN_REGISTER_Login_Form.TEXTBOX.font = '21px Arial';


//before everything check fast login 
ACCOUNT_SYSTEM.CHECK_FAST_LOGIN()



ACCOUNT_SYSTEM.ON_SESSION_TAKE = function(){

 //LS_SET("email" , Email_Login_Form.TEXTBOX.TEXT );
 Email_Login_Form.TEXTBOX.TEXT = LS_GET("email");
 SYS.DEBUG.LOG('SESSION OPENED');
 
};


BTN_REGISTER_Login_Form.TAP = function(){

	if (validateEmail(Email_Login_Form.TEXTBOX.TEXT)) {
		
		Email_Login_Form.TEXTBOX.border_color = "rgba(121,121,222,0.8)";
		ACCOUNT_SYSTEM.SING_UP( Email_Login_Form.TEXTBOX.TEXT , Password_Login_Form.TEXTBOX.TEXT );
		
	}
	else {
		 
		Email_Login_Form.TEXTBOX.border_color = 'red';
		SYS.DEBUG.WARNING("Login form say : email is not valid.");
		
	}

};


BTN_LOGIN_Login_Form.TAP = function(){

	if (validateEmail(Email_Login_Form.TEXTBOX.TEXT)) {
		
		Email_Login_Form.TEXTBOX.border_color = "rgba(121,121,222,0.8)";
		ACCOUNT_SYSTEM.SING_IN( Email_Login_Form.TEXTBOX.TEXT , Password_Login_Form.TEXTBOX.TEXT );
		
	}
	else {
		 
		Email_Login_Form.TEXTBOX.border_color = 'red';
		SYS.DEBUG.WARNING("Login form say : email is not valid.");
		
	}

};






