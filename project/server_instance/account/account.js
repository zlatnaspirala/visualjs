module.exports = {

 //---------------------------------------------------------------------------------
NAME : 'account_system',
//---------------------------------------------------------------------------------

//---------------------------------------------------------------------------------//---------------------------------------------------------------------------------
// EMAIL SYSTEM CONFIG
//---------------------------------------------------------------------------------//---------------------------------------------------------------------------------
smtpTransport : require('nodemailer').createTransport("SMTP",{
host: "smtp.gmail.com", // hostname
secureConnection: false,
port: 587, // port for secure SMTP
requiresAuth: true,
domains: ["gmail.com", "googlemail.com"],
tls: {ciphers:'SSLv3'},
auth: {
user: "eroulete@gmail.com",
pass: "###"
}
}),
//---------------------------------------------------------------------------------//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------//---------------------------------------------------------------------------------

fs : '',

createEmailVerifyFile : function(path_ , script_inner){
	//fs.writeFile( "../www/html/users/" + path_ , "<html><head><script src='../../js/socket.io.js'></script><script src='https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js'></script></head><body> <h1> Cool... </h1><script>"+script_inner+"</script> </head></body>", function(err) {
  	this.fs.writeFile(  path_ , "<html><head><script src='../../lib/io/socket.io.js'></script><script src='https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js'></script></head><body> <h1> Cool... </h1><script>"+script_inner+"</script> </head></body>", function(err) {
 
	if(err) {
        return console.log(err);
    }else
	{
    console.log("The file was saved!");
	}
});  

},


 
SEND_EMAIL : function( sub_ , to , plain ) {

this.smtpTransport.sendMail({
   from: "Maximumroulette.com <eroulete@gmail.com>", // sender address
   to: "New user <"+to+">", // comma separated list of receivers
   subject: sub_, // Subject line
   html: plain // plaintext body
}, function(error, response){
   if(error){
       console.log("error in sending email" , error);
   }else{
       console.log("Message sent : " + response.message);
   }
});

},
//---------------------------------------------------------------------------------//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------//---------------------------------------------------------------------------------



//---------------------------------------------------------------------------------//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------//---------------------------------------------------------------------------------
//Database 
//---------------------------------------------------------------------------------//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------//---------------------------------------------------------------------------------
connection : require('mysql').createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'nikola',
  database : 'test'
}), 

handleDisconnect : function(){

  this.connection = require('mysql').createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'nikola',
  database : 'test'
}); 
	this.connection.connect(function(err){

if(!err) {
    
	console.log("Init..................... \n");  
    console.log("Database is connected ... \n");
	
} else {
    console.log("Error connecting database... \n" , err);  
}
});
	/////////////////////////////////////////////////////////////////////////
	
	this.connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
     setTimeout(function(){ this.handleDisconnect();    },500);                     // lost due to either server restart, or a
    } else { 
	// connnection idle timeout (the wait_timeout
	console.log('db error BIG', err);
	this.connection.end();
	setTimeout(function(){ this.handleDisconnect();    },500);                     // lost due to either server restart, or a
	
   //  throw err;                                  // server variable configures this)
    }
  });
  
  
},

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// handleDisconnect(); ubaci u start up  GET_ALL_USERS()
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

GET_ALL_USERS : function(){

this.connection.query('SELECT * from accounts', function(err, rows, fields) {
  if (!err){
    console.log(' GET ALL USERS : ', rows);
	ACCOUNTS.LIST = [];
	ACCOUNTS.INSERT(rows);
  
	}
  else
  {
    console.log('Error while performing Query.');
  }
});
  
},

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//TOP LIST 
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

// New account
//var NEW_ACCOUNT_POST = {   password: "nidza" , email:"zlatnaspirala@gmail.com" ,  token : token() };


ADD_NEW_ACCOUNT : function(post) {
var query = this.connection.query('INSERT INTO accounts SET ?', post, function (err, result) {});
console.log(query.sql);
},
//ADD_NEW_ACCOUNT(NEW_ACCOUNT_POST);


ACTIVATE_ACCOUNT : function(post) {

this.connection.query('UPDATE accounts SET active = ? WHERE token = ?', [post.active , post.token ]  ,  function (err, result) {

if (!err) {

console.log("ACTIVATE ACCOUNT");

}

});

},


SET_NEW_NICKNAME : function(post, email) {
var query = this.connection.query('UPDATE accounts SET nickname=? WHERE email=?', [post, email] , function (err, result) {
 if (!err){
 console.log("add new nickname evenk OK"); 
 }
 else {
 console.log("add new nickname event ERROR "); 
 }

});
},

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$  
//Session 

SETUP_SESSION : function(post) {
this.connection.query('UPDATE accounts SET online = ? WHERE token = ?', [ "yes" , post ] , function (err, result) {
console.log(post);
if (!err) {
console.log("setup session OK online = yes for token " , token);
}
else {
console.log("error in setup session");
}
});
},  

CLOSE_SESSION : function(post , ID) {

this.connection.query('UPDATE accounts SET online = ? WHERE token = ?', [ "no" , post ] );
this.connection.query('DELETE FROM level1 WHERE email = ?', [ ID ] , 
 function(err , result){
 if (!err) {
 
 console.log("player deleted from active games in level1 ");
 
 }else{
 
 console.log("player deleted from active games in level1 ERROR IN ");
 
 }
 
 });
//console.log(query.sql);
},
  
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// New room
//var ADD_ROOM_POST = {   id : "0" , game:"level1 room " ,  accesstoken : token() , wager : 0.1 , maxbet : 50  };
//ADD_NEW_ROOM(ADD_ROOM_POST);

ADD_NEW_ROOM : function(post) {
var query = this.connection.query('INSERT INTO rooms SET ?', post, function (err, result) {
 if (!err){
 
 console.log("add new room evenk OK"); 
 
 }
 else {
 
 console.log("add new room evenk ERROR : Maybe room already exist."); 
 
 }


});
//console.log(query.sql);
},



//LOAD_ROOMS();
//load rooms 
LOAD_ROOMS : function(post) {
var query = this.connection.query('SELECT * FROM rooms', function (err, rows, fields) {

  if (!err){
    
	console.log('ROOM  list : ', rows);
	ROOMS.INSERT(rows);
	
	}
  else
  {
    console.log('Error while performing Query : load rooms' , err);
  }

});
//console.log(query.sql);
},



};