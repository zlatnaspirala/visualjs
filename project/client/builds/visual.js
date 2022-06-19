(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _manifest = _interopRequireDefault(require("./manifest/manifest"));

var _proto_modify = _interopRequireDefault(require("./lib/proto_modify"));

var _audio = _interopRequireDefault(require("./lib/audio/audio"));

var _system = _interopRequireDefault(require("./lib/system"));

var _program_modul = require("./lib/program_modul");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _proto_modify.default)();

if (typeof AUDIO_RESOURCE != "undefined") {
  _system.default.SOUND.RES = new _audio.default();
} ///////
// Run
///////


_system.default.DOM.CREATE_SURFACE("SURF", "HELLO_WORLD", 100, 99.4, "DIAMETRIC"); //NOW HELLO_WORLD IS OBJECT WITH ONE CANVAS TAG


HELLO_WORLD.ENGINE.CREATE_MODUL("STARTER");
var SMODULE = HELLO_WORLD.ENGINE.MODULES.ACCESS_MODULE("STARTER"); // SCRIPT.LOAD('examples/templates/sound.js')

(0, _program_modul.CREATE_SYSTEM_BUTTONS)();

},{"./lib/audio/audio":2,"./lib/program_modul":13,"./lib/proto_modify":14,"./lib/system":15,"./manifest/manifest":16}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AUDIO_RES = AUDIO_RES;

/**
 * @class AUDIO_RES
 * @constructor
 * @param res
 */
function AUDIO_RES(res) {
  var ROOT_AUDIO = this;
  this.res = AUDIO_RESOURCE.source;
  this.SOUNDS = [];
  this.SOUNDS_NAMES = [];

  this.CREATE_AUDIO_OBJECT_FROM_RESOURCE = function () {
    for (var i = 0; i < AUDIO_RESOURCE.source.length; i++) {
      var audio_ = new Audio("res/audio/" + AUDIO_RESOURCE.source[i]);
      var local1 = AUDIO_RESOURCE.source[i].replace(".ogg", "");
      var local1 = local1.replace(".mp3", "");
      window["audio_object_" + local1] = audio_;
      ROOT_AUDIO.SOUNDS_NAMES.push(window["play_" + local1]);
      ROOT_AUDIO.SOUNDS.push(audio_); //audio_.play();
    }

    ROOT_AUDIO.SOUNDS_NAMES.PLAY = function (name) {};
  };

  ROOT_AUDIO.CREATE_AUDIO_OBJECT_FROM_RESOURCE();
}

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RECT = RECT;

/**
 * @class RECT
 * @constructor
 * @param TEXT
 * @param ROOT_GAME_OBJECT
 * @param radius color
 * @param colorText
 */
function RECT(TEXT, ROOT_GAME_OBJECT, radius, color, colorText) {
  //this.FOCUS = false;
  this.TEXT_ANGLE = 0;
  this.TEXT_COLOR = colorText;
  this.TEXT_ALIGN = "center";
  this.TEXT = TEXT;
  this.EDIT = true;
  this.BACKGROUND_OPACITY = 0.5;
  this.TEXT_OPACITY = 1;
  this.textBaseline = "middle";
  this.textResizeByWidth = false;
  this.POSITION = ROOT_GAME_OBJECT.POSITION;
  this.DIMENSION = ROOT_GAME_OBJECT.DIMENSION;

  this.x = function () {
    return POSITION.X();
  };

  this.y = function () {
    return POSITION.Y();
  };

  this.width = function () {
    return this.DIMENSION.WIDHT();
  };

  this.height = function () {
    return this.DIMENSION.HEIGHT();
  };

  this.radius = parseFloat(radius);
  this.color = color;
  this.border_color = "rgba(121,121,222,0.9)";
  this.border_on_focus_color = "blue";
  this.border_on_focus_width_line = 5;
  this.font = "20px Arial";

  this.DRAW = function (s) {
    s.save();
    s.globalAlpha = this.BACKGROUND_OPACITY;
    roundedRect(s, "", this.POSITION.X(), this.POSITION.Y(), this.DIMENSION.WIDTH(), this.DIMENSION.HEIGHT(), this.radius, this.color);
    s.textBaseline = this.textBaseline;

    if (ROOT_GAME_OBJECT.FOCUS == true) {
      s.lineWidth = this.border_on_focus_width_line;
      s.fillStyle = this.border_on_focus_color;
      roundedRect(s, "", this.POSITION.X(), this.POSITION.Y(), this.DIMENSION.WIDTH(), this.DIMENSION.HEIGHT(), this.radius, this.color, "stroke", this.border_color);
    } else {
      s.lineWidth = this.border_width_line;
      s.fillStyle = this.border_color;
      roundedRect(s, "", this.POSITION.X(), this.POSITION.Y(), this.DIMENSION.WIDTH(), this.DIMENSION.HEIGHT(), this.radius, this.color, "stroke", this.border_color);
    }

    s.textAlign = this.TEXT_ALIGN;
    s.font = this.font;
    s.fillStyle = this.TEXT_COLOR;
    s.globalAlpha = this.TEXT_OPACITY;

    if (this.textResizeByWidth == false) {
      drawRotatedTextNoSkrech(s, this.TEXT, this.POSITION.X(), this.POSITION.Y(), this.TEXT_ANGLE, this.DIMENSION.WIDTH(), this.DIMENSION.HEIGHT());
    } else {
      drawRotatedText(s, this.TEXT, this.POSITION.X(), this.POSITION.Y(), this.TEXT_ANGLE, this.DIMENSION.WIDTH(), this.DIMENSION.HEIGHT()); //s.textAlign = "start";
    }

    s.restore();
  };
}

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RIGHT_MENU_BUTTON = RIGHT_MENU_BUTTON;

var _math = require("../math");

var _system = _interopRequireDefault(require("../system"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// WEB GUI
function RIGHT_MENU_BUTTON(text, Y_OFFSET, id, res) {
  var ROOT = this;
  this.IAM = id;
  this.HOVER = false;
  this.Y_OFFSET = Y_OFFSET;
  this.text = text;
  this.icon = null;

  if (typeof res != "undefined") {
    var locName = "system_" + this.IAM.toString();

    _system.default.RES.CREATE_IMG(locName, res);

    this.icon = true;
  }

  this.POSITION = {
    x: 0,
    y: 0,
    X: function () {
      return ROOT.POSITION.x;
    },
    Y: function () {
      return ROOT.POSITION.y + ROOT.Y_OFFSET;
    }
  }, this.DIMENSION = new _math.DIMENSION(12, 2);

  this.TAP = function () {};
}

},{"../math":10,"../system":15}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ENGINE = ENGINE;

var _game_object_events = require("./game_object/game_object_events");

var _keyboard = require("./events/keyboard");

var _systems = require("./draw_functions/systems");

var _manifest = _interopRequireDefault(require("../manifest/manifest"));

var _init = require("./init");

var _modules = require("./modules/modules");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @Description Instance of ENGINE class will handle all modules and
 * gameobjects.
 * Access trow :
 * @class ENGINE
 * @example Internal . Injected like property ENGINE intro PROGRAM object.
 * @constructor
 * @return {Any} nothing
 *
 */
function ENGINE(c) {
  var ROOT_ENGINE = this; // ONE PROGRAM ONE ENGINE
  //ENGINE WILL BE BIG SWITCHER

  this.PROGRAM_ID = c.id; //Events are part of engine

  this.EVENTS = new _game_object_events.EVENTS(c, ROOT_ENGINE); // destroy mem IMPORTANT events must be deatached at first time than set up to undefined .

  this.MODULES = new Array();
  this.GAME_TYPE = "NO_PLAYER";
  this.KEYBOARD = new _keyboard.KEYBOARD(c);

  if (_manifest.default.EDITOR == true) {
    this.ENGINE_EDITOR = true;
  } else {
    this.ENGINE_EDITOR = false;
  }

  this.EXIT_EDIT_MODE = function () {
    ROOT_ENGINE.ENGINE_EDITOR = false;

    for (var x = 0; x < ROOT_ENGINE.MODULES.length; x++) {
      for (var y = 0; y < ROOT_ENGINE.MODULES[x].GAME_OBJECTS.length; y++) {
        ROOT_ENGINE.MODULES[x].GAME_OBJECTS[y].EDITOR.ENABLE = false;
      }
    }
  };

  this.GO_TO_EDIT_MODE = function () {
    ROOT_ENGINE.ENGINE_EDITOR = true;

    for (var x = 0; x < ROOT_ENGINE.MODULES.length; x++) {
      for (var y = 0; y < ROOT_ENGINE.MODULES[x].GAME_OBJECTS.length; y++) {
        ROOT_ENGINE.MODULES[x].GAME_OBJECTS[y].EDITOR.ENABLE = true;
      }
    }
  };

  this.GUI = {
    VISIBLE: false,
    BUTTONS: [new _systems.RIGHT_MENU_BUTTON("Add new gameObject ", 0, "1"), new _systems.RIGHT_MENU_BUTTON("Exit edit mode", 20, "2"), new _systems.RIGHT_MENU_BUTTON("Set render speed", 40, "3"), new _systems.RIGHT_MENU_BUTTON("Switch AutoConnect to true", 60, "4", "res/system/images/html5/HTML5-Offline-Storage.png"), new _systems.RIGHT_MENU_BUTTON("Switch EditorAutoRun to true", 80, "5", "res/system/images/html5/HTML5-Offline-Storage.png")],
    CHECK_ON_START: function () {
      if ((0, _init.LOAD)("Application") == false) {
        console.log("no cache data about application");
      } else {
        _manifest.default = ((0, _init.LOAD)("Application"), function () {
          throw new Error('"' + "APPLICATION" + '" is read-only.');
        }());
        SYS.DEBUG.LOG("APPLICATION object was loaded from localstorage. " + _manifest.default.ACCOUNT_SERVICE_AUTO_RUN);

        if (_manifest.default.ACCOUNT_SERVICE_AUTO_RUN == true) {
          ROOT_ENGINE.GUI.BUTTONS[3].text = "Switch AutoConnect to false";
        } else {
          ROOT_ENGINE.GUI.BUTTONS[3].text = "Switch AutoConnect to true";
        }

        if (_manifest.default.EDITOR_AUTORUN == true) {
          ROOT_ENGINE.ENGINE_EDITOR = true;
          ROOT_ENGINE.GUI.BUTTONS[4].text = "Switch editorAutoRun to false";
        } else {
          ROOT_ENGINE.ENGINE_EDITOR = false;
          ROOT_ENGINE.GUI.BUTTONS[4].text = "Switch editorAutoRun to true";
        }
      }
    },
    GRID: {
      VISIBLE: true,
      MAP_SIZE_X: 10,
      MAP_SIZE_Y: 10,
      STEP: 10,
      COLOR: _manifest.default.SYSTEM.HOVER_COLOR
    },
    LIST_OF_OBJECTS: {
      VISIBLE: true,
      LIST: ROOT_ENGINE.MODULES,
      BUTTONS_MODULES: [],
      BUTTONS_GAME_OBJECTS: [],
      GET_MODULES: function (_give_me_reference_object_) {
        for (var s = 0; s < ROOT_ENGINE.MODULES.length; s++) {
          ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES.push(new _systems.RIGHT_MENU_BUTTON(ROOT_ENGINE.MODULES[s].NAME, 15 * s, s + 1));

          ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[s].TAP = function () {
            //console.log(this.IAM)
            ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS = [];

            for (var w = 0; w < ROOT_ENGINE.MODULES[this.IAM - 1].GAME_OBJECTS.length; w++) {
              ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS.push(new _systems.RIGHT_MENU_BUTTON(ROOT_ENGINE.MODULES[this.IAM - 1].GAME_OBJECTS[w].NAME, 14 * w, w + 1));
              ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[w].POSITION.x += 100;
              var _pass_name = ROOT_ENGINE.MODULES[this.IAM - 1].GAME_OBJECTS[w].NAME;
              ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[w]._pass_name = _pass_name;

              ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[w].TAP = function () {
                console.log("  ON_PAGE EDITOR   :::: reference comes from : " + _give_me_reference_object_.NAME + " ::::::: reference for" + this._pass_name);
                window[_give_me_reference_object_.NAME]._REF = this._pass_name;
                console.log(">>>>>>>>" + window[_give_me_reference_object_.NAME].NAME + "::::::::::" + window[_give_me_reference_object_.NAME]._REF);
                window[SYS.RUNNING_PROGRAMS[0]].ENGINE.GUI.LIST_OF_OBJECTS.REMOVE_LIST_OBJ_MODULES();
              };
            }
          };
        }
      },
      REMOVE_LIST_OBJ_MODULES: function () {
        ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES = [];
        ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS = [];
      }
    }
  };
  this.GUI.LIST_OF_OBJECTS.GET_MODULES();
  this.GUI.CHECK_ON_START();

  this.DRAW_MODULES = function (s) {
    if (ROOT_ENGINE.GUI.GRID.VISIBLE == true && ROOT_ENGINE.ENGINE_EDITOR == true) {
      s.fillStyle = ROOT_ENGINE.GUI.GRID.COLOR;

      for (var x = 0; x < ROOT_ENGINE.GUI.GRID.MAP_SIZE_X * ROOT_ENGINE.GUI.GRID.STEP; x += ROOT_ENGINE.GUI.GRID.STEP) {
        s.fillRect(VIEW.W(x), VIEW.H(0), 1, VIEW.H());
        s.fillRect(VIEW.W(0), VIEW.H(x), VIEW.W(), 1);
      }
    }

    for (var x = 0; x < ROOT_ENGINE.MODULES.length; x++) {
      ROOT_ENGINE.MODULES[x].DRAW_GAME_OBJECTS(s);
    }

    if (ROOT_ENGINE.ENGINE_EDITOR == true) {
      if (ROOT_ENGINE.GUI.VISIBLE == true) {
        for (var x = 0; x < ROOT_ENGINE.GUI.BUTTONS.length; x++) {
          s.textBaseline = "middle";

          if (ROOT_ENGINE.GUI.BUTTONS[x].HOVER == false) {
            s.fillStyle = _manifest.default.SYSTEM.COLOR;
            s.fillRect(ROOT_ENGINE.GUI.BUTTONS[x].POSITION.X(), ROOT_ENGINE.GUI.BUTTONS[x].POSITION.Y(), ROOT_ENGINE.GUI.BUTTONS[x].DIMENSION.WIDTH(), ROOT_ENGINE.GUI.BUTTONS[x].DIMENSION.HEIGHT());
            s.fillStyle = _manifest.default.SYSTEM.TEXT_COLOR;
            s.fillText(ROOT_ENGINE.GUI.BUTTONS[x].text, ROOT_ENGINE.GUI.BUTTONS[x].POSITION.X(), ROOT_ENGINE.GUI.BUTTONS[x].POSITION.Y() + ROOT_ENGINE.GUI.BUTTONS[x].DIMENSION.HEIGHT() / 2, ROOT_ENGINE.GUI.BUTTONS[x].DIMENSION.WIDTH());
          } else {
            s.fillStyle = _manifest.default.SYSTEM.HOVER_COLOR;
            s.fillRect(ROOT_ENGINE.GUI.BUTTONS[x].POSITION.X(), ROOT_ENGINE.GUI.BUTTONS[x].POSITION.Y(), ROOT_ENGINE.GUI.BUTTONS[x].DIMENSION.WIDTH(), ROOT_ENGINE.GUI.BUTTONS[x].DIMENSION.HEIGHT());
            s.fillStyle = _manifest.default.SYSTEM.TEXT_COLOR;
            s.fillText(ROOT_ENGINE.GUI.BUTTONS[x].text, ROOT_ENGINE.GUI.BUTTONS[x].POSITION.X(), ROOT_ENGINE.GUI.BUTTONS[x].POSITION.Y() + ROOT_ENGINE.GUI.BUTTONS[x].DIMENSION.HEIGHT() / 2, ROOT_ENGINE.GUI.BUTTONS[x].DIMENSION.WIDTH());

            if (ROOT_ENGINE.GUI.BUTTONS[x].icon == true) {
              try {
                s.drawImage(window["image_system_" + ROOT_ENGINE.GUI.BUTTONS[x].IAM], ROOT_ENGINE.GUI.BUTTONS[x].POSITION.X() + ROOT_ENGINE.GUI.BUTTONS[x].DIMENSION.WIDTH() - 30, ROOT_ENGINE.GUI.BUTTONS[x].POSITION.Y() - 5, 30, 30);
              } catch (e) {
                /* Not nessesery */
              }
            }
          }
        }
      } //


      for (var x = 0; x < ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES.length; x++) {
        s.textBaseline = "middle";

        if (ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].HOVER == false) {
          s.fillStyle = _manifest.default.SYSTEM.COLOR;
          s.fillRect(ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.X(), ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.Y(), ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].DIMENSION.WIDTH(), ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].DIMENSION.HEIGHT());
          s.fillStyle = _manifest.default.SYSTEM.TEXT_COLOR;
          s.fillText(ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].text, ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.X(), ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.Y() + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].DIMENSION.HEIGHT() / 2, ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].DIMENSION.WIDTH());
        } else {
          s.fillStyle = _manifest.default.SYSTEM.HOVER_COLOR;
          s.fillRect(ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.X(), ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.Y(), ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].DIMENSION.WIDTH(), ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].DIMENSION.HEIGHT());
          s.fillStyle = _manifest.default.SYSTEM.COLOR;
          s.fillText(ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].text, ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.X(), ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.Y() + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].DIMENSION.HEIGHT() / 2, ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].DIMENSION.WIDTH());
        }
      }

      for (var x = 0; x < ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS.length; x++) {
        s.textBaseline = "middle";

        if (ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].HOVER == false) {
          s.fillStyle = _manifest.default.SYSTEM.COLOR;
          s.fillRect(ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.X(), ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.Y(), ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].DIMENSION.WIDTH(), ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].DIMENSION.HEIGHT());
          s.fillStyle = _manifest.default.SYSTEM.TEXT_COLOR;
          s.fillText(ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].text, ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.X(), ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.Y() + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].DIMENSION.HEIGHT() / 2, ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].DIMENSION.WIDTH());
        } else {
          s.fillStyle = _manifest.default.SYSTEM.HOVER_COLOR;
          s.fillRect(ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.X(), ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.Y(), ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].DIMENSION.WIDTH(), ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].DIMENSION.HEIGHT());
          s.fillStyle = _manifest.default.SYSTEM.COLOR;
          s.fillText(ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].text, ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.X(), ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.Y() + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].DIMENSION.HEIGHT() / 2, ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].DIMENSION.WIDTH());
        }
      } //

    }
  };

  this.UPDATE_MODULES = function () {
    for (var x = 0; x < ROOT_ENGINE.MODULES.length; x++) {
      ROOT_ENGINE.MODULES[x].UPDATE_GAME_OBJECTS();
    }
  };

  this.CREATE_MODUL = function (name) {
    // window[name] = new MODUL(name);
    ROOT_ENGINE.MODULES.push(new _modules.MODUL(name, ROOT_ENGINE.PROGRAM_ID));
  };

  this.DESTROY_MODUL = function (name) {
    // window[name] = new MODUL(name);
    console.log(ROOT_ENGINE.MODULES.indexOf(name));
    ROOT_ENGINE.MODULES.forEach(function (item, index, object) {
      // (item, index, object)
      if (item.NAME == name) {
        if (index > -1) {
          ROOT_ENGINE.MODULES.splice(index, 1);
        }

        console.log(ROOT_ENGINE.MODULES.indexOf(name));
      }
    });
  };
}

},{"../manifest/manifest":16,"./draw_functions/systems":4,"./events/keyboard":6,"./game_object/game_object_events":8,"./init":9,"./modules/modules":11}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KEYBOARD = KEYBOARD;

