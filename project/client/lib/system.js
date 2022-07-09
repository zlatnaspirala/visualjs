/**
 * Created by Nikola Lukic zlatnaspirala@gmail.com
 * @example SYS.DEBUG.LOG('welcome to extrime')
 * @Object {object} SYS
 */
import {
  DEEP_COPY,
  DETECTBROWSER,
  SCRIPT,
  DOM,
  LOG,
  CREATE_IMG,
  test_webcam_device,
  CONVERTOR,
  removeItem,
  readXML,
  SOUND
} from "./init";

import { RESOURCE } from "../res/animations/resource.js";

import {
  round,
  randomIntFromTo,
  toDegrees,
  toRadians,
  OSCILLATOR,
  INCREMENTATOR,
  ORBIT
} from "./math";

var SYS = {
  ROOT: this,

  /**
   * Get browser data
   * @property {DETECTBROWSER} BROWSER
   */
  BROWSER: new DETECTBROWSER(),

  /**
  Load/Add dinamic script in runtime
   */
  SCRIPT: SCRIPT,

  /**
  Works with html canvas element ,
  create surface and setup main program loop
   */
  DOM: new DOM(),

  /**
  Just list of running programs
   */
  RUNNING_PROGRAMS: new Array(),
  /**
  DEBUG
  console.log polumorh call
  switch on/off
   */
  DEBUG: new LOG(),

  READY: false,

  /**
  RES - resources
  Image object creator
   */
  RES: {
    SUM_OF_LOADED_IMAGES: 0,
    CREATE_IMG: CREATE_IMG,
    RESOURCE: RESOURCE
  },

  // Math
  /**
  Math - operation
   */
  MATH: {
    NUMBER_ROUND: round,
    RANDOM_INT_FROM_TO: randomIntFromTo,
    TO_DEGREES: toDegrees,
    TO_RADIANS: toRadians,
    OSCILLATOR: OSCILLATOR,
    CONVERT: CONVERTOR,
    INCREMENTATOR: INCREMENTATOR,
    ORBIT: ORBIT
  },

  ARRAY_OPERATION: {
    REMOVE_ALL_ITEMS_WITH_VALUE: removeItem,
    DEEP_COPY: DEEP_COPY,
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
    ON_LEFT_BTN_PRESSED: function () {},
  },

  XML: {
    READ: readXML,
  },

  SOUND: {
    GEN: SOUND,
    RES: {},
  },

  VOICE: {
    SPEAK: function () {},
    LISTEN: function () {},
  },

  CAMERA: {
    SUPPORT: test_webcam_device(),
  },
};

export default SYS;
