
# Visual-js
### Version : 3.0.0

All new version begin with 3.0.0 for client, server or GUI part.

[![Join the chat at https://gitter.im/Visual-JS-game-engine/Lobby](https://badges.gitter.im/Visual-JS-game-engine/Lobby.svg)](https://gitter.im/Visual-JS-game-engine/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

#### Creator: Nikola Lukic zlatnaspirala@gmail.com
#### Full name: Visual-js game engine
#### This is JavaScript game engine (dev tools node.js / client js).

### Objective

 - Create UI from live page. I called `ON-PAGE-EDITOR`.
     on right click in EDITOR = true status.
 - Create more visual-js embedded visual controls.
     Like Oscillator , make input/output pins ...
 - Improve of windows GUI Editor.
 - Improve visual-js in concept of npm usage.
   Make it easy usable from `npm i visual-js`.
 - Reconstruct from zero point `visualjs-gui`.
   new GUI will use npm in background.

### Installation and setup:

Use this for `/project/client` part, `project/server` part also use it in `test-npm`.
```js
npm i
```

You can use this project from this git repo or you can use it from npm services like in `test-npm/` folder.

## Client/Manifest [html5]
```js
/**
 * @Filename : manifest.js
 * Manifest file for visual-js application.
 */
var APPLICATION = {
    NAME: "VISUAL-JS",
    TYPE: "client",
    VERSION: "3.0.0",
    STATUS: "develop",
    MULTILANGUAGE: false,
    // false for fiddle support , we need absolute path.
    IMAGE_LOADER_PREFIX: true,
    EDITOR: true,
    EDITOR_AUTORUN: false,
    LOCAL_SERVER: "localhost",
    DEVELOPERS: ["Nikola Lukic Zlatnaspirala@gmail.com"],
    ACCESSIBILITY: {
        VIRTUAL_KEYBOARD_FOR_DESKTOP: false,
        ACTIVATE_VK_FOR_DESKTOP: function () {
            CREATE_VIRTUAL_KEYBOARD();
            HIDE_KEYBOARD();
            APPLICATION.ACCESSIBILITY.VIRTUAL_KEYBOARD_FOR_DESKTOP = true;
        },
        DEACTIVATE_VK_FOR_DESKTOP: function () {
            APPLICATION.ACCESSIBILITY.VIRTUAL_KEYBOARD_FOR_DESKTOP = false
        }
    },
    SINGLE_BROADCAST: true,
    MULTIRTC_PEER: true,
    PROGRAM: {
        // MONITOR is innerWidth.Height or CANVAS is canvas width
        CALCULATING_POSITION_BY: "CANVAS",
        RENDER_SPEED: 5,
        UPDATE_SPEED: 5
    },
    SYSTEM: {
        COLOR: "#afa9aa",
        HOVER_COLOR: "#5991FF",
        TEXT_COLOR: "black",
        ACTOR_X: "",
        ACTOR_Y: ""
    },
};
```


## Server/Editor [node.js]

### Config
```js
module.exports = {
  VERSION : "3.0.0",
  PATH_OF_NODE_APP : "D:/PATH_TO_SERVER_INSTANCE_FOLDER/server/", // EDIT HERE
  PATH_OF_WWW : "D:/xamp/htdocs/project_instance/", // PATH_TO_WWW  EDIT HERE
  EDITOR_PORT : "1013",
  DESTROY_SESSION_AFTER_X_mSECUNDS : 20000,
  SELF_HOST: {
    protocol: 'http',
    port: 80
  }
};
```

## CLIENT OR WEB APPLICATION

### How to start:

You can use `ON-PAGE-EDITOR`, `visualjs-gui` or `visualjs` from npm service.
Best way is to use it all.


### ON/PAGE Editor [Nodejs]

From package.json:
```
"scripts": {
    "pack": "node build.js",
    "res": "node res.js",
    "editor": "node editor.js",
    "host": "node self-host.js"
  }
```

```js
npm run host
```
```json
This is just a webserver for simple hosting in nodejs.
```

```js
npm run res
```
```json
Just put new image in new folder with same name example -> (`logo/logo.png`).
After this cmd engine will get meta data. This is not list for direct loading images.
Build meta data for image/images.
```

```js
npm run editor
```
```json
 This is editor to make possible concept of EDITOR-ON-PAGE.
```

```js
npm run pack
```
```json
This will pack all scripts created from editor to the `starter/visual.js`.
```

Editor use [`cache/`] this folder for cache data -maybe you will need extra permission.
3) In browser navigate to /client/ folder (index.html)

Click right button and you will see content menu . First item is *Add New game object* .
Than your game object will show at web page. Right click on rectangle area to see game object context menu.

local node.js application tools (Use this in develop mode only):

 - server/res.js  - create RESOURCE js object (ADD image or images for animation)
   Put image or images in one folder for example TEST_RES/  . Put that folder in this location **project_instance/res/** .

Run command:
```js
server/node res.js
```

Note: Object `RESOURCE` is still in global space. Must be resolved [How to load script in run time from (module type) builded js bundle?].

Object `RESOURCE` memory all image paths data. When you create folder and put image intro and build with `node res.js` we still did not create images object.
Images object will be created after you add animation to the game objects (This is good because memory safe) Sometimes your app will no need some resources.


 To use `ON-PAGE-EDITOR` you will need to run:
 ```js
 server/editor.js
```
For interconnections used webSocket communication protocol.

Create game objects direct in web browser view. Takes data from system folder `cache/` and generate code. After build you can found your code intro visual.js (`node build.js`)

- server/build.js (node.js dev app for local use!)
 There is not security validation on server part and this action use only
 on local dev stage. After build you wil get all EDITOR created objects intro final runtime js pack.

If you use editor.js to visual create game object method, you must start
node build.js on the end of work.
This tool will create visual.js in folder starter/ with all your game object was created in editor.

New FEATURE => save stage


## Use visual-js from npm service
Take a look at the `test-npm/` folder. (test npm github link)[https://github.com/zlatnaspirala/visualjs/tree/master/test-npm]

You need to create `config.js` file with content:
```js
module.exports = {
  VERSION : "3.0.0",
  PATH_OF_NODE_APP : "G:\\web_server\\xampp\\htdocs\\PRIVATE_SERVER\\visual-js-GIT\\build\\visualjs\\test-npm\\",
  PATH_OF_WWW : "G:\\web_server\\xampp\\htdocs\\PRIVATE_SERVER\\visual-js-GIT\\build\\visualjs\\test-npm\\",
  EDITOR_PORT : "1013",
  DESTROY_SESSION_AFTER_X_mSECUNDS : 20000,
  SELF_HOST: {
    protocol: 'http',
    port: 80
  }
};
```
Replace `PATH_OF_NODE_APP` and `PATH_OF_WWW` with your own project folder path.
For windows best try with `\\` agenst `\` like this `G:\\web_server\\xampp\\htdocs\\`

Main JS script (Client part web):
```js
import { sys, ActivateModifiers, loadEditor, runEditor, loadEditorObjects } from 'visual-js';
ActivateModifiers();

// Run editor
runEditor();
loadEditor();

sys.DOM.CREATE_SURFACE("SURF", "examples", 100, 99.4, "DIAMETRIC");
examples.ENGINE.CREATE_MODUL("STARTER");
var smodul = examples.ENGINE.MODULES.ACCESS_MODULE("STARTER");

// This is preload gameobject , you can't manipulate with
// this game object in editor.
smodul.NEW_OBJECT("IamNewObject", 25, 50, 12, 25, 10);

// Run editor
loadEditorObjects();
```
I use browserify for building bundle:
 `browserify test.js -p esmify > builds/examples.js`


### Note
```json
  Don't use editor features on public server.
  There is not that kind of validation!
```

In same package you can install `visual-js-server` (not matter if you
have have defined nice paths in config.js), 
now you can run editor feature, just create file editor.js with content:

```js
let tools = require('visual-js-server');

let config = {
  VERSION : "3.0.0",
  PATH_OF_NODE_APP : "G:\\web_server\\xampp\\htdocs\\PRIVATE_SERVER\\visual-js-GIT\\build\\visualjs\\test-npm\\",
  PATH_OF_WWW : "G:\\web_server\\xampp\\htdocs\\PRIVATE_SERVER\\visual-js-GIT\\build\\visualjs\\test-npm\\",
  EDITOR_PORT : "1013",
  DESTROY_SESSION_AFTER_X_mSECUNDS : 20000,
  SELF_HOST: {
    protocol: 'http',
    port: 80
  }
};

tools.editor(config);
```

Then open new terminal and run:
```
node editor.js
```





## VISUALJS-GUI.exe [Windows GUI open source]

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
