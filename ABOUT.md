# Application Programming Interface Documentation for Visual JS 1.0 - 2d part #

-GAME_OBJECT is main object in this framework.Every game object can be text box , animation , collision no/off , webcam etc.

-*Default Name of program* (javascript object) : HELLO_WORLD
This is also root javascript object for canvas 2d app .
Prototype class name : PROGRAM (Only one program instance is possible for now )

#### Access method is : ####

```javascript

  window[SYS.RUNNING_PROGRAMS[0]]
  // access for default : HELLO_WORLD

```

<pre>
SYS.RUNNING_PROGRAMS[0] represent string value of canvas html tag id . Change this value by renaming canvas id intro index.html :
</pre>

```html
  <canvas tabindex='1' width="1" height="1" id="HELLO_WORLD"></canvas>
```

####  Structure of -*<Default Name of program>*  Default :  HELLO_WORLD: ####

```javascript

PROGRAM = PROTOTYPE CLASS NAME
AUTO_UPDATE: [] (0)
BASELINE: "middle"
DO_GLOBAL_TRANSLATE: false
DRAW: function()
DRAW_INTERVAL: 5
ENGINE: ENGINE {PROGRAM_ID: "HELLO_WORLD", EVENTS: EVENTS, MODULES: Array, GAME_TYPE: "NO_PLAYER", KEYBOARD: KEYBOARD, …}
GAME_MAP: function()
GLOBAL_TRANSLATE: 0
MAP: GAME_MAP {TOTAL_LEFT: 2, TOTAL_RIGHT: 4, TOTAL_UP: 2, TOTAL_DOWN: 4, LEFT: function, …}
TRANSLATE: function(x)
UPDATE: function()
UPDATE_INTERVAL: 15
```

#### Access method is : ####

```javascript

  window[SYS.RUNNING_PROGRAMS[0]].ENGINE
  // access for default : HELLO_WORLD.ENGINE

```

##  Structure of ENGINE

```javascript
ENGINE = $2
CREATE_MODUL: function(name)
DESTROY_MODUL: function(name)
DRAW_MODULES: function(s)
ENGINE_EDITOR: true
EVENTS: EVENTS {ROOT_ENGINE: ENGINE, CALCULATE_TOUCH_OR_CLICK: function, CALCULATE_TOUCH_MOVE_OR_MOUSE_MOVE: function, CALCULATE_TOUCH_UP_OR_MOUSE_UP: function, CALCULATE_TOUCH_DOWN_OR_MOUSE_DOWN: function}
EXIT_EDIT_MODE: function()
GAME_TYPE: "NO_PLAYER"
GO_TO_EDIT_MODE: function()
GUI: {VISIBLE: false, BUTTONS: Array, CHECK_ON_START: function, GRID: Object, LIST_OF_OBJECTS: Object}
KEYBOARD: KEYBOARD {CAPTURE_CHAR: "0", CLEAR_CAPTURE_ON_PRESS_ENTER: true, LAST_CAPTURE_CHAR: "s", ENTER_PRESSED: false, SHIFT_PRESSED: false, …}
MODULES: [MODUL, MODUL] (2)
PROGRAM_ID: "HELLO_WORLD"
UPDATE_MODULES: function()
```

#### 1) Adding new game object (name will be 'GO' ): ####

```javascript

/*
x , y , w , h is percentage taken from you canvas html tag width/height
speed is movement step value
*/

HELLO_WORLD.ENGINE.MODULES.ACCESS_MODULE("STARTER").NEW_OBJECT("GO" , x , y , w , h , speed )
HELLO_WORLD.ENGINE.MODULES.ACCESS_MODULE("STARTER").NEW_OBJECT( "GO" , 45   , 45 , 10 , 10 , 10)

```

#### 2) Adding image or animation : #####

Images objects data are stored intro RESOURCE object

```javascript

/*
  DRAW TYPE can be
'DRAW_FRAME' no animation , draw single image
'LOOP' playing animation
*/

// this number '1111123123' is ID  can be any number
// ANIMATION (  surf ,TYPE_, FrameIndex ,source , PARENT , ID , blink_ , min_ , max_ , step , speed_ , opacity_  )

HELLO_WORLD.ENGINE.MODULES.ACCESS_MODULE("STARTER").GAME_OBJECTS.ACCESS("GO").CREATE_ANIMATION( SURF , "DRAW_FRAME" , 6 , RESOURCE.Tiles  , 1111123123 , "no" , 1,11,1,1,1)

```

