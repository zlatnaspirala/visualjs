
# Visual-js
### Version : 3.0.0

All new version begin with 3.0.0 for client, server/dev parts.

[![Join the chat at https://gitter.im/Visual-JS-game-engine/Lobby](https://badges.gitter.im/Visual-JS-game-engine/Lobby.svg)](https://gitter.im/Visual-JS-game-engine/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

#### Creator: Nikola Lukic zlatnaspirala@gmail.com
#### Full name: `Visual-js game engine`
#### Npm package: `visualjs`
#### This is JavaScript game engine (dev tools node.js / client js).

### Installation and setup:
Use `npm i` for next folders:
 - `/project/client`,
 - `/project/server`,
 - `/test-npm`

```js
npm i
```

You can use this project from this git repo or you can use it from npm services like in `test-npm/` folder.


## Run Dev Editor [node.js] [This repo - visualjs from source]

Add your paths in `/server/config.js`:
### Config
```js
module.exports = {
  VERSION : "3.0.0",
  PATH_OF_NODE_APP : "G:\\web_server\\xampp\\htdocs\\visualjs\\project\\server\\",
  PATH_OF_WWW :      "G:\\web_server\\xampp\\htdocs\\visualjs\\project\\client\\",
  EDITOR_PORT : "1013",
  DESTROY_SESSION_AFTER_X_mSECUNDS : 20000,
  SELF_HOST: {
    protocol: 'http',
    port: 80
  }
};
```

### How to start simple host [node.js][folder: /server/]:
```js
npm run host
```
This is just a webserver for simple hosting in nodejs. No need for this if you use xamp for example.


### How to build image resource [node.js][folder: /server/]:
Just put new image in new folder -> (`logo/someimage.png`). After cmd `npm run res` engine will get meta data. This is not list for direct loading images.
Build meta data for image/images. Now test in console `RESOURCE.logo`!
```js
npm run res
or
node server/res.js
```
#### Note: Use this in develop/local mode only !!!


### How to run editor [node.js][folder: /server/]:
```js
npm run editor
or
node server/editor.js
```
```json
 This is editor to make possible concept of EDITOR-ON-PAGE.
```
#### Note: Use this in develop/local mode only !!!


### How to pack final bundle [node.js][folder: /server/]:
This will pack all scripts created from editor to the `starter/visual.js` folder.

```js
npm run pack
or
node server/build.js
```

Editor use [`cache/`] this folder for cache data -maybe you will need extra permission.
In browser navigate to /client/ folder (index.html)


## Use visual-js from npm service
Take a look at the `test-npm/` folder. (test npm github link)[https://github.com/zlatnaspirala/visualjs/tree/master/test-npm]

You need to create `config.js` file with content:
```js
module.exports = {
  VERSION : "3.0.0",
  PATH_OF_NODE_APP : "G:\\web_server\\xampp\\htdocs\\visualjs\\test-npm\\",
  PATH_OF_WWW :      "G:\\web_server\\xampp\\htdocs\\visualjs\\test-npm\\",
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

Example for editor:
```js
let tools = require('visual-js-server');

let config = {
  VERSION : "3.0.0",
  PATH_OF_NODE_APP : "G:\\web_server\\xampp\\htdocs\\visualjs\\test-npm\\",
  PATH_OF_WWW :      "G:\\web_server\\xampp\\htdocs\\visualjs\\test-npm\\",
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
