
import APPLICATION from './manifest/manifest';
import ActivateModifiers from './lib/proto_modify';
import AUDIO_RES from './lib/audio/audio';
import SYS from './lib/system';
import {CREATE_SYSTEM_BUTTONS} from './lib/program_modul';
import {RESOURCE} from './res/animations/resource.js';
import { attachResize } from "./lib/events/onresize";
import ML from './lib/multilanguage/ml';
import { runEditor, GET_ALL_GAME_OBJECTS } from "./lib/editor/editor";
import { randLetter } from './lib/init';

if (APPLICATION.EDITOR == true) {
  // runEditor();
}

ActivateModifiers();

if(typeof AUDIO_RESOURCE != "undefined") {
  // SYS.SOUND.RES = new AUDIO_RES();
}

////////////////////////////
// Run Instance from here
////////////////////////////

SYS.DOM.CREATE_SURFACE("SURF", "HELLO_WORLD", 100, 99.4, "DIAMETRIC");
//NOW HELLO_WORLD IS OBJECT WITH ONE CANVAS TAG
HELLO_WORLD.ENGINE.CREATE_MODUL("STARTER");
var SMODULE = HELLO_WORLD.ENGINE.MODULES.ACCESS_MODULE("STARTER");

// Keyboard
// CREATE_SYSTEM_BUTTONS();

attachResize();

SYS.SCRIPT.LOAD('starter/visual.js', true).then((test)=> {
  console.log("Write yor code here!")
})

SYS.SCRIPT.LOAD("res/audio/resource.audio");

console.log("ML ", ML);
window.ML = ML;
window.APPLICATION = APPLICATION;

RESOURCE.character1 = {
  "source": ['character1/alienBiege_climb1.png',
    'character1/alienBiege_climb2.png',
    'character1/alienBiege_duck.png',
    'character1/alienBiege_front.png',
    'character1/alienBiege_hit.png',
    'character1/alienBiege_jump.png',
    'character1/alienBiege_stand.png',
    'character1/alienBiege_swim1.png',
    'character1/alienBiege_swim2.png',
    'character1/alienBiege_walk1.png',
    'character1/alienBiege_walk2.png',
  ]
};

console.log("SMODULE" , SMODULE)

// GET_ALL_GAME_OBJECTS();

// HELLO_WORLD.ENGINE.MODULES.ACCESS_MODULE("STARTER").NEW_OBJECT("IamNewObject", 5, 50, 12, 15, 10);
// HELLO_WORLD.ENGINE.MODULES.ACCESS_MODULE("STARTER").GAME_OBJECTS.ACCESS("IamNewObject").CREATE_ANIMATION(SURF, "DRAW_FRAME", 6, RESOURCE.character1, 1111123123, "no", 1, 11, 1, 1, 1);

// IamNewObject.DRAG = false;
// IamNewObject.POSITION.DIMENSION.HEIGHT = IamNewObject.POSITION.DIMENSION.WIDTH;

// IamNewObject.TAP = function() {

// console.log("TOUCHED: " + this.NAME);
// IamNewObject.DESTROY_ME_AFTER_X_SECUND(0.01, "IamNewObject");

// };