#### 3) Disable draging ####

```javascript
GO.DRAG = false;

// RESOURCE.Tiles    >>>  add folder "Tiles"  with images in folder /res/ and run node res.js
// refresh page and you will get RESOURCE.Tiles ready for use !
// MAKE MODULE ACCESS EASY
var STARTER = HELLO_WORLD.ENGINE.MODULES.ACCESS_MODULE("STARTER");
STARTER.GAME_OBJECTS.ACCESS("GO").CREATE_ANIMATION( SURF , "DRAW_FRAME" , 6 , RESOURCE.Tiles  , 1111123123 , "no" , 1,11,1,1,1)
// DRAG initial value is true
GO.DRAG = false;
```

#### 3.1) Make quard shape of your game_object ####

```javascript
// setup quard height  =  width
GO.POSITION.DIMENSION.H = GO.POSITION.DIMENSION.W;
```

#### 4) EVENTS FOR MOUSE AND MOBILE TOUCH ####

ADD CLICK EVENT ( click also touchstart )

```
//  CLICK OR TOUCH START
GO.TAP = function(){
  // this make point directing to the game object instance
  // this.NAME or this.ANIMATION.CURRENT_FRAME
};
```

#### ADD MOUSE DOWN or TOUCH_DOWN EVENT #####

```javascript
GO.TOUCH_DOWN = function(){

STARTER.DESTROY_OBJECT("GO")
console.log("THIS MUST BE EXECUTED ON MOUSE DOWN or TOUCH_DOWN  : " + this.NAME);
// this.DESTROY_ME_AFTER_X_SECUND( 100 );
// console.log("THIS MUST BE TERMINATED ON CLICK : " + this.NAME);
};
```

#### ADD MOUSEOVER OR MOBILE TOUCH_MOVE EVENT ####

```javascript
GO.TOUCH_MOVE = function(){

console.log("HOVER ON OBJECT OR MOBILE TOUCH_MOVE  : " + this.NAME);

};

```

#### ADD MOUSE_UP OR TOUCH_UP EVENT ####

```javascript
GO.TOUCH_UP = function(){

console.log("TOUCH_UP ON OBJECT OR MOBILE TOUCH_UP  : " + this.NAME);

};

```


### Object SYS ###

  Object SYS contains operations that are not directly related to the canvas program . They holds document staff : work with DOM elements , math objects etc.


#### Structure of SYS

```javascript
Object = $3
ARRAY_OPERATION: {REMOVE_ALL_ITEMS_WITH_VALUE: function, DEEP_COPY: Object}
BROWSER: DETECTBROWSER {NAVIGATOR: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) Ap… (KHTML, like Gecko) Version/9.1.2 Safari/601.7.7", NAME: "unknown", NOMOBILE: 1}
CAMERA: {SUPPORT: false}
DEBUG: LOG {ENABLE: true, LOG: function, WARNING: function, CRITICAL: function, NETWORK_LOG: function}
DOM: DOM {E: function, ACCESS_IFRAME: function, GOTO: function, UPLOAD_FILE: function, CREATE_SURFACE: function, …}
LOCAL_STORAGE: {}
MATH: {NUMBER_ROUND: function, RANDOM_INT_FROM_TO: function, TO_DEGREES: function, TO_RADIANS: function, OSCILLATOR: function, …}
MOUSE: {x: 383, y: 252, PRESS: false, BUTTON_PRESSED: null, ON_RIGHT_BTN_PRESSED: function, …}
READY: true
RES: {SUM_OF_LOADED_IMAGES: 99, CREATE_IMG: function}
ROOT: Window {LISTEN: function, validateEmail: function, setNoteReady: function, MODUL: function, threshold: function, …}
RUNNING_PROGRAMS: ["HELLO_WORLD"] (1)
SCRIPT: {SCRIPT_ID: 19, SINHRO_LOAD: {}, LOAD: function}
SOUND: {GEN: function, RES: AUDIO_RES}
VOICE: {SPEAK: function, LISTEN: function}
XML: {READ: function}
```

#### Access method is : ####

```javascript

  SYS

```

BROWSER SubObject of SYS

SYS.BROWSER is instance of prototype class DETECT_BROWSER . No need for new instance . On startup they already exist and ready for access.
Detect browser type and device platform . For example

