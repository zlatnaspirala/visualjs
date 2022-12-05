
import APPLICATION from './manifest/manifest';
import ActivateModifiers from './lib/proto_modify';
import AUDIO_RES from './lib/audio/audio';
import SYS from './lib/system';
import {CREATE_SYSTEM_BUTTONS} from './lib/program_modul';
import {attachResize} from "./lib/events/onresize";
import ML from './lib/multilanguage/ml';
import {runEditor, GET_ALL_GAME_OBJECTS} from "./lib/editor/editor";
import {randLetter, VIEW} from './lib/init';
import {ORBIT, OSCILLATOR} from './lib/math';

// ONLY WHEN EDITOR IS ACTIVE!
runEditor();

ActivateModifiers();

// Run Instance from here
SYS.DOM.CREATE_SURFACE("SURF", "HELLO_WORLD", 100, 99.4, "DIAMETRIC");
HELLO_WORLD.ENGINE.EXIT_EDIT_MODE();
HELLO_WORLD.ENGINE.CREATE_MODUL("STARTER");
var SMODULE = HELLO_WORLD.ENGINE.MODULES.ACCESS_MODULE("STARTER");

// Keyboard
// ONLY WHEN EDITOR IS ACTIVE!
CREATE_SYSTEM_BUTTONS();

attachResize();

// ONLY WHEN EDITOR IS DEACTIVE AND AFTER BUILD!
// SYS.SCRIPT.LOAD('starter/visual.js', true).then((test)=> {
  // console.log("You can still add some post script")
  // console.log("Write yor code here!")
// })

addEventListener("postScriptReady", (e) => {
  console.log("EVENT<postScriptReady>");
  console.log("Object from editor are defined here ->", ssss);
  // You need to exit editor now
  APPLICATION.EDITOR = false;
  HELLO_WORLD.ENGINE.EXIT_EDIT_MODE();
  ssss.POSITION.TRANSLATE_BY_X(2);
});

SYS.SCRIPT.LOAD("res/audio/resource.audio");
SYS.SCRIPT.LOAD("res/animations/resource.js");

window.ML = ML;
window.APPLICATION = APPLICATION;

// ONLY WHEN EDITOR IS ACTIVE!
GET_ALL_GAME_OBJECTS();
