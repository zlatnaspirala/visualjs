/////////////////////////////////////////////////////
//Developer : Nikola Lukic zlatnaspirala@gmail.com 
/////////////////////////////////////////////////////
/**
GAME SERVER   FOR  VISUAL JS
  

*/
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//High definition
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
var CONFIG = require('./config');
var dl  =			 require('delivery');
var fs  = 			 require("fs");
var mysql = 		 require('mysql');
var express = 	 require("express");
var app = 			 express();
var http = 			 require('http');
var https =	     require('https');
var mkdirp =       require('mkdirp');
var nodemailer = require('nodemailer');
function include(f) {eval.apply(global, [read(f)]);}
function read(f) {return fs.readFileSync(f).toString();}

var REG_PATH = CONFIG.PATH_OF_WWW + CONFIG.REG_PATH ; 

include('lib/preinit.js');


var DATABASE = require('./account/account');
 
 DATABASE.handleDisconnect();
  
//BASE.SEND_EMAIL("test1212" , 'zlatnaspirala@gmail.com' , 'ha ha ha');

DATABASE.GET_ALL_USERS();
 

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// NO SECURE - HTTP 
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ 

var server = http.createServer(app);
var io = require('socket.io').listen(server);
server.listen(CONFIG.ACCOUNT_PORT);
console.log('Socket server listening on port : ' , CONFIG.ACCOUNT_PORT);
 
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ 


 





//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ 
//Networking
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ 

// usernames which are currently connected to the common (free for all emit)
var usernames = {};

 //////////////////////////
 //Validate every signal in account view
 /////////////////////////
 
	
