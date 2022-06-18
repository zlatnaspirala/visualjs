
import manifest from './manifest/manifest';
import ActivateModifiers from './lib/proto_modify';
import AUDIO_RES from './lib/audio/audio';
import SYS from './lib/system';
import { CREATE_SYSTEM_BUTTONS } from './lib/program_modul';

ActivateModifiers();

if (typeof AUDIO_RESOURCE != "undefined") {
  SYS.SOUND.RES = new AUDIO_RES();
}

CREATE_SYSTEM_BUTTONS();

///////
// Run
///////

SYS.DOM.CREATE_SURFACE("SURF", "HELLO_WORLD", 100, 99.4, "DIAMETRIC");

//NOW HELLO_WORLD IS OBJECT WITH ONE CANVAS TAG
HELLO_WORLD.ENGINE.CREATE_MODUL("STARTER");
var SMODULE = HELLO_WORLD.ENGINE.MODULES.ACCESS_MODULE("STARTER");

SCRIPT.LOAD('examples/templates/sound.js')