Access method is :
```javascript

  SYS.BROWSER
  // or
  SYS.BROWSER.NAME

  // ENUMERATORS FOR prop NAME
  /*
    mobile_firefox_android
    mobile_firefox_android_tablet
    opera_mobile_android
    opera_mobile_android_tablet
    safari_mobile_iphone
    mobile_safari_chrome_ipad
    desktop_safari
    android_native
    mobile_chrome_android_tablet
    mobile_chrome_android
    chrome_browser
    firefox_desktop
    opera_desktop
  */
  // ENUM also can be  : unknown
  // other property
  SYS.BROWSER.NOMOBILE

  // 0 value - This is Mobile device
  // 1 value - This is Desktop device
```

#### subObject SYS.DOM ####

SYS.DOM works with DOM HTML elements .

Access method is :
```javascript

SYS.DOM

```

Examples :

  SYS.DOM.removeElement (parentDiv, childDiv);
  or
  SYS.DOM.removeElement (parentDiv);


Other procedural functions

Validate email
Name : validateEmail
Type : function return boolean

Access method is :
```javascript
// validate string for email
validateEmail(email)
```
Set localStorage value
Name : LS_SET

Type : function - no return value

Access method is :

```javascript
// Save data to the localstorage
LS_SET(name,value)
```
Get value from localStorage
Name : LS_GET
Type : function - return value from storage

Access method is :
```javascript
// Save data to the localstorage
LS_GET(name)

```

Name : SAVE
Type : function - no return value
(new feature return value pass or not)

Access method is :
```javascript
// Save Object data to the localstorage
SAVE(name , obj)
```

[logo]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 2"




Application Programming Interface Documentation for Visual JS 0.5 >

GAME_OBJECT is main object in this framework.


1) Adding new game object (name will be 'GO' ): 


HELLO_WORLD.ENGINE.MODULES.ACCESS_MODULE("STARTER").NEW_OBJECT("GO" , x , y , w , h , speed )

HELLO_WORLD.ENGINE.MODULES.ACCESS_MODULE("STARTER").NEW_OBJECT( "GO" , 45   , 45 , 10 , 10 , 10)


2) Adding image or animation : 

// DRAW TYPE can be 
// 'DRAW_FRAME' no animation 
// 'LOOP' playing animation
// this number '1111123123' is ID  can be any number
//ANIMATION (  surf ,TYPE_, FrameIndex ,source , PARENT , ID , blink_ , min_ , max_ , step , speed_ , opacity_  )
HELLO_WORLD.ENGINE.MODULES.ACCESS_MODULE("STARTER").GAME_OBJECTS.ACCESS("GO").CREATE_ANIMATION( SURF , "DRAW_FRAME" , 6 , RESOURCE.Tiles  , 1111123123 , "no" , 1,11,1,1,1) 


3)Disable draging 
GO.DRAG = false;

//  RESOURCE.Tiles    >>>  add folder "Tiles"  with images in folder /res/ and run node res.js 
// refresh page and you will get RESOURCE.Tiles ready for use !

// MAKE MODULE ACCESS EASY 
var STARTER = HELLO_WORLD.ENGINE.MODULES.ACCESS_MODULE("STARTER");

STARTER.GAME_OBJECTS.ACCESS("GO").CREATE_ANIMATION( SURF , "DRAW_FRAME" , 6 , RESOURCE.Tiles  , 1111123123 , "no" , 1,11,1,1,1) 

//DRAG initial value is true
GO.DRAG = false;
  
//setup quard height  =  width 
GO.POSITION.DIMENSION.H = GO.POSITION.DIMENSION.W;



4) EVENTS  FOR MOUSE AND MOBILE TOUCH HANDLED

//CLICK OR TOUCH START 
GO.TAP = function(){  

//this make point directing to the game object instance 
// this.NAME or this.ANIMATION.CURRENT_FRAME

};


GO.TOUCH_DOWN = function(){  

STARTER.DESTROY_OBJECT("GO")	
console.log("THIS MUST BE TERMINATED ON MOUSE DOWN or TOUCH_DOWN  : " + this.NAME);
//this.DESTROY_ME_AFTER_X_SECUND( 100 );
//console.log("THIS MUST BE TERMINATED ON CLICK : " + this.NAME);

};


GO.TOUCH_MOVE = function(){
  console.log("HOVER ON OBJECT OR MOBILE TOUCH_MOVE  : " + this.NAME);
};

GO.TOUCH_UP = function() {
  console.log("TOUCH_UP ON OBJECT OR MOBILE TOUCH_UP  : " + this.NAME);
};