// PLAYER CONTROL AND OTHER KEYBOARD STAFF
function KEYBOARD(c) {
  var ROOT = this;
  ROOT.CAPTURE_CHAR = "";
  ROOT.CLEAR_CAPTURE_ON_PRESS_ENTER = true;
  ROOT.LAST_CAPTURE_CHAR = "";
  ROOT.ENTER_PRESSED = false;
  ROOT.SHIFT_PRESSED = false;

  ROOT.ACTION_ON_KEY_DOWN = function () {};

  this.CANVAS = c;
  this.PROGRAM_NAME = c.id;
  c.addEventListener("keydown", function (e) {
    switch (e.keyCode) {
      case 8:
        e.preventDefault();
        SYS.DEBUG.LOG("prevent default for backspace.");
    }

    SYS.DEBUG.LOG(" GAME RUNNING , key pressed: " + e.keyCode); //SYS.SOUND.GEN( 50 , e.keyCode * 20 );

    if (typeof PLAYER != "undefined") {
      if (PLAYER.TYPE == "PLATFORMER") {
        PLAYER.FREEZ = false;

        switch (e.keyCode) {
          case 121:
            SYS.DEBUG.LOG("F10 command -->> Show command line ");

          case 69:
          case 37:
            // left
            PLAYER.CONTROL.LEFT = true;
            PLAYER.X = PLAYER.SPEED;

            if (PLAYER.CONTROL.JUMP === false) {
              setTimeout(function () {
                PLAYER.POSITION.TRANSLATE_BY_Y(100);
              }, 50);
            }

            break;

          case 38:
            // up
            if (PLAYER.CONTROL.JUMP === false) {
              PLAYER.BREAK_AT_MOMENT_STATUS = false;
              PLAYER.CONTROL.JUMP = true;
              PLAYER.Y = PLAYER.SPEED * 10;
              console.log(">>>>>>>" + PLAYER.Y);
              setTimeout(function () {
                while (PLAYER.Y > 0) {
                  PLAYER.Y = PLAYER.Y - PLAYER.SPEED / 5;
                }

                PLAYER.Y = -1;
              }, 100);
            }

            break;

          case 39:
            // right
            PLAYER.CONTROL.RIGHT = true;
            PLAYER.X = -PLAYER.SPEED;

            if (PLAYER.CONTROL.JUMP === false) {
              setTimeout(function () {
                PLAYER.POSITION.TRANSLATE_BY_Y(100);
              }, 50);
            }

            break;

          case 40:
            // down
            break;
        }
      } else if (PLAYER.TYPE == "NORMAL") {
        switch (e.keyCode) {
          case 121:
            SYS.DEBUG.LOG("F10 command -->> Show command line ");

          case 69:
          case 37:
            // left
            PLAYER.X = PLAYER.X - PLAYER.SPEED;
            PLAYER.POSITION.TRANSLATE_BY_X(PLAYER.X);
            break;

          case 38:
            // up
            PLAYER.Y = PLAYER.Y - PLAYER.SPEED;
            PLAYER.POSITION.TRANSLATE_BY_Y(PLAYER.Y);
            break;

          case 39:
            // right
            PLAYER.X = PLAYER.X + PLAYER.SPEED;
            PLAYER.POSITION.TRANSLATE_BY_X(PLAYER.X);
            break;

          case 40:
            // down
            PLAYER.Y = PLAYER.Y + PLAYER.SPEED;
            PLAYER.POSITION.TRANSLATE_BY_Y(PLAYER.Y);
            break;
        }
      }
    } // SPECIAL FOR TEXTBOX


    SYS.DEBUG.LOG("KEYBOARD-->> Show users types : " + e.keyCode);
    var keynum;

    if (window.event) {
      keynum = e.keyCode;
    } else {
      if (e.which) {
        keynum = e.which;
      }
    } //console.log(String.fromCharCode(keynum));


    if (e.keyCode == 16) {
      ROOT.SHIFT_PRESSED = true;
    }

    if (e.keyCode == 8) {
      SYS.DEBUG.LOG("textbox delete last char!");
      ROOT.CAPTURE_CHAR = remove_last(ROOT.CAPTURE_CHAR);
    } else if (e.keyCode == 13) {
      ROOT.ENTER_PRESSED = true;
    } else {
      if (ROOT.SHIFT_PRESSED == false) {
        if (e.keyCode == 189) {
          ROOT.CAPTURE_CHAR += "_";
          ROOT.LAST_CAPTURE_CHAR = "_";
        } else if (e.keyCode == 187) {
          ROOT.CAPTURE_CHAR += "+";
          ROOT.LAST_CAPTURE_CHAR = "+";
        } else if (e.keyCode == 187) {
          ROOT.CAPTURE_CHAR += "+";
          ROOT.LAST_CAPTURE_CHAR = "+";
        } else if (e.keyCode == 188) {
          ROOT.CAPTURE_CHAR += ",";
          ROOT.LAST_CAPTURE_CHAR = ",";
        } else if (e.keyCode == 190) {
          ROOT.CAPTURE_CHAR += ".";
          ROOT.LAST_CAPTURE_CHAR = ".";
        } else if (e.keyCode == 191) {
          ROOT.CAPTURE_CHAR += "/";
          ROOT.LAST_CAPTURE_CHAR = "/";
        } else if (e.keyCode == 186) {
          ROOT.CAPTURE_CHAR += ";";
          ROOT.LAST_CAPTURE_CHAR = ";";
        } else if (e.keyCode == 222) {
          ROOT.CAPTURE_CHAR += "'";
          ROOT.LAST_CAPTURE_CHAR = "'";
        } else if (e.keyCode == 220) {
          ROOT.CAPTURE_CHAR += "\\";
          ROOT.LAST_CAPTURE_CHAR = "\\";
        } else if (e.keyCode == 219) {
          ROOT.CAPTURE_CHAR += "[";
          ROOT.LAST_CAPTURE_CHAR = "[";
        } else if (e.keyCode == 221) {
          ROOT.CAPTURE_CHAR += "]";
          ROOT.LAST_CAPTURE_CHAR = "]";
        } else {
          ROOT.CAPTURE_CHAR += String.fromCharCode(keynum).toLowerCase();
          ROOT.LAST_CAPTURE_CHAR = String.fromCharCode(keynum).toLowerCase();
        }
      } else {
        if (e.keyCode == 50) {
          ROOT.CAPTURE_CHAR += "@";
          ROOT.LAST_CAPTURE_CHAR = "@";
        } else if (e.keyCode == 49) {
          ROOT.CAPTURE_CHAR += "!";
          ROOT.LAST_CAPTURE_CHAR = "!";
        } else if (e.keyCode == 51) {
          ROOT.CAPTURE_CHAR += "#";
          ROOT.LAST_CAPTURE_CHAR = "#";
        } else if (e.keyCode == 52) {
          ROOT.CAPTURE_CHAR += "$";
          ROOT.LAST_CAPTURE_CHAR = "$";
        } else if (e.keyCode == 53) {
          ROOT.CAPTURE_CHAR += "%";
          ROOT.LAST_CAPTURE_CHAR = "%";
        } else if (e.keyCode == 54) {
          ROOT.CAPTURE_CHAR += "^";
          ROOT.LAST_CAPTURE_CHAR = "^";
        } else if (e.keyCode == 55) {
          ROOT.CAPTURE_CHAR += "&";
          ROOT.LAST_CAPTURE_CHAR = "&";
        } else if (e.keyCode == 56) {
          ROOT.CAPTURE_CHAR += "*";
          ROOT.LAST_CAPTURE_CHAR = "*";
        } else if (e.keyCode == 57) {
          ROOT.CAPTURE_CHAR += "(";
          ROOT.LAST_CAPTURE_CHAR = "(";
        } else if (e.keyCode == 48) {
          ROOT.CAPTURE_CHAR += ")";
          ROOT.LAST_CAPTURE_CHAR = ")";
        } else if (e.keyCode == 189) {
          ROOT.CAPTURE_CHAR += "_";
          ROOT.LAST_CAPTURE_CHAR = "_";
        } else if (e.keyCode == 187) {
          ROOT.CAPTURE_CHAR += "+";
          ROOT.LAST_CAPTURE_CHAR = "+";
        } else if (e.keyCode == 187) {
          ROOT.CAPTURE_CHAR += "+";
          ROOT.LAST_CAPTURE_CHAR = "+";
        } else if (e.keyCode == 188) {
          ROOT.CAPTURE_CHAR += "<";
          ROOT.LAST_CAPTURE_CHAR = "<";
        } else if (e.keyCode == 190) {
          ROOT.CAPTURE_CHAR += ">";
          ROOT.LAST_CAPTURE_CHAR = ">";
        } else if (e.keyCode == 191) {
          ROOT.CAPTURE_CHAR += "?";
          ROOT.LAST_CAPTURE_CHAR = "?";
        } else if (e.keyCode == 186) {
          ROOT.CAPTURE_CHAR += ":";
          ROOT.LAST_CAPTURE_CHAR = ":";
        } else if (e.keyCode == 222) {
          ROOT.CAPTURE_CHAR += "\"";
          ROOT.LAST_CAPTURE_CHAR = "\"";
        } else if (e.keyCode == 220) {
          ROOT.CAPTURE_CHAR += "|";
          ROOT.LAST_CAPTURE_CHAR = "|";
        } else if (e.keyCode == 219) {
          ROOT.CAPTURE_CHAR += "{";
          ROOT.LAST_CAPTURE_CHAR = "{";
        } else if (e.keyCode == 221) {
          ROOT.CAPTURE_CHAR += "}";
          ROOT.LAST_CAPTURE_CHAR = "}";
        } else {
          ROOT.CAPTURE_CHAR += String.fromCharCode(keynum).toUpperCase();
          ROOT.LAST_CAPTURE_CHAR = String.fromCharCode(keynum).toUpperCase();
        }
      }
    }

    ROOT.ACTION_ON_KEY_DOWN(); //@@@@@@@@@@@@@@@@@@@@@@@@@

    if (typeof ROOT.TARGET_MODUL != "undefined" && typeof ROOT.TARGET != "undefined") {
      ROOT.CAPTURE_CHAR = ROOT.CAPTURE_CHAR.replace(/[^\x00-\x7F]/g, "");
      ROOT.CAPTURE_CHAR = ROOT.CAPTURE_CHAR.replace(/[^A-Za-z 0-9 \.,\?""!#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, "");
      window[ROOT.PROGRAM_NAME].ENGINE.MODULES.ACCESS(ROOT.TARGET_MODUL).GAME_OBJECTS.ACCESS(ROOT.TARGET).TEXTBOX.TEXT = ROOT.CAPTURE_CHAR;

      if (ROOT.ENTER_PRESSED == true) {
        window[ROOT.PROGRAM_NAME].ENGINE.MODULES.ACCESS(ROOT.TARGET_MODUL).GAME_OBJECTS.ACCESS(ROOT.TARGET).TEXTBOX.ON_PRESS_ENTER();

        if (ROOT.CLEAR_CAPTURE_ON_PRESS_ENTER == true) {
          ROOT.CAPTURE_CHAR = "";
        }
      }
    }

    ROOT.ENTER_PRESSED = false; //local_go.TEXTBOX.TEXT =  ROOT_EVENTS.ROOT_ENGINE.KEYBOARD.CAPTURE_CHAR;
  }, false);
  c.addEventListener("keyup", function (e) {
    SYS.DEBUG.LOG(" GAME RUNNING , key up : " + e.keyCode); //SYS.SOUND.GEN( 50 , e.keyCode * 20 );

    switch (e.keyCode) {
      case 121:
        SYS.DEBUG.LOG("F10 command -->> Show command line ");
        break;

      case 16:
        ROOT.SHIFT_PRESSED = false;
        break;
    }

    if (typeof PLAYER != "undefined") {
      if (PLAYER.TYPE == "PLATFORMER") {
        switch (e.keyCode) {
          case 121:
            SYS.DEBUG.LOG("F10 command -->> Show command line ");

          case 69:
          case 37:
            // left
            PLAYER.CONTROL.LEFT = false;

            while (PLAYER.X > 0) {
              PLAYER.X = PLAYER.X - PLAYER.SPEED / 5;
            }

            PLAYER.X = 0;
            break;

          case 38:
            // up
            while (PLAYER.Y > 0) {
              PLAYER.Y = PLAYER.Y - PLAYER.SPEED / 5;
            } //PLAYER.Y = -1;
            //PLAYER.POSITION.TRANSLATE_BY_Y(100)


            break;

          case 39:
            // right
            PLAYER.CONTROL.LEFT = false;

            while (PLAYER.X < 0) {
              PLAYER.X = PLAYER.X + PLAYER.SPEED / 5;
            }

            PLAYER.X = 0;
            break;

          case 40:
            // down
            break;
        }
      } else if (PLAYER.TYPE == "NORMAL") {
        switch (e.keyCode) {
          case 121:
            SYS.DEBUG.LOG("F10 command -->> Show command line ");

          case 69:
          case 37:
            // left
            PLAYER.X = PLAYER.X - PLAYER.SPEED;
            PLAYER.POSITION.TRANSLATE_BY_X(PLAYER.X);
            break;

          case 38:
            // up
            PLAYER.Y = PLAYER.Y - PLAYER.SPEED;
            PLAYER.POSITION.TRANSLATE_BY_Y(PLAYER.Y);
            break;

          case 39:
            // right
            PLAYER.X = PLAYER.X + PLAYER.SPEED;
            PLAYER.POSITION.TRANSLATE_BY_X(PLAYER.X);
            break;

          case 40:
            // down
            PLAYER.Y = PLAYER.Y + PLAYER.SPEED;
            PLAYER.POSITION.TRANSLATE_BY_Y(PLAYER.Y);
            break;
        }
      }
    }
  }, false);
}

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GAME_OBJECT = GAME_OBJECT;

var _math = require("../math");

var _system = _interopRequireDefault(require("../system"));

var _systems = require("../draw_functions/systems");

var _rect = require("../draw_functions/rect");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
function GAME_OBJECT(name, modul, x, y, w, h, speed, PROGRAM_NAME) {
  var ROOT_GAME_OBJECT = this; //alias global access

  if (name == "system" || name.indexOf("___VIRTUALKEYBOARD_") != -1) {
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

  if ((typeof x && typeof y) === "number") {
    if (typeof speed === "number") {
      this.POSITION = new _math.POSITION(x, y, x, y, speed);
    } else {
      this.POSITION = new _math.POSITION(x, y, x, y, 1);
    }
  } else {
    this.POSITION = new _math.POSITION(10, 10, 200, 200, 1);
  }

  if ((typeof w && typeof h) === "number") {
    this.DIMENSION = new _math.DIMENSION(w, h);
  } else {
    this.DIMENSION = new _math.DIMENSION(10, 10);
  } //this.ON_TARGET_POSITION = function(){};


  this.POSITION.parentModul = modul;
  this.POSITION.parentGameObject = name;
  this.POSITION.PROGRAM_NAME = PROGRAM_NAME;
  this.POSITION.DIMENSION = this.DIMENSION; //this.POSITION.ON_TARGET_POSITION = this.ON_TARGET_POSITION;

  this.ANIMATION = null;

  this.CREATE_ANIMATION = function (surf, TYPE_, FrameIndex, source, ID, blink_, min_, max_, step, speed_, opacity_) {
    this.ANIMATION = new ANIMATION(surf, TYPE_, FrameIndex, source, ROOT_GAME_OBJECT, ID, blink_, min_, max_, step, speed_, opacity_);
    this.TYPE_OF_GAME_OBJECT = "ANIMATION"; //SYS.DEBUG.LOG("images added in memory.... ID " + ID);
  };

  this.CREATE_PLAYER = function (type_) {
    ROOT_GAME_OBJECT.PLAYER = {
      TYPE: type_,
      X: ROOT_GAME_OBJECT.POSITION.x,
      // for platform
      Y: ROOT_GAME_OBJECT.POSITION.y,
      SPEED: 1,
      CONTROL: {
        RIGHT: false,
        LEFT: false,
        JUMP: false,
        DOWN: false
      },
      POSITION: ROOT_GAME_OBJECT.POSITION,
      BREAK_AT_MOMENT_STATUS: false
    };
    window["PLAYER"] = ROOT_GAME_OBJECT.PLAYER;
    this.POSITION.PLAYER = ROOT_GAME_OBJECT.PLAYER;

    if (type_ == "PLATFORMER") {
      window[PROGRAM_NAME].ENGINE.GAME_TYPE = "PLATFORMER"; //ROOT_GAME_OBJECT.POSITION.TYPE = "PLAYER";
      //ROOT_GAME_OBJECT.POSITION.SET_POSITION(45,45, "DIAMETRIC");
    } else {
      window[PROGRAM_NAME].ENGINE.GAME_TYPE = "NORMAL_CONTROL"; //ROOT_GAME_OBJECT.POSITION.TYPE = "PLAYER";
    }
  };

  this.TEXTBOX = null;
  this.TRACK_KEY = null;

  this.CREATE_TEXTBOX = function (text, radius, color, textColor) {
    if (typeof text != "undefined" && typeof radius != "undefined" && typeof color != "undefined" && typeof textColor != "undefined") {
      this.TEXTBOX = new _rect.RECT(text, ROOT_GAME_OBJECT, radius, color, textColor);
      this.TYPE_OF_GAME_OBJECT = "TEXT_BOX";
      this.TRACK_KEY = true;
      this.TEXTBOX.TEXT = text;
      this.TEXTBOX.TEXT += window[ROOT_GAME_OBJECT.PROGRAM_NAME].ENGINE.KEYBOARD.CAPTURE_CHAR;
      this.FOCUS = true;

      this.TEXTBOX.ON_PRESS_ENTER = function () {};

      ROOT_GAME_OBJECT.EDITOR.BUTTONS[6].text = "Remove textbox";
    } else {
      _system.default.DEBUG.WARNING("TEXT_BOX error in constructor : ( text , radius , color, textColor) cant be undefined.");
    }
  };

  this.DESTROY_AFTER = null;

  this.DESTROY_ME_AFTER_X_SECUND = function (sec, name, x, ROOT_EVENTS) {
    this.DESTROY_AFTER = sec * 20;

    if (APPLICATION.EDITOR == true) {
      DESTROY_DELAY(name, sec, ROOT_GAME_OBJECT.PARENT, ROOT_GAME_OBJECT.PROGRAM_NAME);
    }
  };

  this.COLLISION = null;
  this.POSITION.STATIC = false;

  this.COLIDER = function (type__, margin) {
    this.TYPE = type__;

    if (typeof margin === "number") {
      this.margin = margin;
    } else {
      this.margin = 1.02;
    }
  };

  this.CREATE_COLLISION = function (type__, margin) {
    ROOT_GAME_OBJECT.COLLISION = new ROOT_GAME_OBJECT.COLIDER(type__, margin);
    ROOT_GAME_OBJECT.EDITOR.BUTTONS[3].text = "Remove collision";
  };

  this.ON_COLLISION = function (name_) {}; // face detect tracking.js


  this.CREATE_FACE_DETECT = function () {
    ROOT_GAME_OBJECT.SET_TRACKING_VIEW("NORMAL", "NORMAL");
    TRACK_NOW();

    ROOT_GAME_OBJECT.ON_UPDATE_SYS = function () {
      ROOT_GAME_OBJECT.WEBCAM.VIDEO.style.left = ROOT_GAME_OBJECT.POSITION.X() + "px";
      ROOT_GAME_OBJECT.WEBCAM.VIDEO.style.top = ROOT_GAME_OBJECT.POSITION.Y() + 50 + "px";
      ROOT_GAME_OBJECT.WEBCAM.TRACKING_CANVAS_LAYOUT.style.left = ROOT_GAME_OBJECT.POSITION.X() + "px";
      ROOT_GAME_OBJECT.WEBCAM.TRACKING_CANVAS_LAYOUT.style.top = ROOT_GAME_OBJECT.POSITION.Y() + 50 + "px";
    };

    ROOT_GAME_OBJECT.WEBCAM.VIDEO.style.opacity = 0.9;
  };

  this.SET_TRACKING_VIEW = function (type_, DIMENSIONS_TYPE) {
    // just webcam view
    ROOT_GAME_OBJECT.WEBCAM = new Object();
    ROOT_GAME_OBJECT.WEBCAM.VIDEO = _system.default.DOM.E("video");
    ROOT_GAME_OBJECT.WEBCAM.TRACKING_CANVAS_LAYOUT = document.getElementById("canvas"); // SET_STREAM(ROOT_GAME_OBJECT.WEBCAM.VIDEO);

    if (DIMENSIONS_TYPE == "GAME_OBJECT") {
      ROOT_GAME_OBJECT.WEBCAM.DIMENSIONS_TYPE = "GAME_OBJECT";
    } else {
      ROOT_GAME_OBJECT.WEBCAM.DIMENSIONS_TYPE = "WEBCAM_DIMENSION";
      ROOT_GAME_OBJECT.DIMENSION.H = CONVERTOR.PIY_TO_PER(_system.default.DOM.E("video").height);
      ROOT_GAME_OBJECT.DIMENSION.W = CONVERTOR.PIX_TO_PER(_system.default.DOM.E("video").width);
    }

    ROOT_GAME_OBJECT.TYPE_OF_GAME_OBJECT = "CUSTOM";

    ROOT_GAME_OBJECT.CUSTOM = function () {
      SURF.fillStyle = "white";
      SURF.fillRect(ROOT_GAME_OBJECT.POSITION.X(), ROOT_GAME_OBJECT.POSITION.Y(), 100, 100);
    };
  }; // DRAW PATH


  this.CREATE_PENCIL = function (type_, color, width) {
    this.PENCIL = new Object();

    if (typeof type_ != "undefined") {
      this.PENCIL.TYPE = type_;
    } else {
      this.PENCIL.TYPE = "POINTS";
    }

    if (typeof color != "undefined") {
      this.PENCIL.COLOR = color;
    } else {
      this.PENCIL.COLOR = "lime";
    }

    if (typeof width != "undefined") {
      this.PENCIL.WIDTH = width;
    } else {
      this.PENCIL.WIDTH = 1;
    }

    ROOT_GAME_OBJECT.PENCIL.PATH = [];
    ROOT_GAME_OBJECT.PENCIL.NAME = "";
    ROOT_GAME_OBJECT.PENCIL.ID = ""; //draw

    ROOT_GAME_OBJECT.TYPE_OF_GAME_OBJECT = "PENCIL";
    ROOT_GAME_OBJECT.PENCIL.LAST_POS = {
      x: _system.default.MOUSE.x,
      y: _system.default.MOUSE.y
    }; // TRANSLATE_BY_PATH

    ROOT_GAME_OBJECT.PENCIL.RECORD = true;

    ROOT_GAME_OBJECT.PENCIL.RECORD_TYPE = function (TYPE_) {
      if (TYPE_ == "EVERY_POINT") {
        ROOT_GAME_OBJECT.ON_UPDATE_SYS = ROOT_GAME_OBJECT.ON_UPDATE_SYS_RECORD_EVERY_POINT;

        _system.default.MOUSE.ON_RIGHT_BTN_PRESSED = function () {};
      } else if (TYPE_ == "ON_TAP") {
        ROOT_GAME_OBJECT.ON_UPDATE_SYS = ROOT_GAME_OBJECT.ON_UPDATE_SYS_RECORD_ONLY_TAP; //clear colector
        //collector on tap

        _system.default.MOUSE.ON_RIGHT_BTN_PRESSED = function () {
          IamPathGameObject.PENCIL.RECORD = false;
        };

        _system.default.MOUSE.ON_LEFT_BTN_PRESSED = function () {
          ROOT_GAME_OBJECT.PENCIL.PATH.push({
            x: _system.default.MOUSE.x,
            y: _system.default.MOUSE.y
          });
          var XX = _system.default.MOUSE.x;
          var YY = _system.default.MOUSE.y;
          ROOT_GAME_OBJECT.PENCIL.LAST_POS.x = XX;
          ROOT_GAME_OBJECT.PENCIL.LAST_POS.y = YY;
        };
      }
    };

    ROOT_GAME_OBJECT.PENCIL.SAVE_DRAWS = function (name_) {
      if (typeof name_ != "undefined") {
        var PATH_FOR_PENCIL = new Object();
        PATH_FOR_PENCIL.PATH = ROOT_GAME_OBJECT.PENCIL.PATH;
        PATH_FOR_PENCIL.ID = _system.default.MATH.RANDOM_INT_FROM_TO(1, 100000) * 78;
        ROOT_GAME_OBJECT.PENCIL.NAME = name_;
        PATH_FOR_PENCIL.NAME = name_;
        SAVE(PATH_FOR_PENCIL.NAME, PATH_FOR_PENCIL);
      } else {
        _system.default.DEBUG.WARNING("Pencil object : save draws faild. Please give a name in arg");
      }
    };

    ROOT_GAME_OBJECT.PENCIL.LOAD_PATH = function (name_) {
      if (typeof name != "undefined") {
        ROOT_GAME_OBJECT.PENCIL.LOADED_PATH = LOAD(name_);
        ROOT_GAME_OBJECT.PENCIL.PATH = ROOT_GAME_OBJECT.PENCIL.LOADED_PATH.PATH;
        ROOT_GAME_OBJECT.PENCIL.NAME = ROOT_GAME_OBJECT.PENCIL.LOADED_PATH.NAME;
        ROOT_GAME_OBJECT.PENCIL.ID = ROOT_GAME_OBJECT.PENCIL.LOADED_PATH.ID; // ROOT_GAME_OBJECT.PENCIL.LOADED_PATH = null;

        ROOT_GAME_OBJECT.PENCIL.RECORD = false;
      } else {
        _system.default.DEBUG.WARNING("Pencil object : load draws faild. Please give a name in arg");
      }
    };

    ROOT_GAME_OBJECT.PENCIL.DRAW = function () {};

    ROOT_GAME_OBJECT.PENCIL.CLEAR = function () {
      ROOT_GAME_OBJECT.PENCIL.PATH = [];
    };

    ROOT_GAME_OBJECT.PENCIL.DRAW_TYPE = function (TYPE_) {
      if (TYPE_ == "LINES") {
        ROOT_GAME_OBJECT.PENCIL.DRAW = ROOT_GAME_OBJECT.PENCIL.DRAW_LINES;
        ROOT_GAME_OBJECT.PENCIL.TYPE = TYPE_;
      } else if (TYPE_ == "POINTS") {
        ROOT_GAME_OBJECT.PENCIL.DRAW = ROOT_GAME_OBJECT.PENCIL.DRAW_POINTS;
        ROOT_GAME_OBJECT.PENCIL.TYPE = TYPE_;
      } else if (TYPE_ == "STRIP_LINES") {
        ROOT_GAME_OBJECT.PENCIL.DRAW = ROOT_GAME_OBJECT.PENCIL.DRAW_STRIP_LINES;
        ROOT_GAME_OBJECT.PENCIL.TYPE = TYPE_;
      } else if (TYPE_ == "STRIP_LINES2") {
        ROOT_GAME_OBJECT.PENCIL.DRAW = ROOT_GAME_OBJECT.PENCIL.DRAW_STRIP_LINES2;
        ROOT_GAME_OBJECT.PENCIL.TYPE = TYPE_;
      } else if (TYPE_ == "BALLS") {
        ROOT_GAME_OBJECT.PENCIL.DRAW = ROOT_GAME_OBJECT.PENCIL.DRAW_BALS;
        ROOT_GAME_OBJECT.PENCIL.TYPE = TYPE_;
      } else {
        ROOT_GAME_OBJECT.PENCIL.DRAW = ROOT_GAME_OBJECT.PENCIL.DRAW_POINTS;
        ROOT_GAME_OBJECT.PENCIL.TYPE = "POINTS";
      }
    };

    ROOT_GAME_OBJECT.PENCIL.DRAW_POINTS = function () {
      ROOT_GAME_OBJECT.PENCIL.PATH.forEach(function (value_) {
        SURF.fillStyle = ROOT_GAME_OBJECT.PENCIL.COLOR;
        SURF.beginPath();
        SURF.arc(value_.x, value_.y, ROOT_GAME_OBJECT.PENCIL.WIDTH, 0, 2 * Math.PI);
        SURF.fill();
      });
    };

    ROOT_GAME_OBJECT.PENCIL.DRAW_STRIP_LINES = function () {
      var a = 0;
      ROOT_GAME_OBJECT.PENCIL.PATH.forEach(function (value_) {
        SURF.strokeStyle = ROOT_GAME_OBJECT.PENCIL.COLOR; //SURF.beginPath();
        //SURF.arc(value_.x,value_.y,ROOT_GAME_OBJECT.PENCIL.WIDTH,0,2*Math.PI);

        if (a == 0) {
          SURF.beginPath();
          SURF.lineWidth = ROOT_GAME_OBJECT.PENCIL.WIDTH;
          SURF.moveTo(value_.x, value_.y);
        }

        SURF.lineTo(value_.x, value_.y);
        SURF.stroke();
        a++;
      });
    };

    ROOT_GAME_OBJECT.PENCIL.DRAW_LINES = function () {
      var a = 0;
      ROOT_GAME_OBJECT.PENCIL.PATH.forEach(function (value_) {
        SURF.strokeStyle = ROOT_GAME_OBJECT.PENCIL.COLOR; //SURF.beginPath();
        //SURF.arc(value_.x,value_.y,ROOT_GAME_OBJECT.PENCIL.WIDTH,0,2*Math.PI);

        if (isOdd(a)) {
          SURF.beginPath();
          SURF.lineWidth = ROOT_GAME_OBJECT.PENCIL.WIDTH;
          SURF.moveTo(value_.x, value_.y);
        }

        SURF.lineTo(value_.x, value_.y);
        SURF.stroke();
        a++;
      });
    }; //


    ROOT_GAME_OBJECT.PENCIL.DRAW_STRIP_LINES2 = function () {
      var a = 0;
      ROOT_GAME_OBJECT.PENCIL.PATH.forEach(function (value_) {
        SURF.strokeStyle = ROOT_GAME_OBJECT.PENCIL.COLOR; //SURF.beginPath();
        //SURF.arc(value_.x,value_.y,ROOT_GAME_OBJECT.PENCIL.WIDTH,0,2*Math.PI);

        if (isEven(a)) {
          SURF.beginPath();
          SURF.lineWidth = ROOT_GAME_OBJECT.PENCIL.WIDTH;
          SURF.moveTo(value_.x, value_.y);
        } //SURF.lineTo(value_.x,value_.y);
        //SURF.stroke();


        SURF.lineTo(value_.x, value_.y);
        SURF.stroke();
        a++;
      });
      var a = 0;
      ROOT_GAME_OBJECT.PENCIL.PATH.forEach(function (value_) {
        SURF.strokeStyle = ROOT_GAME_OBJECT.PENCIL.COLOR; //SURF.beginPath();
        //SURF.arc(value_.x,value_.y,ROOT_GAME_OBJECT.PENCIL.WIDTH,0,2*Math.PI);

        if (isOdd(a)) {
          SURF.beginPath();
          SURF.lineWidth = ROOT_GAME_OBJECT.PENCIL.WIDTH;
          SURF.moveTo(value_.x, value_.y);
        }

        SURF.lineTo(value_.x, value_.y);
        SURF.stroke();
        a++;
      });
    }; //


    ROOT_GAME_OBJECT.PENCIL.DRAW_BALS = function () {
      SURF.fillStyle = ROOT_GAME_OBJECT.PENCIL.COLOR;
      ROOT_GAME_OBJECT.PENCIL.PATH.forEach(function (value_) {
        SURF.beginPath();
        SURF.arc(value_.x, value_.y, ROOT_GAME_OBJECT.PENCIL.WIDTH * 20, 0, 2 * Math.PI);
        SURF.fill();
      });
    };

    ROOT_GAME_OBJECT.PENCIL.DRAW_TYPE(); //#############################
    //#############################

    ROOT_GAME_OBJECT.ON_UPDATE_SYS = function () {
      if (ROOT_GAME_OBJECT.PENCIL.RECORD == true) {
        if (ROOT_GAME_OBJECT.PENCIL.PATH.length > 0) {
          if (ROOT_GAME_OBJECT.PENCIL.PATH[ROOT_GAME_OBJECT.PENCIL.PATH.length - 1].x != _system.default.MOUSE.x) {
            ROOT_GAME_OBJECT.PENCIL.PATH.push({
              x: _system.default.MOUSE.x,
              y: _system.default.MOUSE.y
            });
            var XX = _system.default.MOUSE.x;
            var YY = _system.default.MOUSE.y;
            ROOT_GAME_OBJECT.PENCIL.LAST_POS.x = XX;
            ROOT_GAME_OBJECT.PENCIL.LAST_POS.y = YY;
          }
        } else {
          ROOT_GAME_OBJECT.PENCIL.PATH.push(ROOT_GAME_OBJECT.PENCIL.LAST_POS);
        }
      }
    };

    ROOT_GAME_OBJECT.ON_UPDATE_SYS_RECORD_ONLY_TAP = function () {};

    ROOT_GAME_OBJECT.ON_UPDATE_SYS_RECORD_EVERY_POINT = function () {
      if (ROOT_GAME_OBJECT.PENCIL.RECORD == true) {
        if (ROOT_GAME_OBJECT.PENCIL.PATH.length > 0) {
          if (ROOT_GAME_OBJECT.PENCIL.PATH[ROOT_GAME_OBJECT.PENCIL.PATH.length - 1].x != _system.default.MOUSE.x) {
            ROOT_GAME_OBJECT.PENCIL.PATH.push({
              x: _system.default.MOUSE.x,
              y: _system.default.MOUSE.y
            });
            var XX = _system.default.MOUSE.x;
            var YY = _system.default.MOUSE.y;
            ROOT_GAME_OBJECT.PENCIL.LAST_POS.x = XX;
            ROOT_GAME_OBJECT.PENCIL.LAST_POS.y = YY;
          }
        } else {
          ROOT_GAME_OBJECT.PENCIL.PATH.push(ROOT_GAME_OBJECT.PENCIL.LAST_POS);
        }
      }
    }; //#############################
    //#############################

  };

  this.TRANSLATE_BY_PATH = function (PATH_, LOOP_TYPE) {
    ROOT_GAME_OBJECT.sys_translateByPath = PATH_;
    ROOT_GAME_OBJECT.sys_translateByPathIndex = 0;

    if (typeof LOOP_TYPE != "undefined") {
      ROOT_GAME_OBJECT.sys_translateByPathLoopType = LOOP_TYPE;
      ROOT_GAME_OBJECT.sys_translateByPathLoopTypeActive = "STOP";
    } else {
      ROOT_GAME_OBJECT.sys_translateByPathLoopType = "STOP";
      ROOT_GAME_OBJECT.sys_translateByPathLoopTypeActive = "STOP";
    }

    ROOT_GAME_OBJECT.POSITION.TRANSLATE(CONVERTOR.PIX_TO_PER(ROOT_GAME_OBJECT.sys_translateByPath[ROOT_GAME_OBJECT.sys_translateByPathIndex].x), CONVERTOR.PIY_TO_PER(ROOT_GAME_OBJECT.sys_translateByPath[ROOT_GAME_OBJECT.sys_translateByPathIndex].y));

    ROOT_GAME_OBJECT.POSITION.ON_TARGET_POSITION = function () {
      if (ROOT_GAME_OBJECT.sys_translateByPathLoopTypeActive == "STOP") {
        if (ROOT_GAME_OBJECT.sys_translateByPath.length > ROOT_GAME_OBJECT.sys_translateByPathIndex + 1) {
          ROOT_GAME_OBJECT.sys_translateByPathIndex++;
          ROOT_GAME_OBJECT.POSITION.TRANSLATE(CONVERTOR.PIX_TO_PER(ROOT_GAME_OBJECT.sys_translateByPath[ROOT_GAME_OBJECT.sys_translateByPathIndex].x), CONVERTOR.PIY_TO_PER(ROOT_GAME_OBJECT.sys_translateByPath[ROOT_GAME_OBJECT.sys_translateByPathIndex].y));
        } else {
          if (ROOT_GAME_OBJECT.sys_translateByPathLoopType == "INVERSE") {
            ROOT_GAME_OBJECT.sys_translateByPathLoopTypeActive = "INVERSE";
            ROOT_GAME_OBJECT.sys_translateByPathIndex--;
            ROOT_GAME_OBJECT.sys_translateByPathIndex--;
            ROOT_GAME_OBJECT.POSITION.TRANSLATE(CONVERTOR.PIX_TO_PER(ROOT_GAME_OBJECT.sys_translateByPath[ROOT_GAME_OBJECT.sys_translateByPathIndex].x), CONVERTOR.PIY_TO_PER(ROOT_GAME_OBJECT.sys_translateByPath[ROOT_GAME_OBJECT.sys_translateByPathIndex].y));
          }
        }
      } else if (ROOT_GAME_OBJECT.sys_translateByPathLoopTypeActive == "INVERSE") {
        if (ROOT_GAME_OBJECT.sys_translateByPathIndex > 1) {
          ROOT_GAME_OBJECT.sys_translateByPathIndex--;
          ROOT_GAME_OBJECT.POSITION.TRANSLATE(CONVERTOR.PIX_TO_PER(ROOT_GAME_OBJECT.sys_translateByPath[ROOT_GAME_OBJECT.sys_translateByPathIndex].x), CONVERTOR.PIY_TO_PER(ROOT_GAME_OBJECT.sys_translateByPath[ROOT_GAME_OBJECT.sys_translateByPathIndex].y));
        } else {
          if (ROOT_GAME_OBJECT.sys_translateByPathLoopType == "INVERSE_FOR_EVER") {
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
    ENABLE: HELLO_WORLD.ENGINE.ENGINE_EDITOR,
    ACTORS_VISIBLE: true,
    ACTORS_AREA_HEIGHT: 10,
    ACTOR_BLUE_HOVER: false,
    ACTOR_GREEN_HOVER: false,
    ACTOR_CENTER_OSCILATOR: new _system.default.MATH.OSCILLATOR(0, 2, 0.01),
    ACTOR_START_X: 0,
    ACTOR_START_Y: 0,
    ACTOR_DELTA: 0,
    ACTOR_X_IN_MOVE: false,
    ACTOR_Y_IN_MOVE: false,
    ACTOR_DRAG_RECT_DIM: new _math.DIMENSION(5, 5),
    //ACTOR_DRAG_RECT_POS : SYS.ARRAY_OPERATION.DEEP_COPY.getCloneOfObject( this.POSITION ) ,
    ACTOR_DRAG_RECT_POS: this.POSITION,
    ACTOR_DRAG: false,
    BUTTONS: [new _systems.RIGHT_MENU_BUTTON("Destroy gameObject", 0, "1"), new _systems.RIGHT_MENU_BUTTON("Destroy after secund ", 20, "2"), new _systems.RIGHT_MENU_BUTTON("Add animation ", 40, "3"), new _systems.RIGHT_MENU_BUTTON("Add collision ", 60, "4"), new _systems.RIGHT_MENU_BUTTON("Atach player ", 80, "5", "res/system/images/html5/plus.png"), new _systems.RIGHT_MENU_BUTTON("Add particle ", 100, "6", "res/system/images/html5/particle.png"), new _systems.RIGHT_MENU_BUTTON("Add textbox ", 120, "7", "res/system/images/html5/textbox.png"), new _systems.RIGHT_MENU_BUTTON("Add webcam  ", 140, "8", "res/system/images/html5/HTML5-Device-Access.png")],
    GAME_OBJECT_MENU: {
      VISIBLE: false
    }
  };
  this.WEBCAM = null;

  this.SET_WEBCAM_VIEW = function (type_, DIMENSIONS_TYPE) {
    // just webcam view
    ROOT_GAME_OBJECT.WEBCAM = new Object();
    ROOT_GAME_OBJECT.WEBCAM.VIDEO = _system.default.DOM.E("webcam");
    SET_STREAM(ROOT_GAME_OBJECT.WEBCAM.VIDEO);

    if (DIMENSIONS_TYPE == "GAME_OBJECT") {
      ROOT_GAME_OBJECT.WEBCAM.DIMENSIONS_TYPE = "GAME_OBJECT";
    } else {
      ROOT_GAME_OBJECT.WEBCAM.DIMENSIONS_TYPE = "WEBCAM_DIMENSION";
      ROOT_GAME_OBJECT.DIMENSION.H = CONVERTOR.PIY_TO_PER(_system.default.DOM.E("webcam").height);
      ROOT_GAME_OBJECT.DIMENSION.W = CONVERTOR.PIX_TO_PER(_system.default.DOM.E("webcam").width);
    }

    if (type_ == "NORMAL") {
      ROOT_GAME_OBJECT.TYPE_OF_GAME_OBJECT = "WEBCAM";
    } else if (type_ == "NUI") {
      _system.default.DOM.E("canvas-blended").height = _system.default.DOM.E("webcam").height;
      _system.default.DOM.E("canvas-blended").width = _system.default.DOM.E("webcam").width;
      _system.default.DOM.E("canvas-render").height = _system.default.DOM.E("webcam").height;
      _system.default.DOM.E("canvas-render").width = _system.default.DOM.E("webcam").width;
      ROOT_GAME_OBJECT.TYPE_OF_GAME_OBJECT = "WEBCAM_NUI";
      ROOT_GAME_OBJECT.WEBCAM.BLEND_CANVAS = _system.default.DOM.E("canvas-blended");
      ROOT_GAME_OBJECT.WEBCAM.RENDER_CANVAS = _system.default.DOM.E("canvas-render");
      ROOT_GAME_OBJECT.WEBCAM.NOTES = [];
    }
  };

  this.CREATE_WEBCAM = function (type_, DIMENSIONS_TYPE, numFieldV, numFieldH) {
    if (typeof type_ != "undefined") {
      if (type_ == "NUI") {
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
      } else if ("NORMAL") {
        ROOT_GAME_OBJECT.SET_WEBCAM_VIEW("NORMAL", DIMENSIONS_TYPE);
      }
    } else {
      _system.default.DEBUG.WARNING("Pleas enter type of webcam component .  [ NUI , NORMAL ]  ");
    }
  };

  this.DESTROY_WEBCAM = function () {
    ROOT_GAME_OBJECT.TYPE_OF_GAME_OBJECT = "NO_RENDER";

    ROOT_GAME_OBJECT.WEBCAM.DRAW = function () {};

    ROOT_GAME_OBJECT.WEBCAM.NOTES = [];
    ROOT_GAME_OBJECT.WEBCAM.BS = null;
    ROOT_GAME_OBJECT.WEBCAM.RC = null;
    ROOT_GAME_OBJECT.WEBCAM._N_ = [];
    delete ROOT_GAME_OBJECT.WEBCAM;
    ROOT_GAME_OBJECT.WEBCAM = null;
  }; //$$$$$$$$$$$$$$$$$$$$$$$$$$$$//$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$//$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  // MUTIRTC_PEER


  this.ON_PEER_CREATED = {
    "DONE": function () {}
    /* MAIN_PEER.CHANNEL.SET('LEVEL1') }  */

  };

  this.CREATE_PEER = function (port) {
    if (typeof port != "undefined") {
      window["MAIN_PEER"].PORT = port;
    } else {
      window["MAIN_PEER"].PORT = 12034;
    }

    if (typeof window["MAIN_PEER"].REMOTE_DATA == "undefined") {
      ROOT_GAME_OBJECT.MAIN_PEER = window["MAIN_PEER"];
      ROOT_GAME_OBJECT.MAIN_PEER.ADDRESS = "localhost";
      ROOT_GAME_OBJECT.MAIN_PEER.ON_PEER_CREATED = ROOT_GAME_OBJECT.ON_PEER_CREATED;

      ROOT_GAME_OBJECT.MAIN_PEER.LOADED = function () {
        console.log("peer loaded2");
      };

      if (typeof window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER") == "undefined") {
        setTimeout(ROOT_GAME_OBJECT.CREATE_PEER, 50);
        return;
      } else {
        if (typeof window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").NEW_OBJECT == "function") {} else {
          setTimeout(ROOT_GAME_OBJECT.CREATE_PEER, 50);
          return;
        }
      }

      window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").NEW_OBJECT("system_object_for_MAIN_peer", 5, 5, 15, 8, 10);

      var sys_btn_alias = window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS("system_object_for_MAIN_peer");

      sys_btn_alias.DIMENSION.W = ROOT_GAME_OBJECT.DIMENSION.W;
      sys_btn_alias.CREATE_TEXTBOX("enter message", 10, "black", "lime");
      system_object_for_MAIN_peer.TEXTBOX.font = "18px Arial";

      system_object_for_MAIN_peer.TEXTBOX.ON_PRESS_ENTER = function () {
        _system.default.DOM.E("SEND_BTN_").value = system_object_for_MAIN_peer.TEXTBOX.TEXT;

        _system.default.DEBUG.LOG("SEND TEXT MSG TO CURRENT CHANNEL");

        system_object_for_MAIN_peer.TEXTBOX.TEXT = "";
        ROOT_GAME_OBJECT.MAIN_PEER.SEND_MSG();
      };

      window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").NEW_OBJECT("system_object_for_MAIN_peer_BTN_connect", 5, 5, 9, 7, 10);

      var sys_btn_connect = window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS("system_object_for_MAIN_peer_BTN_connect");

      sys_btn_connect.CREATE_TEXTBOX("Connect", 10, "black", "lime");
      sys_btn_connect.TEXTBOX.font = "18px Arial";
      sys_btn_connect.TEXTBOX.EDIT = false;

      sys_btn_connect.TAP = function () {
        if (rtcMultiConnection.sessionDescription == null) {
          MAIN_PEER.CONNECT_TO_CHANNEL();
        }
      }; ///////////////////////


      ROOT_GAME_OBJECT.ON_UPDATE_SYS = function () {
        //sys_btn_alias.POSITION.x = ROOT_GAME_OBJECT.POSITION.x;
        sys_btn_alias.POSITION.SET_POSITION(ROOT_GAME_OBJECT.POSITION.x, ROOT_GAME_OBJECT.POSITION.y + ROOT_GAME_OBJECT.DIMENSION.H * 1.1, "DIAMETRIC");
        sys_btn_connect.POSITION.SET_POSITION(ROOT_GAME_OBJECT.POSITION.x + ROOT_GAME_OBJECT.DIMENSION.W / 1.7, ROOT_GAME_OBJECT.POSITION.y, "DIAMETRIC");
      }; // ROOT_GAME_OBJECT.
      //


      ROOT_GAME_OBJECT.MAIN_PEER.REMOTE_DATA = {
        OBJECTS: [],
        //SEND DATA
        SHARE: function (object) {
          rtcMultiConnection.send({
            "shared_object": object,
            "operation": "share"
          });
          object.PEER_SHARED = true;
        },
        SHARE_POSITION: function (object) {
          object.POSITION.SHARE_POSITION = true;
        },
        NEW_POSITION: function (object) {
          rtcMultiConnection.send({
            "nameOfObject": object.NAME,
            "operation": "new_pos",
            "x": object.POSITION.x,
            "y": object.POSITION.y
          });
        },
        NEW_DIMENSION: function (object) {
          rtcMultiConnection.send({
            "nameOfObject": object.NAME,
            "operation": "new_dim",
            "x": object.DIMENSION.W,
            "y": object.DIMENSION.H
          });
        },
        // DATA FROM SERVER
        NETWORK_VIEW: function (e) {
          if (e.operation == "share") {
            window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("STARTER").NEW_NETWORK_OBJECT(e.shared_object);
          } else if (e.operation == "new_pos") {
            window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("STARTER").NEW_NETWORK_POSITION(e);
          } else if (e.operation == "new_dim") {
            window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("STARTER").NEW_NETWORK_DIMENSION(e);
          } else if (e.operation == "dimension&position") {}
        }
      };
      ROOT_GAME_OBJECT.MAIN_PEER.CHANNEL = {
        GET: function () {
          return _system.default.DOM.E("room-name").value;
        },
        SET: function (newvalue) {
          _system.default.DOM.E("room-name").value = newvalue;
        }
      };
      ROOT_GAME_OBJECT.MAIN_PEER.LOCAL_USER = {
        GET: function () {
          return _system.default.DOM.E("your-name").value;
        },
        SET: function (newvalue) {
          _system.default.DOM.E("your-name").value = newvalue;
        }
      };
      ROOT_GAME_OBJECT.MAIN_PEER.SEND_MSG = function () {
        if (typeof rtcMultiConnection != "undefined") {
          rtcMultiConnection.send(_system.default.DOM.E("SEND_BTN_").value);
          _system.default.DOM.E("SEND_BTN_").value = "";
        }
      }, ROOT_GAME_OBJECT.MAIN_PEER.CONNECT_TO_CHANNEL = function () {
        _system.default.DOM.E("continue").onclick();
      }, ROOT_GAME_OBJECT.MAIN_PEER.LOGS = "logs!";
      ROOT_GAME_OBJECT.TYPE_OF_GAME_OBJECT = "MAIN_PEER_OBJECT";
      setTimeout(function () {
        MAIN_PEER.ON_PEER_CREATED.DONE();
      }, 200);
    } else {
      _system.default.DEBUG.WARNING("from function CREATE_PEER -  MAIN PEER OBJECT ALREADY CREATED.");
    }
  }; //$$$$$$$$$$$$$$$$$$$$$$$$$$$$//$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$//$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$//$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$//$$$$$$$$$$$$$$$$$$$$$$$$$$$$


  this.GROUP = {
    ADD: function (name) {
      var locx = window[ROOT_GAME_OBJECT.PROGRAM_NAME].ENGINE.MODULES.ACCESS_MODULE(ROOT_GAME_OBJECT.PARENT).GAME_OBJECTS.ACCESS(name).POSITION.x;
      var locy = window[ROOT_GAME_OBJECT.PROGRAM_NAME].ENGINE.MODULES.ACCESS_MODULE(ROOT_GAME_OBJECT.PARENT).GAME_OBJECTS.ACCESS(name).POSITION.y;
      var dx = ROOT_GAME_OBJECT.GROUP.MASTER_INITIALS.x - locx;
      var dy = ROOT_GAME_OBJECT.GROUP.MASTER_INITIALS.y - locy;
      ROOT_GAME_OBJECT.GROUP.GROUP_INITIALS.push({
        x: dx,
        y: dy
      });
      ROOT_GAME_OBJECT.GROUP.GROUP.push(name); //delete (locx);
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
    UPDATE: function () {}
  }; //$$$$$$$$$$$$$$$$$$$$$$$$$$$$//$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$//$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  this.EFFECTS = {
    FADE: {
      IN: function (sec) {
        var TIMER = setTimeout(function () {
          ROOT_GAME_OBJECT.globalAlpha += 0.02;

          if (ROOT_GAME_OBJECT.globalAlpha < 1) {
            ROOT_GAME_OBJECT.EFFECTS.FADE.IN();
          } else {
            ROOT_GAME_OBJECT.globalAlpha = 1;
          }
        }, sec);
      },
      OUT: function (sec) {
        var TIMER = setTimeout(function () {
          ROOT_GAME_OBJECT.globalAlpha -= 0.02;

          if (ROOT_GAME_OBJECT.globalAlpha > 0) {
            ROOT_GAME_OBJECT.EFFECTS.FADE.OUT();
          } else {
            ROOT_GAME_OBJECT.globalAlpha = 0;
          }
        }, sec);
      }
    },
    ZOOM: {
      STATUS_FOR_IN: false,
      STATUS_FOR_OUT: false,
      ZOOM_IN_FINISHED: function () {
        console.log("zoom in  ----finished.");
      },
      ZOOM_OUT_FINISHED: function () {
        console.log("zoom out ----finished.");
      },
      VALUE: 0.5,
      IN: function (sec) {
        var sec = sec;
        this.STATUS_FOR_IN = true;
        var TIMER = setTimeout(function () {
          if (ROOT_GAME_OBJECT.zoom_scale < ROOT_GAME_OBJECT.EFFECTS.ZOOM.VALUE) {
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
      OUT: function (sec) {
        var sec = sec;
        this.STATUS_FOR_OUT = true;
        var TIMER = setTimeout(function () {
          if (ROOT_GAME_OBJECT.POSITION.x < ROOT_GAME_OBJECT.GROUP.MASTER_INITIALS.x) {
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
      }
    }
  }; //$$$$$$$$$$$$$$$$$$$$$$$$$$$$//$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$//$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  this.PARTICLE = null;

  this.CREATE_PARTICLE = function (type_) {
    // NEED to be created more particle system in future !!!
    ROOT_GAME_OBJECT.PARTICLE = new PARTICLE_FONTAN(ROOT_GAME_OBJECT);
    ROOT_GAME_OBJECT.TYPE_OF_GAME_OBJECT = "PATRICLE";
  }; //$$$$$$$$$$$$$$$$$$$$$$$$$$$$//$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$//$$$$$$$$$$$$$$$$$$$$$$$$$$$$


  this.CUSTOM = function () {};

  this.DESELECT_ALL = function () {
    var exec_local = "" + ROOT_GAME_OBJECT.PROGRAM_NAME.toString();

    for (var z = 0; z < window[exec_local].ENGINE.MODULES.ACCESS(ROOT_GAME_OBJECT.PARENT).GAME_OBJECTS.length; z++) {
      window[exec_local].ENGINE.MODULES.ACCESS(ROOT_GAME_OBJECT.PARENT).GAME_OBJECTS[z].EDITOR.SELECTED = false;
    }
  }; // For user override


  this.TOUCH_DOWN = function () {
    _system.default.DEBUG.LOG("No atached event . EVENT_TOUCH_DOWN");
  };

  this.TAP = function () {
    _system.default.DEBUG.LOG("No atached event . EVENT_TAP : similar click");
  };

  this.TOUCH_UP = function () {
    _system.default.DEBUG.LOG("No atached event . EVENT_TOUCH_UP");
  };

  this.TOUCH_MOVE = function () {// SYS.DEBUG.LOG("No atached event . EVENT_TOUCH_MOVE");
  };

  this.UPDATE_STATUS = {
    STOP: function () {}
  };
  this.ROTATE = {
    ANGLE: 0,
    //use for custum image drawing
    RADIANS: 0,
    // fiktive
    ROTATE_ARROUNT_CENTER: function () {
      ORBIT(50, 50, ROOT_GAME_OBJECT.ROTATE.ANGLE, ROOT_GAME_OBJECT.POSITION);
    }
  };

  this.DRAW = function (s) {
    if (ROOT_GAME_OBJECT.VISIBLE == true) {
      s.save();
      s.globalAlpha = ROOT_GAME_OBJECT.globalAlpha;

      if (this.TYPE_OF_GAME_OBJECT == "ANIMATION") {
        this.ANIMATION.DRAW();
      } else if (this.TYPE_OF_GAME_OBJECT == "TEXT_BOX") {
        this.TEXTBOX.DRAW(s);
      } else if (this.TYPE_OF_GAME_OBJECT == "TEXT_BOX_ANIMATION") {
        this.TEXTBOX.DRAW(s);
        this.ANIMATION.DRAW();
      } else if (this.TYPE_OF_GAME_OBJECT == "PATRICLE") {
        this.PARTICLE.DRAW(s);
      } else if (this.TYPE_OF_GAME_OBJECT == "PATRICLE_ANIMATION") {
        this.PARTICLE.DRAW(s);
        this.ANIMATION.DRAW();
      } else if (this.TYPE_OF_GAME_OBJECT == "ANIMATION_PATRICLE") {
        this.ANIMATION.DRAW();
        this.PARTICLE.DRAW(s);
      } else if (this.TYPE_OF_GAME_OBJECT == "ANIMATION_TEXT_BOX") {
        this.ANIMATION.DRAW();
        this.TEXTBOX.DRAW(s);
      } else if (this.TYPE_OF_GAME_OBJECT == "ANIMATION_PATRICLE") {
        this.ANIMATION.DRAW();
        this.PARTICLE.DRAW(s);
      } else if (this.TYPE_OF_GAME_OBJECT == "WEBCAM") {
        if (ROOT_GAME_OBJECT.WEBCAM.DIMENSIONS_TYPE = "GAME_OBJECT") {
          s.drawImage(ROOT_GAME_OBJECT.WEBCAM.VIDEO, ROOT_GAME_OBJECT.POSITION.X(), ROOT_GAME_OBJECT.POSITION.Y(), ROOT_GAME_OBJECT.DIMENSION.WIDTH(), ROOT_GAME_OBJECT.DIMENSION.HEIGHT());
        } else {
          s.drawImage(ROOT_GAME_OBJECT.WEBCAM.VIDEO, ROOT_GAME_OBJECT.POSITION.X(), ROOT_GAME_OBJECT.POSITION.Y(), ROOT_GAME_OBJECT.WEBCAM.VIDEO.width, ROOT_GAME_OBJECT.WEBCAM.VIDEO.height);
        }
      } else if (this.TYPE_OF_GAME_OBJECT == "WEBCAM_NUI") {
        if (ROOT_GAME_OBJECT.WEBCAM.DIMENSIONS_TYPE = "GAME_OBJECT") {
          s.drawImage(ROOT_GAME_OBJECT.WEBCAM.VIDEO, ROOT_GAME_OBJECT.POSITION.X(), ROOT_GAME_OBJECT.POSITION.Y(), ROOT_GAME_OBJECT.DIMENSION.WIDTH(), ROOT_GAME_OBJECT.DIMENSION.HEIGHT());
        } else {
          s.drawImage(ROOT_GAME_OBJECT.WEBCAM.VIDEO, ROOT_GAME_OBJECT.POSITION.X(), ROOT_GAME_OBJECT.POSITION.Y(), ROOT_GAME_OBJECT.WEBCAM.VIDEO.width, ROOT_GAME_OBJECT.WEBCAM.VIDEO.height);
        }

        blend(ROOT_GAME_OBJECT, s);
        checkAreas(ROOT_GAME_OBJECT);
        ROOT_GAME_OBJECT.WEBCAM.DRAW(s, ROOT_GAME_OBJECT.WEBCAM);
      } else if (this.TYPE_OF_GAME_OBJECT == "CUSTOM") {
        ROOT_GAME_OBJECT.CUSTOM(s);
      } else if (this.TYPE_OF_GAME_OBJECT == "PENCIL") {
        ROOT_GAME_OBJECT.PENCIL.DRAW();
      } else if (this.TYPE_OF_GAME_OBJECT == "NO_RENDER") {// nothing here
      } else if (this.TYPE_OF_GAME_OBJECT == "MAIN_PEER_OBJECT") {
        s.fillStyle = "#192837";
        s.fillRect(this.POSITION.X(), this.POSITION.Y(), this.DIMENSION.WIDTH(), this.DIMENSION.HEIGHT());
        s.fillStyle = "lime";
        s.drawImage(image_system_8, this.POSITION.X() + this.DIMENSION.WIDTH() / 2, this.POSITION.Y() + 30, 90, 90);
        s.drawImage(image_system_conn, this.POSITION.X() + this.DIMENSION.WIDTH() / 1.4, this.POSITION.Y() + 30, 90, 90);
        s.fillText("Signaling IP Address : " + this.MAIN_PEER.ADDRESS, this.POSITION.X() + this.EDITOR.ACTORS_AREA_HEIGHT, this.POSITION.Y() + this.EDITOR.ACTORS_AREA_HEIGHT * 4);
        s.fillText("Name : " + this.MAIN_PEER.LOCAL_USER.GET(), this.POSITION.X() + this.EDITOR.ACTORS_AREA_HEIGHT, this.POSITION.Y() + this.EDITOR.ACTORS_AREA_HEIGHT * 5);
        s.fillText("Channel : " + this.MAIN_PEER.CHANNEL.GET(), this.POSITION.X() + this.EDITOR.ACTORS_AREA_HEIGHT, this.POSITION.Y() + this.EDITOR.ACTORS_AREA_HEIGHT * 6);
        s.fillText("peer logs : " + ROOT_GAME_OBJECT.MAIN_PEER.LOGS, this.POSITION.X() + this.EDITOR.ACTORS_AREA_HEIGHT, this.POSITION.Y() + this.EDITOR.ACTORS_AREA_HEIGHT * 7); //ROOT_GAME_OBJECT.MAIN_PEER.LOGS = 'logs!';
      }

      s.restore();
    }
  };

  this.DRAW_ACTOR = function (s) {
    if (this.EDITOR.ACTORS_VISIBLE == true) {
      s.save();
      s.font = "13px Arial";
      s.fillRect(0, this.POSITION.Y(), VIEW.W(), 1);
      s.fillRect(this.POSITION.X(), 0, 1, VIEW.H());
      s.globalAlpha = 0.5;
      s.fillRect(this.POSITION.X(), this.POSITION.Y(), this.DIMENSION.WIDTH(), this.DIMENSION.HEIGHT());
      s.globalAlpha = 0.9;

      if (ROOT_GAME_OBJECT.EDITOR.SELECTED == true) {
        s.fillText("Name :" + this.NAME, this.POSITION.X() + this.EDITOR.ACTORS_AREA_HEIGHT, this.POSITION.Y() - this.EDITOR.ACTORS_AREA_HEIGHT * 4);
        s.fillText("Percent :" + CONVERTOR.PIX_TO_PER(this.POSITION.X().toString()).toFixed(2) + "%  y:" + CONVERTOR.PIY_TO_PER(this.POSITION.Y()).toFixed(2), this.POSITION.X() + this.EDITOR.ACTORS_AREA_HEIGHT, this.POSITION.Y() - this.EDITOR.ACTORS_AREA_HEIGHT * 2.5);
        s.fillText("Actor- x:" + this.POSITION.X().toFixed(2).toString() + " y:" + this.POSITION.Y().toFixed(2), this.POSITION.X() + this.EDITOR.ACTORS_AREA_HEIGHT, this.POSITION.Y() - this.EDITOR.ACTORS_AREA_HEIGHT);
      } //CONVERTOR.PIX_TO_PER( h );
      // actor rect for drag
      //ACTOR_DRAG_RECT


      s.strokeStyle = "blue";
      s.strokeRect(this.EDITOR.ACTOR_DRAG_RECT_POS.X() + this.EDITOR.ACTORS_AREA_HEIGHT, this.EDITOR.ACTOR_DRAG_RECT_POS.Y() + this.EDITOR.ACTORS_AREA_HEIGHT, this.EDITOR.ACTOR_DRAG_RECT_DIM.WIDTH(), this.EDITOR.ACTOR_DRAG_RECT_DIM.HEIGHT());

      if (this.EDITOR.ACTOR_BLUE_HOVER == true) {
        s.fillStyle = "lime";
      } else {
        s.fillStyle = "blue";
      } //BLU LINE ACTOR X-OSA


      s.fillRect(this.POSITION.X(), this.POSITION.Y(), this.EDITOR.ACTORS_AREA_HEIGHT * 15, this.EDITOR.ACTORS_AREA_HEIGHT);
      s.beginPath();
      s.moveTo(this.POSITION.X() + this.EDITOR.ACTORS_AREA_HEIGHT * 10 * 1.5, this.POSITION.Y() - 0.5 * this.EDITOR.ACTORS_AREA_HEIGHT);
      s.lineTo(this.POSITION.X() + this.EDITOR.ACTORS_AREA_HEIGHT * 10 * 1.5, this.POSITION.Y() + 1.4 * this.EDITOR.ACTORS_AREA_HEIGHT);
      s.lineTo(this.POSITION.X() + this.EDITOR.ACTORS_AREA_HEIGHT * 12.5 * 1.5, this.POSITION.Y() + 1 / 2 * this.EDITOR.ACTORS_AREA_HEIGHT);
      s.closePath();
      s.fill();

      if (this.EDITOR.ACTOR_GREEN_HOVER == true) {
        s.fillStyle = "lime";
      } else {
        s.fillStyle = "green";
      } //BLU LINE ACTOR X-OSA


      s.fillRect(this.POSITION.X(), this.POSITION.Y(), this.EDITOR.ACTORS_AREA_HEIGHT, this.EDITOR.ACTORS_AREA_HEIGHT * 15);
      s.beginPath();
      s.moveTo(this.POSITION.X() - 0.5 * this.EDITOR.ACTORS_AREA_HEIGHT, this.POSITION.Y() + this.EDITOR.ACTORS_AREA_HEIGHT * 10 * 1.5);
      s.lineTo(this.POSITION.X() + 1.4 * this.EDITOR.ACTORS_AREA_HEIGHT, this.POSITION.Y() + this.EDITOR.ACTORS_AREA_HEIGHT * 10 * 1.5);
      s.lineTo(this.POSITION.X() + 1 / 2 * this.EDITOR.ACTORS_AREA_HEIGHT, this.POSITION.Y() + this.EDITOR.ACTORS_AREA_HEIGHT * 12.5 * 1.5);
      s.closePath();
      s.fill(); // fix color compositi near x i y

      s.fillStyle = "red";
      s.beginPath(); //s.strokeStyle = "rgba( 222 , " + this.PULSAR_G.VALUE + " , " + this.PULSAR_B.VALUE + " , " + this.PULSAR_A.VALUE + ")";

      s.arc(this.POSITION.X() + this.EDITOR.ACTORS_AREA_HEIGHT / 2, this.POSITION.Y() + this.EDITOR.ACTORS_AREA_HEIGHT / 2, this.EDITOR.ACTORS_AREA_HEIGHT / 2, 0 * Math.PI, 2 * Math.PI);
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

    if (ROOT_GAME_OBJECT.EDITOR.GAME_OBJECT_MENU.VISIBLE == true) {
      for (var x = 0; x < ROOT_GAME_OBJECT.EDITOR.BUTTONS.length; x++) {
        //s.textBaseline = 'middle';
        s.save();
        s.globalAlpha = 1;

        if (ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].HOVER == false) {
          s.fillStyle = APPLICATION.SYSTEM.COLOR;
          s.fillRect(ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].POSITION.X(), ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].POSITION.Y(), ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].DIMENSION.WIDTH(), ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].DIMENSION.HEIGHT());
          s.fillStyle = APPLICATION.SYSTEM.TEXT_COLOR;
          s.fillText(ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].text, ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].POSITION.X(), ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].POSITION.Y() + ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].DIMENSION.HEIGHT() / 2, ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].DIMENSION.WIDTH());
        } else {
          s.fillStyle = APPLICATION.SYSTEM.HOVER_COLOR;
          s.fillRect(ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].POSITION.X(), ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].POSITION.Y(), ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].DIMENSION.WIDTH(), ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].DIMENSION.HEIGHT());
          s.fillStyle = APPLICATION.SYSTEM.TEXT_COLOR;
          s.fillText(ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].text, ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].POSITION.X(), ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].POSITION.Y() + ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].DIMENSION.HEIGHT() / 2, ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].DIMENSION.WIDTH());

          if (ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].icon == true) {
            try {
              s.drawImage(window["image_system_" + ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].IAM], ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].POSITION.X() + ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].DIMENSION.WIDTH() - 30, ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].POSITION.Y() - 5, 30, 30);
            } catch (e) {
              /* Not nessesery */
            }
          }
        }

        s.restore();

        if (ROOT_GAME_OBJECT.WEBCAM != null) {//s.drawImage( , ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].POSITION.X() , ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].POSITION.Y() + ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].DIMENSION.HEIGHT()/2 , ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].DIMENSION.WIDTH());
        }
      }
    }
  };

  this.ON_UPDATE = function () {};

  this.ON_UPDATE_SYS = function () {};

  this.UPDATE = function () {
    if (this.AUTO_UPDATE == true) {
      ROOT_GAME_OBJECT.POSITION.UPDATE();
    }

    if (ROOT_GAME_OBJECT.EDITOR.ENABLE == false) {
      if (ROOT_GAME_OBJECT.DESTROY_AFTER != null) {
        if (ROOT_GAME_OBJECT.DESTROY_AFTER > 0) {
          ROOT_GAME_OBJECT.DESTROY_AFTER--;
        }
      }
    }

    if (ROOT_GAME_OBJECT.GROUP.GROUP.length > 0) {
      for (var s = 0; s < ROOT_GAME_OBJECT.GROUP.GROUP.length; s++) {
        window[ROOT_GAME_OBJECT.PROGRAM_NAME].ENGINE.MODULES.ACCESS(ROOT_GAME_OBJECT.PARENT).GAME_OBJECTS.ACCESS(ROOT_GAME_OBJECT.GROUP.GROUP[s]).POSITION.x = ROOT_GAME_OBJECT.POSITION.x - ROOT_GAME_OBJECT.GROUP.GROUP_INITIALS[s].x;
        window[ROOT_GAME_OBJECT.PROGRAM_NAME].ENGINE.MODULES.ACCESS(ROOT_GAME_OBJECT.PARENT).GAME_OBJECTS.ACCESS(ROOT_GAME_OBJECT.GROUP.GROUP[s]).POSITION.y = ROOT_GAME_OBJECT.POSITION.y - ROOT_GAME_OBJECT.GROUP.GROUP_INITIALS[s].y;
      }
    }

    if (ROOT_GAME_OBJECT.DESTROY_ON_GAMEMAP_EXIT == true && ROOT_GAME_OBJECT.POSITION.Y() < window[ROOT_GAME_OBJECT.PROGRAM_NAME].MAP.UP()) {
      //alert("DESTROYED " + ROOT_GAME_OBJECT.NAME)
      window[ROOT_GAME_OBJECT.PROGRAM_NAME].ENGINE.MODULES.ACCESS_MODULE(ROOT_GAME_OBJECT.PARENT).DESTROY_OBJECT(ROOT_GAME_OBJECT.NAME);
    }

    ROOT_GAME_OBJECT.ON_UPDATE();
    ROOT_GAME_OBJECT.ON_UPDATE_SYS();
  };

  this.GAME_OBJECT_READY = function () {
    _system.default.DEBUG.LOG("ready : " + ROOT_GAME_OBJECT.NAME);
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

},{"../draw_functions/rect":3,"../draw_functions/systems":4,"../math":10,"../system":15}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EVENTS = EVENTS;

