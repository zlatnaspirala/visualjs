//#################################################
//#################################################
// GamePlay network view
// Nikola Lukic
//#################################################
//#################################################

//MODULES
var express = 	 require("express");
var http = 			 require('http');
var https =	         require('https');



//start server
var server = http.createServer(app);
var io = require('socket.io').listen(server);
server.listen( 555 );



// NETWORKING	
io.sockets.on('connection', function (socket) {


  console.log("-------------------------------------------------------------");
  console.log("CONNECTED WITH GAME SERVER VJS 0.6 webgl three.js plugin");
  console.log("-------------------------------------------------------------");
  
				//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
				// PLAYER HANDLER
				//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ 
				socket.on('PLAYERS', function (data) {
				
				if (typeof data != 'undefined') {
				if (data.length < 250){

				console.log("COMMON :" + data)

				io.sockets.emit('realtime', "nameOfPLayer" , data );

				}
				}
				

				});
				//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
				//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

 
				
   });