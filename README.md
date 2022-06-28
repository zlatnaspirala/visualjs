
# Visual-js
### Version : 3.0.0

All new version begin with 3.0.0 for client, server or GUI part.

[![Join the chat at https://gitter.im/Visual-JS-game-engine/Lobby](https://badges.gitter.im/Visual-JS-game-engine/Lobby.svg)](https://gitter.im/Visual-JS-game-engine/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

#### Creator: Nikola Lukic zlatnaspirala@gmail.com
#### Full name: Visual-JS game engine
#### This is JavaScript game engine (dev tools node.js / client js).

### Objective

 - Create UI from live page. I called `ON-PAGE-EDITOR`.
     on right click in EDITOR = true status.
 - Create more visual-js embedded controls.
     Like Oscillator , make input/output pins ...
 - Improve of windows GUI Editor.
 - Improve visual-js in concept of npm usage.
   Make it easy usable from `npm i visual-js`.

### Installation and setup:

```js
npm i
```

## Client
### Config
```js
```


## Server/Editor

### Config
```js
module.exports = {
   VERSION : "3.0.0",
   PATH_OF_NODE_APP : "D:/PATH_TO_SERVER_INSTANCE_FOLDER/server/" ,  // EDIT HERE
   PATH_OF_WWW : "D:/xamp/htdocs/project_instance/", // PATH_TO_WWW  EDIT HERE
   EDITOR_PORT : "1013",
   REG_PATH : "users/",
   ACCOUNT_PORT  : 888 ,
   DESTROY_SESSION_AFTER_X_mSECUNDS : 20000,
};
```

### CLIENT OR WEB APPLICATION

##### How to start:

You can use `ON-PAGE-EDITOR`, `visualjs-gui` or `visualjs` from npm service.
Best way is to use it all.

```javascript
node build_from_editor_to_visual_js_file.js
```

Editor use lib/visual_script/ this folder for cache data -maybe you will need extra permission.
3) In browser navigate to /client/ folder (index.html)

Click right button and you will see content menu . First item is *Add New game object* .
Than your game object will show at web page. Right click on rectangle area to see game object context menu.

#### 	local node.js application tools (Use this in develop mode only):

 - server/res.js  - create RESOURCE js object (ADD image or images for animation)
   Put image or images in one folder for example TEST_RES/  . Put that folder in this location **project_instance/res/** .

Run command:
```js
server/node res.js
```

Note: Object `RESOURCE` is still in global space. Must be resolved [How to load script in run time from (module type) builded js bundle?].

Object `RESOURCE` memory all image paths data. When you create folder and put image intro and build with `node res.js` we still did not create images object.
Images object will be created after you add animation to the game objects (This is good because memory safe) Sometimes your app will no need some resources.


### ON/PAGE Editor

 To use `ON-PAGE-EDITOR` you will need to run:
 ```js
 server/editor.js
```
For interconnections used webSocket communication protocol.

Create game objects direct in web browser view. Takes data from system folder lib/visual_scripts/ and generate code. After build you can found your code intro visual.js (`node build.js`)

- server/build.js (node.js dev app for local use!)
 There is not security validation on server part and this action use only
 on local dev stage. After build you wil get all EDITOR created objects intro final runtime js pack.

### ON-PAGE Editor

If you use editor.js to visual create game object method, you must start
node build.js on the end of work.
This tool will create visual.js in folder starter/ with all your game object was created in editor.

New FEATURE => save stage


### VISUALJS-GUI.exe [Windows GUI open source]

 [Video tutorial for visual-JS source editor win gui](https://www.youtube.com/watch?v=kxUBPDhB-3I)

Name:  Visual-JS GE
Version: 1.1

![visual-javascript-gui-for-windows.png](https://bitbucket.org/repo/xzgbkK/images/838031220-visual-javascript-gui-for-windows.png)

Visual Source editor Beta 1 only for windows users.
![New_script.png](https://bitbucket.org/repo/xzgbkK/images/1827173607-New_script.png)


### External licences in this project:

- Webcam NUI control is under:
  Created by Romuald Quantin.
  http://creativecommons.org/licenses/by-nc-sa/3.0/
  Download from :
  https://www.adobe.com/devnet/archive/html5/articles/javascript-motion-detection.html
- WEBRTC - webcam communication is under:
    Creator Muaz Khan www.MuazKhan.com
    MIT License       - www.WebRTC-Experiment.com/licence
- Socket.io.js        - http://socket.io/download/

### Disclaimer of warranty

'Visual js' is provided "as-is" and without warranty of any kind, express, implied or otherwise,
including without limitation, any warranty of merchantability or fitness for a particular purpose.
In no event shall the author of this software be held liable for data loss,
damages, loss of profits or any other kind of loss while using or misusing this
