/////////////////////////////////////////////////////////////////////////////////
//help core functions 
////////////////////////////////////////////////////////////////////////////////
 

var HOST = '46.101.172.93';
 
var ACCOUNTS = {
 LIST : [],
 INSERT : function(data){
 
  this.LIST.push(data);
  
 },
 getUserByEmail : function(email){
    
		//console.log("LENGTH" , this.LIST.length);
	   for (var x=0;x<this.LIST[0].length;x++){
	
		console.log("This is our userID email: "  , this.LIST[0][x].email );
		
		if (email == this.LIST[0][x].email ) {
		
		console.log("This is our userID: " , x );
		return this.LIST[0][x];
		
		}
				
	}

 },

 

};
 
var ROOMS = {

 LIST : [],
 INSERT : function(data){
 
  this.LIST.push(data);
  
 },
 
};


function randomIntFromTo(min,max){return Math.floor(Math.random()*(max-min+1)+min);}
var rand = function() {
    return Math.random().toString(36).substr(2) ;  
};
var token = function() {
    return rand() + rand();  
};


// email body html 
var emailtemplate = {

confirmLink : '',
confirmBody : '<div style="-moz-box-shadow:inset 0 0 20px #666666;-webkit-box-shadow: inset 0 0 20px #000000;box-shadow:inset 0 0 20px #000000;" > Please verify your email by clicking this link : ',
getConfirmBodyEmail : function(){
var local =  '<h1>Eroulete confirmation email </h1> <br/><br/> ' + this.confirmBody + ' <br/><br/>  ' + REG_PATH  + this.confirmLink + ' </div> <br/> thanks for visit ! ';
return local;
},

  
};


///////////////////////////////////////////////////////
//html dinamic Activate account Event
///////////////////////////////////////////////////////
function TOKEN__STACK(TOKEN_){
return "var socket = io.connect('"+HOST+":8000'); socket.on('connect', function(){socket.emit('activateAccount', '"+TOKEN_+"' );  setTimeout(function(){location.href='../../login.html'; },1000); console.log('CONNECTED');  });";
}


//used  onluy in games
var ACTIVE_PLAYERS = {
 LIST : [],
 INSERT : function(data){
 
  this.LIST.push(data);
  
 },
 
};



