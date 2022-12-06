
import {POSITION, DIMENSION} from '../math';
import SYS from '../system';
import {RIGHT_MENU_BUTTON} from '../draw_functions/systems';
import {RECT} from '../draw_functions/rect';
import {ANIMATION} from '../draw_functions/animation';
import APPLICATION from '../../manifest/manifest';
import {VIEW, CONVERTOR, SET_STREAM} from '../init';
import {DESTROY_DELAY} from '../editor/editor';
import {PARTICLE_FONTAN} from '../particule/particule';

/**
  Copyright 2016, zlatnaspirala@gmail.com
  All rights reserved.

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are
  met:

  * Redistributions of source code must retain the above copyright
  notice, this list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above
  copyright notice, this list of conditions and the following disclaimer
  in the documentation and/or other materials provided with the
  distribution.
  * Neither the name of zlatnaspirala@gmail.com nor the names of its
  contributors may be used to endorse or promote products derived from
  this software without specific prior written permission.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
  "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
  LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
  A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
  OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
  SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
  DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
  THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
  OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
  Constructor
  GAME_OBJECT ( name  , modul , x , y , w , h , speed , PROGRAM_NAME)
  Type : Class

  Program create instance of this class  from  class modul :
  HELLO_WORLD.ENGINE.MODULES.ACCESS_MODULE("STARTER").NEW_OBJECT("STOSKE" , 22, 42, 22 , 22 , "DIAMETRIC");
 */