var _manifest = _interopRequireDefault(require("../../manifest/manifest"));

var _system = _interopRequireDefault(require("../system"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function EVENTS(canvas, ROOT_ENGINE) {
  var ROOT_EVENTS = this;
  this.ROOT_ENGINE = ROOT_ENGINE; //Mobile device

  if (NOMOBILE == 0) {
    /**
     * Use for Mobile device.
     * @event touchstart
     */
    canvas.addEventListener("touchstart", function (e) {
      e.preventDefault();
      var touchList = e.changedTouches; //SYS.MOUSE.PRESS = true;

      _system.default.MOUSE.x = touchList[0].pageX;
      _system.default.MOUSE.y = touchList[0].pageY;
      ROOT_EVENTS.CALCULATE_TOUCH_OR_CLICK();
    }, false);
    /**
     * Use for Mobile device.
     * @event touchend
     */

    canvas.addEventListener("touchend", function (e) {
      e.preventDefault();
      var touchList = e.changedTouches;
      _system.default.MOUSE.PRESS = false;
      _system.default.MOUSE.x = touchList[0].pageX;
      _system.default.MOUSE.y = touchList[0].pageY;
      ROOT_EVENTS.CALCULATE_TOUCH_UP_OR_MOUSE_UP();
    }, false);
    /**
     * Use for Mobile device.
     * @event touchcancel
     */

    canvas.addEventListener("touchcancel", function (e) {
      e.preventDefault();
      var touchList = e.changedTouches;
      _system.default.MOUSE.PRESS = false;
      _system.default.MOUSE.x = touchList[0].pageX;
      _system.default.MOUSE.y = touchList[0].pageY;
      ROOT_EVENTS.CALCULATE_TOUCH_UP_OR_MOUSE_UP();
    }, false);
    /**
     * Use for Mobile device.
     * @event touchmove
     */

    canvas.addEventListener("touchmove", function (e) {
      e.preventDefault();
      var touchList = e.changedTouches; //SYS.MOUSE.PRESS = true;

      _system.default.MOUSE.x = touchList[0].pageX;
      _system.default.MOUSE.y = touchList[0].pageY;
      ROOT_EVENTS.CALCULATE_TOUCH_MOVE_OR_MOUSE_MOVE();
    }, false);
  } else {
    /**
     * Use for Desktop device.
     * @event click
     */
    canvas.addEventListener("click", function (e) {
      //SYS.MOUSE.PRESS = true;
      _system.default.MOUSE.x = e.layerX;
      _system.default.MOUSE.y = e.layerY;
      ROOT_EVENTS.CALCULATE_TOUCH_OR_CLICK(); //SYS.DEBUG.LOG("SYS : CLICK EVENT " + canvas);
    }, false);
    /**
     * Use for Desktop device.
     * @event mouseup
     */

    canvas.addEventListener("mouseup", function (e) {
      _system.default.MOUSE.PRESS = false;
      _system.default.MOUSE.BUTTON_PRESSED = null;
      _system.default.MOUSE.x = e.layerX;
      _system.default.MOUSE.y = e.layerY;
      ROOT_EVENTS.CALCULATE_TOUCH_UP_OR_MOUSE_UP();
    }, false);
    /**
     * Use for Desktop device.
     * @event onmousemove
     */

    canvas.onmousemove = function (e) {
      _system.default.MOUSE.x = e.layerX;
      _system.default.MOUSE.y = e.layerY;
      ROOT_EVENTS.CALCULATE_TOUCH_MOVE_OR_MOUSE_MOVE();
    };
    /**
     * Use for Desktop device.
     * @event onmousedown
     */


    canvas.onmousedown = function (e) {
      _system.default.MOUSE.PRESS = true;

      if (e.which == 3) {
        _system.default.MOUSE.BUTTON_PRESSED = "RIGHT";

        _system.default.MOUSE.ON_RIGHT_BTN_PRESSED();

        _system.default.DEBUG.LOG("Right button clicked");
      } else if (e.which == 2) {
        _system.default.MOUSE.BUTTON_PRESSED = "MID";

        _system.default.MOUSE.ON_MID_BTN_PRESSED();

        _system.default.DEBUG.LOG("Mid button clicked");
      } else if (e.which == 1) {
        _system.default.MOUSE.BUTTON_PRESSED = "LEFT";

        _system.default.MOUSE.ON_LEFT_BTN_PRESSED();

        _system.default.DEBUG.LOG("Left button clicked");
      }

      _system.default.MOUSE.x = e.layerX;
      _system.default.MOUSE.y = e.layerY;
      ROOT_EVENTS.CALCULATE_TOUCH_DOWN_OR_MOUSE_DOWN();
    }; //console.log("This is PC desktop device.");

  } //Calculate touch or click event


  this.CALCULATE_TOUCH_OR_CLICK = function () {
    for (var x = 0; x < this.ROOT_ENGINE.MODULES.length; x++) {
      for (var z = 0; z < ROOT_EVENTS.ROOT_ENGINE.MODULES[x].GAME_OBJECTS.length; z++) {
        var local_go = ROOT_EVENTS.ROOT_ENGINE.MODULES[x].GAME_OBJECTS[z];

        if (_system.default.MOUSE.x > local_go.POSITION.X() && _system.default.MOUSE.x < local_go.POSITION.X() + local_go.DIMENSION.WIDTH() && _system.default.MOUSE.y > local_go.POSITION.Y() && _system.default.MOUSE.y < local_go.POSITION.Y() + local_go.DIMENSION.HEIGHT()) {
          if (ROOT_EVENTS.ROOT_ENGINE.ENGINE_EDITOR == false && local_go.VISIBLE != false) {
            _system.default.DEBUG.LOG("SYS : touch or click event on game object : " + local_go.NAME);

            local_go.FOCUS = true;
            local_go.TAP();
          }
        }
      }
    }
  }; // CALCULATE MOUSE MOVE OR TOUCH MOVE


  this.CALCULATE_TOUCH_MOVE_OR_MOUSE_MOVE = function () {
    for (var x = 0; x < this.ROOT_ENGINE.MODULES.length; x++) {
      var first_pass = false;

      for (var z = 0; z < ROOT_EVENTS.ROOT_ENGINE.MODULES[x].GAME_OBJECTS.length; z++) {
        //-------------------------------//-------------------------------//-------------------------------
        var local_go = ROOT_EVENTS.ROOT_ENGINE.MODULES[x].GAME_OBJECTS[z];

        if (_system.default.MOUSE.x > local_go.POSITION.X() && _system.default.MOUSE.x < local_go.POSITION.X() + local_go.DIMENSION.WIDTH() && _system.default.MOUSE.y > local_go.POSITION.Y() && _system.default.MOUSE.y < local_go.POSITION.Y() + local_go.DIMENSION.HEIGHT()) {
          //SYS.DEBUG.LOG( "SYS : touchmove event on game object : " + local_go.NAME);
          // EVENT ONLY OUT OF EDITOR
          if (ROOT_EVENTS.ROOT_ENGINE.ENGINE_EDITOR == false && local_go.VISIBLE == true) {
            local_go.TOUCH_MOVE();

            if (_system.default.MOUSE.PRESS == true && local_go.DRAG == true && first_pass == false && local_go.DRAG_STATUS == true) {
              first_pass = true;
              local_go.DRAG_DELTA = local_go.DRAG_START_X;
              var local_ = CONVERTOR.PIX_TO_PER(parseFloat(local_go.DRAG_DELTA.toFixed(2)));
              local_go.POSITION.TRANSLATE_BY_X(parseFloat(CONVERTOR.PIX_TO_PER(_system.default.MOUSE.x).toFixed(2)) - Math.abs(local_));
              local_go.DRAG_DELTA = local_go.DRAG_START_Y;
              var local_ = CONVERTOR.PIY_TO_PER(parseFloat(local_go.DRAG_DELTA.toFixed(2)));
              local_go.POSITION.TRANSLATE_BY_Y(parseFloat(CONVERTOR.PIY_TO_PER(_system.default.MOUSE.y).toFixed(2)) - Math.abs(local_));
            }
          }
        } else {} //-------------------------------//-------------------------------//-------------------------------
        //-------------------------------//-------------------------------//-------------------------------
        //EDITOR
        //-------------------------------//-------------------------------//-------------------------------


        if (local_go.EDITOR.ENABLE == true) {
          //-------------------------------//-------------------------------//-------------------------------
          // DRAG in EDITOR
          //-------------------------------//-------------------------------//-------------------------------
          if (_system.default.MOUSE.PRESS == true && local_go.EDITOR.ACTOR_DRAG == true && first_pass == false) {
            first_pass = true;
            local_go.EDITOR.ACTOR_DELTA = local_go.EDITOR.ACTOR_START_X + local_go.EDITOR.ACTORS_AREA_HEIGHT;
            var local_ = CONVERTOR.PIX_TO_PER(parseFloat(local_go.EDITOR.ACTOR_DELTA.toFixed(2)));
            local_go.POSITION.TRANSLATE_BY_X(parseFloat(CONVERTOR.PIX_TO_PER(_system.default.MOUSE.x).toFixed(2)) - Math.abs(local_));
            local_go.EDITOR.ACTOR_DELTA = local_go.EDITOR.ACTOR_START_Y + local_go.EDITOR.ACTORS_AREA_HEIGHT;
            var local_ = CONVERTOR.PIY_TO_PER(parseFloat(local_go.EDITOR.ACTOR_DELTA.toFixed(2)));
            local_go.POSITION.TRANSLATE_BY_Y(parseFloat(CONVERTOR.PIY_TO_PER(_system.default.MOUSE.y).toFixed(2)) - Math.abs(local_));
          } //-------------------------------//-------------------------------//-------------------------------
          //-------------------------------//-------------------------------//-------------------------------
          //-------------------------------//-------------------------------//-------------------------------
          // OBJECT MOVE
          // ACTOR X


          if (local_go.EDITOR.ACTOR_X_IN_MOVE == true) {
            local_go.EDITOR.ACTOR_DELTA = local_go.EDITOR.ACTOR_START_X;
            var local_ = CONVERTOR.PIX_TO_PER(parseFloat(local_go.EDITOR.ACTOR_DELTA.toFixed(1)));
            local_go.POSITION.TRANSLATE_BY_X(parseFloat(CONVERTOR.PIX_TO_PER(_system.default.MOUSE.x).toFixed(1)) - Math.abs(local_));
          } // ACTOR Y


          if (local_go.EDITOR.ACTOR_Y_IN_MOVE == true) {
            local_go.EDITOR.ACTOR_DELTA = local_go.EDITOR.ACTOR_START_Y;
            var local_ = CONVERTOR.PIY_TO_PER(parseFloat(local_go.EDITOR.ACTOR_DELTA.toFixed(1)));
            local_go.POSITION.TRANSLATE_BY_Y(parseFloat(CONVERTOR.PIY_TO_PER(_system.default.MOUSE.y).toFixed(1)) - Math.abs(local_));
          } //-------------------------------//-------------------------------//-------------------------------
          //HOVER
          //-------------------------------//-------------------------------//-------------------------------


          if (_system.default.MOUSE.x > local_go.POSITION.X() + local_go.EDITOR.ACTORS_AREA_HEIGHT && _system.default.MOUSE.x < local_go.POSITION.X() + local_go.EDITOR.ACTORS_AREA_HEIGHT * 15 && _system.default.MOUSE.y > local_go.POSITION.Y() && _system.default.MOUSE.y < local_go.POSITION.Y() + local_go.EDITOR.ACTORS_AREA_HEIGHT) {
            local_go.EDITOR.ACTOR_BLUE_HOVER = true;
          } else {
            local_go.EDITOR.ACTOR_BLUE_HOVER = false;
          } //-------------------------------//-------------------------------//-------------------------------
          //-------------------------------//-------------------------------//-------------------------------


          if (_system.default.MOUSE.x > local_go.POSITION.X() && _system.default.MOUSE.x < local_go.POSITION.X() + local_go.EDITOR.ACTORS_AREA_HEIGHT && _system.default.MOUSE.y > local_go.POSITION.Y() + local_go.EDITOR.ACTORS_AREA_HEIGHT && _system.default.MOUSE.y < local_go.POSITION.Y() + local_go.EDITOR.ACTORS_AREA_HEIGHT * 15) {
            local_go.EDITOR.ACTOR_GREEN_HOVER = true; //SYS.DEBUG.LOG( "SYS : green Y-ACTOR event on game object : " + local_go.NAME);
          } else {
            local_go.EDITOR.ACTOR_GREEN_HOVER = false;
          } //-------------------------------//-------------------------------//-------------------------------
          //-------------------------------//-------------------------------//-------------------------------

        } // END OF EDITOR


        if (local_go.EDITOR.GAME_OBJECT_MENU.VISIBLE == true) {
          local_go.EDITOR.ACTOR_DRAG = false;

          for (var q = 0; q < local_go.EDITOR.BUTTONS.length; q++) {
            if (_system.default.MOUSE.x > local_go.EDITOR.BUTTONS[q].POSITION.x && _system.default.MOUSE.x < local_go.EDITOR.BUTTONS[q].POSITION.x + local_go.EDITOR.BUTTONS[q].DIMENSION.WIDTH() && _system.default.MOUSE.y > local_go.EDITOR.BUTTONS[q].POSITION.y + local_go.EDITOR.BUTTONS[q].Y_OFFSET && _system.default.MOUSE.y < local_go.EDITOR.BUTTONS[q].POSITION.y + local_go.EDITOR.BUTTONS[q].Y_OFFSET + local_go.EDITOR.BUTTONS[q].DIMENSION.HEIGHT()) {
              local_go.EDITOR.BUTTONS[q].HOVER = true;
            } else {
              local_go.EDITOR.BUTTONS[q].HOVER = false;
            }
          }
        } //-------------------------------//-------------------------------//-------------------------------

      }
    }

    if (ROOT_ENGINE.GUI.VISIBLE == true) {
      for (var x = 0; x < ROOT_ENGINE.GUI.BUTTONS.length; x++) {
        if (_system.default.MOUSE.x > ROOT_ENGINE.GUI.BUTTONS[x].POSITION.x && _system.default.MOUSE.x < ROOT_ENGINE.GUI.BUTTONS[x].POSITION.x + ROOT_ENGINE.GUI.BUTTONS[x].DIMENSION.WIDTH() && _system.default.MOUSE.y > ROOT_ENGINE.GUI.BUTTONS[x].POSITION.y + ROOT_ENGINE.GUI.BUTTONS[x].Y_OFFSET && _system.default.MOUSE.y < ROOT_ENGINE.GUI.BUTTONS[x].POSITION.y + ROOT_ENGINE.GUI.BUTTONS[x].Y_OFFSET + ROOT_ENGINE.GUI.BUTTONS[x].DIMENSION.HEIGHT()) {
          ROOT_ENGINE.GUI.BUTTONS[x].HOVER = true;
        } else {
          ROOT_ENGINE.GUI.BUTTONS[x].HOVER = false;
        }
      }
    } // LIST GUI SYSTEM EVENTS


    if (ROOT_ENGINE.GUI.VISIBLE == true) {
      for (var x = 0; x < ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES.length; x++) {
        if (_system.default.MOUSE.x > ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.x && _system.default.MOUSE.x < ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.x + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].DIMENSION.WIDTH() && _system.default.MOUSE.y > ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.y + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].Y_OFFSET && _system.default.MOUSE.y < ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.y + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].Y_OFFSET + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].DIMENSION.HEIGHT()) {
          ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].HOVER = true;
        } else {
          ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].HOVER = false;
        }
      } //BUTTONS_GAME_OBJECTS


      for (var x = 0; x < ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS.length; x++) {
        if (_system.default.MOUSE.x > ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.x && _system.default.MOUSE.x < ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.x + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].DIMENSION.WIDTH() && _system.default.MOUSE.y > ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.y + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].Y_OFFSET && _system.default.MOUSE.y < ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.y + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].Y_OFFSET + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].DIMENSION.HEIGHT()) {
          ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].HOVER = true;
        } else {
          ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].HOVER = false;
        }
      }
    } //

  }; // CALCULATE_TOUCH_UP_OR_MOUSE_UP


  this.CALCULATE_TOUCH_UP_OR_MOUSE_UP = function () {
    for (var x = 0; x < this.ROOT_ENGINE.MODULES.length; x++) {
      for (var z = 0; z < ROOT_EVENTS.ROOT_ENGINE.MODULES[x].GAME_OBJECTS.length; z++) {
        var local_go = ROOT_EVENTS.ROOT_ENGINE.MODULES[x].GAME_OBJECTS[z];
        local_go.EDITOR.ACTOR_X_IN_MOVE = false;
        local_go.EDITOR.ACTOR_Y_IN_MOVE = false; //-------------------------------//-------------------------------//-------------------------------
        // EDITOR
        //-------------------------------//-------------------------------//-------------------------------

        if (local_go.EDITOR.ENABLE == true) {
          local_go.EDITOR.ACTOR_DRAG = false; //-------------------------------//-------------------------------//-------------------------------
        } // end of EDITOR
        //-------------------------------//-------------------------------//-------------------------------
        // EVENT ONLY OUT OF EDITOR


        if (ROOT_EVENTS.ROOT_ENGINE.ENGINE_EDITOR == false) {
          if (_system.default.MOUSE.x > local_go.POSITION.X() && _system.default.MOUSE.x < local_go.POSITION.X() + local_go.DIMENSION.WIDTH() && _system.default.MOUSE.y > local_go.POSITION.Y() && _system.default.MOUSE.y < local_go.POSITION.Y() + local_go.DIMENSION.HEIGHT()) {
            if (local_go.VISIBLE == true) {
              local_go.TOUCH_UP();
              _system.default.DOM.E(_system.default.RUNNING_PROGRAMS[0]).style.cursor = "auto";
            }
          }
        }
      }
    }
  };

  this.CALCULATE_TOUCH_DOWN_OR_MOUSE_DOWN = function () {
    var selected_something = false;

    for (var x = 0; x < this.ROOT_ENGINE.MODULES.length; x++) {
      for (var z = 0; z < ROOT_EVENTS.ROOT_ENGINE.MODULES[x].GAME_OBJECTS.length; z++) {
        var local_go = ROOT_EVENTS.ROOT_ENGINE.MODULES[x].GAME_OBJECTS[z];

        if (_system.default.MOUSE.x > local_go.POSITION.X() && _system.default.MOUSE.x < local_go.POSITION.X() + local_go.DIMENSION.WIDTH() && _system.default.MOUSE.y > local_go.POSITION.Y() && _system.default.MOUSE.y < local_go.POSITION.Y() + local_go.DIMENSION.HEIGHT()) {
          local_go.EDITOR.SELECTED = true;
          selected_something = true;

          if (local_go.TYPE_OF_GAME_OBJECT == "TEXT_BOX" && local_go.TEXTBOX.EDIT == true && local_go.VISIBLE == true) {
            if (NOMOBILE == 1) {
              // for desktop mouse		HARD CODE 0/1
              if (_manifest.default.ACCESSIBILITY.VIRTUAL_KEYBOARD_FOR_DESKTOP == true) {
                ROOT_EVENTS.ROOT_ENGINE.KEYBOARD.TARGET_MODUL = local_go.PARENT;
                ROOT_EVENTS.ROOT_ENGINE.KEYBOARD.TARGET = local_go.NAME;
                SHOW_KEYBOARD(local_go.NAME);
              } else {
                //normal for desktop
                local_go.FOCUS = true;
                ROOT_EVENTS.ROOT_ENGINE.KEYBOARD.CAPTURE_CHAR = local_go.TEXTBOX.TEXT;
                ROOT_EVENTS.ROOT_ENGINE.KEYBOARD.TARGET_MODUL = local_go.PARENT;
                ROOT_EVENTS.ROOT_ENGINE.KEYBOARD.TARGET = local_go.NAME;
              }
            } else {
              // for mobile VirtualKeyboard
              ROOT_EVENTS.ROOT_ENGINE.KEYBOARD.TARGET_MODUL = local_go.PARENT;
              ROOT_EVENTS.ROOT_ENGINE.KEYBOARD.TARGET = local_go.NAME;
              SHOW_KEYBOARD(local_go.NAME);
            }
          } // EVENT ONLY OUT OF EDITOR


          if (ROOT_EVENTS.ROOT_ENGINE.ENGINE_EDITOR == false && local_go.VISIBLE == true) {
            local_go.FOCUS = true;
            local_go.TOUCH_DOWN();

            _system.default.DEBUG.LOG("SYS : touchDown or mouseDown event on game object : " + local_go.NAME); // if drag is enabled


            if (local_go.DRAG == true) {
              //$$$$$$$$
              //if (  SYS.MOUSE.x > local_go.POSITION.X()    && SYS.MOUSE.x < local_go.POSITION.X() +  local_go.DIMENSION.WIDTH()  && SYS.MOUSE.y > local_go.POSITION.Y()&&SYS.MOUSE.y < local_go.POSITION.Y() +    local_go.DIMENSION.HEIGHT()) {
              if (_system.default.MOUSE.BUTTON_PRESSED == "LEFT") {
                _system.default.DOM.E(local_go.PROGRAM_NAME).style.cursor = "MOVE";
                local_go.DRAG = true;
                local_go.DRAG_START_X = parseFloat(_system.default.MOUSE.x.toFixed(2) - local_go.POSITION.X());
                local_go.DRAG_START_Y = parseFloat(_system.default.MOUSE.y.toFixed(2) - local_go.POSITION.Y());
              } //	}
              //$$$$$$$$

            }
          }
        } else {
          local_go.FOCUS = false;
        } //-------------------------------//-------------------------------//-------------------------------
        // EDITOR
        //-------------------------------//-------------------------------//-------------------------------


        if (local_go.EDITOR.ENABLE == true) {
          //################
          if (local_go.EDITOR.GAME_OBJECT_MENU.VISIBLE == true) {
            local_go.EDITOR.ACTOR_DRAG = false;

            for (var q = 0; q < local_go.EDITOR.BUTTONS.length; q++) {
              if (_system.default.MOUSE.x > local_go.EDITOR.BUTTONS[q].POSITION.x && _system.default.MOUSE.x < local_go.EDITOR.BUTTONS[q].POSITION.x + local_go.EDITOR.BUTTONS[q].DIMENSION.WIDTH() && _system.default.MOUSE.y > local_go.EDITOR.BUTTONS[q].POSITION.y + local_go.EDITOR.BUTTONS[q].Y_OFFSET && _system.default.MOUSE.y < local_go.EDITOR.BUTTONS[q].POSITION.y + local_go.EDITOR.BUTTONS[q].Y_OFFSET + local_go.EDITOR.BUTTONS[q].DIMENSION.HEIGHT()) {
                //-----------------------------------------------------------------------------//-----------------------------------------------------------------------------
                if (local_go.EDITOR.BUTTONS[q].IAM == "1") {
                  // DESTROY OBJECT
                  ROOT_EVENTS.ROOT_ENGINE.MODULES[x].DESTROY_OBJECT(local_go.NAME); //DESTROY( name , canvas.id  , local_go.PARENT )

                  DESTROY(local_go.NAME);

                  _system.default.DEBUG.LOG("DESTROY_OBJECT");
                } //-----------------------------------------------------------------------------//-----------------------------------------------------------------------------
                else if (local_go.EDITOR.BUTTONS[q].IAM == "2") {
                  var local_res = prompt("Destroy game_object ( Time not count in editor ):", "10");

                  if (!isNaN(parseFloat(local_res.charAt(0)))) {
                    var _name = local_go.NAME;
                    local_go.DESTROY_ME_AFTER_X_SECUND(local_res, _name, x, ROOT_EVENTS);
                  } else {
                    alert("ERROR MSG: ADD_ANIMATION not success.");
                  }

                  _system.default.DEBUG.LOG("test2");
                } //-----------------------------------------------------------------------------//-----------------------------------------------------------------------------
                else if (local_go.EDITOR.BUTTONS[q].IAM == "3") {
                  var resource_list = "";

                  for (var key in RESOURCE) {
                    if (RESOURCE.hasOwnProperty(key) && key != "SUM") {
                      resource_list += "  " + key + ", ";
                    }
                  }

                  var local_res = prompt("Full list of images source : \n " + resource_list + "   \n \n Enter name of animation resource object :", "demo1");

                  if (isNaN(parseFloat(local_res.charAt(0)))) {
                    ADD_ANIMATION(local_go.NAME, local_go.PROGRAM_NAME, local_go.PARENT, local_res);
                  } else {
                    alert("ERROR MSG: ADD_ANIMATION not success.");
                  }

                  _system.default.DEBUG.LOG("add animation....");
                } //-----------------------------------------------------------------------------
                else if (local_go.EDITOR.BUTTONS[q].IAM == "4") {
                  if (local_go.COLLISION == null) {
                    ////////////////////////////
                    // ADD COLLIDER
                    ///////////////////////////
                    var local_res = prompt("Enter outline margin collider.", "1.02");

                    if (!isNaN(parseFloat(local_res.charAt(0)))) {
                      ADD_COLLISION(local_go.NAME, local_go.PROGRAM_NAME, local_go.PARENT, local_res);
                      local_go.EDITOR.BUTTONS[q].text = "Remove collision"; //local_go.REMOVE_COLLISION(local_go.NAME  , local_go.PROGRAM_NAME , local_go.PARENT);

                      _system.default.DEBUG.LOG("add collider");
                    } else {
                      alert("ERROR MSG: ADD_COLLISION not success.");
                    } //////////////////////////

                  } else if (local_go.EDITOR.BUTTONS[q].text == "Remove collision") {
                    REMOVE_COLLISION();
                    local_go.COLLISION = null;
                    local_go.EDITOR.BUTTONS[q].text = "Add collision";

                    _system.default.DEBUG.LOG("remove collider");
                  }
                } //-----------------------------------------------------------------------------
                else if (local_go.EDITOR.BUTTONS[q].IAM == "5") {
                  if (typeof PLAYER === "undefined") {
                    var local_res = prompt("Enter player type : ", "NORMAL");

                    if (isNaN(parseFloat(local_res.charAt(0)))) {
                      CREATE_PLAYER(local_go.NAME, local_go.PROGRAM_NAME, local_go.PARENT, local_res, q);
                      local_go.EDITOR.BUTTONS[q].text = "Deatach player";

                      _system.default.DEBUG.LOG("atach player");
                    }
                  } else if (typeof local_go.PLAYER != "undefined") {
                    DEATACH_PLAYER(local_go.NAME, local_go.PROGRAM_NAME, local_go.PARENT);
                    local_go.PLAYER = undefined;
                    PLAYER = undefined; //delete (local_go.PLAYER);
                    //delete (PLAYER);

                    local_go.EDITOR.BUTTONS[q].text = "Atach player";

                    _system.default.DEBUG.LOG("deatach player , also destroy PLAYER global object.");
                  }
                } //-----------------------------------------------------------------------------
                //-----------------------------------------------------------------------------
                else if (local_go.EDITOR.BUTTONS[q].IAM == "6") {
                  if (local_go.PARTICLE == null) {
                    var local_res = prompt("Enter particle type : ", "FONTAN");

                    if (isNaN(parseFloat(local_res.charAt(0)))) {
                      ADD_PARTICLE(local_go.NAME, local_go.PROGRAM_NAME, local_go.PARENT, local_res);
                      local_go.CREATE_PARTICLE(local_res);
                      local_go.EDITOR.BUTTONS[q].text = "Remove particle";

                      _system.default.DEBUG.LOG("atach player");
                    }
                  } else if (typeof local_go.PARTICLE != null) {
                    REMOVE_PARTICLE(local_go.NAME, local_go.PROGRAM_NAME, local_go.PARENT);
                    local_go.TYPE_OF_GAME_OBJECT = "empty";
                    delete local_go.PARTICLE;
                    local_go.PARTICLE = null;
                    local_go.EDITOR.BUTTONS[q].text = "Add particle";

                    _system.default.DEBUG.LOG("particle removed from " + local_go.NAME);
                  }
                } //-----------------------------------------------------------------------------
                //-----------------------------------------------------------------------------
                else if (local_go.EDITOR.BUTTONS[q].IAM == "7") {
                  if (local_go.TEXTBOX == null) {
                    var local_res = prompt("Enter text value : ", "HELLO");
                    var local_color = prompt("Enter color value : ", "red");
                    var local_textcolor = prompt("Enter Text color value : ", "black");
                    var local_radius = prompt("Enter rect radius  value : ", 15);
                    local_res = "" + local_res.toString();
                    ADD_TEXTBOX(local_go.NAME, local_go.PROGRAM_NAME, local_go.PARENT, local_res, local_radius, local_color, local_textcolor);
                    local_go.CREATE_TEXTBOX(local_res, local_radius, local_color, local_textcolor);
                    local_go.EDITOR.BUTTONS[q].text = "Remove textbox";

                    _system.default.DEBUG.LOG("atach textbox");
                  } else if (typeof local_go.TEXTBOX != null) {
                    REMOVE_TEXTBOX(local_go.NAME, local_go.PROGRAM_NAME, local_go.PARENT);
                    local_go.TYPE_OF_GAME_OBJECT = "empty";
                    delete local_go.TEXTBOX;
                    local_go.TEXTBOX = null;
                    local_go.EDITOR.BUTTONS[q].text = "Add textbox";

                    _system.default.DEBUG.LOG("textbox removed from " + local_go.NAME + " . And .TEXTBOX is :" + local_go.TEXTBOX);
                  }
                } //-----------------------------------------------------------------------------
                //-----------------------------------------------------------------------------
                else if (local_go.EDITOR.BUTTONS[q].IAM == "8") {
                  if (local_go.WEBCAM == null) {
                    var local_res = prompt("Choose NORMAL if you wanna simple webcam view or enter value 'NUI' for motion detect component + webcam view : ", "NORMAL");

                    if (local_res == "NORMAL") {
                      var local_type_of_dim = prompt("Just press enter to make video with the same dimensions like game_object , any other value set dimensions of webcam video. ", "GAME_OBJECT");

                      if (local_type_of_dim == "GAME_OBJECT") {
                        local_go.CREATE_WEBCAM(local_res, local_type_of_dim);
                        ADD_WEBCAM(local_go.NAME, local_go.PROGRAM_NAME, local_go.PARENT, local_res, local_type_of_dim);
                        local_go.EDITOR.BUTTONS[q].text = "Remove webcam";

                        _system.default.DEBUG.LOG("atach webcam");
                      } else {
                        // DIMENSIONS_TYPE = WEBCAM_DIMENSION
                        local_go.CREATE_WEBCAM(local_res, local_type_of_dim);
                        ADD_WEBCAM(local_go.NAME, local_go.PROGRAM_NAME, local_go.PARENT, local_res, "WEBCAM_DIMENSION");
                        local_go.EDITOR.BUTTONS[q].text = "Remove webcam";

                        _system.default.DEBUG.LOG("atach webcam");
                      }
                    } else if (local_res == "NUI") {
                      var local_type_of_dim = prompt("Just press enter to make video with the same dimensions like game_object , any other value set dimensions of webcam video. ", "GAME_OBJECT");
                      var detectPointByVer = prompt(" Sum of motion detect point for vertical line, 8 is optimal for max value and 1 is minimum . ", 6);
                      var detectPointByHor = prompt(" Sum of motion detect point for horizontal line, 8 is optimal for max value and 1 is minimum . ", 6);

                      if (!isNaN(detectPointByVer) && !isNaN(detectPointByHor) && isNaN(local_type_of_dim)) {
                        local_go.CREATE_WEBCAM(local_res, local_type_of_dim);
                        ADD_WEBCAM(local_go.NAME, local_go.PROGRAM_NAME, local_go.PARENT, local_res, local_type_of_dim, detectPointByVer, detectPointByHor);
                        local_go.EDITOR.BUTTONS[q].text = "Remove webcam";

                        _system.default.DEBUG.LOG("atach webcam");
                      } else {
                        _system.default.DEBUG.WARNING(" Error in CREATE_WEBCAM procedure Description : type of dimensions must be string , Sum of point must be number.");
                      }
                    }
                  } else {
                    local_go.DESTROY_WEBCAM();
                    REMOVE_WEBCAM(local_go.NAME, local_go.PROGRAM_NAME, local_go.PARENT);
                  }
                }
              } else {
                local_go.EDITOR.GAME_OBJECT_MENU.VISIBLE = false;
              }
            }
          }

          if (_system.default.MOUSE.x > local_go.EDITOR.ACTOR_DRAG_RECT_POS.X() + local_go.EDITOR.ACTORS_AREA_HEIGHT && _system.default.MOUSE.x < local_go.EDITOR.ACTOR_DRAG_RECT_POS.X() + local_go.EDITOR.ACTOR_DRAG_RECT_DIM.WIDTH() + local_go.EDITOR.ACTORS_AREA_HEIGHT && _system.default.MOUSE.y > local_go.EDITOR.ACTOR_DRAG_RECT_POS.Y() + local_go.EDITOR.ACTORS_AREA_HEIGHT && _system.default.MOUSE.y < local_go.EDITOR.ACTOR_DRAG_RECT_POS.Y() + local_go.EDITOR.ACTOR_DRAG_RECT_DIM.HEIGHT() + local_go.EDITOR.ACTORS_AREA_HEIGHT) {
            if (_system.default.MOUSE.BUTTON_PRESSED == "LEFT") {
              local_go.EDITOR.ACTOR_DRAG = true;
              local_go.EDITOR.ACTOR_START_X = parseFloat(_system.default.MOUSE.x.toFixed(2) - local_go.POSITION.X() - local_go.EDITOR.ACTORS_AREA_HEIGHT);
              local_go.EDITOR.ACTOR_START_Y = parseFloat(_system.default.MOUSE.y.toFixed(2) - local_go.POSITION.Y() - local_go.EDITOR.ACTORS_AREA_HEIGHT);
            } else if (_system.default.MOUSE.BUTTON_PRESSED == "RIGHT") {
              if (local_go.EDITOR.GAME_OBJECT_MENU.VISIBLE == false) {
                for (var w = 0; w < local_go.EDITOR.BUTTONS.length; w++) {
                  local_go.EDITOR.BUTTONS[w].POSITION.x = _system.default.MOUSE.x;
                  local_go.EDITOR.BUTTONS[w].POSITION.y = _system.default.MOUSE.y;
                }

                local_go.EDITOR.GAME_OBJECT_MENU.VISIBLE = true;
              }
            }
          } // HOVER  ACTORS


          if (local_go.EDITOR.ACTOR_BLUE_HOVER == true) {
            local_go.EDITOR.ACTOR_X_IN_MOVE = true;
            local_go.EDITOR.ACTOR_START_X = parseFloat(_system.default.MOUSE.x.toFixed(2) - local_go.POSITION.X());
          } else if (local_go.EDITOR.ACTOR_GREEN_HOVER == true) {
            local_go.EDITOR.ACTOR_Y_IN_MOVE = true;
            local_go.EDITOR.ACTOR_START_Y = parseFloat(_system.default.MOUSE.y.toFixed(2) - local_go.POSITION.Y());
          }

          if (selected_something == false) {
            local_go.DESELECT_ALL();
          }
        } // end of EDITOR


        if (selected_something == false && local_go.NAME.indexOf("___VIRTUALKEYBOARD") == -1) {
          ROOT_EVENTS.ROOT_ENGINE.KEYBOARD.TARGET_MODUL = undefined;
          ROOT_EVENTS.ROOT_ENGINE.KEYBOARD.TARGET = undefined;
        } // local_go

      }
    }

    if (ROOT_ENGINE.ENGINE_EDITOR == true) {
      if (ROOT_ENGINE.GUI.VISIBLE == false && selected_something == false && _system.default.MOUSE.BUTTON_PRESSED == "RIGHT") {
        for (var x = 0; x < ROOT_ENGINE.GUI.BUTTONS.length; x++) {
          ROOT_ENGINE.GUI.BUTTONS[x].POSITION.x = _system.default.MOUSE.x;
          ROOT_ENGINE.GUI.BUTTONS[x].POSITION.y = _system.default.MOUSE.y;
        }

        ROOT_ENGINE.GUI.VISIBLE = true;
      } else if (ROOT_ENGINE.GUI.VISIBLE == true) {
        for (var x = 0; x < ROOT_ENGINE.GUI.BUTTONS.length; x++) {
          if (_system.default.MOUSE.x > ROOT_ENGINE.GUI.BUTTONS[x].POSITION.x && _system.default.MOUSE.x < ROOT_ENGINE.GUI.BUTTONS[x].POSITION.x + ROOT_ENGINE.GUI.BUTTONS[x].DIMENSION.WIDTH() && _system.default.MOUSE.y > ROOT_ENGINE.GUI.BUTTONS[x].POSITION.y + ROOT_ENGINE.GUI.BUTTONS[x].Y_OFFSET && _system.default.MOUSE.y < ROOT_ENGINE.GUI.BUTTONS[x].POSITION.y + ROOT_ENGINE.GUI.BUTTONS[x].Y_OFFSET + ROOT_ENGINE.GUI.BUTTONS[x].DIMENSION.HEIGHT()) {
            if (ROOT_ENGINE.GUI.BUTTONS[x].IAM == "1") {
              // ADD NEW OBJECT
              var sign_name = prompt("Enter gameObject name :", "noname");

              if (isNaN(parseFloat(sign_name.charAt(0)))) {
                var sign_name2 = prompt("Enter gameObject parent modul :", "STARTER");

                if (isNaN(parseFloat(sign_name.charAt(0)))) {
                  ADD(sign_name, 45, 45, 10, 10, canvas.id, sign_name2);
                } else {
                  alert("ERROR MSG: GameObject name created not success.");
                }
              } else {
                alert("ERROR MSG: GameObject name created not success.");
              }
            } else if (ROOT_ENGINE.GUI.BUTTONS[x].IAM == "2") {
              for (var z = 0; z < _system.default.RUNNING_PROGRAMS.length; z++) {
                window[_system.default.RUNNING_PROGRAMS[z]].ENGINE.EXIT_EDIT_MODE();
              }
            } else if (ROOT_ENGINE.GUI.BUTTONS[x].IAM == "3") {
              //runtime only
              // change draw interval and update
              var sign_name = prompt("Enter   program DRAW_INTERVAL :", 15);

              if (!isNaN(parseFloat(sign_name))) {
                var sign_name2 = prompt("Enter  program UPDATE_INTERVAL :", 15);

                if (!isNaN(parseFloat(sign_name2))) {
                  _system.default.DEBUG.LOG("Program interval now is   " + sign_name + "  . best range is [1 , 70]  ");

                  window[ROOT_ENGINE.PROGRAM_ID].DRAW_INTERVAL = parseFloat(sign_name);
                  window[ROOT_ENGINE.PROGRAM_ID].UPDATE_INTERVAL = parseFloat(sign_name2);
                  SET_MAIN_INTERVAL(ROOT_ENGINE.PROGRAM_ID, sign_name, sign_name2);
                } else {
                  alert("ERROR MSG: Program interval not success changed.");
                }
              } else {
                alert("ERROR MSG: Program interval not success changed.");
              }
            } else if (ROOT_ENGINE.GUI.BUTTONS[x].IAM == "4") {
              if (_manifest.default.ACCOUNT_SERVICE_AUTO_RUN == true) {
                _manifest.default.ACCOUNT_SERVICE_AUTO_RUN = false;
                ROOT_ENGINE.GUI.BUTTONS[3].text = "Switch AutoConnect to true";
              } else {
                _manifest.default.ACCOUNT_SERVICE_AUTO_RUN = true;
                ROOT_ENGINE.GUI.BUTTONS[3].text = "Switch AutoConnectt to false";
              }

              SAVE("Application", _manifest.default);
            } else if (ROOT_ENGINE.GUI.BUTTONS[x].IAM == "5") {
              if (_manifest.default.EDITOR_AUTORUN == true) {
                _manifest.default.EDITOR_AUTORUN = false;
                ROOT_ENGINE.GUI.BUTTONS[4].text = "Switch editorAutoRun to true";
              } else {
                _manifest.default.EDITOR_AUTORUN = true;
                ROOT_ENGINE.GUI.BUTTONS[4].text = "Switch editorAutoRun to false";
              }

              SAVE("Application", _manifest.default);
            }
          }
        }

        ROOT_ENGINE.GUI.VISIBLE = false;
      }

      if (ROOT_ENGINE.GUI.LIST_OF_OBJECTS.VISIBLE == true) {
        for (var x = 0; x < ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES.length; x++) {
          if (_system.default.MOUSE.x > ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.x && _system.default.MOUSE.x < ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.x + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].DIMENSION.WIDTH() && _system.default.MOUSE.y > ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.y + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].Y_OFFSET && _system.default.MOUSE.y < ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.y + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].Y_OFFSET + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].DIMENSION.HEIGHT()) {
            ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].TAP();
          }
        } // GUI BUTTON LIST SYSTEM TAP EVENT


        for (var x = 0; x < ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS.length; x++) {
          if (_system.default.MOUSE.x > ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.x && _system.default.MOUSE.x < ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.x + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].DIMENSION.WIDTH() && _system.default.MOUSE.y > ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.y + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].Y_OFFSET && _system.default.MOUSE.y < ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.y + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].Y_OFFSET + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].DIMENSION.HEIGHT()) {
            ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].TAP();
          }
        }
      }
    }
  };
}

},{"../../manifest/manifest":16,"../system":15}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CONVERTOR = void 0;
exports.CREATE_IMG = CREATE_IMG;
exports.DEEP_COPY = void 0;
exports.DETECTBROWSER = DETECTBROWSER;
exports.DOM = DOM;
exports.GRADIENT = GRADIENT;
exports.LOAD = LOAD;
exports.LOG = LOG;
exports.LS_GET = LS_GET;
exports.LS_SET = LS_SET;
exports.MONITOR = MONITOR;
exports.OVERRIDE_TO_REF_CANVAS = OVERRIDE_TO_REF_CANVAS;
exports.PAGE = void 0;
exports.SAVE = SAVE;
exports.SCRIPT = void 0;
exports.SET_STREAM = SET_STREAM;
exports.SOUND = SOUND;
exports.TRACK_NOW = TRACK_NOW;
exports.VIEW = void 0;
exports.drawRotatedImage = drawRotatedImage;
exports.drawRotatedText = drawRotatedText;
exports.drawRotatedTextNoSkrech = drawRotatedTextNoSkrech;
exports.initialize = initialize;
exports.lineLength = void 0;
exports.readXML = readXML;
exports.removeItem = removeItem;
exports.remove_last = remove_last;
exports.roundedRect = roundedRect;
exports.test_webcam_device = test_webcam_device;
exports.validateEmail = validateEmail;
exports.xmlToJson = xmlToJson;

