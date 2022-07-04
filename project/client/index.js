
import SYS from "./lib/system";
import APPLICATION from './manifest/manifest';
import ActivateModifiers from './lib/proto_modify';
import {CREATE_SYSTEM_BUTTONS} from './lib/program_modul';
import {GET_ALL_GAME_OBJECTS} from "./lib/editor/editor";

/**
 * @description 
 * Convert to lowercase letters. 
 */

let sys = SYS,
    application = APPLICATION,
    loadEditor = CREATE_SYSTEM_BUTTONS,
    loadEditorObjects = GET_ALL_GAME_OBJECTS;

export {
  sys,
  application,
  ActivateModifiers,
  loadEditor,
  loadEditorObjects,
  SYS,
  APPLICATION
}