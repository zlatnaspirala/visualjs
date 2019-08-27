#  Visual-js game engine #

[![Join the chat at https://gitter.im/Visual-JS-game-engine/Lobby](https://badges.gitter.im/Visual-JS-game-engine/Lobby.svg)](https://gitter.im/Visual-JS-game-engine/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

![visualjs.png](https://bitbucket.org/repo/xzgbkK/images/102940608-visualjs.png)

     creator : Nikola Lukic
     about : Visual JS 2d canvas multiplatform game engine

 ## Visual-js project parts : ##

<pre>

    -2D PART :
    This is JavaScript game engine  (server part node.js / client part js)
    Js framework with windows GUI editor and game instance creator.
     ( + server engine tools + server part of web apps )

    -3D PART :
    webgl based on three.js engine

    -3D PART :
    webGL2 based on glmatrix 2.0

	Basic licence rules :

	1) Each file in this project has its own license , be careful , do not violate the basic rules.
	2) You are free to use any version of Visual JS library in any other project (even commercial projects)
	   as long as the copyright header is left intact. Except for plugins on sale and graphics that come
     with them (they have special commercial licence).
  3)Please read the following terms and conditions before using this application:

        Disclaimer of warranty
          'Visual js' is provided "as-is" and without warranty of any kind, express, implied or otherwise,
          including without limitation, any warranty of merchantability or fitness for a particular purpose.
          In no event shall the author of this software be held liable for data loss,
          damages, loss of profits or any other kind of loss while using or misusing this software.

</pre>

#### External licences in this project : ####

   - Webcam NUI control is under :
      Created by Romuald Quantin.
     http://creativecommons.org/licenses/by-nc-sa/3.0/

     Download from :
     https://www.adobe.com/devnet/archive/html5/articles/javascript-motion-detection.html

   - WEBRTC - webcam communication is under :
       Creator Muaz Khan

       www.MuazKhan.com
       MIT License       - www.WebRTC-Experiment.com/licence

   - Socket.io.js        - http://socket.io/download/ ( also implemented intro build.js )

   - webgl2  based on : Copyright (C) 2014  Tappali Ekanathan Keestu (keestu@gmail.com)
    GNU General Public License

   - OBJ loader : https://github.com/frenchtoast747/webgl-obj-loader

   - Textures download from http://textures.com

   - Female Body v3.blend this file has been released by AndresCuccaro under the following license: Creative Commons Attribution 3.0



### Try online - 2d canvas part of project ###

  - Add new game Object with single image

 https://jsfiddle.net/zlatnaspirala/rjf0xe0a/

 - Use For loop for creating objects

 https://jsfiddle.net/zlatnaspirala/noax17kz/

 - Visual JS -Add Webcam to Object

 https://jsfiddle.net/zlatnaspirala/xsffd9v6/

 - Add webcam with motion detect

 https://jsfiddle.net/zlatnaspirala/j60hh052/

  - ZoomIn/ZoomOut game_object effect

 https://jsfiddle.net/zlatnaspirala/pjjow5q6/

  - Translate object

 https://jsfiddle.net/zlatnaspirala/0tt6rmnq/

  - Rotate object ( OSCILLATOR class )

 https://jsfiddle.net/zlatnaspirala/1x7bq0gf/

  - Add particle

 https://jsfiddle.net/zlatnaspirala/hoe9auLm/

  - Add textbox

 https://jsfiddle.net/zlatnaspirala/0u5j1ap8/

  - Webcam image manipulation  (webcam - frame by frame)

 https://jsfiddle.net/zlatnaspirala/u2f9wbzh/

  - You can draw any native js canvas2d example in visual-js

 https://jsfiddle.net/zlatnaspirala/p4n98p9n/

  - Create animation paths

 https://jsfiddle.net/zlatnaspirala/dpejur8y/

 #### View all at ####

 https://jsfiddle.net/user/zlatnaspirala/fiddles/

### Installation and setup  : ###

  In server Instance folder (navigate to server_instance/)

1) Install next modules :*

  In node.js command prompt or console enter next installation command :