var _system = _interopRequireDefault(require("./system"));

var _program = _interopRequireDefault(require("./program"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This class will detect you device and browser and
 * store data. Instance already stored intro SYS.BROWSER
 * global object.
 * Access trow SYS.BROWSER
 *
 * @example var Browser = new DETECTBROWSER();
 * @class DETECTBROWSER
 * @constructor
 * @return {nothing}
 *
 */
function DETECTBROWSER() {
  var HREFF,
      HREFTXT = "unknown";
  this.NAVIGATOR = navigator.userAgent;
  var NAV = navigator.userAgent;
  var gecko, navIpad, operatablet, navIphone, navFirefox, navChrome, navOpera, navSafari, navandroid, mobile, navMozilla, navUbuntu, navLinux;
  navLinux = NAV.match(/Linux/gi);
  navUbuntu = NAV.match(/Ubuntu/gi);
  gecko = NAV.match(/gecko/gi);
  navOpera = NAV.match(/Opera|OPR\//) ? true : false;
  operatablet = NAV.match(/Tablet/gi);
  navIpad = NAV.match(/ipad/gi);
  navIphone = NAV.match(/iphone/gi);
  navFirefox = NAV.match(/Firefox/gi);
  navMozilla = NAV.match(/mozilla/gi);
  navChrome = NAV.match(/Chrome/gi);
  navSafari = NAV.match(/safari/gi);
  navandroid = NAV.match(/android/gi);
  mobile = NAV.match(/mobile/gi);
  window["TYPEOFANDROID"] = 0;
  window["NOMOBILE"] = 0;
  var mobile = /iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase());

  if (mobile) {
    var userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.search("android") > -1 && userAgent.search("mobile") > -1) {
      console.log("ANDROID MOBILE");
    } else if (userAgent.search("android") > -1 && !(userAgent.search("mobile") > -1)) {
      console.log(" ANDROID TABLET ");
      TYPEOFANDROID = 1;
    }
  } else {
    NOMOBILE = 1;
  } //  FIREFOX za android


  if (navFirefox && navandroid && TYPEOFANDROID == 0) {
    HREFF = "#";
    HREFTXT = "mobile_firefox_android";
  } //  FIREFOX za android T


  if (navFirefox && navandroid && TYPEOFANDROID == 1) {
    HREFF = "#";
    HREFTXT = "mobile_firefox_android_tablet";
  } // OPERA ZA ANDROID


  if (navOpera && navandroid) {
    HREFF = "#";
    HREFTXT = "opera_mobile_android";
  } // provera
  // OPERA ZA ANDROID TABLET


  if (navOpera && navandroid && operatablet) {
    HREFF = "#";
    HREFTXT = "opera_mobile_android_tablet";
  } // provera
  //  safari mobile za IPHONE - i  safari mobile za IPAD i CHROME za IPAD


  if (navSafari) {
    var Iphonesafari = NAV.match(/iphone/gi);

    if (Iphonesafari) {
      HREFF = "#";
      HREFTXT = "safari_mobile_iphone";
    } else if (navIpad) {
      HREFF = "#";
      HREFTXT = "mobile_safari_chrome_ipad";
    } else if (navandroid) {
      HREFF = "#";
      HREFTXT = "android_native";
    }
  } // TEST CHROME


  if (navChrome && navSafari && navMozilla && TYPEOFANDROID == 1) {
    HREFF = "#";
    HREFTXT = "mobile_chrome_android_tablet";
  }

  if (navChrome && navSafari && navMozilla && TYPEOFANDROID == 0) {
    HREFF = "#";
    HREFTXT = "mobile_chrome_android";
  }

  if (navChrome && TYPEOFANDROID == 0) {
    HREFF = "#";
    HREFTXT = "chrome_browser";
  }

  if (navMozilla && NOMOBILE == 1 && gecko && navFirefox) {
    HREFF = "#";
    HREFTXT = "firefox_desktop";
  }

  if (navOpera && TYPEOFANDROID == 0 && !mobile) {
    HREFF = "#";
    HREFTXT = "opera_desktop";
  } //linux


  if (navUbuntu && navMozilla && navFirefox && navLinux) {
    HREFF = "#";
    HREFTXT = "firefox_desktop_linux";
  }

  if (navMozilla && navLinux && navChrome && navSafari) {
    HREFF = "#";
    HREFTXT = "chrome_desktop_linux";
  }

  if (navMozilla && navLinux && navChrome && navSafari && navOpera) {
    HREFF = "#";
    HREFTXT = "opera_desktop_linux";
  }
  /**
   * Template for this view's container...
   * NOMOBILE = 1 means desktop platform
   * @example This is ENUMERATORS for property NAME :
   * "mobile_firefox_android"
   * "mobile_firefox_android_tablet"
   * "opera_mobile_android"
   * "opera_mobile_android_tablet"
   * "safari_mobile_iphone"
   * "mobile_safari_chrome_ipad"
   * "android_native"
   * "mobile_chrome_android_tablet"
   * "mobile_chrome_android"
   * "chrome_browser"
   * "firefox_desktop"
   * "opera_desktop"
   * "firefox_desktop_linux"
   * "chrome_desktop_linux"
   * "opera_desktop_linux" .
   * @property NAME
   * @type {String}
   * @default "unknown"
   */


  this.NAME = HREFTXT;
  /**
   * NOMOBILE = 1 Means desktop platform (Any win , mac or linux etc..)
   * NOMOBILE = 2 Means mobile platform (iOS , android etc.)
   * @property NOMOBILE
   * @type Number
   * @default "unknown"
   */

  this.NOMOBILE = NOMOBILE;
}
/**
 * LOG is class but we use single instance.
 * Access point  : SYS.DEBUG
 * @example new LOG()  Usage : SYS.DEBUG.LOG("Hello")
 * @class LOG
 * @constructor
 * @return nothing
 */


function LOG() {
  /** We can disable logs any time
   * @prop ENABLE {Boolean} Logs work with true , log disabled with false.
   * @type {Boolean}
   */
  this.ENABLE = true;
  /**
   * LOG is class but we use single instance.
   * @Alias LOG#LOG
   * @Class LOG
   * @Method LOG
   * @param {Any} Data Just log anything like console.log dones. Usage : SYS.DEBUG.LOG("Hello")
   * @return {Any} printing console.log
   */

  this.LOG = function (data) {
    if (this.ENABLE == true) {
      console.log("%c" + data, "background: #333; color: lime");
    }
  };
  /**
   * LOG is class but we use single instance.
   * @description Access point : SYS.DEBUG.WARNING
   * @alias LOG#WARNING
   * @param {Any} Data Just log anything like console.log dones. Usage : SYS.DEBUG.WARNING("Hello maybe something wrong!")
   * @return {Any} printing console.warn
   */


  this.WARNING = function (data) {
    if (this.ENABLE == true) {
      console.warn("%c Warning : " + data, "background: #333; color: yellow");
    }
  };
  /**
   * LOG is class but we use single instance.
   * @alias LOG#CRITICAL
   * @param {Any} Data Just log anything like console.log dones. Usage : SYS.DEBUG.CRITICAL("Hello maybe something wrong!")
   * @return {Any} printing console.log
   */


  this.CRITICAL = function (data) {
    if (this.ENABLE == true) {
      console.warn("%c Critical : " + data, "background: #333; color: red");
    }
  };
  /**
   * LOG is class but we use single instance.
   * @alias LOG#NETWORK_LOG
   * @param {Any} Data Just log anything like console.log dones. Usage : SYS.DEBUG.NETWORK_LOG("Hello networking!")
   * @return {Any} printing console.log
   */


  this.NETWORK_LOG = function (data) {
    if (this.ENABLE == true) {
      console.log("%c Network view : " + data, "background: #333; color: #a7afaf");
    }
  };
}
/**
 * DOM is class but we used princip one single instance.
 * Instance already created and stored intro
 * SYS.DOM object.
 * @example new DOM()  Usage : SYS.DOM
 * @class DOM
 * @constructor
 * @return {Any} nothing
 */


function DOM() {
  /**
   * Returns dom html element object
   *
   * @alias DOM#E
   * @param {String} Id Id of html element.
   * @return {HtmlObject} point to html element.
   */
  this.E = function (id) {
    return document.getElementById(id);
  };
  /**
   * Returns dom iframe html document object
   *
   * @alias DOM#ACCESS_IFRAME
   * @param {String} Id Id of html iframe element.
   * @return {Object} point to iframe document object.
   */


  this.ACCESS_IFRAME = function (name) {
    return document.getElementById(name).contentWindow;
  };
  /**
   * GOTO is navigate to new url address
   * Work on all modern browsers.
   * @alias DOM#GOTO
   * @param {String} Url_ Url_ of new html page.
   * @return nothing
   */


  this.GOTO = function (url_) {
    location.assign(url_);
  };
  /**
   * UPLOAD_FILE - Runtime creating input element with type "file"
   * @alias DOM#UPLOAD_FILE
   * @param {String} Id_ Id for input type=file element
   * @param {method} Atach event
   * @return {Object} point to iframe document object.
   */


  this.UPLOAD_FILE = function (id_, onchange) {
    var x = document.createElement("INPUT");
    x.setAttribute("type", "file");
    x.setAttribute("id", id_);
    x.setAttribute("style", "display:block;");
    document.getElementById("UPLOAD_BOX").appendChild(x);
    window["FILE_" + id_] = document.getElementById(id_);

    window["FILE_" + id_].onchange = function () {
      _system.default.DEBUG.LOG("New file comes...");
    };

    if (typeof onchange !== "undefined") {
      window["FILE_" + id_].onchange = onchange;
    } //document.body.appendChild(x);

  };
  /**
   * CREATE_SURFACE - Canvas2d staff
   * @alias DOM#CREATE_SURFACE
   * @param {canvas2dContext} ctx
   * @param {String} Name_of_canvas Id of canvas element.
   * @param {number} w Value for width (percent or pixel depens on resizeType)
   * @param {number} h Value for width (percent or pixel depens on resizeType)
   * @param {String} resizeType
   * @return nothing
   */


  this.CREATE_SURFACE = function (ctx, name_of_canvas, w, h, resizeType) {
    this.c = document.getElementById(name_of_canvas);

    if (typeof resizeType === "undefined" || resizeType == "DIAMETRIC") {
      /**
       * RESIZE_TYPE
       *
       * @property {String} RESIZE_TYPE
       * @default {string} "DIAMETRIC"
       */
      this.RESIZE_TYPE = "DIAMETRIC";
      this.W_PIX = w;
      this.H_PIX = h;
      this.c.width = CONVERTOR.PER_TO_PIX(this.W_PIX);
      this.c.height = CONVERTOR.PER_TO_PIY(this.H_PIX);
    } else if (resizeType == "FIXED") {
      this.RESIZE_TYPE = "FIXED";
    } else {
      this.RESIZE_TYPE = "DIAMETRIC";
    }

    window[ctx] = this.c.getContext("2d");

    _system.default.DEBUG.LOG("SYS : Surface created , program name is " + name_of_canvas);

    _system.default.RUNNING_PROGRAMS.push(name_of_canvas);

    window[name_of_canvas] = new _program.default(window[ctx], this.c);
    window[name_of_canvas].DRAW();
  };
  /**
   *  Destroy DOM element.
   * @alias DOM#removeElement
   * @param {HtmlObject} ParentDiv ParentDiv
   * @param {HtmlObject} ChildDiv ChildDiv for destroying
   * @return {Any} false - if removing faild.
   */


  this.removeElement = function (parentDiv, childDiv) {
    if (typeof childDiv == "undefined") {
      console.log("remove now");
      document.body.removeChild(parentDiv);
    } else if (document.getElementById(childDiv)) {
      var child = document.getElementById(childDiv);
      var parent = document.getElementById(parentDiv);
      parent.removeChild(child);
      parent.style.zIndex = 0;
      parent.style.display = "none";
    } else {
      return false;
    }
  };
  /**
   *  Destroy DOM element.
   * @alias DOM#DESTROY_PROGRAM
   * @param {string} Name Name of program (alias name of canvas element)
   * @return {Any} false -if faild
   */


  this.DESTROY_PROGRAM = function (name) {
    if (typeof name === "undefined") {
      _system.default.DEBUG.WARNING("SYS : warning for procedure 'SYS.DOM.DESTROY_PROGRAM'  Desciption : arrg name :>> " + typeof name + " << not valid.");
    } else if (typeof window[name] === "undefined") {
      _system.default.DEBUG.WARNING("SYS : warning for procedure 'SYS.DOM.DESTROY_PROGRAM'  Desciption : program with  name: " + name + " not exist. ");
    } else {
      //memory
      window[name].DRAW = function () {};

      window[name].UPDATE = function () {};

      window[name].DRAW_INTERVAL = undefined;
      window[name].UPDATE_INTERVAL = undefined;
      window[name].AUTO_UPDATE = [];
      window[name].AUTO_UPDATE = undefined;
      window[name] = undefined;
      delete window[name]; //remove dom element canvas
      //this.removeElement(SYS.DOM.E(name));

      _system.default.RUNNING_PROGRAMS.unset(name);

      _system.default.DEBUG.LOG("SYS : log for procedure 'SYS.DOM.DESTROY_PROGRAM'  Desciption : program with  name :" + name + " is dead. Memory clear .");
    }
  };

  this.LANCH_FULLSCREEN = function (element) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  };
  /**
   * Exit from fullScreen regime.
   * @alias DOM#EXIT_FULLSCREEN
   * @return nothing
   */


  this.EXIT_FULLSCREEN = function () {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  };

  this.FS_FLAG = 0;
  /**
   * Go to fullscreen
   * @alias DOM#FULL_SCREEN
   * @return nothing
   */

  this.FULL_SCREEN = function () {
    if (this.FS_FLAG == 0) {
      this.LANCH_FULLSCREEN(document.documentElement);
      this.FS_FLAG = 1;
    } else if (this.FS_FLAG == 1) {
      this.EXIT_FULLSCREEN();
      this.FS_FLAG = 0;
    }
  };
}
/**
 * Test webcam device is global method.
 * @function test_webcam_device
 * @return {boolean} True Means webcam operartion supported.
 */


