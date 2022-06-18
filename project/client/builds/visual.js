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
}

(0, _program_modul.CREATE_SYSTEM_BUTTONS)(); ///////
// Run
///////

_system.default.DOM.CREATE_SURFACE("SURF", "HELLO_WORLD", 100, 99.4, "DIAMETRIC"); //NOW HELLO_WORLD IS OBJECT WITH ONE CANVAS TAG


HELLO_WORLD.ENGINE.CREATE_MODUL("STARTER");
var SMODULE = HELLO_WORLD.ENGINE.MODULES.ACCESS_MODULE("STARTER");
SCRIPT.LOAD('examples/templates/sound.js');

},{"./lib/audio/audio":2,"./lib/program_modul":5,"./lib/proto_modify":6,"./lib/system":7,"./manifest/manifest":8}],2:[function(require,module,exports){
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
      SYS.DEBUG.LOG("New file comes...");
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
    SYS.DEBUG.LOG("SYS : Surface created , program name is " + name_of_canvas);
    SYS.RUNNING_PROGRAMS.push(name_of_canvas);
    window[name_of_canvas] = new PROGRAM(window[ctx], this.c);
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
      SYS.DEBUG.WARNING("SYS : warning for procedure 'SYS.DOM.DESTROY_PROGRAM'  Desciption : arrg name :>> " + typeof name + " << not valid.");
    } else if (typeof window[name] === "undefined") {
      SYS.DEBUG.WARNING("SYS : warning for procedure 'SYS.DOM.DESTROY_PROGRAM'  Desciption : program with  name: " + name + " not exist. ");
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

      SYS.RUNNING_PROGRAMS.unset(name);
      SYS.DEBUG.LOG("SYS : log for procedure 'SYS.DOM.DESTROY_PROGRAM'  Desciption : program with  name :" + name + " is dead. Memory clear .");
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
    SYS.DEBUG.WARNING("error in loading localstorage object! name of object : name" + name + " , but value is " + localStorage.getItem(name));
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
        return SYS.DOM.E(SYS.RUNNING_PROGRAMS[0]).width;
      } else {
        return SYS.DOM.E(SYS.RUNNING_PROGRAMS[0]).width / 100 * per;
      }
    },
    H: function (per) {
      if (typeof per === "undefined") {
        return SYS.DOM.E(SYS.RUNNING_PROGRAMS[0]).height;
      } else {
        return SYS.DOM.E(SYS.RUNNING_PROGRAMS[0]).height / 100 * per;
      }
    },
    ASPECT: function () {
      return SYS.DOM.E(SYS.RUNNING_PROGRAMS[0]).width / SYS.DOM.E(SYS.RUNNING_PROGRAMS[0]).height;
    }
  }; // override CONVERTOR

  exports.CONVERTOR = CONVERTOR = {
    PER_TO_PIX: function (v) {
      var ONE_PERCENT = SYS.DOM.E(SYS.RUNNING_PROGRAMS[0]).width / 100;
      return v * ONE_PERCENT;
    },
    PIX_TO_PER: function (v) {
      var ONE_PERCENT = SYS.DOM.E(SYS.RUNNING_PROGRAMS[0]).width / 100;
      return v / ONE_PERCENT;
    },
    PER_TO_PIY: function (v) {
      var ONE_PERCENT = SYS.DOM.E(SYS.RUNNING_PROGRAMS[0]).height / 100;
      return v * ONE_PERCENT;
    },
    PIY_TO_PER: function (v) {
      var ONE_PERCENT = SYS.DOM.E(SYS.RUNNING_PROGRAMS[0]).height / 100;
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
  SURF.rotate(SYS.MATH.TO_RADIANS(angle));
  SURF.fillText(text, x + w / 2, y + h / 2, w);
  SURF.restore();
}

function drawRotatedTextNoSkrech(s, text, x, y, angle, w, h) {
  SURF.save();
  SURF.rotate(SYS.MATH.TO_RADIANS(angle));
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
    SYS.RES.SUM_OF_LOADED_IMAGES++;
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

},{}],4:[function(require,module,exports){
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

/**
 * Simple number round.
 * @function round
 * @param {number} value
 * @param {number} decimals
 * @return {number} Number
 */
function round(value, decimals) {
  if (typeof value === "object" || typeof decimals === "object") {
    SYS.DEBUG.WARNING("SYS : warning for procedure 'SYS.MATH.NUMBER_ROUND'  Desciption : Replace object with string ,  this >> " + typeof value + " << must be string or number.");
  } else if (typeof value === "undefined" || typeof decimals === "undefined") {
    SYS.DEBUG.WARNING("SYS : warning for procedure 'SYS.MATH.NUMBER_ROUND'  Desciption : arguments (value, decimals) cant be undefined ,  this >> " + typeof value + " << must be string or number.");
  } else {
    return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
  }
}

function randomIntFromTo(min, max) {
  if (typeof min === "object" || typeof max === "object") {
    SYS.DEBUG.WARNING("SYS : warning for procedure 'SYS.MATH.RANDOM_INT_FROM_TO'  Desciption : Replace object with string ,  this >> " + typeof min + " and " + typeof min + " << must be string or number.");
  } else if (typeof min === "undefined" || typeof max === "undefined") {
    SYS.DEBUG.WARNING("SYS : warning for procedure 'SYS.MATH.RANDOM_INT_FROM_TO'  Desciption : arguments (min, max) cant be undefined ,  this >> " + typeof min + " and " + typeof min + "  << must be string or number.");
  } else {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
} // Convert toDegrees/toRadians


function toDegrees(angle) {
  if (typeof angle === "string" || typeof angle === "number") {
    return angle * (180 / Math.PI);
  } else {
    SYS.DEBUG.WARNING("SYS : warning for procedure 'SYS.MATH.TO_RADIANS'  Desciption : Input arr ,  angle >> " + typeof angle + "  << must be string or number.");
  }
}

function toRadians(angle) {
  if (typeof angle === "string" || typeof angle === "number") {
    return angle * (Math.PI / 180);
  } else {
    SYS.DEBUG.WARNING("SYS : warning for procedure 'SYS.MATH.TO_RADIANS'  Desciption : Input arr ,  angle >> " + typeof angle + "  << must be string or number.");
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
    SYS.DEBUG.WARNING("SYS : warning for procedure 'SYS.MATH.OSCILLATOR'  Desciption : Replace object with string or number,  min >> " + typeof min + " and max >>" + typeof max + "  and step >>" + typeof step + " << must be string or number.");
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
    SYS.DEBUG.WARNING("SYS : warning for procedure 'SYS.MATH.OSCILLATOR'  Desciption : Replace object with string or number,  min >> " + typeof min + " and max >>" + typeof max + "  and step >>" + typeof step + " << must be string or number.");
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
    SYS.DEBUG.WARNING("SYS : warning for procedure new 'DIMENSION'  Desciption : arguments (w , h ) are  undefined ,  system will setup 10% of width and height.");
  } else {
    this.W = w;
  }

  if (typeof h === undefined) {
    this.H = 10;
    SYS.DEBUG.WARNING("SYS : warning for procedure new 'DIMENSION'  Desciption : arguments (w , h ) are  undefined ,  system will setup 10% of width and height.");
  } else {
    this.H = h;
  }

  this.WIDTH = function () {
    if (ROOT_DIMENSION.type == "NORMAL") {
      return window.innerWidth / 100 * this.W;
    } else if (ROOT_DIMENSION.type == "REF_CANVAS") {
      return SYS.DOM.E(SYS.RUNNING_PROGRAMS[0]).width / 100 * this.W;
    }
  };

  this.HEIGHT = function () {
    if (ROOT_DIMENSION.type == "NORMAL") {
      return window.innerHeight / 100 * this.H;
    } else if (ROOT_DIMENSION.type == "REF_CANVAS") {
      return SYS.DOM.E(SYS.RUNNING_PROGRAMS[0]).height / 100 * this.H;
    }
  };
}

function POSITION(curentX, curentY, targetX_, targetY_, thrust_) {
  var ROOT = this;
  this.FREEZ = false;
  ROOT.CANVAS_ = window[SYS.RUNNING_PROGRAMS[0]].ENGINE.PROGRAM_ID;

  this.ON_TARGET_POSITION = function () {}; //parameters


  this.x = curentX;
  this.y = curentY;
  this.targetX = targetX_;
  this.targetY = targetY_;
  this.velX = 0;
  this.velY = 0;
  this.thrust = thrust_;

  if (APPLICATION.PROGRAM.CALCULATING_POSITION_BY == "MONITOR") {
    this.TYPE = "NORMAL";
  } else if (APPLICATION.PROGRAM.CALCULATING_POSITION_BY == "CANVAS") {
    this.TYPE = "REF_CANVAS";
  }

  this.IN_MOVE = true; //metods

  this.SET_SPEED = function (num_) {
    if (typeof num_ === "number") {
      this.thrust = num_;
    } else {
      SYS.DEBUG.WARNING("SYS : warning for method 'POSITION.SET_SPEED'  Desciption : arguments (w , h ) must be type of number.");
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
          if (window[ROOT.PROGRAM_NAME].ENGINE.GAME_TYPE != "PLATFORMER" && APPLICATION.EDITOR == true) {
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
      return SYS.DOM.E(ROOT.CANVAS_).width / 100 * this.x;
    }
  };

  this.Y = function () {
    if (window[ROOT.PROGRAM_NAME].ENGINE.GAME_TYPE == "PLATFORMER" && typeof ROOT.PLAYER === "undefined") {
      return window.innerHeight / 100 * this.y;
    } else {
      if (ROOT.TYPE == "NORMAL") {
        return window.innerHeight / 100 * this.y;
      } else if (ROOT.TYPE == "REF_CANVAS") {
        return SYS.DOM.E(ROOT.CANVAS_).height / 100 * this.y;
      }
    }
  };
}

},{}],5:[function(require,module,exports){
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CREATE_SYSTEM_BUTTONS() {
  if (typeof window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]] !== "undefined" && typeof window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE !== "undefined") {
    window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.CREATE_MODUL("GUI_STARTER");

    if (NOMOBILE == 0) {
      CREATE_VIRTUAL_KEYBOARD();
      HIDE_KEYBOARD();
    } else {
      if (APPLICATION.ACCESSIBILITY.VIRTUAL_KEYBOARD_FOR_DESKTOP == true) {
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

},{"./system":7}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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

},{"./init":3,"./math":4}],8:[function(require,module,exports){
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
    IMAGE_LOADER_PREFIX: true, // false for fiddle support , we need absolute path.
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
        }, // in run time
        DEACTIVATE_VK_FOR_DESKTOP: function () {
            APPLICATION.ACCESSIBILITY.VIRTUAL_KEYBOARD_FOR_DESKTOP = false
        }, // in run time
    },
    SINGLE_BROADCAST: true,
    MULTIRTC_PEER: true,
    BOX2D: false,
    PROGRAM: {
        CALCULATING_POSITION_BY: "CANVAS", // MONITOR is innerWidth..Height  or CANVAS is  canvas width
        RENDER_SPEED: 5,
        UPDATE_SPEED: 5,
    },
    SYSTEM: {
        COLOR: "#afa9aa",
        HOVER_COLOR: "#5991FF",
        TEXT_COLOR: "black",
        ACTOR_X: "",
        ACTOR_Y: "",
    },
};

},{}]},{},[1]);
