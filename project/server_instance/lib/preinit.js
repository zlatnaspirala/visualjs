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


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


// email body html /* + this.REG_PATH */ 
var emailtemplate = {

REG_PATH : '',
confirmLink : '',
confirmBody : '<div style="border: solid #84ff49;border-radius: 28px;padding-left: 20px;background: black;color: lightskyblue;" >Visual JS confirmation email  </br>',
getConfirmBodyEmail : function(ROOT_PATH){
var local =   this.confirmBody + '<h1> Please verify your email by clicking this link :  </h1> <br/><br/>  <br/>  <a style="fontSize:200%" href="' + ROOT_PATH+'/index.html"> Confirm your email here </a>    <br/> thanks for using my app ! <br/><br/></div>';
return local;
},

  
};


///////////////////////////////////////////////////////
//html dinamic Activate account Event
///////////////////////////////////////////////////////
function TOKEN__STACK(TOKEN_){
return "var socket = io.connect('"+HOST+":3666'); socket.on('connect', function(){socket.emit('activateAccount', '"+TOKEN_+"' );  setTimeout(function(){location.href='../../index.html'; },1000); console.log('CONNECTED');  });";
}


//used  onluy in games
var ACTIVE_PLAYERS = {
 LIST : [],
 INSERT : function(data){
 
  this.LIST.push(data);
  
 },
 
};