function test_webcam_device() {
  function hasGetUserMedia() {
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
  }

  if (hasGetUserMedia()) {
    console.log("webcam operartion support");
    return true;
  } else {
    console.log("webcam operartion faild");
    return false;
  }
}
/**
 * Set Stream
 * @function SET_STREAM will activate webcam , getUserMedia inside.
 * @return {boolean} True Means webcam operartion supported.
 * @access global SET_STREAM
 */


function SET_STREAM(video) {
  /**
   * webcamError webcamError
   * @private
   * @memberof SET_STREAM method
   */
  var webcamError = function (e) {
    alert("Webcam error!", e);
  };

  if (navigator.webkitGetUserMedia) {
    navigator.webkitGetUserMedia({
      audio: true,
      video: true
    }, function (stream) {
      video.srcObject = stream; //video.src = window.URL.createObjectURL(stream);
      // initialize();
    }, webcamError);
  } else if (navigator.getUserMedia) {
    navigator.getUserMedia({
      audio: true,
      video: true
    }, function (stream) {
      //video.src = stream;
      video.src = window.URL.createObjectURL(stream); //initialize();
    }, webcamError);
  } else {
    alert("webcam broken.");
  }
}
/**
 * Cheking AudioContext browser support.
 * @function initialize
 * @access global initialize
 */


function initialize() {
  if (!AudioContext) {
    alert("AudioContext not supported!");
  } else {
    loadSounds();
  }
}

var lineLength = function (x, y, x0, y0) {
  return Math.sqrt((x -= x0) * x + (y -= y0) * y);
};

exports.lineLength = lineLength;
var PAGE = {
  SET_ICON: function (SRC) {
    var link = document.createElement("link");
    link.type = "image/x-icon";
    link.rel = "shortcut icon"; //SRC
    //link.href = 'http://www.stackoverflow.com/favicon.ico';

    link.href = "favicon.png";
    document.getElementsByTagName("head")[0].appendChild(link);
  },
  ANIMATE_ICON: null,
  ANIMATE: function () {//this.ANIMATE_ICON = setInterval(function(){
    //},200);
  }
};
/**
 * LOCAL STORAGE OPERATION
 * LS_SET is LocalStorage function.
 * @example Usage : LS_SET("MyObjectKey", myObject )
 * @function LS_SET
 * @param {String} Name Name of localstorage key
 * @param {Any} Value Any object we can store.
 * @return nothing
 */

exports.PAGE = PAGE;

function LS_SET(name, value) {
  localStorage.setItem(name, value);
}
/**
 * LS_GET is LocalStorage function
 * @example Usage : LS_GET("MyObjectKey", myObject )
 * @function LS_GET
 * @param {String} Name Name of localstorage key
 * @return {Any} What ever we are stored intro localStorage.
 */


function LS_GET(name) {
  return localStorage.getItem(name);
}
/**
 * SAVE  Put the object into storage.
 * @example Usage : SAVE("MyObjectKey", myObject )
 * @function SAVE
 * @param {String} Name Name of localstorage key
 * @param {Any} Value Any object we can store.
 * @return {Any} What ever we are stored intro localStorage.
 */


function SAVE(name, obj) {
  localStorage.setItem(name, JSON.stringify(obj));
  console.log(JSON.stringify(obj));
}
/**
 * LOAD  Load a object from storage. Retrieve the object from storage
 * @example Usage : LOAD("MyObjectKey")
 * @function LOAD
 * @param {String} Name Name of localstorage key
 * @return {Any} What ever we are stored intro localStorage.
 */


