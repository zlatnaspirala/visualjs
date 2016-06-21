//////////////////////////
// NETWORKING
// USER REGISTER
//////////////////////////


var ACCOUNT_SYSTEM = {

 socket : null ,
  
 CONNECT : function(){
 
 if (APPLICATION.ACCOUNT_SERVER_SECURE == false){
 
 this.socket = io.connect('http://'+APPLICATION.ACCOUNT_SERVER+':' + APPLICATION.ACCOUNT_SERVER_PORT);
 ATACH_GAME_SERVER_EVENTS()
 SYS.DEBUG.LOG("Connecting to game server account.................");
 SYS.DEBUG.WARNING("No secure connection in use. If your server use https you must switch secure parameters in client manifest file.");
 
 }
 else {
 
 SYS.DEBUG.LOG("Connecting to game server account.................");
 
 }
 
 
 },
 REQUEST_NEW_PASS : function(newpass){
 
 	this.socket.emit('newpass', newpass );
  
 },
 SING_UP : function(username ,  pass ){

	this.socket.emit('register',   username ,  pass );

 },
 SING_IN : function(username , pass){
    
	this.socket.emit('login',   username ,  pass );
    
 },
 FAST_LOGIN : function(){
 
	this.socket.emit('fast_login',  LS_GET("email")  ,  LS_GET("sessionAccess") );
	setTimeout( function(){
	
	ACCOUNT_SYSTEM.socket.emit('getRoomList',  LS_GET("email")  ,  LS_GET("sessionAccess") );
	ACCOUNT_SYSTEM.socket.emit('loadNickName',  LS_GET("email")  ,  LS_GET("sessionAccess") );
	
	}, 1000 );

 
 },
  SEND_PUBLIC : function(MSG){
 
	this.socket.emit('sendchat',   "EMAIL HERE" ,  MSG );
 
  },
 

 ON_SESSION_TAKE : function(){},


 CHECK_FAST_LOGIN : function(){
 
	 if (LS_GET("email") != null && LS_GET("sessionAccess") != null ) {
        
		ACCOUNT_SYSTEM.FAST_LOGIN()
		
	 }
 
 },

};



 
   //S_( "email" , E("login").value);
   

function ATACH_GAME_SERVER_EVENTS() {
   
ACCOUNT_SYSTEM.socket.on('connect', function(){
   
	   SYS.DEBUG.LOG("CONNECTED WITH IO , GOOD LUCK");      

});


ACCOUNT_SYSTEM.socket.on('TAKE', function(data , data1) {

SYS.DEBUG.LOG("Server send signal : >TAKE< , data : " , data , " . data1 :" , data1 );

LS_SET("sessionAccess" , data);
LS_SET("rank" , data1);
ACCOUNT_SYSTEM.ON_SESSION_TAKE();
//setTimeout(function(){location.href = "account.html";},350);

});	


ACCOUNT_SYSTEM.socket.on('realtime', function (EVENT_, data) {

SYS.DEBUG.LOG("Server send signal : >realtime< , event name : " + EVENT_   + " . data :" + data );
 
 if (EVENT_ == "registerDoneMailVerification") {
 
 // location.href = "verify.html";
 
 }
 else if (EVENT_ == "registerFeild") {
 
 //location.href = "regfeild.html";
 
 }
 
 
});

	
ACCOUNT_SYSTEM.socket.on('NODE_SESSION', function(data) {

	SYS.DEBUG.LOG("Server send signal : >NODE_SESSION< , data : " , data );

});
	
}


/*
IDE U onconnect : 

 var delivery = new Delivery(socket); 

      $("input[type=submit]").click(function(evt){
        var file = $("input[type=file]")[0].files[0];
        var extraParams = {foo: 'bar'};
	  
        delivery.send(file, extraParams);
        evt.preventDefault();
      });
    

    delivery.on('send.success',function(fileUID){
      console.log("file was successfully sent.");
    });
    
    //////////////////////////////////////////////
    
  delivery.on('receive.start',function(fileUID){
      console.log('receiving a file!');
    });

    delivery.on('receive.success',function(file){
      if (file.isImage()) {
	   
	   setTimeout ( function(){
	   
		E('profileImage').src = file.dataURL();
            S_( "profileImage" , file.dataURL() );	
		
		}, 5000 );
		
      };
    });

*/