io.sockets.on('connection', function (socket) {

  console.log("-------------------------------------------------------------");
  console.log("CONNECTED WITH GAME SERVER VJS 0.5 --");
  console.log("-------------------------------------------------------------");

/*
 //FILE TRANSFER 
  var delivery = dl.listen(socket);
       var MOME = "";
    delivery.on('delivery.connect',function(delivery){
  
    delivery.on('send.success',function(file){
      console.log('File successfully sent to client!');
    });

    delivery.on('receive.success',function(file){
    
    if (MOME != file.name){
    MOME = file.name;
    var params = file.params;
    
    console.log("FILE IS IT IMAGE1 : " , MOME );
 
    //maximum size    
  if (file.size < 250000 && ( file.name.indexOf(".png") > -1 || file.name.indexOf(".jpg") )  ) {
    
   var fileName = socket.email.replace('@', '___');
   fileName = fileName.replace('a', '127');
   fileName = fileName.replace('u', '133');
   fileName = fileName.replace('i', '14_');
   fileName = fileName.replace('o', '152');
   fileName = fileName.replace('e', '16__');
    var fileName = 'profiles/' + fileName + '.jpg';
    
    fs.writeFile(  fileName ,file.buffer, function(err){
       if(err){
         console.log('File could not be saved.');
       }else{

	 socket.emit( 'rooms' , 'PPP', "Nice profile image.Thanks for using maximumroulette" );
	 console.log('File saved.' , fileName );   

       };
     });
     
     }
     else {
     
      socket.emit( 'rooms' , 'ERROR', "IMAGE NOT VALID!" );
      console.log("IMAGE NOT VALID! : ");
	  
	  
     }
     
     // send new image to client 
       }
   });
  */
    
	

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// GLOBAL PUBLIC CHAT - USE FOR ANY STAFF
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ 
    socket.on('sendchat', function (data) {
		if (typeof socket.email != 'undefined') {
        // we tell the client to execute 'realtime' with 2 parameters
		var private_email = socket.email.toString().substr(0, 4) ;
		if (typeof socket.email != 'undefined' && data.length < 150){
		
		     console.log("COMMON :" + data)
		
             io.sockets.emit('realtime', private_email , data);
		
		}
		else{
		
	      	io.sockets.emit('realtime', private_email , " Try to send big data , 150 length is maximum for this chat.");
		
		}
		}
		else{
			// we dont have any data about client
			console.log("no access for this network package");
			
		}
		
    });
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

 
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ 
//REGISTER EVENT
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    socket.on('register', function( email , password ){
	
	    console.log("register  ACTION :" , password , " email " , email);
		
        socket.email = email;
        
		var check_local = 0;
		
		for (var x=0;x<ACCOUNTS.LIST[0].length;x++){
		
		if (ACCOUNTS.LIST[0][x].email == email) {
		
		check_local = 1;
		console.log("This email already exist : " , email);
		io.sockets.emit('realtime',  "registerFeild" , "Email already exist " + email);
		
		}
		
		}
		
		if (check_local == 0) {
		
		console.log("This email is OK for register: " , email);
		NEW_ACCOUNT_POST = {   password: password , email: email ,   token : "index" + token() };
		ADD_NEW_ACCOUNT(NEW_ACCOUNT_POST);
		io.sockets.emit('realtime',  "registerDoneMailVerification" , "Just goto your email and click on confirmation link.");
		emailtemplate.confirmLink = NEW_ACCOUNT_POST.token.toString();
		SEND_EMAIL ( 'YOUR APP SEND email confirmation' , email , emailtemplate.getConfirmBodyEmail() );
		console.log( "confirm email was sent.");
		mkdirp( CONFIG.PATH_OF_WWW + "/users/" + emailtemplate.confirmLink  , function(err) { 
		console.log( "make dir error = " , err);
		var local_1 = TOKEN__STACK(emailtemplate.confirmLink);
		
		createEmailVerifyFile( emailtemplate.confirmLink + "/index.html" , local_1 );
		
		});
		
	
		
		
		}
		

		
	 

		
    });

	
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
		
    socket.on('activateAccount', function(token_){
	
	console.log("Activate new user with token : " , token_ );
	ACTIVATE_ACCOUNT({   active  : "yes" , token : token_ });
	
  	});	
	
	
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ 


//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ 
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ 
//LOGIN EVENT

  socket.on('fast_login', function(email , accesstoken ){
	
	    console.log("FAST LOGIN ACTION :" , accesstoken , " email " , email);
	
		ACCOUNTS.LIST[0].forEach(function(entry) {
		
         console.log("DALI JE ONLJHNE ONLINE :" , entry.online);
	    if (entry.email == email && entry.token == accesstoken && entry.active == "yes" && entry.online == "yes" )
		{

		  var query = DATABASE.connection.query('SELECT online FROM accounts WHERE email=?' , [ email ]  , function (err, result) {
        if (!err){
	  if ( result[0].online == "yes") {
			socket.email = email;
			usernames[email] = email;
			console.log("USER ON SESSION ." , email  );
			DATABASE.SETUP_SESSION(entry.token);
			return;
	  }else{
	  
	  
	  }
	  
	  }else
	  {
	  
	  
	  
	  }
	  });
		}  
		   
		   
	
        });
		
	
  });
	   
	
///////////////////////////////////////////////
//LOGIN
socket.on('login', function(email , password ){
	
	DATABASE.connection.query('SELECT * from accounts', function(err, rows, fields) {
  if (!err){
    //console.log('Users list : ', rows);
	ACCOUNTS.LIST = [];
	ACCOUNTS.INSERT(rows);
  
	 console.log("LOGIN ACTION :" , password , " email " , email);
	
		ACCOUNTS.LIST[0].forEach(function(entry) {
		
         //console.log("ovo su korisnici" , entry);
	     if (entry.email == email && entry.password == password && entry.active == "yes" )
		 {

		
		 
		 // we store the username in the socket session for this client
        socket.email = email;
        // add the client's username to the global list
        usernames[email] = email;
		
		console.log("USER ON SESSION ." , email  );
		entry.online = "yes";
		console.log(entry.token);
		DATABASE.SETUP_SESSION(entry.token);

        // echo to client they've connected
	    socket.emit('TAKE', entry.token , entry.rank );
		
        // echo globally (all clients) that a person has connected
        //socket.broadcast.emit('realtime', 'SERVER' , email + ' is online .'  );
		
		// update the list of users in chat, client-side
        //io.sockets.emit('NODE_SESSION', usernames);
		return;
		}  
		   
		   
	
        });
		
		
		
 }
  else
  {
    console.log('Error while performing Query.');
  }
});
		
		
    });

	
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ 
//Set nickname

	

	
	
socket.on('getRoomList', function( email , accesstoken ){


     // var NIK  = validateAcess(email,accesstoken);
	//  console.log(NIK);

 	    var private_check = 0;
		ACCOUNTS.LIST[0].forEach(function(entry) {
        //console.log( entry.email + "<>" +  email );		
		//console.log( entry.email ==  email );		
		console.log( entry.token +"<>"+ accesstoken );		
	    if (entry.email == email && entry.token == accesstoken && entry.active == "yes" && entry.online == "yes" )
		
		{
		
		private_check = 1;
		console.log("OK");
		
		
		}  
		
		
       });  
		
		
if (private_check == 1){
console.log("getRoomsList EVENT OK" , ROOMS.LIST );

 socket.emit( 'rooms' , 'roomList', ROOMS.LIST );

}else {

console.log("something wrong in getRoomsList EVENT" , private_check);

socket.emit( 'rooms' , 'ERROR', "You are not logged in." );


}



// SEND PROFILE IMAGE

try{
      var fileName = socket.email.replace('@', '___');
   fileName = fileName.replace('a', '127');
   fileName = fileName.replace('u', '133');
   fileName = fileName.replace('i', '14_');
   fileName = fileName.replace('o', '152');
   fileName = fileName.replace('e', '16__');
      fileName = 'profiles/' + fileName + '.jpg';
    
    delivery.send({
      name: 'fileName',
      path : './' + fileName + ''
    });
    
    console.log("OKOK<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
    }
 catch(e){
 console.log("ERROR<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<" , socket);}
 
 

});
		
	
socket.on('loadNickName', function( email , accesstoken ){
 	    var private_check = 0;
		
		console.log("load nickname " );
		
		ACCOUNTS.LIST[0].forEach(function(entry) {
	    if (entry.email == email && entry.token == accesstoken && entry.active == "yes" && entry.online == "yes" )
		{
		
		//LOAD_NEW_NICKNAME( email );
		
			var query = DATABASE.connection.query('SELECT nickname FROM accounts WHERE email=?', [ email ] , function (err, result) {
			if (!err){
			socket.emit( 'rooms' , 'loadNickName', result );
			console.log("load nickname evenk OK" , result); 
			}
			else {
			console.log("load nickname event ERROR "); 
			}

			});
		
		private_check = 1;
		console.log("load nickname OK" );
		}
       });  
		
		
if (private_check == 1){

 socket.emit( 'rooms' , 'newNickName', null );

}else {

console.log("something wrong in setNewNickName EVENT" , private_check);

}

});
	
	
socket.on('setNewNickName', function( email , accesstoken , NewNickName ){
 	    var private_check = 0;
		ACCOUNTS.LIST[0].forEach(function(entry) {
	    if (entry.email == email && entry.token == accesstoken && entry.active == "yes" && entry.online == "yes" )
		{
		
		SET_NEW_NICKNAME( NewNickName , email );
		private_check = 1;
		console.log("set new nickname OK" , NewNickName);
		}
       });  
		
		
if (private_check == 1){

 socket.emit( 'rooms' , 'newNickName', null );

}else {

console.log("something wrong in setNewNickName EVENT" , private_check);

}

});

/////////////////
//new password 
////////////////
socket.on('newpass', function( email ){

console.log("new pass request for " , email );

ACCOUNTS.LIST[0].forEach(function(entry) {
if (entry.email == email && entry.active == "yes" )
{

console.log("new pass : OK , email exist and it is active  " , email );

var post = rand();
post = post.substring(0, post.length-1);
post = post.substring(0, post.length-1);
post = post.substring(0, post.length-1);

console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" , post);
var query = DATABASE.connection.query('UPDATE accounts SET password=? WHERE email=?', [post, email] , function (err, result) {


if (!err){
	
	console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" , post);
	
	//post = post.substring(0, post.length-1);
	
var P = " <img src='http://maximumroulette.com/welcome/images/features_img.png' width='250px' >  \n - You are requested new password from maximumroulette.com \n " +
" Please remember the password and delete this email .\n If you did not asked for password please report abuse directly in reply msg.\n" + 
" New password : " + post + "<<<<<<<<<<<<<<COPY   \n   ";

SEND_EMAIL ( "Important msg from maximumroulette.com" , email , P );

 socket.emit( 'rooms' , 'ERROR', "New password has been sent to your email." );

}else 
{
console.log("Error in updating password...query");
}

});

}

});

});
	
	//////////////////////////////////////////////////////////////////
	//Disconnect event
	//////////////////////////////////////////////////////////////////
	
    
socket.on('disconnect', function(){
        
		
		if (typeof usernames[socket.email] != 'undefined'){
		
		ACCOUNTS.LIST[0].forEach(function(entry) {
	    if (entry.email == usernames[socket.email] )
		{
		DELAY_SESSION_DEAD(entry.token, socket.email);
		console.log("DISCONNECTED : " , usernames[socket.email]);		
		delete usernames[socket.email];
        return;
		}
		});
		
		
		}
		
        // update list of users in chat, client-side
        io.sockets.emit('updateusers', usernames);
        // echo globally that this client has left
        socket.broadcast.emit('realtime', 'SERVER', socket.username + ' has disconnected');
});
	
	
	
	///////////////////////////////////////////////////////////////////
	// closing session after 20 sec if user are not on some of web pages
	///////////////////////////////////////////////////////////////////
	function DELAY_SESSION_DEAD(data, edata) {
	
	setTimeout( function () {
	var private_status = 0;
	
		ACCOUNTS.LIST[0].forEach(function(entry) {
	    if (entry.email == usernames[edata] )
		{
		
		     private_status = 1;
			 console.log(" SESSION STILL ALIVE ");
             return;
		}
		
		});
		
		if(private_status==0){
		DATABASE.CLOSE_SESSION(data , edata);
		ACCOUNTS.getUserByEmail(edata).online = "no";
	    console.log("MAIN server PROGRAM SAY : This user is not online no more : user token" ,data);
	    }
		
	} , CONFIG.DESTROY_SESSION_AFTER_X_mSECUNDS );
	
	}
	///////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////
	

   });
	