function LOAD(name) {
  if (localStorage.getItem(name) == "undefined" || localStorage.getItem(name) == null || localStorage.getItem(name) == "") {
    _system.default.DEBUG.WARNING("error in loading localstorage object! name of object : name" + name + " , but value is " + localStorage.getItem(name));

    return false;
  } else {
    return JSON.parse(localStorage.getItem(name));
  }
}
/**
 * FILES OPERATION
 * @example Usage : readXML("MyObjectKey")
 * @function readXML
 * @param {String} Path Path url to the source file.
 * @param {String} Operation operation is flag. He can be undefined or can be literal string "CONVER_TO_OBJ" (We got xml data but we want to convert it to the json object direct) .
 * @return {Any} responseText from Xmlrequest or Object
 */


function readXML(path, operation) {
  var ROOT = this;

  if (window.XMLHttpRequest) {
    ROOT.xmlhttpGA = new XMLHttpRequest();
  }

  ROOT.xmlhttpGA.open("GET", path, true);
  ROOT.xmlhttpGA.send();

  ROOT.DONE = function () {
    return ROOT.RESPONSE;
  };

  ROOT.RESPONSE = "";

  ROOT.xmlhttpGA.onreadystatechange = function () {
    if (this.readyState !== 4) return;
    if (this.status !== 200) return; // or whatever error handling you want

    if (typeof operation === "undefined") {
      ROOT.RESPONSE = this.responseText;
      ROOT.DONE();
    } else if (operation == "CONVER_TO_OBJ") {
      return xmlToJson(this.responseXML);
    } else {
      ROOT.DONE();
      ROOT.RESPONSE = this.responseText;
    }
  };
}

function xmlToJson(xml) {
  // Create the return object
  var obj = {};

  if (xml.nodeType == 1) {
    // element
    // do attributes
    if (xml.attributes.length > 0) {
      obj["@attributes"] = {};

      for (var j = 0; j < xml.attributes.length; j++) {
        var attribute = xml.attributes.item(j);
        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xml.nodeType == 3) {
    // text
    obj = xml.nodeValue;
  } // do children


  if (xml.hasChildNodes()) {
    for (var i = 0; i < xml.childNodes.length; i++) {
      var item = xml.childNodes.item(i);
      var nodeName = item.nodeName;

      if (typeof obj[nodeName] == "undefined") {
        obj[nodeName] = xmlToJson(item);
      } else {
        if (typeof obj[nodeName].push == "undefined") {
          var old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }

        obj[nodeName].push(xmlToJson(item));
      }
    }
  }

  var private_call = JSON.stringify(obj);
  private_call.replace("#text", "text"); // Fix literal # symbol

  return JSON.parse(private_call);
} // MONITOR AND BROWSER_VIEW- COORDINATE SYSTEM


function MONITOR() {}
/**
 * VIEW
 * @example Usage : VIEW.W(50)
 * @Object VIEW
 */


var VIEW = {
  /**
   * VIEW Object
   * @example Usage : VIEW.W(50)
   * @memberof VIEW
   * @param {Number} Represent percent of body width - window.innerWidth
   * @return {Number} Value in pixels
   */
  W: function (per) {
    if (typeof per === "undefined") {
      return window.innerWidth;
    } else {
      return window.innerWidth / 100 * per;
    }
  },

  /**
   * VIEW Object
   * @example Usage : VIEW.H(50)
   * @alias VIEW#H
   * @param {Number} Represent percent of body height - window.innerHeight
   * @return {Number} Value in pixels
   */
  H: function (per) {
    if (typeof per === "undefined") {
      return window.innerHeight;
    } else {
      return window.innerHeight / 100 * per;
    }
  },

  /**
   * VIEW Object ASPECT
   * @example Usage : VIEW.ASPECT()
   * @alias VIEW#ASPECT
   * @return {Number} Value in aspectRatio for current window (body).
   */
  ASPECT: function () {
    return window.innerWidth / window.innerHeight;
  }
};
/**
 * OVERRIDE_TO_REF_CANVAS
 * Future feature related function!
 * @example Usage : OVERRIDE_TO_REF_CANVAS()
 * @function OVERRIDE_TO_REF_CANVAS
 * @return nothing
 */

exports.VIEW = VIEW;

function OVERRIDE_TO_REF_CANVAS() {
  exports.VIEW = VIEW = {
    W: function (per) {
      if (typeof per === "undefined") {
        return _system.default.DOM.E(_system.default.RUNNING_PROGRAMS[0]).width;
      } else {
        return _system.default.DOM.E(_system.default.RUNNING_PROGRAMS[0]).width / 100 * per;
      }
    },
    H: function (per) {
      if (typeof per === "undefined") {
        return _system.default.DOM.E(_system.default.RUNNING_PROGRAMS[0]).height;
      } else {
        return _system.default.DOM.E(_system.default.RUNNING_PROGRAMS[0]).height / 100 * per;
      }
    },
    ASPECT: function () {
      return _system.default.DOM.E(_system.default.RUNNING_PROGRAMS[0]).width / _system.default.DOM.E(_system.default.RUNNING_PROGRAMS[0]).height;
    }
  }; // override CONVERTOR

  exports.CONVERTOR = CONVERTOR = {
    PER_TO_PIX: function (v) {
      var ONE_PERCENT = _system.default.DOM.E(_system.default.RUNNING_PROGRAMS[0]).width / 100;
      return v * ONE_PERCENT;
    },
    PIX_TO_PER: function (v) {
      var ONE_PERCENT = _system.default.DOM.E(_system.default.RUNNING_PROGRAMS[0]).width / 100;
      return v / ONE_PERCENT;
    },
    PER_TO_PIY: function (v) {
      var ONE_PERCENT = _system.default.DOM.E(_system.default.RUNNING_PROGRAMS[0]).height / 100;
      return v * ONE_PERCENT;
    },
    PIY_TO_PER: function (v) {
      var ONE_PERCENT = _system.default.DOM.E(_system.default.RUNNING_PROGRAMS[0]).height / 100;
      return v / ONE_PERCENT;
    }
  };
} // Array works , remove all array items with same values


function removeItem(arr) {
  var what,
      a = arguments,
      L = a.length,
      ax;

  while (L > 1 && arr.length) {
    what = a[--L];

    while ((ax = arr.indexOf(what)) != -1) {
      arr.splice(ax, 1);
    }
  }

  return arr;
} // removeA(arrayNAME,'-delete-all-value-');

/**
 * CONVERTOR
 * percents to pixel convert by Width reference
 * @example Usage : CONVERTOR.PER_TO_PIX(10)
 * @function CONVERTOR.PER_TO_PIX
 * @param {Number} V V is number of percents.
 * @return {Number} Value represent number of pixels.
 */


var CONVERTOR = {
  PER_TO_PIX: function (v) {
    var ONE_PERCENT = window.innerWidth / 100;
    return v * ONE_PERCENT;
  },

  /**
   * CONVERTOR
   * pixel to percents convert by Width reference
   * @example Usage : CONVERTOR.PIX_TO_PER(10)
   * @function CONVERTOR.PIX_TO_PER
   * @param {Number} V V is number of pixel
   * @return {Number} Value represent number of percents.
   */
  PIX_TO_PER: function (v) {
    var ONE_PERCENT = window.innerWidth / 100;
    return v / ONE_PERCENT;
  },

  /**
   * CONVERTOR
   * percents to pixel convert by Height reference
   * @example Usage : CONVERTOR.PER_TO_PIY(10)
   * @function CONVERTOR.PER_TO_PIY
   * @param {Number} V V is number of pixel
   * @return {Number} Value represent number of percents.
   */
  PER_TO_PIY: function (v) {
    var ONE_PERCENT = window.innerHeight / 100;
    return v * ONE_PERCENT;
  },

  /**
   * CONVERTOR
   * pixel to percents convert by Height reference
   * @example Usage : CONVERTOR.PIX_TO_PER(10)
   * @function CONVERTOR.PIX_TO_PER
   * @param {Number} V V is number of pixel
   * @return {Number} Value represent number of percents.
   */
  PIY_TO_PER: function (v) {
    var ONE_PERCENT = window.innerHeight / 100;
    return v / ONE_PERCENT;
  }
}; //###############################################//###############################################
//Move to modify proto file

exports.CONVERTOR = CONVERTOR;

function remove_last(str) {
  return str.slice(0, -1);
}

var DEEP_COPY = {
  //public method
  getCloneOfObject: function (oldObject) {
    var tempClone = {};
    if (typeof oldObject == "object") // for array use private method getCloneOfArray
      for (prop in oldObject) if (typeof oldObject[prop] == "object" && oldObject[prop].__isArray) tempClone[prop] = this.getCloneOfArray(oldObject[prop]); // for object make recursive call to getCloneOfObject
      else if (typeof oldObject[prop] == "object") tempClone[prop] = this.getCloneOfObject(oldObject[prop]); // normal (non-object type) members
      else tempClone[prop] = oldObject[prop];
    return tempClone;
  },
  getCloneOfArray: function (oldArray) {
    var tempClone = [];

    for (var arrIndex = 0; arrIndex <= oldArray.length; arrIndex++) if (typeof oldArray[arrIndex] == "object") tempClone.push(this.getCloneOfObject(oldArray[arrIndex]));else tempClone.push(oldArray[arrIndex]);

    return tempClone;
  }
};
exports.DEEP_COPY = DEEP_COPY;

function SOUND(duration, fref) {
  var audio = new window.AudioContext();
  var osc = audio.createOscillator();
  osc.frequency.value = fref;
  osc.connect(audio.destination);
  osc.start(0);
  setTimeout(function () {
    osc.stop();
    audio.close();
    audio = null;
    osc = null; ///delete osc;
    //delete audio;
  }, duration);
}

var RESOURCE = new Object();
RESOURCE.SUM = 0;

function drawRotatedImage(image, x, y, angle, w, h, surf) {
  surf.save();
  surf.translate(x + w / 2, y + h / 2);
  surf.rotate(angle);

  if (typeof image !== "undefined") {
    surf.drawImage(image, -(w / 2), -(h / 2), w, h);
  }

  surf.restore();
}

function drawRotatedText(s, text, x, y, angle, w, h) {
  SURF.save();
  SURF.rotate(_system.default.MATH.TO_RADIANS(angle));
  SURF.fillText(text, x + w / 2, y + h / 2, w);
  SURF.restore();
}

function drawRotatedTextNoSkrech(s, text, x, y, angle, w, h) {
  SURF.save();
  SURF.rotate(_system.default.MATH.TO_RADIANS(angle));
  SURF.fillText(text, x + w / 2, y + h / 2);
  SURF.restore();
}

function roundedRect(SURF, t, x, y, width, height, radius, color, type, strokeColor) {
  SURF.save();

  if (type == "stroke") {
    SURF.strokeStyle = strokeColor;
  } else {
    SURF.fillStyle = color;
  }

  SURF.beginPath();
  SURF.moveTo(x, y + radius);
  SURF.lineTo(x, y + height - radius);
  SURF.quadraticCurveTo(x, y + height, x + radius, y + height);
  SURF.lineTo(x + width - radius, y + height);
  SURF.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
  SURF.lineTo(x + width, y + radius);
  SURF.quadraticCurveTo(x + width, y, x + width - radius, y);
  SURF.lineTo(x + radius, y);
  SURF.quadraticCurveTo(x, y, x, y + radius);

  if (type == "stroke") {
    SURF.stroke();
  } else {
    SURF.fill();
  }

  SURF.restore();
}

window.oncontextmenu = function () {
  return false; // hardcode!
}; // Performance off cpu


var cpu_canvas_power = {
  CPU_SPEED: 0,
  array_of_res: [],
  end_count: 0,
  count_frames: 0,
  begin: null,
  getSec: function () {
    cpu_canvas_power.begin = new Date().getSeconds();
  },
  checkForCount: function () {
    if (cpu_canvas_power.begin == null) {
      cpu_canvas_power.getSec();
    } else if (cpu_canvas_power.begin == new Date().getSeconds() && cpu_canvas_power.end_count == 0) {
      console.log("cpu...");
    } else if (cpu_canvas_power.begin + 1 == new Date().getSeconds() && cpu_canvas_power.end_count < 2) {
      cpu_canvas_power.count_frames++;

      if (cpu_canvas_power.end_count == 0) {
        cpu_canvas_power.end_count++;
      }
    } else {
      if (cpu_canvas_power.array_of_res.length < 5) {
        if (cpu_canvas_power.count_frames != 0) {
          cpu_canvas_power.array_of_res.push(cpu_canvas_power.count_frames);
        }

        cpu_canvas_power.count_frames = 0;
        cpu_canvas_power.end_count = 0;
        cpu_canvas_power.begin = null;
      } else {
        var sum = 0;

        for (var i = 0; i < cpu_canvas_power.array_of_res.length; i++) {
          sum += parseInt(cpu_canvas_power.array_of_res[i]);
        }

        cpu_canvas_power.CPU_SPEED = sum / cpu_canvas_power.array_of_res.length;
        console.log("cpu SPEED : " + cpu_canvas_power.CPU_SPEED);
      }
    }
  }
}; // tracking

function TRACK_NOW() {
  var video = document.getElementById("video");
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  var tracker = new tracking.ObjectTracker("face");
  tracker.setInitialScale(4);
  tracker.setStepSize(2);
  tracker.setEdgesDensity(0.1);
  tracking.track("#video", tracker, {
    camera: true
  });
  tracker.on("track", function (event) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    event.data.forEach(function (rect) {
      context.strokeStyle = "#a64ceb";
      context.strokeRect(rect.x, rect.y, rect.width, rect.height);
      context.font = "11px Helvetica";
      context.fillStyle = "#fff";
      context.fillText("x: " + rect.x + "px", rect.x + rect.width + 5, rect.y + 11);
      context.fillText("y: " + rect.y + "px", rect.x + rect.width + 5, rect.y + 22);
    });
  });
} // class GRADIENT


function GRADIENT(color1, color2) {
  var ROOT = this;
  ROOT.grd = SURF.createLinearGradient(0, 0, 170, 0);
  ROOT.grd.addColorStop(0, color1);
  ROOT.grd.addColorStop(1, color2);
}
/**
 * Creating Image objects.
 * @function CREATE_IMG
 * @param name
 * @param src
 * @return nothing
 */


function CREATE_IMG(name, src) {
  window["image_" + name] = new Image();
  window["image_" + name].src = src;

  window["image_" + name].onload = function () {
    _system.default.RES.SUM_OF_LOADED_IMAGES++;
  };
}
/**
 * Loading JS scripts in runtime.
 * @function SCRIPT.LOAD
 * @param name
 * @param src
 */


var SCRIPT = {
  SCRIPT_ID: 0,
  SINHRO_LOAD: {},
  LOAD: function addScript(src) {
    var s = document.createElement("script");

    s.onload = function () {
      SCRIPT.SCRIPT_ID++;
      console.log("Script id loaded : " + SCRIPT.SCRIPT_ID + " with src : " + this.src + ">>>>>>>>>" + this.src);
      var filename = this.src.substring(this.src.lastIndexOf("/") + 1, this.src.lastIndexOf(".")); //console.log(filename)

      filename = filename.replace(".", "_");
      eval("try{SCRIPT.SINHRO_LOAD._" + filename + "(s)}catch(e){}");
    };

    s.setAttribute("src", src);
    document.body.appendChild(s);
  }
};
/**
 * Validate string for email address.
 * validateEmail is global access method.
 * @example validateEmail("zlatnaspirala@gmail") will return false ,
 * validateEmail("zlatnaspirala@gmail.com") return true
 * @function validateEmail Global method ,  pseudo
 * @param {String} email Email for checking.
 * @return {boolean} True : Email is valid , False email is invalid.
 */

exports.SCRIPT = SCRIPT;

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

},{"./program":12,"./system":15}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DIMENSION = DIMENSION;
exports.INCREMENTATOR = INCREMENTATOR;
exports.ORBIT = ORBIT;
exports.OSCILLATOR = OSCILLATOR;
exports.POSITION = POSITION;
exports.isOdd = exports.isEven = void 0;
exports.randomIntFromTo = randomIntFromTo;
exports.round = round;
exports.toDegrees = toDegrees;
exports.toRadians = toRadians;

var _system = _interopRequireDefault(require("./system"));

