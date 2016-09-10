/////////////////////////////////////////////////////
//Developer : Nikola Lukic zlatnaspirala@gmail.com 
/////////////////////////////////////////////////////
/**
High definition

COMMERCIAL PROJECT 

/**
Copyright 2016, zlatnaspirala@gmail.com
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are
met:


You must buy this game server 
THIS IS THE GAME SERVER



*/
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
 /////////////////////////////////////////////////////
//Developer : Nikola Lukic zlatnaspirala@gmail.com 
/////////////////////////////////////////////////////
/*

*/
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//High definition
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
 dl  = require('delivery');
var fs = require("fs");
var path = require('path');
var mysql      = require('mysql');
var express    = require("express");
var app = express();
var http = require('http');
var https = require('https');
var mkdirp = require('mkdirp');
function read(f) {return fs.readFileSync(f).toString();}
function include(f) {eval.apply(global, [read(f)]);}
var nodemailer = require('nodemailer');
function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}
function random (low, high) {
    return Math.random() * (high - low) + low;
}
function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}
 
  
var server = http.createServer(app); 


var io = require('socket.io').listen(server);
server.listen(12001);

console.log("    ");
console.log("...........................................................");
console.log(" Funny slot version : " , 12001);
console.log("...........................................................");
console.log("    ");
console.log("...........................................................");
console.log('Socket server listening on port : ' , 12001 );
console.log("...........................................................");
console.log("    ");

 
 
 // CONFIGURE SLOT 
 //proto 1.0 funny slot 
 //json format Best way 
 // characterPink must exist on client part like image object 
 // i will show you // I ALSO ADD NEW FIELD AND REPLACE PINK CHARACTER
 // 4 is minimum for normal work
 var SYMBOLS_REEL1 ={ rez : [   "characterPink" , "characterPink" , "character4" , "character4" , "character4" ,  "character3" , "character3" ] };
 var SYMBOLS_REEL2 ={ rez : [   "characterPink" , "characterPink" , "characterPink" , "character4" , "character4" , "character4" ,  "character3" , "character3" , "character3" ,  "character2" , "character2" ,  "character1"  ] };
 var SYMBOLS_REEL3 ={ rez : [   "characterPink" , "characterPink" , "characterPink" , "character4" , "character4" , "character4" ,  "character3" , "character3" , "character3"  , "character2" ,  "character1"  ] };
 
 
	//PAYOUT 
	var characterPink = 2,
	    character4 = 10, 
		character3 = 15,
		character2 = 50, 
		character1 = 200; 
	 
 
 
 
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//Networking
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$  
 
 //////////////////////////
 //Validate every signal in account view
 /////////////////////////	
io.sockets.on('connection', function (socket) {


socket.on('I_WANT', function(name){
	
	if (name == "FUNNYSLOT1") {
		
     console.log("I WANT ::::", name);
     socket.emit("CONFIG_REELS" , SYMBOLS_REEL1 ,  SYMBOLS_REEL2 , SYMBOLS_REEL3  );
		
	}
	
});

console.log("...........................................................");
console.log("GAME SERVER :CONECTED WITH NEW CLIENT !");
console.log("...........................................................");
 
 
 
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ 
socket.on('SPIN', function( BET ){
	
 
var rez1 =  randomInt (0,SYMBOLS_REEL1.rez.length-1)
var rez2 =  randomInt (0,SYMBOLS_REEL2.rez.length-1)
var rez3 =  randomInt (0,SYMBOLS_REEL3.rez.length-1)
 
/*	
var rez3 =  7; 
var rez1 =  7;
var rez2 =  7;
 */ 
//HARDCODE RESULTS 

console.log(SYMBOLS_REEL1.rez[rez1] , "===" , SYMBOLS_REEL2.rez[rez2] , "===" ,  SYMBOLS_REEL3.rez[rez3] )
var win = 0;

 if ( ( SYMBOLS_REEL1.rez[rez1].toString() ==  SYMBOLS_REEL2.rez[rez2].toString() ) && (SYMBOLS_REEL1.rez[rez1].toString() == SYMBOLS_REEL3.rez[rez3].toString()  ) )  {

   
     console.log("WINNIG COMBINATION !  reel id:" , rez1 , " BET : " , BET );
     eval(" win = "+SYMBOLS_REEL1.rez[rez1]+" * BET; "); 
	 console.log("WINNIG COMBINATION : for :" , rez1 , " BET : " , BET , " WIN IS :" , win);
	 socket.emit("COMBINATION" , rez1 , rez2 , rez3 , win );	
		 
 
 }
 else {
	 
	 socket.emit("COMBINATION" , rez1 , rez2 , rez3 , win );	
	 
 }	
		
});
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ 
 
 

//////////////////////////////////////////////////////////////////
//Disconnect event
//////////////////////////////////////////////////////////////////
socket.on('disconnect', function(){
        	
/* 		if (typeof usernames[socket.email] != 'undefined'){
		console.log("User disconnected!");
		delete usernames[socket.email];
        return;
		} */
		
});
	
});
	

