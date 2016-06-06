#  Readme file #


    creator : Nikola Lukic
    about : Visual JS 2d canvas multiplatform game engine
    This is JavaScript game engine  (server part node.js / client part js)
    Js framework with windows GUI editor and game instance creator. 
    
	**Basic licence rules :** 
	
	1) Each file in this project has its own license , be careful , do not violate the basic rules.
	
	2) You are free to use any version of Visual JS library in any other project (even commercial projects) as long as the copyright header is left intact
	  Except for plugins on sale and graphics that come with them (they have special commercial licence).
	
        3)Please read the following terms and conditions before using this application: 

        Disclaimer of warranty
          'Visual js' is provided "as-is" and without warranty of any kind, express, implied or otherwise, 
          including without limitation, any warranty of merchantability or fitness for a particular purpose.   
          In no event shall the author of this software be held liable for data loss, 
          damages, loss of profits or any other kind of loss while using or misusing this software.	
          
         
         
         /////////////////
         //Try online 
         /////////////////
          -Add new game Object with single image:
          https://jsfiddle.net/zlatnaspirala/rjf0xe0a/

         -Use For loop for creating objects
         https://jsfiddle.net/zlatnaspirala/noax17kz/

         -Visual JS -Add Webcam to Object
         https://jsfiddle.net/zlatnaspirala/xsffd9v6/

         -Add webcam with motion detect
         https://jsfiddle.net/zlatnaspirala/j60hh052/

          -ZoomIn/ZoomOut game_object effect
         https://jsfiddle.net/zlatnaspirala/pjjow5q6/



   External licences in this project : 

   - Webcam NUI control is under :
      Created by Romuald Quantin.
     http://creativecommons.org/licenses/by-nc-sa/3.0/

     Download from : 
     https://www.adobe.com/devnet/archive/html5/articles/javascript-motion-detection.html
    
   - WEBRTC - webcam communication is under :        
       Creator Muaz Khan         

       www.MuazKhan.com
       MIT License       - www.WebRTC-Experiment.com/licence

       Experiments       - github.com/muaz-khan/WebRTC-Experiment

## Installation and setup  : ##


  In server Instance folder (navigate to server_instance/)

**1) Install next modules :** 

In node.js command prompt or console enter next installation command : 

```
#!javascript



npm install mysql
npm install delivery
npm install express
npm install mkdirp
npm install socket.io
npm install nodemailer@0.7.0

```

## Setup config.js ##

You will find config.js in server_instance folder : (All node.js application you can find in same folder (server_instance) . Some app have local usage )

```
#!javascript

module.exports = {

   VERSION : "0.5",
   PATH_OF_NODE_APP : "D:/PATH_TO_SERVER_INSTANCE_FOLDER/server/" ,  // EDIT HERE
   PATH_OF_WWW : "D:/xamp/htdocs/project_instance/", // PATH_TO_WWW  EDIT HERE
   EDITOR_PORT : "1013",
   REG_PATH : "users/",
   ACCOUNT_PORT  : 3666 , 
   DESTROY_SESSION_AFTER_X_mSECUNDS : 20000,
   
 
};


```

This is all .


# 
CLIENT OR WEB APPLICATION # 

**How to start :** 

       1) Copy project_instance/ folder to the www folder or use visual-js.exe and create new application (select folder for www and server path).
       2) start server_instance/editor.js
       3) In browser navigate to project-instance folder (index.html)
      
          Click right button and you will see content menu . First item is **Add New game object** .
          Than your game objectn will show at web page. Right click on rectangle area to see game object cantent menu.
         
	
# 
	**local node.js application tools** (	*Use this in develop mode only*  ): # 
	
## 	- server_instance/res.js  - create RESOURCE  js object (  ADD image or images for animation ) ##
     
           put image or images in one folder for example TEST_RES/  . Put that folder in this location **project_instance/res/** .
           run server_instance/node res.js 
           After finishing restart web page ind enter in console RESOURCE.TEST_RES
           
           RESOURCE have all images path data. When you create folder with image and build with *node res.js* we did not create images object.
           Images object will be created after you add animation to the game objects. 

           This is good because memory safe.


## 	- server_instance/editor.js ##

           create game objects direct in web browser view.



## 	- VISUAL JS.exe ##

            only for windows users .

##         - server_instance/build_production.js (node.js app for local use) ##

          If you use editor.js to visual create game object method , you must  start ***node build_production.js*** on the end of work.
          This tool will create visual.js in folder starter/ with all your game object was created in editor style .


## 	- linux user ## 
          start commands from terminal like this : /PATH_TO_SERVER_DIR/node editor.js
		

		

# # 	SERVER OR GAME_SERVER APPLICATION # # 

	
	
	
SERVER OPERATION  :

classic server operation with databases and sessions. (Node.js)  basic Lobby system (STILL DEVELOPING)
    
       Creator Nikola Lukic
	 - program.js  
        Session staff 
        Done  : register , login , request new password 
      
      signaler/node signaler.js
       Creator " Muaz Khan         
       www.MuazKhan.com
       MIT License       - www.WebRTC-Experiment.com/licence
       Experiments       - github.com/muaz-khan/WebRTC-Experiment
	 
	- GAME_SERVER : (Node.js)  Specific game server must be created by developer.
    
      In futere i will post some basic game servers for : 
      Slots m, roulette , XO , poker classic etc.