var _manifest = _interopRequireDefault(require("../manifest/manifest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Simple number round.
 * @function round
 * @param {number} value
 * @param {number} decimals
 * @return {number} Number
 */
function round(value, decimals) {
  if (typeof value === "object" || typeof decimals === "object") {
    _system.default.DEBUG.WARNING("SYS : warning for procedure 'SYS.MATH.NUMBER_ROUND'  Desciption : Replace object with string ,  this >> " + typeof value + " << must be string or number.");
  } else if (typeof value === "undefined" || typeof decimals === "undefined") {
    _system.default.DEBUG.WARNING("SYS : warning for procedure 'SYS.MATH.NUMBER_ROUND'  Desciption : arguments (value, decimals) cant be undefined ,  this >> " + typeof value + " << must be string or number.");
  } else {
    return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
  }
}

function randomIntFromTo(min, max) {
  if (typeof min === "object" || typeof max === "object") {
    _system.default.DEBUG.WARNING("SYS : warning for procedure 'SYS.MATH.RANDOM_INT_FROM_TO'  Desciption : Replace object with string ,  this >> " + typeof min + " and " + typeof min + " << must be string or number.");
  } else if (typeof min === "undefined" || typeof max === "undefined") {
    _system.default.DEBUG.WARNING("SYS : warning for procedure 'SYS.MATH.RANDOM_INT_FROM_TO'  Desciption : arguments (min, max) cant be undefined ,  this >> " + typeof min + " and " + typeof min + "  << must be string or number.");
  } else {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
} // Convert toDegrees/toRadians


function toDegrees(angle) {
  if (typeof angle === "string" || typeof angle === "number") {
    return angle * (180 / Math.PI);
  } else {
    _system.default.DEBUG.WARNING("SYS : warning for procedure 'SYS.MATH.TO_RADIANS'  Desciption : Input arr ,  angle >> " + typeof angle + "  << must be string or number.");
  }
}

function toRadians(angle) {
  if (typeof angle === "string" || typeof angle === "number") {
    return angle * (Math.PI / 180);
  } else {
    _system.default.DEBUG.WARNING("SYS : warning for procedure 'SYS.MATH.TO_RADIANS'  Desciption : Input arr ,  angle >> " + typeof angle + "  << must be string or number.");
  }
}

var isOdd = function (x) {
  return x & 1;
};

exports.isOdd = isOdd;

var isEven = function (x) {
  return !(x & 1);
};

exports.isEven = isEven;

function ORBIT(cx, cy, angle, p) {
  var s = Math.sin(angle);
  var c = Math.cos(angle); // translate point back to origin:

  p.x -= cx;
  p.y -= cy; // rotate point

  xnew = p.x * c - p.y * s;
  ynew = p.x * s + p.y * c; // translate point back:

  p.x = xnew + cx;
  p.y = ynew + cy;
  return p;
} //GET PULSE VALUES IN REAL TIME


function OSCILLATOR(min, max, step) {
  if ((typeof min === "string" || typeof min === "number") && (typeof max === "string" || typeof max === "number") && (typeof step === "string" || typeof step === "number")) {
    var ROOT = this;
    this.min = parseFloat(min);
    this.max = parseFloat(max);
    this.step = parseFloat(step);
    this.value_ = parseFloat(min);
    this.status = 0;

    this.on_maximum_value = function () {};

    this.on_minimum_value = function () {};

    this.UPDATE = function (STATUS_) {
      if (STATUS_ === undefined) {
        if (this.status == 0 && this.value_ < this.max) {
          this.value_ = this.value_ + this.step;

          if (this.value_ >= this.max) {
            this.value_ = this.max;
            this.status = 1;
            ROOT.on_maximum_value();
          }

          return this.value_;
        } else if (this.status == 1 && this.value_ > this.min) {
          this.value_ = this.value_ - this.step;

          if (this.value_ <= this.min) {
            this.value_ = this.min;
            this.status = 0;
            ROOT.on_minimum_value();
          }

          return this.value_;
        }
      } else {
        return this.value_;
      }
    };
  } else {
    _system.default.DEBUG.WARNING("SYS : warning for procedure 'SYS.MATH.OSCILLATOR'  Desciption : Replace object with string or number,  min >> " + typeof min + " and max >>" + typeof max + "  and step >>" + typeof step + " << must be string or number.");
  } //AUTO UPDATE HERE

} // GET INCREMENT VALUES IN REAL TIME


function INCREMENTATOR(min, max, step, stop_after) {
  if ((typeof min === "string" || typeof min === "number") && (typeof max === "string" || typeof max === "number") && (typeof step === "string" || typeof step === "number")) {
    if (typeof stop_after != "undefined") {
      this.stop_after = stop_after;
    } else {
      this.stop_after = 1;
    }

    this.loops = 0;
    this.min = parseFloat(min);
    this.max = parseFloat(max);
    this.step = parseFloat(step);
    this.value_ = parseFloat(min);
    this.status = 0;

    this.UPDATE = function (STATUS_) {
      if (STATUS_ === undefined) {
        if (this.status == 0 && this.value_ < this.max) {
          this.value_ = this.value_ + this.step;

          if (this.value_ >= this.max) {
            this.value_ = this.min;

            if (this.loops == this.stop_after) {
              this.status = 1;
            }
          }

          return this.value_;
        } else {
          return this.value_;
        }
      }
    }; //AUTO UPDATE HERE

  } else {
    _system.default.DEBUG.WARNING("SYS : warning for procedure 'SYS.MATH.OSCILLATOR'  Desciption : Replace object with string or number,  min >> " + typeof min + " and max >>" + typeof max + "  and step >>" + typeof step + " << must be string or number.");
  }
} // MAKE MOVE WITH NEW TARGET COORDINATE


function DIMENSION(w, h, type_) {
  var ROOT_DIMENSION = this;

  if (typeof type_ == "undefined") {
    this.type = "REF_CANVAS";
  } else {
    this.type = type_;
  }

  if (typeof w === undefined) {
    this.W = 10;

    _system.default.DEBUG.WARNING("SYS : warning for procedure new 'DIMENSION'  Desciption : arguments (w , h ) are  undefined ,  system will setup 10% of width and height.");
  } else {
    this.W = w;
  }

  if (typeof h === undefined) {
    this.H = 10;

    _system.default.DEBUG.WARNING("SYS : warning for procedure new 'DIMENSION'  Desciption : arguments (w , h ) are  undefined ,  system will setup 10% of width and height.");
  } else {
    this.H = h;
  }

  this.WIDTH = function () {
    if (ROOT_DIMENSION.type == "NORMAL") {
      return window.innerWidth / 100 * this.W;
    } else if (ROOT_DIMENSION.type == "REF_CANVAS") {
      return _system.default.DOM.E(_system.default.RUNNING_PROGRAMS[0]).width / 100 * this.W;
    }
  };

  this.HEIGHT = function () {
    if (ROOT_DIMENSION.type == "NORMAL") {
      return window.innerHeight / 100 * this.H;
    } else if (ROOT_DIMENSION.type == "REF_CANVAS") {
      return _system.default.DOM.E(_system.default.RUNNING_PROGRAMS[0]).height / 100 * this.H;
    }
  };
}

function POSITION(curentX, curentY, targetX_, targetY_, thrust_) {
  var ROOT = this;
  this.FREEZ = false;
  ROOT.CANVAS_ = window[_system.default.RUNNING_PROGRAMS[0]].ENGINE.PROGRAM_ID;

  this.ON_TARGET_POSITION = function () {}; //parameters


  this.x = curentX;
  this.y = curentY;
  this.targetX = targetX_;
  this.targetY = targetY_;
  this.velX = 0;
  this.velY = 0;
  this.thrust = thrust_;

  if (_manifest.default.PROGRAM.CALCULATING_POSITION_BY == "MONITOR") {
    this.TYPE = "NORMAL";
  } else if (_manifest.default.PROGRAM.CALCULATING_POSITION_BY == "CANVAS") {
    this.TYPE = "REF_CANVAS";
  }

  this.IN_MOVE = true; //metods

  this.SET_SPEED = function (num_) {
    if (typeof num_ === "number") {
      this.thrust = num_;
    } else {
      _system.default.DEBUG.WARNING("SYS : warning for method 'POSITION.SET_SPEED'  Desciption : arguments (w , h ) must be type of number.");
    }
  };

  this.TRANSLATE_BY_X = function (x_) {
    this.IN_MOVE = true;
    this.targetX = x_;
  };

  this.TRANSLATE_BY_Y = function (y_) {
    this.IN_MOVE = true;
    this.targetY = y_;
  };

  this.TRANSLATE = function (x_, y_) {
    this.IN_MOVE = true;
    this.targetX = x_;
    this.targetY = y_;
  };

  this.SET_POSITION = function (x_, y_, type_) {
    if (type_ == "DIAMETRIC") {
      this.targetX = x_;
      this.targetY = y_;
      this.x = x_;
      this.y = y_;
      this.IN_MOVE = false;
    } else {
      this.targetX = CONVERTOR.PIX_TO_PER(x_);
      this.targetY = CONVERTOR.PIX_TO_PER(y_);
      this.x = CONVERTOR.PIY_TO_PER(x_);
      this.y = CONVERTOR.PIY_TO_PER(y_);
      this.IN_MOVE = false;
    }
  };

  this.UPDATE = function () {
    if (window[ROOT.PROGRAM_NAME].ENGINE.GAME_TYPE == "PLATFORMER" && typeof ROOT.PLAYER === "undefined" && typeof window["PLAYER"] !== "undefined" && PLAYER.FREEZ == false) {
      this.thrust = 2;
      this.IN_MOVE = true;
      this.targetX = this.targetX + PLAYER.X;
      this.targetY = this.targetY + PLAYER.Y;
    } else {
      try {//	 this.IN_MOVE = false;
      } catch (e) {
        console.log(e);
      }
    }

    var tx = this.targetX - this.x,
        ty = this.targetY - this.y,
        dist = Math.sqrt(tx * tx + ty * ty),
        rad = Math.atan2(ty, tx),
        angle = rad / Math.PI * 180;
    this.velX = tx / dist * this.thrust;
    this.velY = ty / dist * this.thrust; // stop the box if its too close so it doesn't just rotate and bounce

    if (this.IN_MOVE == true) {
      if (dist > this.thrust) {
        this.x += this.velX;
        this.y += this.velY;

        if (ROOT.SHARE_POSITION == true) {
          MAIN_PEER.REMOTE_DATA.NEW_POSITION(window[this.parentGameObject]);
        }
      } else {
        this.x = this.targetX;
        this.y = this.targetY;
        this.IN_MOVE = false;
        ROOT.ON_TARGET_POSITION();

        if (ROOT.SHARE_POSITION == true) {
          MAIN_PEER.REMOTE_DATA.NEW_POSITION(window[this.parentGameObject]);
        }

        try {
          if (window[ROOT.PROGRAM_NAME].ENGINE.GAME_TYPE != "PLATFORMER" && _manifest.default.EDITOR == true) {
            SET_NEW_START_UP_POS(this.parentGameObject, this.PROGRAM_NAME, this.parentModul, this.targetX, this.targetY, this.DIMENSION.W, this.DIMENSION.H);
          }
        } catch (e) {
          console.log(e + ":::in:::SET_NEW_START_UP_POS");
        }
      }
    }
  };

  this.X = function () {
    if (ROOT.TYPE == "NORMAL") {
      return window.innerWidth / 100 * this.x;
    } else if (ROOT.TYPE == "REF_CANVAS") {
      return _system.default.DOM.E(ROOT.CANVAS_).width / 100 * this.x;
    }
  };

  this.Y = function () {
    if (window[ROOT.PROGRAM_NAME].ENGINE.GAME_TYPE == "PLATFORMER" && typeof ROOT.PLAYER === "undefined") {
      return window.innerHeight / 100 * this.y;
    } else {
      if (ROOT.TYPE == "NORMAL") {
        return window.innerHeight / 100 * this.y;
      } else if (ROOT.TYPE == "REF_CANVAS") {
        return _system.default.DOM.E(ROOT.CANVAS_).height / 100 * this.y;
      }
    }
  };
}

},{"../manifest/manifest":16,"./system":15}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MODUL = MODUL;

var _game_object = require("../game_object/game_object");

/**
 * @example Use MODUL class on begin of program with
 * @example HELLO_WORLD.ENGINE.CREATE_MODUL("STARTER");
 * @Class MODUL
 * @constructor
 * @param {String} Name name is passed value for modul name.
 * @param {String} Name name is passed value for modul name.
 */
function MODUL(name, PROGRAM_NAME) {
  var ROOT_MODUL = this; //ENGINE WILL BE BIG SWITCHER

  this.PARENT = PROGRAM_NAME;
  this.NAME = name;
  this.GAME_OBJECTS = new Array();

  this.NEW_OBJECT = function (name__, x, y, w, h, speed) {
    ROOT_MODUL.GAME_OBJECTS.push(new _game_object.GAME_OBJECT(name__, ROOT_MODUL.NAME, x, y, w, h, speed, ROOT_MODUL.PARENT));
  }; // Netwotk object


  this.NEW_NETWORK_OBJECT = function (object_) {
    ROOT_MODUL.GAME_OBJECTS.push(new _game_object.GAME_OBJECT(object_.NAME, ROOT_MODUL.NAME, object_.POSITION.x, object_.POSITION.y, object_.DIMENSION.W, object_.DIMENSION.H, object_.POSITION.thrust, ROOT_MODUL.PARENT));

    if (object_.TYPE_OF_GAME_OBJECT.indexOf("ANIMATION") != -1) {
      window[object_.NAME].CREATE_ANIMATION(SURF, object_.ANIMATION.TYPE, 0, RESOURCE.Tiles, 123423444, "no", 1, 11, 1, 1, 1);
    }
  };

  this.NEW_NETWORK_POSITION = function (object_) {
    if (typeof object_.nameOfObject !== "undefined") {
      window[object_.nameOfObject].POSITION.SET_POSITION(object_.x, object_.y, "DIAMETRIC");
    }
  };

  this.NEW_NETWORK_DIMENSION = function (object_) {
    if (typeof object_.nameOfObject !== "undefined") {
      window[object_.nameOfObject].DIMENSION.W = object_.W;
      window[object_.nameOfObject].DIMENSION.H = object_.H;
    }
  };

  this.DESTROY_OBJECT = function (name__) {
    ROOT_MODUL.GAME_OBJECTS.forEach(function (item, index, object) {
      if (item.NAME == name__) {
        if (index > -1) {
          ROOT_MODUL.GAME_OBJECTS.splice(index, 1);
          delete window[name__];
        }

        console.log("OBJ DELETED:" + ROOT_MODUL.GAME_OBJECTS.indexOf(name__) + "  ACCESS GLOBAL  : " + window["name__"]);
      }
    });
  };

  this.DRAW_GAME_OBJECTS = function (s) {
    for (var x = 0; x < ROOT_MODUL.GAME_OBJECTS.length; x++) {
      ROOT_MODUL.GAME_OBJECTS[x].DRAW(s);

      if (ROOT_MODUL.GAME_OBJECTS[x].EDITOR.ENABLE == true) {
        ROOT_MODUL.GAME_OBJECTS[x].DRAW_ACTOR(s);
      }
    }
  };

  ROOT_MODUL.BREAK_AT_MOMENT = false;

  this.UPDATE_GAME_OBJECTS = function () {
    for (var x = 0; x < ROOT_MODUL.GAME_OBJECTS.length; x++) {
      if (ROOT_MODUL.BREAK_AT_MOMENT == true) {
        ROOT_MODUL.BREAK_AT_MOMENT = false;
        console.log("BREAK");
        break;
      }

      if (ROOT_MODUL.GAME_OBJECTS[x].COLLISION != null) {
        for (var z = 0; z < ROOT_MODUL.GAME_OBJECTS.length; z++) {
          // FOR PLAYER EXIST REGIME
          if (ROOT_MODUL.GAME_OBJECTS[z].COLLISION != null && ROOT_MODUL.GAME_OBJECTS[z].NAME != ROOT_MODUL.GAME_OBJECTS[x].NAME && typeof PLAYER != "undefined" && window[ROOT_MODUL.PARENT].ENGINE.GAME_TYPE == "PLATFORMER") {
            if (typeof PLAYER != "undefined") {
              //&&   ROOT_MODUL.GAME_OBJECTS[z].PLAYER.TYPE == "PLATFORMER"
              //Y by H
              if (ROOT_MODUL.GAME_OBJECTS[z].POSITION.Y() + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.HEIGHT() > ROOT_MODUL.GAME_OBJECTS[x].POSITION.Y() && ROOT_MODUL.GAME_OBJECTS[z].POSITION.Y() < ROOT_MODUL.GAME_OBJECTS[x].POSITION.Y() + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.HEIGHT()) {
                if (ROOT_MODUL.GAME_OBJECTS[z].POSITION.X() + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.WIDTH() > ROOT_MODUL.GAME_OBJECTS[x].POSITION.X() - 2 && ROOT_MODUL.GAME_OBJECTS[z].POSITION.X() + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.WIDTH() < ROOT_MODUL.GAME_OBJECTS[x].POSITION.X() + ROOT_MODUL.GAME_OBJECTS[x].POSITION.thrust * 12) {
                  if (ROOT_MODUL.GAME_OBJECTS[z].POSITION.STATIC == false && ROOT_MODUL.GAME_OBJECTS[z].POSITION.IN_MOVE == true) {
                    SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + "COLLIDE right1 WITH:" + ROOT_MODUL.GAME_OBJECTS[x].NAME);
                    ROOT_MODUL.GAME_OBJECTS[z].POSITION.x = ROOT_MODUL.GAME_OBJECTS[x].POSITION.x - ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.W * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                    ROOT_MODUL.GAME_OBJECTS[z].POSITION.targetX = ROOT_MODUL.GAME_OBJECTS[x].POSITION.x - ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.W * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                  } else {
                    if (typeof ROOT_MODUL.GAME_OBJECTS[z].PLAYER != "undefined" && ROOT_MODUL.GAME_OBJECTS[z].PLAYER.TYPE == "PLATFORMER" && ROOT_MODUL.GAME_OBJECTS[x].POSITION.STATIC == false) {
                      SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + "COLLIDE rigth2 WITH:" + ROOT_MODUL.GAME_OBJECTS[x].NAME);
                      ROOT_MODUL.GAME_OBJECTS[x].POSITION.x = ROOT_MODUL.GAME_OBJECTS[z].POSITION.x + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.W * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                      ROOT_MODUL.GAME_OBJECTS[x].POSITION.targetX = ROOT_MODUL.GAME_OBJECTS[z].POSITION.x + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.W * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                    }
                  }

                  ROOT_MODUL.GAME_OBJECTS[x].ON_COLLISION(ROOT_MODUL.GAME_OBJECTS[z].NAME);
                } else if (ROOT_MODUL.GAME_OBJECTS[z].POSITION.X() < ROOT_MODUL.GAME_OBJECTS[x].POSITION.X() + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.WIDTH() + 2 && ROOT_MODUL.GAME_OBJECTS[z].POSITION.X() > ROOT_MODUL.GAME_OBJECTS[x].POSITION.X() + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.WIDTH() - ROOT_MODUL.GAME_OBJECTS[x].POSITION.thrust * 12) {
                  if (ROOT_MODUL.GAME_OBJECTS[z].POSITION.STATIC == false && ROOT_MODUL.GAME_OBJECTS[z].POSITION.IN_MOVE == true) {
                    SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + "COLLIDE left1 WITH:" + ROOT_MODUL.GAME_OBJECTS[x].NAME);
                    ROOT_MODUL.GAME_OBJECTS[z].POSITION.x = ROOT_MODUL.GAME_OBJECTS[x].POSITION.x + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.W * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                    ROOT_MODUL.GAME_OBJECTS[z].POSITION.targetX = ROOT_MODUL.GAME_OBJECTS[x].POSITION.x + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.W * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                  } else {
                    if (typeof ROOT_MODUL.GAME_OBJECTS[z].PLAYER != "undefined" && ROOT_MODUL.GAME_OBJECTS[z].PLAYER.TYPE == "PLATFORMER" && ROOT_MODUL.GAME_OBJECTS[x].POSITION.STATIC == false) {
                      SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + "COLLIDE left2 WITH:" + ROOT_MODUL.GAME_OBJECTS[x].NAME);
                      ROOT_MODUL.GAME_OBJECTS[x].POSITION.x = ROOT_MODUL.GAME_OBJECTS[z].POSITION.x - ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.W * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                      ROOT_MODUL.GAME_OBJECTS[x].POSITION.targetX = ROOT_MODUL.GAME_OBJECTS[z].POSITION.x - ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.W * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                    }
                  }
                }

                ROOT_MODUL.GAME_OBJECTS[x].ON_COLLISION(ROOT_MODUL.GAME_OBJECTS[z].NAME);
              } //


              if (ROOT_MODUL.GAME_OBJECTS[z].POSITION.X() + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.WIDTH() > ROOT_MODUL.GAME_OBJECTS[x].POSITION.X() + ROOT_MODUL.GAME_OBJECTS[x].POSITION.thrust * 12 && ROOT_MODUL.GAME_OBJECTS[z].POSITION.X() < ROOT_MODUL.GAME_OBJECTS[x].POSITION.X() + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.WIDTH() - ROOT_MODUL.GAME_OBJECTS[x].POSITION.thrust * 12) {
                if (ROOT_MODUL.GAME_OBJECTS[z].POSITION.Y() + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.HEIGHT() > ROOT_MODUL.GAME_OBJECTS[x].POSITION.Y() && ROOT_MODUL.GAME_OBJECTS[z].POSITION.Y() + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.HEIGHT() < ROOT_MODUL.GAME_OBJECTS[x].POSITION.Y() + ROOT_MODUL.GAME_OBJECTS[x].POSITION.thrust * 12) {
                  if (ROOT_MODUL.GAME_OBJECTS[z].POSITION.STATIC == false && ROOT_MODUL.GAME_OBJECTS[z].POSITION.IN_MOVE == true) {
                    //$$$$$$$$$$$$$$
                    if (typeof ROOT_MODUL.GAME_OBJECTS[z].PLAYER != "undefined" && ROOT_MODUL.GAME_OBJECTS[z].PLAYER.TYPE == "PLATFORMER") {
                      SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + "COLLIDE TOP1 WITH:" + ROOT_MODUL.GAME_OBJECTS[x].NAME);
                      ROOT_MODUL.GAME_OBJECTS[z].POSITION.y = ROOT_MODUL.GAME_OBJECTS[x].POSITION.y - ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                      ROOT_MODUL.GAME_OBJECTS[z].POSITION.targetY = ROOT_MODUL.GAME_OBJECTS[x].POSITION.y - ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin; //ROOT_MODUL.GAME_OBJECTS[z].POSITION.y = ROOT_MODUL.GAME_OBJECTS[x].POSITION.y - ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                      //ROOT_MODUL.GAME_OBJECTS[z].POSITION.targetY = ROOT_MODUL.GAME_OBJECTS[x].POSITION.y -  ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;

                      PLAYER.FREEZ = true;
                      PLAYER.Y = 0;
                      PLAYER.CONTROL.JUMP = false;

                      if (PLAYER.BREAK_AT_MOMENT_STATUS == false) {
                        ROOT_MODUL.BREAK_AT_MOMENT = true;
                        PLAYER.BREAK_AT_MOMENT_STATUS = true;
                      }

                      ROOT_MODUL.GAME_OBJECTS[x].ON_COLLISION(ROOT_MODUL.GAME_OBJECTS[z].NAME);
                      break;
                    } //$$$$$$$$$$$$$$


                    ROOT_MODUL.GAME_OBJECTS[x].ON_COLLISION(ROOT_MODUL.GAME_OBJECTS[z].NAME);
                  } else {
                    //$$$$$$$$$$$$$$
                    if (typeof ROOT_MODUL.GAME_OBJECTS[z].PLAYER != "undefined" && ROOT_MODUL.GAME_OBJECTS[z].PLAYER.TYPE == "PLATFORMER") {
                      SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + "COLLIDE TOP2 WITH:" + ROOT_MODUL.GAME_OBJECTS[x].NAME);
                      ROOT_MODUL.GAME_OBJECTS[x].POSITION.y = ROOT_MODUL.GAME_OBJECTS[z].POSITION.y + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                      ROOT_MODUL.GAME_OBJECTS[x].POSITION.targetY = ROOT_MODUL.GAME_OBJECTS[z].POSITION.y + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                      PLAYER.FREEZ = true;
                      PLAYER.Y = 0;
                      PLAYER.CONTROL.JUMP = false;

                      if (PLAYER.BREAK_AT_MOMENT_STATUS == false) {
                        ROOT_MODUL.BREAK_AT_MOMENT = true;
                        PLAYER.BREAK_AT_MOMENT_STATUS = true;
                      }

                      ROOT_MODUL.GAME_OBJECTS[x].ON_COLLISION(ROOT_MODUL.GAME_OBJECTS[z].NAME);
                      break;
                    }
                  }
                } else if (ROOT_MODUL.GAME_OBJECTS[z].POSITION.Y() < ROOT_MODUL.GAME_OBJECTS[x].POSITION.Y() + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.HEIGHT() && ROOT_MODUL.GAME_OBJECTS[z].POSITION.Y() > ROOT_MODUL.GAME_OBJECTS[x].POSITION.Y() + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.HEIGHT() - ROOT_MODUL.GAME_OBJECTS[x].POSITION.thrust * 12) {
                  if (ROOT_MODUL.GAME_OBJECTS[z].POSITION.STATIC == false && ROOT_MODUL.GAME_OBJECTS[z].POSITION.IN_MOVE == true) {
                    SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + "COLLIDE botton1 WITH:" + ROOT_MODUL.GAME_OBJECTS[x].NAME);
                    ROOT_MODUL.GAME_OBJECTS[z].POSITION.y = ROOT_MODUL.GAME_OBJECTS[x].POSITION.y + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                    ROOT_MODUL.GAME_OBJECTS[z].POSITION.targetY = ROOT_MODUL.GAME_OBJECTS[x].POSITION.y + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin; //ROOT_MODUL.GAME_OBJECTS[x].POSITION.y = ROOT_MODUL.GAME_OBJECTS[z].POSITION.y - ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                    //ROOT_MODUL.GAME_OBJECTS[x].POSITION.targetY = ROOT_MODUL.GAME_OBJECTS[z].POSITION.y - ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                  } else {
                    //$$$$$$$$$$$$$$
                    if (typeof ROOT_MODUL.GAME_OBJECTS[z].PLAYER != "undefined" && ROOT_MODUL.GAME_OBJECTS[z].PLAYER.TYPE == "PLATFORMER") {
                      SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + "COLLIDE botton2 WITH:" + ROOT_MODUL.GAME_OBJECTS[x].NAME);
                      ROOT_MODUL.GAME_OBJECTS[x].POSITION.y = ROOT_MODUL.GAME_OBJECTS[z].POSITION.y - ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                      ROOT_MODUL.GAME_OBJECTS[x].POSITION.targetY = ROOT_MODUL.GAME_OBJECTS[z].POSITION.y - ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                      PLAYER.FREEZ = true;
                      PLAYER.Y = 0;
                      PLAYER.CONTROL.JUMP = false;

                      if (PLAYER.BREAK_AT_MOMENT_STATUS == false) {
                        ROOT_MODUL.BREAK_AT_MOMENT = true;
                        PLAYER.BREAK_AT_MOMENT_STATUS = true;
                      }

                      ROOT_MODUL.GAME_OBJECTS[x].ON_COLLISION(ROOT_MODUL.GAME_OBJECTS[z].NAME);
                      break;
                    } //$$$$$$$$$$$$$$

                  }

                  ROOT_MODUL.GAME_OBJECTS[x].ON_COLLISION(ROOT_MODUL.GAME_OBJECTS[z].NAME);
                }
              } ////////

            }
          } else if (ROOT_MODUL.GAME_OBJECTS[z].COLLISION != null && ROOT_MODUL.GAME_OBJECTS[z].NAME != ROOT_MODUL.GAME_OBJECTS[x].NAME) {
            //&& typeof PLAYER == 'undefined'
            //Y by H
            if (ROOT_MODUL.GAME_OBJECTS[z].POSITION.Y() + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.HEIGHT() > ROOT_MODUL.GAME_OBJECTS[x].POSITION.Y() && ROOT_MODUL.GAME_OBJECTS[z].POSITION.Y() < ROOT_MODUL.GAME_OBJECTS[x].POSITION.Y() + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.HEIGHT()) {
              if (ROOT_MODUL.GAME_OBJECTS[z].POSITION.X() + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.WIDTH() > ROOT_MODUL.GAME_OBJECTS[x].POSITION.X() - 2 && ROOT_MODUL.GAME_OBJECTS[z].POSITION.X() + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.WIDTH() < ROOT_MODUL.GAME_OBJECTS[x].POSITION.X() + ROOT_MODUL.GAME_OBJECTS[x].POSITION.thrust * 12) {
                if (ROOT_MODUL.GAME_OBJECTS[z].POSITION.STATIC == false && ROOT_MODUL.GAME_OBJECTS[z].POSITION.IN_MOVE == true) {
                  SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + " COLLIDE (noplayer) right WITH:" + ROOT_MODUL.GAME_OBJECTS[x].NAME);
                  ROOT_MODUL.GAME_OBJECTS[z].POSITION.x = ROOT_MODUL.GAME_OBJECTS[x].POSITION.x - ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.W * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                  ROOT_MODUL.GAME_OBJECTS[z].POSITION.targetX = ROOT_MODUL.GAME_OBJECTS[x].POSITION.x - ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.W * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                } else if (ROOT_MODUL.GAME_OBJECTS[z].POSITION.STATIC == false) {
                  SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + "COLLIDE (noplayer) rigth WITH:" + ROOT_MODUL.GAME_OBJECTS[x].NAME);
                  ROOT_MODUL.GAME_OBJECTS[x].POSITION.x = ROOT_MODUL.GAME_OBJECTS[z].POSITION.x + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.W * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                  ROOT_MODUL.GAME_OBJECTS[x].POSITION.targetX = ROOT_MODUL.GAME_OBJECTS[z].POSITION.x + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.W * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                }
              } else if (ROOT_MODUL.GAME_OBJECTS[z].POSITION.X() < ROOT_MODUL.GAME_OBJECTS[x].POSITION.X() + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.WIDTH() + 2 && ROOT_MODUL.GAME_OBJECTS[z].POSITION.X() > ROOT_MODUL.GAME_OBJECTS[x].POSITION.X() + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.WIDTH() - ROOT_MODUL.GAME_OBJECTS[x].POSITION.thrust * 12) {
                if (ROOT_MODUL.GAME_OBJECTS[z].POSITION.STATIC == false && ROOT_MODUL.GAME_OBJECTS[z].POSITION.IN_MOVE == true) {
                  SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + "COLLIDE (noplayer) left WITH:" + ROOT_MODUL.GAME_OBJECTS[x].NAME);
                  ROOT_MODUL.GAME_OBJECTS[z].POSITION.x = ROOT_MODUL.GAME_OBJECTS[x].POSITION.x + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.W * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                  ROOT_MODUL.GAME_OBJECTS[z].POSITION.targetX = ROOT_MODUL.GAME_OBJECTS[x].POSITION.x + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.W * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                } else if (ROOT_MODUL.GAME_OBJECTS[z].POSITION.STATIC == false) {
                  SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + "COLLIDE (noplayer) left WITH:" + ROOT_MODUL.GAME_OBJECTS[x].NAME);
                  ROOT_MODUL.GAME_OBJECTS[x].POSITION.x = ROOT_MODUL.GAME_OBJECTS[z].POSITION.x - ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.W * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                  ROOT_MODUL.GAME_OBJECTS[x].POSITION.targetX = ROOT_MODUL.GAME_OBJECTS[z].POSITION.x - ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.W * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                }
              }
            } //


            if (ROOT_MODUL.GAME_OBJECTS[z].POSITION.X() + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.WIDTH() > ROOT_MODUL.GAME_OBJECTS[x].POSITION.X() + ROOT_MODUL.GAME_OBJECTS[x].POSITION.thrust * 12 && ROOT_MODUL.GAME_OBJECTS[z].POSITION.X() < ROOT_MODUL.GAME_OBJECTS[x].POSITION.X() + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.WIDTH() - ROOT_MODUL.GAME_OBJECTS[x].POSITION.thrust * 12) {
              if (ROOT_MODUL.GAME_OBJECTS[z].POSITION.Y() + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.HEIGHT() > ROOT_MODUL.GAME_OBJECTS[x].POSITION.Y() && ROOT_MODUL.GAME_OBJECTS[z].POSITION.Y() + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.HEIGHT() < ROOT_MODUL.GAME_OBJECTS[x].POSITION.Y() + ROOT_MODUL.GAME_OBJECTS[x].POSITION.thrust * 12) {
                if (ROOT_MODUL.GAME_OBJECTS[z].POSITION.STATIC == false && ROOT_MODUL.GAME_OBJECTS[z].POSITION.IN_MOVE == true) {
                  SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + "COLLIDE (noplayer) top WITH:" + ROOT_MODUL.GAME_OBJECTS[x].NAME);
                  ROOT_MODUL.GAME_OBJECTS[z].POSITION.y = ROOT_MODUL.GAME_OBJECTS[x].POSITION.y - ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                  ROOT_MODUL.GAME_OBJECTS[z].POSITION.targetY = ROOT_MODUL.GAME_OBJECTS[x].POSITION.y - ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                } else if (ROOT_MODUL.GAME_OBJECTS[z].POSITION.STATIC == false) {
                  SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + "COLLIDE (noplayer) botton WITH:" + ROOT_MODUL.GAME_OBJECTS[x].NAME);
                  ROOT_MODUL.GAME_OBJECTS[x].POSITION.y = ROOT_MODUL.GAME_OBJECTS[z].POSITION.y + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                  ROOT_MODUL.GAME_OBJECTS[x].POSITION.targetY = ROOT_MODUL.GAME_OBJECTS[z].POSITION.y + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                }
              } else if (ROOT_MODUL.GAME_OBJECTS[z].POSITION.Y() < ROOT_MODUL.GAME_OBJECTS[x].POSITION.Y() + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.HEIGHT() && ROOT_MODUL.GAME_OBJECTS[z].POSITION.Y() > ROOT_MODUL.GAME_OBJECTS[x].POSITION.Y() + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.HEIGHT() - ROOT_MODUL.GAME_OBJECTS[x].POSITION.thrust * 12) {
                if (ROOT_MODUL.GAME_OBJECTS[z].POSITION.STATIC == false && ROOT_MODUL.GAME_OBJECTS[z].POSITION.IN_MOVE == true) {
                  SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + "COLLIDE (noplayer) onTop WITH:" + ROOT_MODUL.GAME_OBJECTS[x].NAME);
                  ROOT_MODUL.GAME_OBJECTS[z].POSITION.y = ROOT_MODUL.GAME_OBJECTS[x].POSITION.y + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                  ROOT_MODUL.GAME_OBJECTS[z].POSITION.targetY = ROOT_MODUL.GAME_OBJECTS[x].POSITION.y + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                } else if (ROOT_MODUL.GAME_OBJECTS[z].POSITION.STATIC == false) {
                  SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + "COLLIDE (noplayer) onTop WITH:" + ROOT_MODUL.GAME_OBJECTS[x].NAME);
                  ROOT_MODUL.GAME_OBJECTS[x].POSITION.y = ROOT_MODUL.GAME_OBJECTS[z].POSITION.y - ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                  ROOT_MODUL.GAME_OBJECTS[x].POSITION.targetY = ROOT_MODUL.GAME_OBJECTS[z].POSITION.y - ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                }
              }

              ROOT_MODUL.GAME_OBJECTS[x].ON_COLLISION(ROOT_MODUL.GAME_OBJECTS[z].NAME);
            }
          }
        }
      }

      if (typeof ROOT_MODUL.GAME_OBJECTS[x] !== "undefined") {
        if (ROOT_MODUL.GAME_OBJECTS[x].DESTROY_AFTER != null) {
          if (ROOT_MODUL.GAME_OBJECTS[x].DESTROY_AFTER < 1) {
            ROOT_MODUL.DESTROY_OBJECT(ROOT_MODUL.GAME_OBJECTS[x].NAME);
          }
        }

        if (typeof ROOT_MODUL.GAME_OBJECTS[x] !== "undefined") {
          ROOT_MODUL.GAME_OBJECTS[x].UPDATE();
        }
      }
    }
  };
}

},{"../game_object/game_object":7}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _manifest = _interopRequireDefault(require("../manifest/manifest"));

var _engine = require("./engine");

var _init = require("./init");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Instance of Class PROGRAM is root for all other
 * class instances.
 * @example new PROGRAM
 * @class PROGRAM
 * @constroctor
 * @param {2dCanvasContext} S
 * @param {object} C
 */
function PROGRAM(s, c) {
  /**
     * @memberof PROGRAM
     * @property {self} PROGRAM_ROOT
     */
  var PROGRAM_ROOT = this;
  /**
   * @memberof PROGRAM
   * @property {float} DRAW_INTERVAL Loaded from : APPLICATION.PROGRAM.RENDER_SPEED
   */

  this.DRAW_INTERVAL = _manifest.default.PROGRAM.RENDER_SPEED;
  /**
     * @memberof PROGRAM
     * @property {float} UPDATE_INTERVAL Default value 15
     */

  this.UPDATE_INTERVAL = 15;
  /**
     * @memberof PROGRAM
     * @property {float} BASELINE Default value 'middle'
     */

  this.BASELINE = "middle";
  /**
   * @memberof PROGRAM
   * @property {float} GLOBAL_TRANSLATE Default value 0
   */

  this.GLOBAL_TRANSLATE = 0;
  /**
     * @memberof PROGRAM
     * @property {boolean} DO_GLOBAL_TRANSLATE Default value false
     */

  this.DO_GLOBAL_TRANSLATE = false;
  /**
     * @memberof PROGRAM
     * @method TRANSLATE DO_GLOBAL_TRANSLATE
   * @param {float} x 
     */

  PROGRAM_ROOT.TRANSLATE = function (x) {
    PROGRAM_ROOT.GLOBAL_TRANSLATE = x;
    PROGRAM_ROOT.DO_GLOBAL_TRANSLATE = true;
  };
  /**
   * @class GAME_MAP
     * @memberof PROGRAM
     */


  this.GAME_MAP = function () {
    //screens
    var ROOT = this;
    this.TOTAL_LEFT = 2;
    this.TOTAL_RIGHT = 4;
    this.TOTAL_UP = 2;
    this.TOTAL_DOWN = 4;

    this.LEFT = function () {
      return ROOT.TOTAL_LEFT * -_init.VIEW.W();
    };

    this.WIDTH = function () {
      return ROOT.TOTAL_RIGHT * _init.VIEW.W();
    };

    this.UP = function () {
      return ROOT.TOTAL_UP * -_init.VIEW.H();
    };

    this.HEIGHT = function () {
      return ROOT.TOTAL_DOWN * _init.VIEW.W();
    };

    this.CLEAR_MAP = true;
  };
  /**
     * @memberof PROGRAM
     * @property {GAME_MAP} MAP
     */


  PROGRAM_ROOT.MAP = new PROGRAM_ROOT.GAME_MAP();
  this.AUTO_UPDATE = new Array();
  /**
   * @memberof PROGRAM
   * @property {ENGINE} ENGINE
   */

  this.ENGINE = new _engine.ENGINE(c);
  s.textAlign = "start";
  s.textBaseline = this.BASELINE;
  /**
    * @memberof PROGRAM
    * @method DRAW
  * @return void
    */

  this.DRAW = function () {
    if (PROGRAM_ROOT.MAP.CLEAR_MAP == true) {
      s.clearRect(PROGRAM_ROOT.MAP.LEFT(), PROGRAM_ROOT.MAP.UP(), PROGRAM_ROOT.MAP.WIDTH(), PROGRAM_ROOT.MAP.HEIGHT());
    }

    if (PROGRAM_ROOT.DO_GLOBAL_TRANSLATE == true) {
      PROGRAM_ROOT.DO_GLOBAL_TRANSLATE = false;
      s.translate(PROGRAM_ROOT.GLOBAL_TRANSLATE, 0);
    }

    PROGRAM_ROOT.ENGINE.DRAW_MODULES(s);
    setTimeout(function () {
      PROGRAM_ROOT.UPDATE();
    }, this.UPDATE_INTERVAL);
  };
  /**
   * @memberof PROGRAM
   * @method UPDATE
  * @return void
   */


  this.UPDATE = function () {
    PROGRAM_ROOT.ENGINE.UPDATE_MODULES();

    for (var x = 0; x < this.AUTO_UPDATE; x++) {
      ROOT.AUTO_UPDATE[x].UPDATE();
    }

    setTimeout(function () {
      PROGRAM_ROOT.DRAW();
    }, this.DRAW_INTERVAL);
  };
}

var _default = PROGRAM;
exports.default = _default;

},{"../manifest/manifest":16,"./engine":5,"./init":9}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CREATE_SYSTEM_BUTTONS = CREATE_SYSTEM_BUTTONS;
exports.CREATE_VIRTUAL_KEYBOARD = CREATE_VIRTUAL_KEYBOARD;
exports.HIDE_KEYBOARD = HIDE_KEYBOARD;
exports.SHOW_KEYBOARD = SHOW_KEYBOARD;
exports.VK_CAPS = VK_CAPS;
exports.VK_ENTER = VK_ENTER;
exports.___KBSTATUS = ___KBSTATUS;
exports.___KBSTATUS_CAPS_OFF = ___KBSTATUS_CAPS_OFF;
exports.___KBSTATUS_CAPS_ON = ___KBSTATUS_CAPS_ON;
exports.________MAKE_VK = ________MAKE_VK;

var _system = _interopRequireDefault(require("./system"));

var _manifest = _interopRequireDefault(require("../manifest/manifest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CREATE_SYSTEM_BUTTONS() {
  if (typeof window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]] !== "undefined" && typeof window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE !== "undefined") {
    window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.CREATE_MODUL("GUI_STARTER");

    if (NOMOBILE == 0) {
      CREATE_VIRTUAL_KEYBOARD();
      HIDE_KEYBOARD();
    } else {
      if (_manifest.default.ACCESSIBILITY.VIRTUAL_KEYBOARD_FOR_DESKTOP == true) {
        CREATE_VIRTUAL_KEYBOARD();
        HIDE_KEYBOARD();
      }
    }
  } else {
    setTimeout(function () {
      //we dont wait any async
      CREATE_SYSTEM_BUTTONS();
    }, 50);
  }
}