```
  npm install mysql
  npm install delivery
  npm install express
  npm install mkdirp
  npm install socket.io
  npm install nodemailer@0.7.0
```
## Setup config.js ##

 You will find config.js in server_instance folder : (All node.js application you can find in same folder (server_instance) .
   Some app have local usage like editor.js )

```
module.exports = {

   VERSION : "0.5",
   PATH_OF_NODE_APP : "D:/PATH_TO_SERVER_INSTANCE_FOLDER/server/" ,  // EDIT HERE
   PATH_OF_WWW : "D:/xamp/htdocs/project_instance/", // PATH_TO_WWW  EDIT HERE
   EDITOR_PORT : "1013",
   REG_PATH : "users/",
   ACCOUNT_PORT  : 888 ,
   DESTROY_SESSION_AFTER_X_mSECUNDS : 20000,
};
```

### CLIENT OR WEB APPLICATION ###

##### How to start : #####

<pre>
 1) Copy program_instance/ folder to the www folder or use visual-js.exe and create new application
    (select folder for www and server path).
   Best way : dont edit ROOT/program_instance/ - make copy of project_instance for use.
   Reason is to save original library . Use copy/paste to make instance client and server folders
   (windows gui use it for creating new projects). No problem at all you can always download
   new clean project from web.
 2) OnPage editor local usage service : start server_instance/editor.js if you want to create game
    objects from web page . After setup your page you must build visual.js
    file with command :
</pre>

```javascript
node build_from_editor_to_visual_js_file.js
```
<pre>
  *Editor use lib/visual_script/ this folder for cache data -maybe you will need extra permission.*
  3) In browser navigate to project-instance folder (index.html)

          Click right button and you will see content menu . First item is *Add New game object* .
          Than your game object will show at web page. Right click on rectangle area to see game object context menu.
</pre>

#### 	*local node.js application tools* (	*Use this in develop mode only*  ):  ####

 	- server_instance/res.js  - create RESOURCE js object (ADD image or images for animation) ###
           Put image or images in one folder for example TEST_RES/  . Put that folder in this location **project_instance/res/** .
           run command :

```
server_instance/node res.js
```
<pre>
  After finishing restart web page ind enter in console :  RESOURCE.TEST_RES
  RESOURCE have all images path data. When you create folder with image and build with *node res.js* we did not create images object.
  Images object will be created after you add animation to the game objects.
</pre>

  This is good because memory safe.

#### ON/PAGE Editor ####

- server_instance/editor.js

<pre>
  Create game objects direct in web browser view. Takes data from system folder lib/visual_scripts/ and generate code.
  After build you can found your code intro visual.js (node build_from_editor_to_visual_js_file.js)

  - server_instance/build_from_editor_to_visual_js_file.js (node.js app for local use)
  *ON-PAGE Editor*

   If you use editor.js to visual create game object method , you must  start
   node build_from_editor_to_visual_js_file.js on the end of work.
   This tool will create visual.js in folder starter/ with all your game object was created in editor style .
</pre>

#### Linux user ####

<pre>

          Linux user need terminal for all jobs .
          Example : Start ON-PAGE editor with terminal / cmd
          start commands from terminal like this : /PATH_TO_SERVER_DIR/node editor.js

</pre>

#### - VISUAL JS.exe  Windows GUI freeware ####

 [Video tutorial for visual-JS source editor win gui](https://www.youtube.com/watch?v=kxUBPDhB-3I)

 Visual-JS GE 1.0

![visual-javascript-gui-for-windows.png](https://bitbucket.org/repo/xzgbkK/images/838031220-visual-javascript-gui-for-windows.png)

Visual Source editor Beta 1

![New_script.png](https://bitbucket.org/repo/xzgbkK/images/1827173607-New_script.png)

only for windows users .

#### 	SERVER OR GAME_SERVER APPLICATION ####

 Posted for slot mashine with dynamic configuration.

 SERVER OPERATION:
 Classic server operation with databases and sessions. (Node.js)  basic Lobby system (STILL DEVELOPING)

<pre>
     Creator Nikola Lukic
	 - program.js
        Session staff / mySQL
        Done  : register , login , request new password
        -client network example is templates/login.js
</pre>