export function GAME_OBJECT(name, modul, x, y, w, h, speed, PROGRAM_NAME) {

  var ROOT_GAME_OBJECT = this;

  //alias global access
  if(name == "system" || name.indexOf("___VIRTUALKEYBOARD_") != -1) {

    ROOT_GAME_OBJECT.VISIBLE = true;
    window["" + name] = this;
  } else {

    window["" + name] = this;
    ROOT_GAME_OBJECT.VISIBLE = true;

  }

  this.ID = parseFloat(Math.random() * 4560000 + Math.random() * 1230000).toFixed(0);
  this.PARENT = modul;
  this.PROGRAM_NAME = PROGRAM_NAME;
  this.NAME = name;

  this.AUTO_UPDATE = true;
  this.FOCUS = false; // similar SELECTED but for runtime mode only
  this.TYPE_OF_GAME_OBJECT = "empty";
  this.ENUMERATION = ["empty", "ANIMATION", "TEXT_BOX", "PATRICLE", "NO_RENDER", "ANIMATION_TEXT_BOX", "ANIMATION_PATRICLE"];
  this.DESTROY_ON_GAMEMAP_EXIT = true;
  this.DRAG_STATUS = true;
  this.DRAG = true;
  this.DRAG_START_X = 0;
  this.DRAG_START_Y = 0;
  this.DRAG_DELTA = 0;

  this.zoom_scale = 0;
  this.globalAlpha = 1;

  if((typeof x && typeof y) === "number") {

    if(typeof speed === "number") {

      this.POSITION = new POSITION(x, y, x, y, speed);

    } else {

      this.POSITION = new POSITION(x, y, x, y, 1);

    }

  } else {
    this.POSITION = new POSITION(10, 10, 200, 200, 1);
  }

  if((typeof w && typeof h) === "number") {

    this.DIMENSION = new DIMENSION(w, h);

  } else {

    this.DIMENSION = new DIMENSION(10, 10);

  }

  //this.ON_TARGET_POSITION = function(){};
  this.POSITION.parentModul = modul;
  this.POSITION.parentGameObject = name;
  this.POSITION.PROGRAM_NAME = PROGRAM_NAME;
  this.POSITION.DIMENSION = this.DIMENSION;
  //this.POSITION.ON_TARGET_POSITION = this.ON_TARGET_POSITION;


  this.ANIMATION = null;
  this.CREATE_ANIMATION = function(surf, TYPE_, FrameIndex, source, ID, blink_, min_, max_, step, speed_, opacity_) {

    this.ANIMATION = new ANIMATION(surf, TYPE_, FrameIndex, source, ROOT_GAME_OBJECT, ID, blink_, min_, max_, step, speed_, opacity_);
    this.TYPE_OF_GAME_OBJECT = "ANIMATION";
    //SYS.DEBUG.LOG("images added in memory.... ID " + ID);

  };

  this.CREATE_PLAYER = function(type_) {

    ROOT_GAME_OBJECT.PLAYER = {

      TYPE: type_,
      X: ROOT_GAME_OBJECT.POSITION.x, // for platform
      Y: ROOT_GAME_OBJECT.POSITION.y,
      SPEED: 1,
      CONTROL: {
        RIGHT: false,
        LEFT: false,
        JUMP: false,
        DOWN: false,
      },
      POSITION: ROOT_GAME_OBJECT.POSITION,
      BREAK_AT_MOMENT_STATUS: false,

    };
    window["PLAYER"] = ROOT_GAME_OBJECT.PLAYER;
    this.POSITION.PLAYER = ROOT_GAME_OBJECT.PLAYER;

    window[PROGRAM_NAME].ENGINE.GAME_TYPE = "NORMAL_CONTROL";


  };

  this.TEXTBOX = null;
  this.TRACK_KEY = null;
  this.CREATE_TEXTBOX = function(text, radius, color, textColor) {

    if((typeof text != "undefined" && typeof radius != "undefined" && typeof color != "undefined" && typeof textColor != "undefined")) {

      this.TEXTBOX = new RECT(text, ROOT_GAME_OBJECT, radius, color, textColor);
      this.TYPE_OF_GAME_OBJECT = "TEXT_BOX";
      this.TRACK_KEY = true;
      this.TEXTBOX.TEXT = text;
      this.TEXTBOX.TEXT += window[ROOT_GAME_OBJECT.PROGRAM_NAME].ENGINE.KEYBOARD.CAPTURE_CHAR;
      this.FOCUS = true;
      this.TEXTBOX.ON_PRESS_ENTER = function() {};
      ROOT_GAME_OBJECT.EDITOR.BUTTONS[6].text = "Remove textbox";

    } else {

      SYS.DEBUG.WARNING("TEXT_BOX error in constructor : ( text , radius , color, textColor) cant be undefined.");

    }
  };

  this.DESTROY_AFTER = null;
  this.DESTROY_ME_AFTER_X_SECUND = function(sec, name, x, ROOT_EVENTS) {

    this.DESTROY_AFTER = sec * 20;
    if(APPLICATION.EDITOR == true) {
      DESTROY_DELAY(name, sec, ROOT_GAME_OBJECT.PARENT, ROOT_GAME_OBJECT.PROGRAM_NAME);
    }

  };

  this.COLLISION = null;
  this.POSITION.STATIC = false;
  this.COLIDER = function(type__, margin) {

    this.TYPE = type__;

    if(typeof margin === "number") {
      this.margin = margin;

    } else {

      this.margin = 1.02;

    }

  };

  this.CREATE_COLLISION = function(type__, margin) {

    ROOT_GAME_OBJECT.COLLISION = new ROOT_GAME_OBJECT.COLIDER(type__, margin);
    ROOT_GAME_OBJECT.EDITOR.BUTTONS[3].text = "Remove collision";

  };

  this.ON_COLLISION = function(name_) {};

  // face detect tracking.js
  this.CREATE_FACE_DETECT = function() {

    ROOT_GAME_OBJECT.SET_TRACKING_VIEW("NORMAL", "NORMAL");
    TRACK_NOW();

    ROOT_GAME_OBJECT.ON_UPDATE_SYS = function() {

      ROOT_GAME_OBJECT.WEBCAM.VIDEO.style.left = ROOT_GAME_OBJECT.POSITION.X() + "px";
      ROOT_GAME_OBJECT.WEBCAM.VIDEO.style.top = (ROOT_GAME_OBJECT.POSITION.Y() + 50) + "px";

      ROOT_GAME_OBJECT.WEBCAM.TRACKING_CANVAS_LAYOUT.style.left = ROOT_GAME_OBJECT.POSITION.X() + "px";
      ROOT_GAME_OBJECT.WEBCAM.TRACKING_CANVAS_LAYOUT.style.top = (ROOT_GAME_OBJECT.POSITION.Y() + 50) + "px";

    };

    ROOT_GAME_OBJECT.WEBCAM.VIDEO.style.opacity = 0.9;

  };

  this.SET_TRACKING_VIEW = function(type_, DIMENSIONS_TYPE) {
    // just webcam view
    ROOT_GAME_OBJECT.WEBCAM = new Object();
    ROOT_GAME_OBJECT.WEBCAM.VIDEO = SYS.DOM.E("video");
    ROOT_GAME_OBJECT.WEBCAM.TRACKING_CANVAS_LAYOUT = document.getElementById("canvas");
    // SET_STREAM(ROOT_GAME_OBJECT.WEBCAM.VIDEO);

    if(DIMENSIONS_TYPE == "GAME_OBJECT") {

      ROOT_GAME_OBJECT.WEBCAM.DIMENSIONS_TYPE = "GAME_OBJECT";
    } else {

      ROOT_GAME_OBJECT.WEBCAM.DIMENSIONS_TYPE = "WEBCAM_DIMENSION";
      ROOT_GAME_OBJECT.DIMENSION.H = CONVERTOR.PIY_TO_PER(SYS.DOM.E("video").height);
      ROOT_GAME_OBJECT.DIMENSION.W = CONVERTOR.PIX_TO_PER(SYS.DOM.E("video").width);

    }

    ROOT_GAME_OBJECT.TYPE_OF_GAME_OBJECT = "CUSTOM";

    ROOT_GAME_OBJECT.CUSTOM = function() {

      SURF.fillStyle = "white";
      SURF.fillRect(ROOT_GAME_OBJECT.POSITION.X(), ROOT_GAME_OBJECT.POSITION.Y(), 100, 100);

    };

  };

  // DRAW PATH
  this.CREATE_PENCIL = function(type_, color, width) {

    this.PENCIL = new Object();

    if(typeof type_ != "undefined") {
      this.PENCIL.TYPE = type_;
    } else {
      this.PENCIL.TYPE = "POINTS";
    }

    if(typeof color != "undefined") {
      this.PENCIL.COLOR = color;
    } else {
      this.PENCIL.COLOR = "lime";
    }

    if(typeof width != "undefined") {
      this.PENCIL.WIDTH = width;
    } else {
      this.PENCIL.WIDTH = 1;
    }

    ROOT_GAME_OBJECT.PENCIL.PATH = [];
    ROOT_GAME_OBJECT.PENCIL.NAME = "";
    ROOT_GAME_OBJECT.PENCIL.ID = "";
    //draw
    ROOT_GAME_OBJECT.TYPE_OF_GAME_OBJECT = "PENCIL";
    ROOT_GAME_OBJECT.PENCIL.LAST_POS = {
      x: SYS.MOUSE.x,
      y: SYS.MOUSE.y
    };

    // TRANSLATE_BY_PATH


    ROOT_GAME_OBJECT.PENCIL.RECORD = true;

    ROOT_GAME_OBJECT.PENCIL.RECORD_TYPE = function(TYPE_) {
      if(TYPE_ == "EVERY_POINT") {

        ROOT_GAME_OBJECT.ON_UPDATE_SYS = ROOT_GAME_OBJECT.ON_UPDATE_SYS_RECORD_EVERY_POINT;

        SYS.MOUSE.ON_RIGHT_BTN_PRESSED = function() {};

      } else if(TYPE_ == "ON_TAP") {

        ROOT_GAME_OBJECT.ON_UPDATE_SYS = ROOT_GAME_OBJECT.ON_UPDATE_SYS_RECORD_ONLY_TAP; //clear colector
        //collector on tap
        SYS.MOUSE.ON_RIGHT_BTN_PRESSED = function() {

          IamPathGameObject.PENCIL.RECORD = false;

        };

        SYS.MOUSE.ON_LEFT_BTN_PRESSED = function() {

          ROOT_GAME_OBJECT.PENCIL.PATH.push({
            x: SYS.MOUSE.x,
            y: SYS.MOUSE.y
          });

          var XX = SYS.MOUSE.x;
          var YY = SYS.MOUSE.y;
          ROOT_GAME_OBJECT.PENCIL.LAST_POS.x = XX;
          ROOT_GAME_OBJECT.PENCIL.LAST_POS.y = YY;

        };

      }

    };

    ROOT_GAME_OBJECT.PENCIL.SAVE_DRAWS = function(name_) {

      if(typeof name_ != "undefined") {

        var PATH_FOR_PENCIL = new Object();
        PATH_FOR_PENCIL.PATH = ROOT_GAME_OBJECT.PENCIL.PATH;
        PATH_FOR_PENCIL.ID = SYS.MATH.RANDOM_INT_FROM_TO(1, 100000) * 78;
        ROOT_GAME_OBJECT.PENCIL.NAME = name_;
        PATH_FOR_PENCIL.NAME = name_;
        SAVE(PATH_FOR_PENCIL.NAME, PATH_FOR_PENCIL);

      } else {

        SYS.DEBUG.WARNING("Pencil object : save draws faild. Please give a name in arg");

      }

    };
    ROOT_GAME_OBJECT.PENCIL.LOAD_PATH = function(name_) {

      if(typeof name != "undefined") {

        ROOT_GAME_OBJECT.PENCIL.LOADED_PATH = LOAD(name_);
        ROOT_GAME_OBJECT.PENCIL.PATH = ROOT_GAME_OBJECT.PENCIL.LOADED_PATH.PATH;
        ROOT_GAME_OBJECT.PENCIL.NAME = ROOT_GAME_OBJECT.PENCIL.LOADED_PATH.NAME;
        ROOT_GAME_OBJECT.PENCIL.ID = ROOT_GAME_OBJECT.PENCIL.LOADED_PATH.ID;
        // ROOT_GAME_OBJECT.PENCIL.LOADED_PATH = null;
        ROOT_GAME_OBJECT.PENCIL.RECORD = false;

      } else {

        SYS.DEBUG.WARNING("Pencil object : load draws faild. Please give a name in arg");

      }

    };

    ROOT_GAME_OBJECT.PENCIL.DRAW = function() {};

    ROOT_GAME_OBJECT.PENCIL.CLEAR = function() {
      ROOT_GAME_OBJECT.PENCIL.PATH = [];
    };

    ROOT_GAME_OBJECT.PENCIL.DRAW_TYPE = function(TYPE_) {

      if(TYPE_ == "LINES") {
        ROOT_GAME_OBJECT.PENCIL.DRAW = ROOT_GAME_OBJECT.PENCIL.DRAW_LINES;
        ROOT_GAME_OBJECT.PENCIL.TYPE = TYPE_;
      } else if(TYPE_ == "POINTS") {
        ROOT_GAME_OBJECT.PENCIL.DRAW = ROOT_GAME_OBJECT.PENCIL.DRAW_POINTS;
        ROOT_GAME_OBJECT.PENCIL.TYPE = TYPE_;
      } else if(TYPE_ == "STRIP_LINES") {
        ROOT_GAME_OBJECT.PENCIL.DRAW = ROOT_GAME_OBJECT.PENCIL.DRAW_STRIP_LINES;
        ROOT_GAME_OBJECT.PENCIL.TYPE = TYPE_;
      } else if(TYPE_ == "STRIP_LINES2") {
        ROOT_GAME_OBJECT.PENCIL.DRAW = ROOT_GAME_OBJECT.PENCIL.DRAW_STRIP_LINES2;
        ROOT_GAME_OBJECT.PENCIL.TYPE = TYPE_;
      } else if(TYPE_ == "BALLS") {
        ROOT_GAME_OBJECT.PENCIL.DRAW = ROOT_GAME_OBJECT.PENCIL.DRAW_BALS;
        ROOT_GAME_OBJECT.PENCIL.TYPE = TYPE_;
      } else {

        ROOT_GAME_OBJECT.PENCIL.DRAW = ROOT_GAME_OBJECT.PENCIL.DRAW_POINTS;
        ROOT_GAME_OBJECT.PENCIL.TYPE = "POINTS";
      }

    };

    ROOT_GAME_OBJECT.PENCIL.DRAW_POINTS = function() {

      ROOT_GAME_OBJECT.PENCIL.PATH.forEach(function(value_) {

        SURF.fillStyle = ROOT_GAME_OBJECT.PENCIL.COLOR;
        SURF.beginPath();
        SURF.arc(value_.x, value_.y, ROOT_GAME_OBJECT.PENCIL.WIDTH, 0, 2 * Math.PI);
        SURF.fill();

      });

    };

    ROOT_GAME_OBJECT.PENCIL.DRAW_STRIP_LINES = function() {

      var a = 0;
      ROOT_GAME_OBJECT.PENCIL.PATH.forEach(function(value_) {

        SURF.strokeStyle = ROOT_GAME_OBJECT.PENCIL.COLOR;
        //SURF.beginPath();
        //SURF.arc(value_.x,value_.y,ROOT_GAME_OBJECT.PENCIL.WIDTH,0,2*Math.PI);

        if(a == 0) {
          SURF.beginPath();
          SURF.lineWidth = ROOT_GAME_OBJECT.PENCIL.WIDTH;
          SURF.moveTo(value_.x, value_.y);
        }

        SURF.lineTo(value_.x, value_.y);

        SURF.stroke();
        a++;

      });

    };

    ROOT_GAME_OBJECT.PENCIL.DRAW_LINES = function() {

      var a = 0;
      ROOT_GAME_OBJECT.PENCIL.PATH.forEach(function(value_) {

        SURF.strokeStyle = ROOT_GAME_OBJECT.PENCIL.COLOR;
        //SURF.beginPath();
        //SURF.arc(value_.x,value_.y,ROOT_GAME_OBJECT.PENCIL.WIDTH,0,2*Math.PI);

        if(isOdd(a)) {
          SURF.beginPath();
          SURF.lineWidth = ROOT_GAME_OBJECT.PENCIL.WIDTH;
          SURF.moveTo(value_.x, value_.y);
        }

        SURF.lineTo(value_.x, value_.y);

        SURF.stroke();
        a++;

      });

    };
    //
    ROOT_GAME_OBJECT.PENCIL.DRAW_STRIP_LINES2 = function() {

      var a = 0;
      ROOT_GAME_OBJECT.PENCIL.PATH.forEach(function(value_) {

        SURF.strokeStyle = ROOT_GAME_OBJECT.PENCIL.COLOR;
        //SURF.beginPath();
        //SURF.arc(value_.x,value_.y,ROOT_GAME_OBJECT.PENCIL.WIDTH,0,2*Math.PI);

        if(isEven(a)) {
          SURF.beginPath();
          SURF.lineWidth = ROOT_GAME_OBJECT.PENCIL.WIDTH;
          SURF.moveTo(value_.x, value_.y);
        }

        //SURF.lineTo(value_.x,value_.y);
        //SURF.stroke();

        SURF.lineTo(value_.x, value_.y);
        SURF.stroke();

        a++;

      });

      var a = 0;
      ROOT_GAME_OBJECT.PENCIL.PATH.forEach(function(value_) {

        SURF.strokeStyle = ROOT_GAME_OBJECT.PENCIL.COLOR;
        //SURF.beginPath();
        //SURF.arc(value_.x,value_.y,ROOT_GAME_OBJECT.PENCIL.WIDTH,0,2*Math.PI);

        if(isOdd(a)) {
          SURF.beginPath();
          SURF.lineWidth = ROOT_GAME_OBJECT.PENCIL.WIDTH;
          SURF.moveTo(value_.x, value_.y);
        }

        SURF.lineTo(value_.x, value_.y);
        SURF.stroke();

        a++;

      });

    };
    //
    ROOT_GAME_OBJECT.PENCIL.DRAW_BALS = function() {

      SURF.fillStyle = ROOT_GAME_OBJECT.PENCIL.COLOR;
      ROOT_GAME_OBJECT.PENCIL.PATH.forEach(function(value_) {
        SURF.beginPath();
        SURF.arc(value_.x, value_.y, ROOT_GAME_OBJECT.PENCIL.WIDTH * 20, 0, 2 * Math.PI);
        SURF.fill();
      });

    };

    ROOT_GAME_OBJECT.PENCIL.DRAW_TYPE();

    //#############################
    //#############################
    ROOT_GAME_OBJECT.ON_UPDATE_SYS = function() {

      if(ROOT_GAME_OBJECT.PENCIL.RECORD == true) {
        if(ROOT_GAME_OBJECT.PENCIL.PATH.length > 0) {
          if(ROOT_GAME_OBJECT.PENCIL.PATH[ROOT_GAME_OBJECT.PENCIL.PATH.length - 1].x != SYS.MOUSE.x) {

            ROOT_GAME_OBJECT.PENCIL.PATH.push({
              x: SYS.MOUSE.x,
              y: SYS.MOUSE.y
            });

            var XX = SYS.MOUSE.x;
            var YY = SYS.MOUSE.y;
            ROOT_GAME_OBJECT.PENCIL.LAST_POS.x = XX;
            ROOT_GAME_OBJECT.PENCIL.LAST_POS.y = YY;

          }
        } else {

          ROOT_GAME_OBJECT.PENCIL.PATH.push(ROOT_GAME_OBJECT.PENCIL.LAST_POS);

        }

      }
    };

    ROOT_GAME_OBJECT.ON_UPDATE_SYS_RECORD_ONLY_TAP = function() {};
    ROOT_GAME_OBJECT.ON_UPDATE_SYS_RECORD_EVERY_POINT = function() {

      if(ROOT_GAME_OBJECT.PENCIL.RECORD == true) {
        if(ROOT_GAME_OBJECT.PENCIL.PATH.length > 0) {
          if(ROOT_GAME_OBJECT.PENCIL.PATH[ROOT_GAME_OBJECT.PENCIL.PATH.length - 1].x != SYS.MOUSE.x) {

            ROOT_GAME_OBJECT.PENCIL.PATH.push({
              x: SYS.MOUSE.x,
              y: SYS.MOUSE.y
            });

            var XX = SYS.MOUSE.x;
            var YY = SYS.MOUSE.y;
            ROOT_GAME_OBJECT.PENCIL.LAST_POS.x = XX;
            ROOT_GAME_OBJECT.PENCIL.LAST_POS.y = YY;

          }
        } else {

          ROOT_GAME_OBJECT.PENCIL.PATH.push(ROOT_GAME_OBJECT.PENCIL.LAST_POS);

        }

      }
    };

  };

  this.TRANSLATE_BY_PATH = function(PATH_, LOOP_TYPE) {

    ROOT_GAME_OBJECT.sys_translateByPath = PATH_;
    ROOT_GAME_OBJECT.sys_translateByPathIndex = 0;
    if(typeof LOOP_TYPE != "undefined") {

      ROOT_GAME_OBJECT.sys_translateByPathLoopType = LOOP_TYPE;
      ROOT_GAME_OBJECT.sys_translateByPathLoopTypeActive = "STOP";

    } else {

      ROOT_GAME_OBJECT.sys_translateByPathLoopType = "STOP";
      ROOT_GAME_OBJECT.sys_translateByPathLoopTypeActive = "STOP";

    }

    ROOT_GAME_OBJECT.POSITION.TRANSLATE(CONVERTOR.PIX_TO_PER(ROOT_GAME_OBJECT.sys_translateByPath[ROOT_GAME_OBJECT.sys_translateByPathIndex].x), CONVERTOR.PIY_TO_PER(ROOT_GAME_OBJECT.sys_translateByPath[ROOT_GAME_OBJECT.sys_translateByPathIndex].y));

    ROOT_GAME_OBJECT.POSITION.ON_TARGET_POSITION = function() {

      if(ROOT_GAME_OBJECT.sys_translateByPathLoopTypeActive == "STOP") {
        if(ROOT_GAME_OBJECT.sys_translateByPath.length > ROOT_GAME_OBJECT.sys_translateByPathIndex + 1) {
          ROOT_GAME_OBJECT.sys_translateByPathIndex++;
          ROOT_GAME_OBJECT.POSITION.TRANSLATE(CONVERTOR.PIX_TO_PER(ROOT_GAME_OBJECT.sys_translateByPath[ROOT_GAME_OBJECT.sys_translateByPathIndex].x), CONVERTOR.PIY_TO_PER(ROOT_GAME_OBJECT.sys_translateByPath[ROOT_GAME_OBJECT.sys_translateByPathIndex].y));
        } else {

          if(ROOT_GAME_OBJECT.sys_translateByPathLoopType == "INVERSE") {
            ROOT_GAME_OBJECT.sys_translateByPathLoopTypeActive = "INVERSE";
            ROOT_GAME_OBJECT.sys_translateByPathIndex--;
            ROOT_GAME_OBJECT.sys_translateByPathIndex--;
            ROOT_GAME_OBJECT.POSITION.TRANSLATE(CONVERTOR.PIX_TO_PER(ROOT_GAME_OBJECT.sys_translateByPath[ROOT_GAME_OBJECT.sys_translateByPathIndex].x), CONVERTOR.PIY_TO_PER(ROOT_GAME_OBJECT.sys_translateByPath[ROOT_GAME_OBJECT.sys_translateByPathIndex].y));

          }
        }
      } else if(ROOT_GAME_OBJECT.sys_translateByPathLoopTypeActive == "INVERSE") {
        if(ROOT_GAME_OBJECT.sys_translateByPathIndex > 1) {
          ROOT_GAME_OBJECT.sys_translateByPathIndex--;
          ROOT_GAME_OBJECT.POSITION.TRANSLATE(CONVERTOR.PIX_TO_PER(ROOT_GAME_OBJECT.sys_translateByPath[ROOT_GAME_OBJECT.sys_translateByPathIndex].x), CONVERTOR.PIY_TO_PER(ROOT_GAME_OBJECT.sys_translateByPath[ROOT_GAME_OBJECT.sys_translateByPathIndex].y));
        } else {

          if(ROOT_GAME_OBJECT.sys_translateByPathLoopType == "INVERSE_FOR_EVER") {
            ROOT_GAME_OBJECT.sys_translateByPathLoopTypeActive = "STOP";

            ROOT_GAME_OBJECT.sys_translateByPathIndex++;
            ROOT_GAME_OBJECT.POSITION.TRANSLATE(CONVERTOR.PIX_TO_PER(ROOT_GAME_OBJECT.sys_translateByPath[ROOT_GAME_OBJECT.sys_translateByPathIndex].x), CONVERTOR.PIY_TO_PER(ROOT_GAME_OBJECT.sys_translateByPath[ROOT_GAME_OBJECT.sys_translateByPathIndex].y));

          }

        }
      } else {

        /* 	 if (ROOT_GAME_OBJECT.sys_translateByPathLoopType == "STOP") {


        }
        else if (ROOT_GAME_OBJECT.sys_translateByPathLoopType == "INVERSE"){

        ROOT_GAME_OBJECT.sys_translateByPathLoopTypeActive = "INVERSE";

        }
        else if (ROOT_GAME_OBJECT.sys_translateByPathLoopType == "INVERSE_FOR_EVER"){

        ROOT_GAME_OBJECT.sys_translateByPathLoopTypeActive = "STOP";
        }
         */
      }

    };

  };

  this.EDITOR = {
    SELECTED: false,
    ENABLE: window[ROOT_GAME_OBJECT.PROGRAM_NAME].ENGINE.ENGINE_EDITOR,
    ACTORS_VISIBLE: true,
    ACTORS_AREA_HEIGHT: 10,
    ACTOR_BLUE_HOVER: false,
    ACTOR_GREEN_HOVER: false,
    ACTOR_CENTER_OSCILATOR: new SYS.MATH.OSCILLATOR(0, 2, 0.01),
    ACTOR_START_X: 0,
    ACTOR_START_Y: 0,
    ACTOR_DELTA: 0,
    ACTOR_X_IN_MOVE: false,
    ACTOR_Y_IN_MOVE: false,
    ACTOR_DRAG_RECT_DIM: new DIMENSION(5, 5),
    //ACTOR_DRAG_RECT_POS : SYS.ARRAY_OPERATION.DEEP_COPY.getCloneOfObject( this.POSITION ) ,
    ACTOR_DRAG_RECT_POS: this.POSITION,
    ACTOR_DRAG: false,
    BUTTONS: [
      new RIGHT_MENU_BUTTON("Destroy gameObject", 0, "1"),
      new RIGHT_MENU_BUTTON("Destroy after secund ", 20, "2"),
      new RIGHT_MENU_BUTTON("Add animation ", 40, "3"),
      new RIGHT_MENU_BUTTON("Add collision ", 60, "4"),
      new RIGHT_MENU_BUTTON("Atach player ", 80, "5", "res/system/images/html5/plus.png"),
      new RIGHT_MENU_BUTTON("Add particle ", 100, "6", "res/system/images/html5/particle.png"),
      new RIGHT_MENU_BUTTON("Add textbox ", 120, "7", "res/system/images/html5/textbox.png"),
      new RIGHT_MENU_BUTTON("Add webcam  ", 140, "8", "res/system/images/html5/HTML5-Device-Access.png"),
      new RIGHT_MENU_BUTTON("Set width ", 160, "B1"),
      new RIGHT_MENU_BUTTON("Set height ", 180, "B2"),
      new RIGHT_MENU_BUTTON("Set animation speed ", 200, "ANIM1"),
      new RIGHT_MENU_BUTTON("Set animation type ", 220, "ANIM2"),
    ],
    GAME_OBJECT_MENU: {
      VISIBLE: false,
    },
  };

  this.WEBCAM = null;
  this.SET_WEBCAM_VIEW = function(type_, DIMENSIONS_TYPE) {
    // just webcam view
    ROOT_GAME_OBJECT.WEBCAM = new Object();
    ROOT_GAME_OBJECT.WEBCAM.VIDEO = SYS.DOM.E("webcam");
    SET_STREAM(ROOT_GAME_OBJECT.WEBCAM.VIDEO);

    if(DIMENSIONS_TYPE == "GAME_OBJECT") {

      ROOT_GAME_OBJECT.WEBCAM.DIMENSIONS_TYPE = "GAME_OBJECT";
    } else {

      ROOT_GAME_OBJECT.WEBCAM.DIMENSIONS_TYPE = "WEBCAM_DIMENSION";
      ROOT_GAME_OBJECT.DIMENSION.H = CONVERTOR.PIY_TO_PER(SYS.DOM.E("webcam").height);
      ROOT_GAME_OBJECT.DIMENSION.W = CONVERTOR.PIX_TO_PER(SYS.DOM.E("webcam").width);

    }

    if(type_ == "NORMAL") {
      ROOT_GAME_OBJECT.TYPE_OF_GAME_OBJECT = "WEBCAM";
    } else if(type_ == "NUI") {

      SYS.DOM.E("canvas-blended").height = SYS.DOM.E("webcam").height;
      SYS.DOM.E("canvas-blended").width = SYS.DOM.E("webcam").width;
      SYS.DOM.E("canvas-render").height = SYS.DOM.E("webcam").height;
      SYS.DOM.E("canvas-render").width = SYS.DOM.E("webcam").width;
      ROOT_GAME_OBJECT.TYPE_OF_GAME_OBJECT = "WEBCAM_NUI";
      ROOT_GAME_OBJECT.WEBCAM.BLEND_CANVAS = SYS.DOM.E("canvas-blended");
      ROOT_GAME_OBJECT.WEBCAM.RENDER_CANVAS = SYS.DOM.E("canvas-render");
      ROOT_GAME_OBJECT.WEBCAM.NOTES = [];
    }
  };
  this.CREATE_WEBCAM = function(type_, DIMENSIONS_TYPE, numFieldV, numFieldH) {

    if(typeof type_ != "undefined") {

      if(type_ == "NUI") {

        ROOT_GAME_OBJECT.SET_WEBCAM_VIEW("NUI", DIMENSIONS_TYPE);
        ROOT_GAME_OBJECT.WEBCAM.numFieldV = numFieldV;
        ROOT_GAME_OBJECT.WEBCAM.numFieldH = numFieldH;
        ROOT_GAME_OBJECT.WEBCAM.BS = ROOT_GAME_OBJECT.WEBCAM.BLEND_CANVAS.getContext("2d");
        ROOT_GAME_OBJECT.WEBCAM.RC = ROOT_GAME_OBJECT.WEBCAM.RENDER_CANVAS.getContext("2d");
        ROOT_GAME_OBJECT.WEBCAM._N_ = new Array();
        CREATE_MOTION_PARAMETERS(ROOT_GAME_OBJECT);
        CREATE_MOTION_FIELDS(ROOT_GAME_OBJECT);
        ROOT_GAME_OBJECT.WEBCAM.HIDE_INDICATED_POINT = false;
        ROOT_GAME_OBJECT.WEBCAM.DRAW = WEBCAM_DRAW;
      } else if("NORMAL") {

        ROOT_GAME_OBJECT.SET_WEBCAM_VIEW("NORMAL", DIMENSIONS_TYPE);

      }
    } else {
      SYS.DEBUG.WARNING("Pleas enter type of webcam component .  [ NUI , NORMAL ]  ");
    }
  };

  this.DESTROY_WEBCAM = function() {

    ROOT_GAME_OBJECT.TYPE_OF_GAME_OBJECT = "NO_RENDER";
    ROOT_GAME_OBJECT.WEBCAM.DRAW = function() {};
    ROOT_GAME_OBJECT.WEBCAM.NOTES = [];
    ROOT_GAME_OBJECT.WEBCAM.BS = null;
    ROOT_GAME_OBJECT.WEBCAM.RC = null;
    ROOT_GAME_OBJECT.WEBCAM._N_ = [];
    delete (ROOT_GAME_OBJECT.WEBCAM);
    ROOT_GAME_OBJECT.WEBCAM = null;

  };

  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$//$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$//$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  // MUTIRTC_PEER

  this.ON_PEER_CREATED = {
    "DONE": function() {} /* MAIN_PEER.CHANNEL.SET('LEVEL1') }  */
  };

  this.CREATE_PEER = function(port) {

    if(typeof port != "undefined") {
      window["MAIN_PEER"].PORT = port;
    } else {
      window["MAIN_PEER"].PORT = 12034;
    }

    if(typeof window["MAIN_PEER"].REMOTE_DATA == "undefined") {

      ROOT_GAME_OBJECT.MAIN_PEER = window["MAIN_PEER"];
      ROOT_GAME_OBJECT.MAIN_PEER.ADDRESS = "localhost";
      ROOT_GAME_OBJECT.MAIN_PEER.ON_PEER_CREATED = ROOT_GAME_OBJECT.ON_PEER_CREATED;
      ROOT_GAME_OBJECT.MAIN_PEER.LOADED = function() {

        console.log("peer loaded2");

      };

      if(typeof window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER") == "undefined") {

        setTimeout(ROOT_GAME_OBJECT.CREATE_PEER, 50);
        return;

      } else {
        if(typeof window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").NEW_OBJECT == "function") {}
        else {

          setTimeout(ROOT_GAME_OBJECT.CREATE_PEER, 50);
          return;

        }

      }

      window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").NEW_OBJECT("system_object_for_MAIN_peer", 5, 5, 15, 8, 10);
      var sys_btn_alias = window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS("system_object_for_MAIN_peer");

      sys_btn_alias.DIMENSION.W = ROOT_GAME_OBJECT.DIMENSION.W;
      sys_btn_alias.CREATE_TEXTBOX("enter message", 10, "black", "lime");
      system_object_for_MAIN_peer.TEXTBOX.font = "18px Arial";

      system_object_for_MAIN_peer.TEXTBOX.ON_PRESS_ENTER = function() {

        SYS.DOM.E("SEND_BTN_").value = system_object_for_MAIN_peer.TEXTBOX.TEXT;
        SYS.DEBUG.LOG("SEND TEXT MSG TO CURRENT CHANNEL");
        system_object_for_MAIN_peer.TEXTBOX.TEXT = "";
        ROOT_GAME_OBJECT.MAIN_PEER.SEND_MSG();

      };

      window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").NEW_OBJECT("system_object_for_MAIN_peer_BTN_connect", 5, 5, 9, 7, 10);
      var sys_btn_connect = window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS("system_object_for_MAIN_peer_BTN_connect");
      sys_btn_connect.CREATE_TEXTBOX("Connect", 10, "black", "lime");
      sys_btn_connect.TEXTBOX.font = "18px Arial";
      sys_btn_connect.TEXTBOX.EDIT = false;
      sys_btn_connect.TAP = function() {
        if(rtcMultiConnection.sessionDescription == null) {

          MAIN_PEER.CONNECT_TO_CHANNEL();

        }

      };

      ///////////////////////
      ROOT_GAME_OBJECT.ON_UPDATE_SYS = function() {

        //sys_btn_alias.POSITION.x = ROOT_GAME_OBJECT.POSITION.x;
        sys_btn_alias.POSITION.SET_POSITION(ROOT_GAME_OBJECT.POSITION.x, ROOT_GAME_OBJECT.POSITION.y + ROOT_GAME_OBJECT.DIMENSION.H * 1.1, "DIAMETRIC");
        sys_btn_connect.POSITION.SET_POSITION(ROOT_GAME_OBJECT.POSITION.x + ROOT_GAME_OBJECT.DIMENSION.W / 1.7, ROOT_GAME_OBJECT.POSITION.y, "DIAMETRIC");

      };

      // ROOT_GAME_OBJECT.
      //

      ROOT_GAME_OBJECT.MAIN_PEER.REMOTE_DATA = {

        OBJECTS: [],

        //SEND DATA
        SHARE: function(object) {

          rtcMultiConnection.send({
            "shared_object": object,
            "operation": "share"
          });
          object.PEER_SHARED = true;

        },
        SHARE_POSITION: function(object) {

          object.POSITION.SHARE_POSITION = true;

        },

        NEW_POSITION: function(object) {

          rtcMultiConnection.send({
            "nameOfObject": object.NAME,
            "operation": "new_pos",
            "x": object.POSITION.x,
            "y": object.POSITION.y
          });

        },

        NEW_DIMENSION: function(object) {

          rtcMultiConnection.send({
            "nameOfObject": object.NAME,
            "operation": "new_dim",
            "x": object.DIMENSION.W,
            "y": object.DIMENSION.H
          });

        },

        // DATA FROM SERVER
        NETWORK_VIEW: function(e) {

          if(e.operation == "share") {

            window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("STARTER").NEW_NETWORK_OBJECT(e.shared_object);

          } else if(e.operation == "new_pos") {

            window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("STARTER").NEW_NETWORK_POSITION(e);

          } else if(e.operation == "new_dim") {

            window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("STARTER").NEW_NETWORK_DIMENSION(e);

          } else if(e.operation == "dimension&position") {}

        },

      };

      ROOT_GAME_OBJECT.MAIN_PEER.CHANNEL = {

        GET: function() {

          return SYS.DOM.E("room-name").value;

        },

        SET: function(newvalue) {

          SYS.DOM.E("room-name").value = newvalue;

        },

      };

      ROOT_GAME_OBJECT.MAIN_PEER.LOCAL_USER = {

        GET: function() {

          return SYS.DOM.E("your-name").value;

        },

        SET: function(newvalue) {

          SYS.DOM.E("your-name").value = newvalue;

        },

      };

      ROOT_GAME_OBJECT.MAIN_PEER.SEND_MSG = function() {

        if(typeof rtcMultiConnection != "undefined") {

          rtcMultiConnection.send(SYS.DOM.E("SEND_BTN_").value);

          SYS.DOM.E("SEND_BTN_").value = "";

        }

      },

        ROOT_GAME_OBJECT.MAIN_PEER.CONNECT_TO_CHANNEL = function() {

          SYS.DOM.E("continue").onclick();

        },

        ROOT_GAME_OBJECT.MAIN_PEER.LOGS = "logs!";
      ROOT_GAME_OBJECT.TYPE_OF_GAME_OBJECT = "MAIN_PEER_OBJECT";

      setTimeout(function() {

        MAIN_PEER.ON_PEER_CREATED.DONE();

      }, 200);

    } else {

      SYS.DEBUG.WARNING("from function CREATE_PEER -  MAIN PEER OBJECT ALREADY CREATED.");

    }
  };

  this.GROUP = {

    ADD: function(name) {

      var locx = window[ROOT_GAME_OBJECT.PROGRAM_NAME].ENGINE.MODULES.ACCESS_MODULE(ROOT_GAME_OBJECT.PARENT).GAME_OBJECTS.ACCESS(name).POSITION.x;
      var locy = window[ROOT_GAME_OBJECT.PROGRAM_NAME].ENGINE.MODULES.ACCESS_MODULE(ROOT_GAME_OBJECT.PARENT).GAME_OBJECTS.ACCESS(name).POSITION.y;

      var dx = ROOT_GAME_OBJECT.GROUP.MASTER_INITIALS.x - locx;
      var dy = ROOT_GAME_OBJECT.GROUP.MASTER_INITIALS.y - locy;

      ROOT_GAME_OBJECT.GROUP.GROUP_INITIALS.push({
        x: dx,
        y: dy
      });
      ROOT_GAME_OBJECT.GROUP.GROUP.push(name);

      //delete (locx);
      //delete (locy);
      //SYS.DEBUG.LOG(dx + "=============" + dy)

    },
    GROUP: [],
    GROUP_INITIALS: [],
    MASTER: ROOT_GAME_OBJECT.NAME,
    MASTER_INITIALS: {
      x: ROOT_GAME_OBJECT.POSITION.x,
      y: ROOT_GAME_OBJECT.POSITION.y
    },
    UPDATE: function() {},

  };

  this.EFFECTS = {

    FADE: {
      IN: function(sec) {

        var TIMER = setTimeout(function() {

          ROOT_GAME_OBJECT.globalAlpha += 0.02;
          if(ROOT_GAME_OBJECT.globalAlpha < 1) {
            ROOT_GAME_OBJECT.EFFECTS.FADE.IN();
          } else {
            ROOT_GAME_OBJECT.globalAlpha = 1;
          }

        }, sec);

      },
      OUT: function(sec) {

        var TIMER = setTimeout(function() {

          ROOT_GAME_OBJECT.globalAlpha -= 0.02;
          if(ROOT_GAME_OBJECT.globalAlpha > 0) {
            ROOT_GAME_OBJECT.EFFECTS.FADE.OUT();
          } else {
            ROOT_GAME_OBJECT.globalAlpha = 0;
          }

        }, sec);

      },
    },
    ZOOM: {
      STATUS_FOR_IN: false,
      STATUS_FOR_OUT: false,
      ZOOM_IN_FINISHED: function() {
        console.log("zoom in  ----finished.");
      },
      ZOOM_OUT_FINISHED: function() {
        console.log("zoom out ----finished.");
      },
      VALUE: 0.5,
      IN: function(sec) {
        var sec = sec;

        this.STATUS_FOR_IN = true;

        var TIMER = setTimeout(function() {

          if(ROOT_GAME_OBJECT.zoom_scale < ROOT_GAME_OBJECT.EFFECTS.ZOOM.VALUE) {
            ROOT_GAME_OBJECT.zoom_scale += 0.01;
            ROOT_GAME_OBJECT.POSITION.SET_POSITION(ROOT_GAME_OBJECT.POSITION.x - ROOT_GAME_OBJECT.zoom_scale, ROOT_GAME_OBJECT.POSITION.y - ROOT_GAME_OBJECT.zoom_scale, "DIAMETRIC");
            ROOT_GAME_OBJECT.DIMENSION.W = ROOT_GAME_OBJECT.DIMENSION.W + ROOT_GAME_OBJECT.zoom_scale * 2;
            ROOT_GAME_OBJECT.DIMENSION.H = ROOT_GAME_OBJECT.DIMENSION.H + ROOT_GAME_OBJECT.zoom_scale * 2;
            ROOT_GAME_OBJECT.EFFECTS.ZOOM.IN(sec);

          } else {

            ROOT_GAME_OBJECT.EFFECTS.ZOOM.ZOOM_IN_FINISHED();
            ROOT_GAME_OBJECT.EFFECTS.ZOOM.STATUS_FOR_IN = false;

          }

        }, sec);

      },
      OUT: function(sec) {
        var sec = sec;
        this.STATUS_FOR_OUT = true;

        var TIMER = setTimeout(function() {
          if(ROOT_GAME_OBJECT.POSITION.x < ROOT_GAME_OBJECT.GROUP.MASTER_INITIALS.x) {
            ROOT_GAME_OBJECT.zoom_scale -= 0.009;
            ROOT_GAME_OBJECT.POSITION.SET_POSITION(ROOT_GAME_OBJECT.POSITION.x + ROOT_GAME_OBJECT.zoom_scale, ROOT_GAME_OBJECT.POSITION.y + ROOT_GAME_OBJECT.zoom_scale, "DIAMETRIC");
            ROOT_GAME_OBJECT.DIMENSION.W = ROOT_GAME_OBJECT.DIMENSION.W - ROOT_GAME_OBJECT.zoom_scale * 2;
            ROOT_GAME_OBJECT.DIMENSION.H = ROOT_GAME_OBJECT.DIMENSION.H - ROOT_GAME_OBJECT.zoom_scale * 2;
            ROOT_GAME_OBJECT.EFFECTS.ZOOM.OUT(sec);
          } else {
            ROOT_GAME_OBJECT.zoom_scale = 0;
            ROOT_GAME_OBJECT.EFFECTS.ZOOM.ZOOM_OUT_FINISHED();
            ROOT_GAME_OBJECT.EFFECTS.ZOOM.STATUS_FOR_OUT = false;
          }

        }, sec);

      },
    },

  };

  this.PARTICLE = null;
  this.CREATE_PARTICLE = function(type_) {
    // NEED to be created more particle system in future !!!
    ROOT_GAME_OBJECT.PARTICLE = new PARTICLE_FONTAN(ROOT_GAME_OBJECT);
    ROOT_GAME_OBJECT.TYPE_OF_GAME_OBJECT = "PATRICLE";

  };

  this.CUSTOM = function() {};

  this.DESELECT_ALL = function() {

    var exec_local = "" + ROOT_GAME_OBJECT.PROGRAM_NAME.toString();
    for(var z = 0;z < window[exec_local].ENGINE.MODULES.ACCESS(ROOT_GAME_OBJECT.PARENT).GAME_OBJECTS.length;z++) {
      window[exec_local].ENGINE.MODULES.ACCESS(ROOT_GAME_OBJECT.PARENT).GAME_OBJECTS[z].EDITOR.SELECTED = false;
    }

  };

  // For user override
  this.TOUCH_DOWN = function() {

    SYS.DEBUG.LOG("No atached event . EVENT_TOUCH_DOWN");

  };
  this.TAP = function() {

    SYS.DEBUG.LOG("No atached event . EVENT_TAP : similar click");

  };
  this.TOUCH_UP = function() {

    SYS.DEBUG.LOG("No atached event . EVENT_TOUCH_UP");

  };
  this.TOUCH_MOVE = function() {

    // SYS.DEBUG.LOG("No atached event . EVENT_TOUCH_MOVE");

  };

  this.UPDATE_STATUS = {

    STOP: function() {},

  };

  this.ROTATE = {

    ANGLE: 0, //use for custum image drawing
    RADIANS: 0, // fiktive
    ROTATE_ARROUNT_CENTER: function() {

      ORBIT(50, 50, ROOT_GAME_OBJECT.ROTATE.ANGLE, ROOT_GAME_OBJECT.POSITION);

    },

  };

  this.DRAW = function(s) {

    if(ROOT_GAME_OBJECT.VISIBLE == true) {

      s.save();

      s.globalAlpha = ROOT_GAME_OBJECT.globalAlpha;

      if(this.TYPE_OF_GAME_OBJECT == "ANIMATION") {

        this.ANIMATION.DRAW();

      } else if(this.TYPE_OF_GAME_OBJECT == "TEXT_BOX") {

        this.TEXTBOX.DRAW(s);

      } else if(this.TYPE_OF_GAME_OBJECT == "TEXT_BOX_ANIMATION") {

        this.TEXTBOX.DRAW(s);
        this.ANIMATION.DRAW();

      } else if(this.TYPE_OF_GAME_OBJECT == "PATRICLE") {

        this.PARTICLE.DRAW(s);
      } else if(this.TYPE_OF_GAME_OBJECT == "PATRICLE_ANIMATION") {

        this.PARTICLE.DRAW(s);
        this.ANIMATION.DRAW();
      } else if(this.TYPE_OF_GAME_OBJECT == "ANIMATION_PATRICLE") {

        this.ANIMATION.DRAW();
        this.PARTICLE.DRAW(s);
      } else if(this.TYPE_OF_GAME_OBJECT == "ANIMATION_TEXT_BOX") {

        this.ANIMATION.DRAW();
        this.TEXTBOX.DRAW(s);
      } else if(this.TYPE_OF_GAME_OBJECT == "ANIMATION_PATRICLE") {
        this.ANIMATION.DRAW();
        this.PARTICLE.DRAW(s);
      } else if(this.TYPE_OF_GAME_OBJECT == "WEBCAM") {

        if(ROOT_GAME_OBJECT.WEBCAM.DIMENSIONS_TYPE = "GAME_OBJECT") {
          s.drawImage(ROOT_GAME_OBJECT.WEBCAM.VIDEO, ROOT_GAME_OBJECT.POSITION.X(), ROOT_GAME_OBJECT.POSITION.Y(), ROOT_GAME_OBJECT.DIMENSION.WIDTH(), ROOT_GAME_OBJECT.DIMENSION.HEIGHT());
        } else {
          s.drawImage(ROOT_GAME_OBJECT.WEBCAM.VIDEO, ROOT_GAME_OBJECT.POSITION.X(), ROOT_GAME_OBJECT.POSITION.Y(), ROOT_GAME_OBJECT.WEBCAM.VIDEO.width, ROOT_GAME_OBJECT.WEBCAM.VIDEO.height);
        }

      } else if(this.TYPE_OF_GAME_OBJECT == "WEBCAM_NUI") {

        if(ROOT_GAME_OBJECT.WEBCAM.DIMENSIONS_TYPE = "GAME_OBJECT") {
          s.drawImage(ROOT_GAME_OBJECT.WEBCAM.VIDEO, ROOT_GAME_OBJECT.POSITION.X(), ROOT_GAME_OBJECT.POSITION.Y(), ROOT_GAME_OBJECT.DIMENSION.WIDTH(), ROOT_GAME_OBJECT.DIMENSION.HEIGHT());
        } else {
          s.drawImage(ROOT_GAME_OBJECT.WEBCAM.VIDEO, ROOT_GAME_OBJECT.POSITION.X(), ROOT_GAME_OBJECT.POSITION.Y(), ROOT_GAME_OBJECT.WEBCAM.VIDEO.width, ROOT_GAME_OBJECT.WEBCAM.VIDEO.height);
        }
        blend(ROOT_GAME_OBJECT, s);
        checkAreas(ROOT_GAME_OBJECT);
        ROOT_GAME_OBJECT.WEBCAM.DRAW(s, ROOT_GAME_OBJECT.WEBCAM);

      } else if(this.TYPE_OF_GAME_OBJECT == "CUSTOM") {

        ROOT_GAME_OBJECT.CUSTOM(s);

      } else if(this.TYPE_OF_GAME_OBJECT == "PENCIL") {
        ROOT_GAME_OBJECT.PENCIL.DRAW();
      } else if(this.TYPE_OF_GAME_OBJECT == "NO_RENDER") {
        // nothing here
      } else if(this.TYPE_OF_GAME_OBJECT == "MAIN_PEER_OBJECT") {

        s.fillStyle = "#192837";
        s.fillRect(this.POSITION.X(), this.POSITION.Y(), this.DIMENSION.WIDTH(), this.DIMENSION.HEIGHT());
        s.fillStyle = "lime";

        s.drawImage(image_system_8, this.POSITION.X() + this.DIMENSION.WIDTH() / 2, this.POSITION.Y() + 30, 90, 90);
        s.drawImage(image_system_conn, this.POSITION.X() + this.DIMENSION.WIDTH() / 1.4, this.POSITION.Y() + 30, 90, 90);

        s.fillText("Signaling IP Address : " + this.MAIN_PEER.ADDRESS, this.POSITION.X() + this.EDITOR.ACTORS_AREA_HEIGHT, this.POSITION.Y() + this.EDITOR.ACTORS_AREA_HEIGHT * 4);
        s.fillText("Name : " + this.MAIN_PEER.LOCAL_USER.GET(), this.POSITION.X() + this.EDITOR.ACTORS_AREA_HEIGHT, this.POSITION.Y() + this.EDITOR.ACTORS_AREA_HEIGHT * 5);

        s.fillText("Channel : " + this.MAIN_PEER.CHANNEL.GET(), this.POSITION.X() + this.EDITOR.ACTORS_AREA_HEIGHT, this.POSITION.Y() + this.EDITOR.ACTORS_AREA_HEIGHT * 6);

        s.fillText("peer logs : " + ROOT_GAME_OBJECT.MAIN_PEER.LOGS, this.POSITION.X() + this.EDITOR.ACTORS_AREA_HEIGHT, this.POSITION.Y() + this.EDITOR.ACTORS_AREA_HEIGHT * 7);
        //ROOT_GAME_OBJECT.MAIN_PEER.LOGS = 'logs!';
      }

      s.restore();

    }

  };

  this.DRAW_ACTOR = function(s) {

    if(this.EDITOR.ACTORS_VISIBLE == true) {

      s.save();

      s.font = "13px Arial";

      s.fillRect(0, this.POSITION.Y(), VIEW.W(), 1);
      s.fillRect(this.POSITION.X(), 0, 1, VIEW.H());

      s.globalAlpha = 0.5;
      s.fillRect(this.POSITION.X(), this.POSITION.Y(), this.DIMENSION.WIDTH(), this.DIMENSION.HEIGHT());
      s.globalAlpha = 0.9;

      if(ROOT_GAME_OBJECT.EDITOR.SELECTED == true) {

        s.fillText("Name :" + this.NAME, this.POSITION.X() + this.EDITOR.ACTORS_AREA_HEIGHT, this.POSITION.Y() - this.EDITOR.ACTORS_AREA_HEIGHT * 4);
        s.fillText("Percent :" + CONVERTOR.PIX_TO_PER(this.POSITION.X().toString()).toFixed(2) + "%  y:" + CONVERTOR.PIY_TO_PER(this.POSITION.Y()).toFixed(2), this.POSITION.X() + this.EDITOR.ACTORS_AREA_HEIGHT, this.POSITION.Y() - this.EDITOR.ACTORS_AREA_HEIGHT * 2.5);
        s.fillText("Actor- x:" + this.POSITION.X().toFixed(2).toString() + " y:" + this.POSITION.Y().toFixed(2), this.POSITION.X() + this.EDITOR.ACTORS_AREA_HEIGHT, this.POSITION.Y() - this.EDITOR.ACTORS_AREA_HEIGHT);

      }
      //CONVERTOR.PIX_TO_PER( h );

      // actor rect for drag
      //ACTOR_DRAG_RECT
      s.strokeStyle = "blue";
      s.strokeRect(this.EDITOR.ACTOR_DRAG_RECT_POS.X() + this.EDITOR.ACTORS_AREA_HEIGHT, this.EDITOR.ACTOR_DRAG_RECT_POS.Y() + this.EDITOR.ACTORS_AREA_HEIGHT, this.EDITOR.ACTOR_DRAG_RECT_DIM.WIDTH(), this.EDITOR.ACTOR_DRAG_RECT_DIM.HEIGHT());

      if(this.EDITOR.ACTOR_BLUE_HOVER == true) {
        s.fillStyle = "lime";
      } else {
        s.fillStyle = "blue";
      }

      //BLU LINE ACTOR X-OSA
      s.fillRect(this.POSITION.X(), this.POSITION.Y(), this.EDITOR.ACTORS_AREA_HEIGHT * 15, this.EDITOR.ACTORS_AREA_HEIGHT);

      s.beginPath();
      s.moveTo(this.POSITION.X() + this.EDITOR.ACTORS_AREA_HEIGHT * 10 * 1.5, this.POSITION.Y() - 0.5 * this.EDITOR.ACTORS_AREA_HEIGHT);
      s.lineTo(this.POSITION.X() + this.EDITOR.ACTORS_AREA_HEIGHT * 10 * 1.5, this.POSITION.Y() + 1.4 * this.EDITOR.ACTORS_AREA_HEIGHT);
      s.lineTo(this.POSITION.X() + this.EDITOR.ACTORS_AREA_HEIGHT * 12.5 * 1.5, this.POSITION.Y() + 1 / 2 * this.EDITOR.ACTORS_AREA_HEIGHT);
      s.closePath();
      s.fill();

      if(this.EDITOR.ACTOR_GREEN_HOVER == true) {

        s.fillStyle = "lime";

      } else {

        s.fillStyle = "green";

      }

      //BLU LINE ACTOR X-OSA
      s.fillRect(this.POSITION.X(), this.POSITION.Y(), this.EDITOR.ACTORS_AREA_HEIGHT, this.EDITOR.ACTORS_AREA_HEIGHT * 15);

      s.beginPath();
      s.moveTo(this.POSITION.X() - 0.5 * this.EDITOR.ACTORS_AREA_HEIGHT, this.POSITION.Y() + this.EDITOR.ACTORS_AREA_HEIGHT * 10 * 1.5);
      s.lineTo(this.POSITION.X() + 1.4 * this.EDITOR.ACTORS_AREA_HEIGHT, this.POSITION.Y() + this.EDITOR.ACTORS_AREA_HEIGHT * 10 * 1.5);
      s.lineTo(this.POSITION.X() + 1 / 2 * this.EDITOR.ACTORS_AREA_HEIGHT, this.POSITION.Y() + this.EDITOR.ACTORS_AREA_HEIGHT * 12.5 * 1.5);
      s.closePath();
      s.fill();

      // fix color compositi near x i y


      s.fillStyle = "red";
      s.beginPath();
      //s.strokeStyle = "rgba( 222 , " + this.PULSAR_G.VALUE + " , " + this.PULSAR_B.VALUE + " , " + this.PULSAR_A.VALUE + ")";
      s.arc(this.POSITION.X() + this.EDITOR.ACTORS_AREA_HEIGHT / 2, this.POSITION.Y() + this.EDITOR.ACTORS_AREA_HEIGHT / 2, this.EDITOR.ACTORS_AREA_HEIGHT / 2, (0) * Math.PI, (2) * Math.PI);
      s.fill();
      s.closePath();

      s.beginPath();
      s.lineWidth = 1;
      s.strokeStyle = "white";
      s.arc(this.POSITION.X() + this.EDITOR.ACTORS_AREA_HEIGHT / 2, this.POSITION.Y() + this.EDITOR.ACTORS_AREA_HEIGHT / 2, this.EDITOR.ACTORS_AREA_HEIGHT, (this.EDITOR.ACTOR_CENTER_OSCILATOR.UPDATE() + 0.1) * Math.PI, (this.EDITOR.ACTOR_CENTER_OSCILATOR.UPDATE() - 0.1) * Math.PI);
      s.stroke();

      s.closePath();

      s.restore();

    }

    if(ROOT_GAME_OBJECT.EDITOR.GAME_OBJECT_MENU.VISIBLE == true) {

      for(var x = 0;x < ROOT_GAME_OBJECT.EDITOR.BUTTONS.length;x++) {

        //s.textBaseline = 'middle';
        s.save();
        s.globalAlpha = 1;
        if(ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].HOVER == false) {

          //if (ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].text == 'Set animation speed ' && ROOT_GAME_OBJECT.ANIMATION != null) {
            s.fillStyle = APPLICATION.SYSTEM.COLOR;
            s.fillRect(ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].POSITION.X(), ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].POSITION.Y(), ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].DIMENSION.WIDTH(), ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].DIMENSION.HEIGHT());
            s.fillStyle = APPLICATION.SYSTEM.TEXT_COLOR;
            s.fillText(ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].text, ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].POSITION.X(), ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].POSITION.Y() + ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].DIMENSION.HEIGHT() / 2, ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].DIMENSION.WIDTH());
          //}
        } else {
          s.fillStyle = APPLICATION.SYSTEM.HOVER_COLOR;
          s.fillRect(ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].POSITION.X(), ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].POSITION.Y(), ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].DIMENSION.WIDTH(), ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].DIMENSION.HEIGHT());
          s.fillStyle = APPLICATION.SYSTEM.TEXT_COLOR;
          s.fillText(ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].text, ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].POSITION.X(), ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].POSITION.Y() + ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].DIMENSION.HEIGHT() / 2, ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].DIMENSION.WIDTH());

          if(ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].icon == true) {
            try {
              s.drawImage(window["image_system_" + ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].IAM], ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].POSITION.X() + ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].DIMENSION.WIDTH() - 30, ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].POSITION.Y() - 5, 30, 30);
            } catch(e) { /* Not nessesery */
            }
          }

        }
        s.restore();

        if(ROOT_GAME_OBJECT.WEBCAM != null) {

          //s.drawImage( , ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].POSITION.X() , ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].POSITION.Y() + ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].DIMENSION.HEIGHT()/2 , ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].DIMENSION.WIDTH());

        }

      }

    }

  };

  this.ON_UPDATE = function() {};
  this.ON_UPDATE_SYS = function() {};

  this.UPDATE = function() {

    if(this.AUTO_UPDATE == true) {
      ROOT_GAME_OBJECT.POSITION.UPDATE();
    }
    if(ROOT_GAME_OBJECT.EDITOR.ENABLE == false) {

      if(ROOT_GAME_OBJECT.DESTROY_AFTER != null) {
        if(ROOT_GAME_OBJECT.DESTROY_AFTER > 0) {
          ROOT_GAME_OBJECT.DESTROY_AFTER--;
        }
      }

    }
    if(ROOT_GAME_OBJECT.GROUP.GROUP.length > 0) {
      for(var s = 0;s < ROOT_GAME_OBJECT.GROUP.GROUP.length;s++) {

        window[ROOT_GAME_OBJECT.PROGRAM_NAME].ENGINE.MODULES.ACCESS(ROOT_GAME_OBJECT.PARENT).GAME_OBJECTS.ACCESS(ROOT_GAME_OBJECT.GROUP.GROUP[s]).POSITION.x = ROOT_GAME_OBJECT.POSITION.x - ROOT_GAME_OBJECT.GROUP.GROUP_INITIALS[s].x;
        window[ROOT_GAME_OBJECT.PROGRAM_NAME].ENGINE.MODULES.ACCESS(ROOT_GAME_OBJECT.PARENT).GAME_OBJECTS.ACCESS(ROOT_GAME_OBJECT.GROUP.GROUP[s]).POSITION.y = ROOT_GAME_OBJECT.POSITION.y - ROOT_GAME_OBJECT.GROUP.GROUP_INITIALS[s].y;

      }

    }

    if(ROOT_GAME_OBJECT.DESTROY_ON_GAMEMAP_EXIT == true && ROOT_GAME_OBJECT.POSITION.Y() < window[ROOT_GAME_OBJECT.PROGRAM_NAME].MAP.UP()) {

      //alert("DESTROYED " + ROOT_GAME_OBJECT.NAME)
      window[ROOT_GAME_OBJECT.PROGRAM_NAME].ENGINE.MODULES.ACCESS_MODULE(ROOT_GAME_OBJECT.PARENT).DESTROY_OBJECT(ROOT_GAME_OBJECT.NAME);
    }

    ROOT_GAME_OBJECT.ON_UPDATE();
    ROOT_GAME_OBJECT.ON_UPDATE_SYS();

  };

  this.GAME_OBJECT_READY = function() {

    SYS.DEBUG.LOG("ready : " + ROOT_GAME_OBJECT.NAME);
    /* 	if (OVERRIDE_DRAW_FOR_NETWORK == null){
    //ALLWAYS
    OVERRIDE_DRAW_FOR_NETWORK = ROOT_GAME_OBJECT.DRAW;
    OVERRIDE_UPDATE_FOR_NETWORK = ROOT_GAME_OBJECT.UPDATE;
    OVERRIDE_POSITION_X = ROOT_GAME_OBJECT.POSITION.X;
    OVERRIDE_POSITION_Y = ROOT_GAME_OBJECT.POSITION.Y;
    OVERRIDE_DIMENSION_WIDTH = ROOT_GAME_OBJECT.DIMENSION.WIDTH;
    OVERRIDE_DIMENSION_HEIGHT = ROOT_GAME_OBJECT.DIMENSION.HEIGHT;
    }

    if (OVERRIDE_ANIMATION_DRAW == null) {
    //NOT ALWAYS
    OVERRIDE_ANIMATION_DRAW = ROOT_GAME_OBJECT.ANIMATION.DRAW;
    OVERRIDE_ANIMATION_X = ROOT_GAME_OBJECT.ANIMATION.X;
    OVERRIDE_ANIMATION_Y = ROOT_GAME_OBJECT.ANIMATION.Y;
    OVERRIDE_ANIMATION_W = ROOT_GAME_OBJECT.ANIMATION.W;
    OVERRIDE_ANIMATION_H = ROOT_GAME_OBJECT.ANIMATION.H;
    } */

  };

  setTimeout(ROOT_GAME_OBJECT.GAME_OBJECT_READY, 15);

}