function CREATE_VIRTUAL_KEYBOARD() {
  ________MAKE_VK(11, 5, 7, 7, 10); // value 1 speed


  window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("STARTER").NEW_OBJECT("___VIRTUALKEYBOARD_LABEL", 18, 32, 60, 10, 1);

  window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("STARTER").GAME_OBJECTS.ACCESS("___VIRTUALKEYBOARD_LABEL").CREATE_TEXTBOX("", 10, "black", "lime");

  window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("STARTER").GAME_OBJECTS.ACCESS("___VIRTUALKEYBOARD_LABEL").TEXTBOX.EDIT = false;
  ___VIRTUALKEYBOARD_LABEL.TEXT_FOR = null;
  ___VIRTUALKEYBOARD_LABEL.DRAG = false; // caps handler

  ___VIRTUALKEYBOARD_LABEL.CAPS = false; // backspace handler

  ___VIRTUALKEYBOARD_LABEL.BACKSPACE_DOWN = false;

  ___VIRTUALKEYBOARD_LABEL.SPEEDUPBACKSPACE = function () {
    setTimeout(function () {
      if (___VIRTUALKEYBOARD_LABEL.BACKSPACE_DOWN == true) {
        ___VIRTUALKEYBOARD_LABEL.SPEED__BACKSPACE();
      }
    }, 1000);
  };

  ___VIRTUALKEYBOARD_LABEL.DELTA_INC_TIMER_BACKSPACE = 400;

  ___VIRTUALKEYBOARD_LABEL.SPEED__BACKSPACE = function () {
    ___VIRTUALKEYBOARD_LABEL.SPEED__BACKSPACE__TIMER = setInterval(function () {
      if (___VIRTUALKEYBOARD_LABEL.BACKSPACE_DOWN == true) {
        ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT = ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT.substring(0, ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT.length - 1);

        if (___VIRTUALKEYBOARD_LABEL.DELTA_INC_TIMER_BACKSPACE < 300) {
          ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT = ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT.substring(0, ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT.length - 1);
        }

        if (___VIRTUALKEYBOARD_LABEL.DELTA_INC_TIMER_BACKSPACE < 100) {
          ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT = ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT.substring(0, ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT.length - 1);
          ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT = ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT.substring(0, ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT.length - 1);
        }

        if (___VIRTUALKEYBOARD_LABEL.DELTA_INC_TIMER_BACKSPACE > 5) {
          ___VIRTUALKEYBOARD_LABEL.DELTA_INC_TIMER_BACKSPACE = ___VIRTUALKEYBOARD_LABEL.DELTA_INC_TIMER_BACKSPACE - 100;
        } else {
          ___VIRTUALKEYBOARD_LABEL.DELTA_INC_TIMER_BACKSPACE = 5;
        } //console.log("___VIRTUALKEYBOARD_LABEL.DELTA_INC_TIMER_BACKSPACE" + " " + ___VIRTUALKEYBOARD_LABEL.DELTA_INC_TIMER_BACKSPACE)

      } else {
        clearInterval(___VIRTUALKEYBOARD_LABEL.SPEED__BACKSPACE__TIMER);
        ___VIRTUALKEYBOARD_LABEL.DELTA_INC_TIMER_BACKSPACE = 400;
      }
    }, ___VIRTUALKEYBOARD_LABEL.DELTA_INC_TIMER_BACKSPACE);
  };
}

;

function ________MAKE_VK(H, V, step, w, h) {
  for (var y = 0; y < V; y = y + 1) {
    for (var x = 0; x < H; x = x + 1) {
      var name = "___VIRTUALKEYBOARD_" + x + y;
      var PASS_VK_CODE_ = "";
      var width_extra = 0;
      var SPECIAL_COMMAND = null;
      var LETTER = 0;

      if (x == 0 && y == 1) {
        LETTER = 16; //q

        PASS_VK_CODE_ = "q";
      } else if (x == 1 && y == 1) {
        LETTER = 22; //w

        PASS_VK_CODE_ = "w";
      } else if (x == 2 && y == 1) {
        LETTER = 4; //e

        PASS_VK_CODE_ = "e";
      } else if (x == 3 && y == 1) {
        LETTER = 17; //r

        PASS_VK_CODE_ = "r";
      } else if (x == 4 && y == 1) {
        LETTER = 19; //t

        PASS_VK_CODE_ = "t";
      } else if (x == 5 && y == 1) {
        LETTER = 25; //z

        PASS_VK_CODE_ = "z";
      } else if (x == 6 && y == 1) {
        LETTER = 20; //u

        PASS_VK_CODE_ = "u";
      } else if (x == 7 && y == 1) {
        LETTER = 8; //i

        PASS_VK_CODE_ = "i";
      } else if (x == 8 && y == 1) {
        LETTER = 14; //o

        PASS_VK_CODE_ = "o";
      } else if (x == 9 && y == 1) {
        LETTER = 15; //p

        PASS_VK_CODE_ = "p";
      } else if (x == 10 && y == 1) {
        LETTER = 28; //m UBACI ZA TACKU

        PASS_VK_CODE_ = "[";
      } else if (x == 10 && y == 0) {
        LETTER = 25; //Backspace

        width_extra = 10;
        PASS_VK_CODE_ = "Backspace";
      } //line 2
      else if (x == 0 && y == 2) {
        LETTER = 0; //a

        PASS_VK_CODE_ = "a";
      } else if (x == 1 && y == 2) {
        LETTER = 18; //s

        PASS_VK_CODE_ = "s";
      } else if (x == 2 && y == 2) {
        LETTER = 3; //d

        PASS_VK_CODE_ = "d";
      } else if (x == 3 && y == 2) {
        LETTER = 5; //f

        PASS_VK_CODE_ = "f";
      } else if (x == 4 && y == 2) {
        LETTER = 6; //g

        PASS_VK_CODE_ = "g";
      } else if (x == 5 && y == 2) {
        LETTER = 7; //h

        PASS_VK_CODE_ = "h";
      } else if (x == 6 && y == 2) {
        LETTER = 9; //j

        PASS_VK_CODE_ = "j";
      } else if (x == 7 && y == 2) {
        LETTER = 10; //k

        PASS_VK_CODE_ = "k";
      } else if (x == 8 && y == 2) {
        LETTER = 11; //l

        PASS_VK_CODE_ = "l";
      } else if (x == 9 && y == 2) {
        LETTER = 28; // SPECIAL : ENTER
        //width_extra = 10;

        PASS_VK_CODE_ = ";";
      } else if (x == 10 && y == 2) {
        LETTER = 28; // SPECIAL : ENTER
        //width_extra = 10;

        PASS_VK_CODE_ = "'";
      } else if (x == 11 && y == 2) {
        LETTER = 0; // enter

        width_extra = 10;
        PASS_VK_CODE_ = "enter2";
      } //line 3
      else if (x == 0 && y == 3) {
        LETTER = 24; //y

        PASS_VK_CODE_ = "y";
      } else if (x == 1 && y == 3) {
        LETTER = 23; //x

        PASS_VK_CODE_ = "x";
      } else if (x == 2 && y == 3) {
        LETTER = 2; //c

        PASS_VK_CODE_ = "c";
      } else if (x == 3 && y == 3) {
        LETTER = 21; //v

        PASS_VK_CODE_ = "v";
      } else if (x == 4 && y == 3) {
        LETTER = 1; //b

        PASS_VK_CODE_ = "b";
      } else if (x == 5 && y == 3) {
        LETTER = 13; //n

        PASS_VK_CODE_ = "n";
      } else if (x == 6 && y == 3) {
        LETTER = 12; //m

        PASS_VK_CODE_ = "m";
      } else if (x == 7 && y == 3) {
        LETTER = 27; //m

        PASS_VK_CODE_ = ",";
      } else if (x == 8 && y == 3) {
        LETTER = 27; //m UBACI ZA TACKU

        PASS_VK_CODE_ = ".";
      } else if (x == 9 && y == 3) {
        LETTER = 30; //m UBACI ZA TACKU

        PASS_VK_CODE_ = "/";
      } else if (x == 10 && y == 3) {
        LETTER = 31; //m UBACI ZA TACKU

        PASS_VK_CODE_ = "Caps";
      } //down line
      else if (x == 0 && y == 4) {
        LETTER = 24; //y

        PASS_VK_CODE_ = "_";
      } else if (x == 1 && y == 4) {
        LETTER = 23; //x

        PASS_VK_CODE_ = "-";
      } else if (x == 2 && y == 4) {
        LETTER = 2; //c

        PASS_VK_CODE_ = "+";
      } else if (x == 3 && y == 4) {
        LETTER = 21; //v

        PASS_VK_CODE_ = "=";
      } else if (x == 4 && y == 4) {
        LETTER = 1; //b

        PASS_VK_CODE_ = "space";
        width_extra = 24;
      } else if (x == 5 && y == 4) {
        /** unhandled */
      } else if (x == 6 && y == 4) {
        /** unhandled */
      } else if (x == 7 && y == 4) {
        /** unhandled */
      } else if (x == 8 && y == 4) {
        LETTER = 27; //m UBACI ZA TACKU

        PASS_VK_CODE_ = ".com";
      } else if (x == 9 && y == 4) {
        LETTER = 30; //m UBACI ZA TACKU

        PASS_VK_CODE_ = "hide";
        SPECIAL_COMMAND = "hide";
      } else if (x == 10 && y == 4) {
        LETTER = 31; //m UBACI ZA TACKU

        PASS_VK_CODE_ = "Enter";
        width_extra = 12;
      } // NUMBERS
      else if (x == 0 && y == 0) {
        LETTER = 33; // o

        PASS_VK_CODE_ = "0";
      } else if (x == 1 && y == 0) {
        LETTER = 34; // o

        PASS_VK_CODE_ = "1";
      } else if (x == 2 && y == 0) {
        LETTER = 35; // o

        PASS_VK_CODE_ = "2";
      } else if (x == 3 && y == 0) {
        LETTER = 36; // o

        PASS_VK_CODE_ = "3";
      } else if (x == 4 && y == 0) {
        LETTER = 37; // o

        PASS_VK_CODE_ = "4";
      } else if (x == 5 && y == 0) {
        LETTER = 38; // o

        PASS_VK_CODE_ = "5";
      } else if (x == 6 && y == 0) {
        LETTER = 39; // o

        PASS_VK_CODE_ = "6";
      } else if (x == 7 && y == 0) {
        LETTER = 40; // o

        PASS_VK_CODE_ = "7";
      } else if (x == 8 && y == 0) {
        LETTER = 41; // o

        PASS_VK_CODE_ = "8";
      } else if (x == 9 && y == 0) {
        LETTER = 42; // o

        PASS_VK_CODE_ = "9";
      } else if (x == 10 && y == 0) {
        LETTER = 32; // o

        PASS_VK_CODE_ = "0";
      } /////////////////////////
      // CREATING SYS KEYBOARD
      // eliminate rigth of space


      if (!(x >= 5 && y == 4 && x <= 7 && y == 4)) {
        var ___ID = Math.random();

        window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").NEW_OBJECT(name, x + step * x, y + step * 1.5 * y + 40, w + width_extra, h, 10); //window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).CREATE_ANIMATION( SURF , "DRAW_FRAME" , LETTER , RESOURCE.imagesFont1  , ___ID , "no" , 1,11,1,1,1)


        window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).CREATE_TEXTBOX(PASS_VK_CODE_, 10, "black", "lime");

        window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).DRAG = false;
        window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.EDIT = false;
        window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).PASS_VK_CODE = PASS_VK_CODE_;

        window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TOUCH_UP = function () {
          ___VIRTUALKEYBOARD_LABEL.BACKSPACE_DOWN = false;
          ___VIRTUALKEYBOARD_LABEL.SPEEDUP = false;
        };

        window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TOUCH_DOWN = function () {
          if (window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(this.NAME).TEXTBOX.TEXT == "Backspace") {
            ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT = ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT.substring(0, ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT.length - 1); //console.log("VIRTUAL KEYBOARD : Backspace ")

            ___VIRTUALKEYBOARD_LABEL.BACKSPACE_DOWN = true;

            ___VIRTUALKEYBOARD_LABEL.SPEEDUPBACKSPACE();
          } else if (window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(this.NAME).TEXTBOX.TEXT == "hide") {
            HIDE_KEYBOARD(); //console.log("VIRTUAL KEYBOARD :  HIDE_KEYBOARD() ")
          } else if (window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(this.NAME).TEXTBOX.TEXT == "Enter") {
            VK_ENTER(); //console.log("VIRTUAL KEYBOARD :  enter!! ")
          } else if (window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(this.NAME).TEXTBOX.TEXT == "Caps") {
            VK_CAPS(); //console.log("VIRTUAL KEYBOARD :  caps !! ")
          } else if (window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(this.NAME).TEXTBOX.TEXT == "space") {
            HELLO_WORLD.ENGINE.MODULES.ACCESS_MODULE("STARTER").GAME_OBJECTS.ACCESS("___VIRTUALKEYBOARD_LABEL").TEXTBOX.TEXT += " "; //console.log("VIRTUAL KEYBOARD :  caps !! ")
          } else {
            HELLO_WORLD.ENGINE.MODULES.ACCESS_MODULE("STARTER").GAME_OBJECTS.ACCESS("___VIRTUALKEYBOARD_LABEL").TEXTBOX.TEXT += window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(this.NAME).TEXTBOX.TEXT;
          }
        };
      } // extra


      if (y == 2 && x == 10) {
        var name = "___VIRTUALKEYBOARD_" + (x + 1) + y;
        x = 11;
        PASS_VK_CODE_ = "\\";

        var ___ID = Math.random();

        window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").NEW_OBJECT(name, x + step * x, y + step * 1.5 * y + 40, w + width_extra, h, 10); //window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).CREATE_ANIMATION( SURF , "DRAW_FRAME" , LETTER , RESOURCE.imagesFont1  , ___ID , "no" , 1,11,1,1,1)


        window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).CREATE_TEXTBOX(PASS_VK_CODE_, 10, "black", "lime");

        window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).DRAG = false;
        window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.EDIT = false;

        window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TAP = function () {//console.log("VIRTUAL KEYBOARD : " + this.NAME);
        };

        x = 10;
      } // extra


      if (y == 1 && x == 10) {
        var name = "___VIRTUALKEYBOARD_" + (x + 1) + y;
        x = 11;
        PASS_VK_CODE_ = "]";

        var ___ID = Math.random();

        window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").NEW_OBJECT(name, x + step * x, y + step * 1.5 * y + 40, w + width_extra, h, 10); //window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).CREATE_ANIMATION( SURF , "DRAW_FRAME" , LETTER , RESOURCE.imagesFont1  , ___ID , "no" , 1,11,1,1,1)


        window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).CREATE_TEXTBOX(PASS_VK_CODE_, 10, "black", "lime");

        window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).DRAG = false;
        window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.EDIT = false;

        window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TAP = function () {//console.log("VIRTUAL KEYBOARD : " + this.NAME);
        };

        x = 12;
      } ///////////////////////

    }
  }
}

;

function HIDE_KEYBOARD() {
  ___VIRTUALKEYBOARD_LABEL.VISIBLE = false;

  ___KBSTATUS(11, 5, false);

  ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT = "";
}

function SHOW_KEYBOARD(textIsForThisNameObj) {
  ___VIRTUALKEYBOARD_LABEL.TEXT_FOR = window[textIsForThisNameObj];
  ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT = ___VIRTUALKEYBOARD_LABEL.TEXT_FOR.TEXTBOX.TEXT;
  ___VIRTUALKEYBOARD_LABEL.VISIBLE = true;

  ___KBSTATUS(11, 5, true);
}

;

function VK_ENTER() {
  window[___VIRTUALKEYBOARD_LABEL.TEXT_FOR.NAME].TEXTBOX.TEXT = ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT;
  ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT = "";
  HIDE_KEYBOARD();
}

;

function VK_CAPS() {
  if (___VIRTUALKEYBOARD_LABEL.CAPS == false) {
    ___KBSTATUS_CAPS_ON(11, 5);

    ___VIRTUALKEYBOARD_LABEL.CAPS = true;
  } else {
    ___KBSTATUS_CAPS_OFF(11, 5);

    ___VIRTUALKEYBOARD_LABEL.CAPS = false;
  }
}

; // help hide keyb

function ___KBSTATUS(H, V, WHAT) {
  for (var y = 0; y < V; y = y + 1) {
    for (var x = 0; x < H; x = x + 1) {
      var name = "___VIRTUALKEYBOARD_" + x + y;
      var PASS_VK_CODE_ = "";
      var width_extra = 0;
      var SPECIAL_COMMAND = null;
      var LETTER = 0; // CREATING SYS KEYBOARD
      // eliminate rigth of space

      if (!(x >= 5 && y == 4 && x <= 7 && y == 4)) {
        window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).VISIBLE = WHAT;
      } // extra


      if (y == 2 && x == 10) {
        var name = "___VIRTUALKEYBOARD_" + (x + 1) + y;
        x = 11;
        window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).VISIBLE = WHAT;
        x = 10;
      } // extra


      if (y == 1 && x == 10) {
        var name = "___VIRTUALKEYBOARD_" + (x + 1) + y;
        x = 11;
        window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).VISIBLE = WHAT;
        x = 12;
      }
    }
  }
}

; // caps staff

function ___KBSTATUS_CAPS_ON(H, V, WHAT) {
  for (var y = 0; y < V; y = y + 1) {
    for (var x = 0; x < H; x = x + 1) {
      var name = "___VIRTUALKEYBOARD_" + x + y;
      var PASS_VK_CODE_ = "";
      var width_extra = 0;
      var SPECIAL_COMMAND = null;
      var LETTER = 0; // CREATING SYS KEYBOARD

      if (name != "___VIRTUALKEYBOARD_44" && name != "___VIRTUALKEYBOARD_100" && name != "___VIRTUALKEYBOARD_103" && name != "___VIRTUALKEYBOARD_104" && name != "___VIRTUALKEYBOARD_94") {
        // eliminate rigth of space
        if (!(x >= 5 && y == 4 && x <= 7 && y == 4)) {
          window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.TEXT = window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.TEXT.toUpperCase();
        } // extra


        if (y == 2 && x == 10) {
          var name = "___VIRTUALKEYBOARD_" + (x + 1) + y;
          x = 11;
          window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.TEXT = window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.TEXT.toUpperCase();
          x = 10;
        } // extra


        if (y == 1 && x == 10) {
          var name = "___VIRTUALKEYBOARD_" + (x + 1) + y;
          x = 11;
          window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.TEXT = window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.TEXT.toUpperCase();
          x = 12;
        } //for special


        if (___VIRTUALKEYBOARD_101.TEXTBOX.TEXT != "{") {
          ___VIRTUALKEYBOARD_101.TEXTBOX.TEXT = "{";
        }

        if (___VIRTUALKEYBOARD_102.TEXTBOX.TEXT != "\"") {
          ___VIRTUALKEYBOARD_102.TEXTBOX.TEXT = "\"";
        }

        if (___VIRTUALKEYBOARD_93.TEXTBOX.TEXT != "?") {
          ___VIRTUALKEYBOARD_93.TEXTBOX.TEXT = "?";
        }

        if (name == "___VIRTUALKEYBOARD_111") {
          ___VIRTUALKEYBOARD_111.TEXTBOX.TEXT = "}";
        } else if (name == "___VIRTUALKEYBOARD_92") {
          ___VIRTUALKEYBOARD_92.TEXTBOX.TEXT = ":";
        } else if (name == "___VIRTUALKEYBOARD_112") {
          ___VIRTUALKEYBOARD_112.TEXTBOX.TEXT = "|";
        } else if (name == "___VIRTUALKEYBOARD_73") {
          ___VIRTUALKEYBOARD_73.TEXTBOX.TEXT = "<";
        } else if (name == "___VIRTUALKEYBOARD_83") {
          ___VIRTUALKEYBOARD_83.TEXTBOX.TEXT = ">";
        } else if (name == "___VIRTUALKEYBOARD_10") {
          ___VIRTUALKEYBOARD_10.TEXTBOX.TEXT = "!";
        } else if (name == "___VIRTUALKEYBOARD_20") {
          ___VIRTUALKEYBOARD_20.TEXTBOX.TEXT = "@";
        } else if (name == "___VIRTUALKEYBOARD_30") {
          ___VIRTUALKEYBOARD_30.TEXTBOX.TEXT = "#";
        } else if (name == "___VIRTUALKEYBOARD_40") {
          ___VIRTUALKEYBOARD_40.TEXTBOX.TEXT = "$";
        } else if (name == "___VIRTUALKEYBOARD_50") {
          ___VIRTUALKEYBOARD_50.TEXTBOX.TEXT = "%";
        } else if (name == "___VIRTUALKEYBOARD_60") {
          ___VIRTUALKEYBOARD_60.TEXTBOX.TEXT = "^";
        } else if (name == "___VIRTUALKEYBOARD_70") {
          ___VIRTUALKEYBOARD_70.TEXTBOX.TEXT = "&";
        } else if (name == "___VIRTUALKEYBOARD_80") {
          ___VIRTUALKEYBOARD_80.TEXTBOX.TEXT = "*";
        } else if (name == "___VIRTUALKEYBOARD_90") {
          ___VIRTUALKEYBOARD_90.TEXTBOX.TEXT = "(";
        } else if (name == "___VIRTUALKEYBOARD_00") {
          ___VIRTUALKEYBOARD_00.TEXTBOX.TEXT = ")";
        }
      }
    }
  }
}

;

function ___KBSTATUS_CAPS_OFF(H, V, WHAT) {
  for (var y = 0; y < V; y = y + 1) {
    for (var x = 0; x < H; x = x + 1) {
      var name = "___VIRTUALKEYBOARD_" + x + y;
      var PASS_VK_CODE_ = "";
      var width_extra = 0;
      var SPECIAL_COMMAND = null;
      var LETTER = 0; // CREATING SYS KEYBOARD

      if (name != "___VIRTUALKEYBOARD_44" && name != "___VIRTUALKEYBOARD_100" && name != "___VIRTUALKEYBOARD_103" && name != "___VIRTUALKEYBOARD_104" && name != "___VIRTUALKEYBOARD_94") {
        // eliminate rigth of space
        if (!(x >= 5 && y == 4 && x <= 7 && y == 4)) {
          window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.TEXT = window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.TEXT.toLowerCase(); //console.log('caps OFF' + x + ' x y ' + y)
        } // extra


        if (y == 2 && x == 10) {
          var name = "___VIRTUALKEYBOARD_" + (x + 1) + y;
          x = 11;
          window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.TEXT = window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.TEXT.toLowerCase();
          x = 10;
        } // extra


        if (y == 1 && x == 10) {
          var name = "___VIRTUALKEYBOARD_" + (x + 1) + y;
          x = 11;
          window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.TEXT = window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.TEXT.toLowerCase();
          x = 12;
        } //for special


        if (___VIRTUALKEYBOARD_101.TEXTBOX.TEXT != "[") {
          ___VIRTUALKEYBOARD_101.TEXTBOX.TEXT = "[";
        }

        if (___VIRTUALKEYBOARD_102.TEXTBOX.TEXT != "'") {
          ___VIRTUALKEYBOARD_102.TEXTBOX.TEXT = "'";
        }

        if (___VIRTUALKEYBOARD_93.TEXTBOX.TEXT != "/") {
          ___VIRTUALKEYBOARD_93.TEXTBOX.TEXT = "/";
        } //for special


        if (name == "___VIRTUALKEYBOARD_111") {
          ___VIRTUALKEYBOARD_111.TEXTBOX.TEXT = "]";
        } else if (name == "___VIRTUALKEYBOARD_93") {
          ___VIRTUALKEYBOARD_92.TEXTBOX.TEXT = ";";
        } else if (name == "___VIRTUALKEYBOARD_112") {
          ___VIRTUALKEYBOARD_112.TEXTBOX.TEXT = "\\";
        } else if (name == "___VIRTUALKEYBOARD_73") {
          ___VIRTUALKEYBOARD_73.TEXTBOX.TEXT = ",";
        } else if (name == "___VIRTUALKEYBOARD_83") {
          ___VIRTUALKEYBOARD_83.TEXTBOX.TEXT = ".";
        } else if (name == "___VIRTUALKEYBOARD_10") {
          ___VIRTUALKEYBOARD_10.TEXTBOX.TEXT = "1";
        } else if (name == "___VIRTUALKEYBOARD_20") {
          ___VIRTUALKEYBOARD_20.TEXTBOX.TEXT = "2";
        } else if (name == "___VIRTUALKEYBOARD_30") {
          ___VIRTUALKEYBOARD_30.TEXTBOX.TEXT = "3";
        } else if (name == "___VIRTUALKEYBOARD_40") {
          ___VIRTUALKEYBOARD_40.TEXTBOX.TEXT = "4";
        } else if (name == "___VIRTUALKEYBOARD_50") {
          ___VIRTUALKEYBOARD_50.TEXTBOX.TEXT = "5";
        } else if (name == "___VIRTUALKEYBOARD_60") {
          ___VIRTUALKEYBOARD_60.TEXTBOX.TEXT = "6";
        } else if (name == "___VIRTUALKEYBOARD_70") {
          ___VIRTUALKEYBOARD_70.TEXTBOX.TEXT = "7";
        } else if (name == "___VIRTUALKEYBOARD_80") {
          ___VIRTUALKEYBOARD_80.TEXTBOX.TEXT = "8";
        } else if (name == "___VIRTUALKEYBOARD_90") {
          ___VIRTUALKEYBOARD_90.TEXTBOX.TEXT = "9";
        } else if (name == "___VIRTUALKEYBOARD_00") {
          ___VIRTUALKEYBOARD_00.TEXTBOX.TEXT = "0";
        }
      } //for special


      if (name == "___VIRTUALKEYBOARD_101") {
        ___VIRTUALKEYBOARD_101.TEXTBOX.TEXT = "[";
      }
    }
  }
}

;

},{"../manifest/manifest":16,"./system":15}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ActivateModifiers;

function ActivateModifiers() {
  // Make 1200.99 $   looks like this 1.230,00
  Number.prototype.BalanceStyle = function (decPlaces, thouSeparator, decSeparator) {
    var n = this,
        decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
        decSeparator = decSeparator == undefined ? "." : decSeparator,
        thouSeparator = thouSeparator == undefined ? "," : thouSeparator,
        sign = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
  };

  Array.prototype.unset = function (value) {
    if (this.indexOf(value) != -1) {
      this.splice(this.indexOf(value), 1);
    }
  };

  Array.prototype.ACCESS_MODULE = function (name) {
    for (var x = 0; x < this.length; x++) {
      if (this[x].NAME == name) {
        return this[x];
      }
    }
  };

  Array.prototype.ACCESS = function (name) {
    for (var x = 0; x < this.length; x++) {
      if (this[x].NAME == name) {
        return this[x];
      }
    }
  };

  Element.prototype.remove = function () {
    this.parentElement.removeChild(this);
  };

  NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
    for (var i = this.length - 1; i >= 0; i--) {
      if (this[i] && this[i].parentElement) {
        this[i].parentElement.removeChild(this[i]);
      }
    }
  };
}

},{}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _init = require("./init");

var _math = require("./math");

/**
 * Created by Nikola Lukic zlatnaspirala@gmail.com
 * @example SYS.DEBUG.LOG('welcome to extrime')
 * @Object {object} SYS
 */
var SYS = {
  ROOT: void 0,

  /**
   * Get browser data
   * @property {DETECTBROWSER} BROWSER
   */
  BROWSER: new _init.DETECTBROWSER(),

  /**
  Load/Add dinamic script in runtime
   */
  SCRIPT: _init.SCRIPT,

  /**
  Works with html canvas element ,
  create surface and setup main program loop
   */
  DOM: new _init.DOM(),

  /**
  Just list of running programs
   */
  RUNNING_PROGRAMS: new Array(),

  /**
  DEBUG
  console.log polumorh call
  switch on/off
   */
  DEBUG: new _init.LOG(),
  READY: false,

  /**
  RES - resources
  Image object creator
   */
  RES: {
    SUM_OF_LOADED_IMAGES: 0,
    CREATE_IMG: _init.CREATE_IMG
  },
  // Math

  /**
  Math - operation
   */
  MATH: {
    NUMBER_ROUND: _math.round,
    RANDOM_INT_FROM_TO: _math.randomIntFromTo,
    TO_DEGREES: _math.toDegrees,
    TO_RADIANS: _math.toRadians,
    OSCILLATOR: _math.OSCILLATOR,
    CONVERT: _init.CONVERTOR,
    INCREMENTATOR: _math.INCREMENTATOR
  },
  ARRAY_OPERATION: {
    REMOVE_ALL_ITEMS_WITH_VALUE: _init.removeItem,
    DEEP_COPY: _init.DEEP_COPY
  },
  LOCAL_STORAGE: {},
  // Mouse or touch READ_ONLY
  MOUSE: {
    x: 0,
    y: 0,
    PRESS: false,
    BUTTON_PRESSED: null,
    ON_RIGHT_BTN_PRESSED: function () {},
    ON_MID_BTN_PRESSED: function () {},
    ON_LEFT_BTN_PRESSED: function () {}
  },
  XML: {
    READ: _init.readXML
  },
  SOUND: {
    GEN: _init.SOUND,
    RES: {}
  },
  VOICE: {
    SPEAK: function () {},
    LISTEN: function () {}
  },
  CAMERA: {
    SUPPORT: (0, _init.test_webcam_device)()
  }
};
var _default = SYS;
exports.default = _default;

},{"./init":9,"./math":10}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Filename : manifest.js
 * manifest file for visual js Application .
 * important Use this file just for edit fields , dont press enter for new line.
 * created by Nikola Lukic zlatnaspirala@gmail.com
 * www.maximumroulette.com 2016
 */
var APPLICATION = {
  NAME: "VISUAL-JS",
  TYPE: "client",
  VERSION: "3.0.0",
  STATUS: "develop",
  MULTILANGUAGE: false,
  IMAGE_LOADER_PREFIX: true,
  // false for fiddle support , we need absolute path.
  EDITOR: false,
  EDITOR_AUTORUN: false,
  LOCAL_SERVER: "127.0.0.1",
  DEVELOPERS: ["Nikola Lukic Zlatnaspirala@gmail.com"],
  ACCESSIBILITY: {
    VIRTUAL_KEYBOARD_FOR_DESKTOP: true,
    ACTIVATE_VK_FOR_DESKTOP: function () {
      CREATE_VIRTUAL_KEYBOARD();
      HIDE_KEYBOARD();
      APPLICATION.ACCESSIBILITY.VIRTUAL_KEYBOARD_FOR_DESKTOP = true;
    },
    // in run time
    DEACTIVATE_VK_FOR_DESKTOP: function () {
      APPLICATION.ACCESSIBILITY.VIRTUAL_KEYBOARD_FOR_DESKTOP = false;
    } // in run time

  },
  SINGLE_BROADCAST: true,
  MULTIRTC_PEER: true,
  BOX2D: false,
  PROGRAM: {
    CALCULATING_POSITION_BY: "CANVAS",
    // MONITOR is innerWidth..Height  or CANVAS is  canvas width
    RENDER_SPEED: 5,
    UPDATE_SPEED: 5
  },
  SYSTEM: {
    COLOR: "#afa9aa",
    HOVER_COLOR: "#5991FF",
    TEXT_COLOR: "black",
    ACTOR_X: "",
    ACTOR_Y: ""
  }
};
var _default = APPLICATION;
exports.default = _default;

},{}]},{},[1]);
