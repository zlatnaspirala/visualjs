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
export function DETECTBROWSER() {
  var HREFF,
    HREFTXT = "unknown";
  this.NAVIGATOR = navigator.userAgent;
  var NAV = navigator.userAgent;
  var gecko,
    navIpad,
    operatablet,
    navIphone,
    navFirefox,
    navChrome,
    navOpera,
    navSafari,
    navandroid,
    mobile,
    navMozilla,
    navUbuntu,
    navLinux;
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

  var mobile =
    /iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(
      navigator.userAgent.toLowerCase()
    );
  if (mobile) {
    var userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.search("android") > -1 && userAgent.search("mobile") > -1) {
      console.log("ANDROID MOBILE");
    } else if (
      userAgent.search("android") > -1 &&
      !(userAgent.search("mobile") > -1)
    ) {
      console.log(" ANDROID TABLET ");
      TYPEOFANDROID = 1;
    }
  } else {
    NOMOBILE = 1;
  }
  //  FIREFOX za android
  if (navFirefox && navandroid && TYPEOFANDROID == 0) {
    HREFF = "#";
    HREFTXT = "mobile_firefox_android";
  }
  //  FIREFOX za android T
  if (navFirefox && navandroid && TYPEOFANDROID == 1) {
    HREFF = "#";
    HREFTXT = "mobile_firefox_android_tablet";
  }
  // OPERA ZA ANDROID
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
  }
  // TEST CHROME
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
  }

  //linux
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
export function LOG() {
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
      console.log(
        "%c Network view : " + data,
        "background: #333; color: #a7afaf"
      );
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
export function DOM() {
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
    }
    //document.body.appendChild(x);
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
      SYS.DEBUG.WARNING(
        "SYS : warning for procedure 'SYS.DOM.DESTROY_PROGRAM'  Desciption : arrg name :>> " +
          typeof name +
          " << not valid."
      );
    } else if (typeof window[name] === "undefined") {
      SYS.DEBUG.WARNING(
        "SYS : warning for procedure 'SYS.DOM.DESTROY_PROGRAM'  Desciption : program with  name: " +
          name +
          " not exist. "
      );
    } else {
      //memory
      window[name].DRAW = function () {};
      window[name].UPDATE = function () {};
      window[name].DRAW_INTERVAL = undefined;
      window[name].UPDATE_INTERVAL = undefined;
      window[name].AUTO_UPDATE = [];
      window[name].AUTO_UPDATE = undefined;
      window[name] = undefined;
      delete window[name];
      //remove dom element canvas
      //this.removeElement(SYS.DOM.E(name));
      SYS.RUNNING_PROGRAMS.unset(name);
      SYS.DEBUG.LOG(
        "SYS : log for procedure 'SYS.DOM.DESTROY_PROGRAM'  Desciption : program with  name :" +
          name +
          " is dead. Memory clear ."
      );
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
export function test_webcam_device() {
  function hasGetUserMedia() {
    return !!(
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia
    );
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
export function SET_STREAM(video) {
  /**
   * webcamError webcamError
   * @private
   * @memberof SET_STREAM method
   */
  var webcamError = function (e) {
    alert("Webcam error!", e);
  };

  if (navigator.webkitGetUserMedia) {
    navigator.webkitGetUserMedia(
      {
        audio: true,
        video: true,
      },
      function (stream) {
        video.srcObject = stream;
        //video.src = window.URL.createObjectURL(stream);
        // initialize();
      },
      webcamError
    );
  } else if (navigator.getUserMedia) {
    navigator.getUserMedia(
      {
        audio: true,
        video: true,
      },
      function (stream) {
        //video.src = stream;
        video.src = window.URL.createObjectURL(stream);
        //initialize();
      },
      webcamError
    );
  } else {
    alert("webcam broken.");
  }
}

/**
 * Cheking AudioContext browser support.
 * @function initialize
 * @access global initialize
 */
export function initialize() {
  if (!AudioContext) {
    alert("AudioContext not supported!");
  } else {
    loadSounds();
  }
}

export var lineLength = function (x, y, x0, y0) {
  return Math.sqrt((x -= x0) * x + (y -= y0) * y);
};

export var PAGE = {
  SET_ICON: function (SRC) {
    var link = document.createElement("link");
    link.type = "image/x-icon";
    link.rel = "shortcut icon";
    //SRC
    //link.href = 'http://www.stackoverflow.com/favicon.ico';
    link.href = "favicon.png";
    document.getElementsByTagName("head")[0].appendChild(link);
  },
  ANIMATE_ICON: null,
  ANIMATE: function () {
    //this.ANIMATE_ICON = setInterval(function(){
    //},200);
  },
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
export function LS_SET(name, value) {
  localStorage.setItem(name, value);
}

/**
 * LS_GET is LocalStorage function
 * @example Usage : LS_GET("MyObjectKey", myObject )
 * @function LS_GET
 * @param {String} Name Name of localstorage key
 * @return {Any} What ever we are stored intro localStorage.
 */
export function LS_GET(name) {
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
export function SAVE(name, obj) {
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
export function LOAD(name) {
  if (
    localStorage.getItem(name) == "undefined" ||
    localStorage.getItem(name) == null ||
    localStorage.getItem(name) == ""
  ) {
    SYS.DEBUG.WARNING(
      "error in loading localstorage object! name of object : name" +
        name +
        " , but value is " +
        localStorage.getItem(name)
    );
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
export function readXML(path, operation) {
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

export function xmlToJson(xml) {
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
  }

  // do children
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
}

// MONITOR AND BROWSER_VIEW- COORDINATE SYSTEM
export function MONITOR() {}

/**
 * VIEW
 * @example Usage : VIEW.W(50)
 * @Object VIEW
 */
export var VIEW = {
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
      return (window.innerWidth / 100) * per;
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
      return (window.innerHeight / 100) * per;
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
  },
};

/**
 * OVERRIDE_TO_REF_CANVAS
 * Future feature related function!
 * @example Usage : OVERRIDE_TO_REF_CANVAS()
 * @function OVERRIDE_TO_REF_CANVAS
 * @return nothing
 */
export function OVERRIDE_TO_REF_CANVAS() {
  VIEW = {
    W: function (per) {
      if (typeof per === "undefined") {
        return SYS.DOM.E(SYS.RUNNING_PROGRAMS[0]).width;
      } else {
        return (SYS.DOM.E(SYS.RUNNING_PROGRAMS[0]).width / 100) * per;
      }
    },
    H: function (per) {
      if (typeof per === "undefined") {
        return SYS.DOM.E(SYS.RUNNING_PROGRAMS[0]).height;
      } else {
        return (SYS.DOM.E(SYS.RUNNING_PROGRAMS[0]).height / 100) * per;
      }
    },

    ASPECT: function () {
      return (
        SYS.DOM.E(SYS.RUNNING_PROGRAMS[0]).width /
        SYS.DOM.E(SYS.RUNNING_PROGRAMS[0]).height
      );
    },
  };

  // override CONVERTOR
  CONVERTOR = {
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
    },
  };
}

  // Array works , remove all array items with same values
export function removeItem(arr) {
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
  }
  // removeA(arrayNAME,'-delete-all-value-');

/**
 * CONVERTOR
 * percents to pixel convert by Width reference
 * @example Usage : CONVERTOR.PER_TO_PIX(10)
 * @function CONVERTOR.PER_TO_PIX
 * @param {Number} V V is number of percents.
 * @return {Number} Value represent number of pixels.
 */
export var CONVERTOR = {
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
  },
};
//###############################################//###############################################

//Move to modify proto file
export function remove_last(str) {
  return str.slice(0, -1);
}

export var DEEP_COPY = {
  //public method
  getCloneOfObject: function (oldObject) {
    var tempClone = {};

    if (typeof oldObject == "object")
      // for array use private method getCloneOfArray
      for (prop in oldObject)
        if (typeof oldObject[prop] == "object" && oldObject[prop].__isArray)
          tempClone[prop] = this.getCloneOfArray(oldObject[prop]);
        // for object make recursive call to getCloneOfObject
        else if (typeof oldObject[prop] == "object")
          tempClone[prop] = this.getCloneOfObject(oldObject[prop]);
        // normal (non-object type) members
        else tempClone[prop] = oldObject[prop];

    return tempClone;
  },

  getCloneOfArray: function (oldArray) {
    var tempClone = [];
    for (var arrIndex = 0; arrIndex <= oldArray.length; arrIndex++)
      if (typeof oldArray[arrIndex] == "object")
        tempClone.push(this.getCloneOfObject(oldArray[arrIndex]));
      else tempClone.push(oldArray[arrIndex]);
    return tempClone;
  },
};

export function SOUND(duration, fref) {
  var audio = new window.AudioContext();
  var osc = audio.createOscillator();
  osc.frequency.value = fref;
  osc.connect(audio.destination);
  osc.start(0);

  setTimeout(function () {
    osc.stop();
    audio.close();
    audio = null;
    osc = null;
    ///delete osc;
    //delete audio;
  }, duration);
}

var RESOURCE = new Object();
RESOURCE.SUM = 0;

export function drawRotatedImage(image, x, y, angle, w, h, surf) {
  surf.save();
  surf.translate(x + w / 2, y + h / 2);
  surf.rotate(angle);
  if (typeof image !== "undefined") {
    surf.drawImage(image, -(w / 2), -(h / 2), w, h);
  }
  surf.restore();
}

export function drawRotatedText(s, text, x, y, angle, w, h) {
  SURF.save();
  SURF.rotate(SYS.MATH.TO_RADIANS(angle));
  SURF.fillText(text, x + w / 2, y + h / 2, w);
  SURF.restore();
}

export function drawRotatedTextNoSkrech(s, text, x, y, angle, w, h) {
  SURF.save();
  SURF.rotate(SYS.MATH.TO_RADIANS(angle));
  SURF.fillText(text, x + w / 2, y + h / 2);
  SURF.restore();
}

export function roundedRect(
  SURF,
  t,
  x,
  y,
  width,
  height,
  radius,
  color,
  type,
  strokeColor
) {
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
};

// Performance off cpu
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
    } else if (
      cpu_canvas_power.begin == new Date().getSeconds() &&
      cpu_canvas_power.end_count == 0
    ) {
      console.log("cpu...");
    } else if (
      cpu_canvas_power.begin + 1 == new Date().getSeconds() &&
      cpu_canvas_power.end_count < 2
    ) {
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
  },
};

// tracking
export function TRACK_NOW() {
  var video = document.getElementById("video");
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");

  var tracker = new tracking.ObjectTracker("face");
  tracker.setInitialScale(4);
  tracker.setStepSize(2);
  tracker.setEdgesDensity(0.1);

  tracking.track("#video", tracker, {
    camera: true,
  });
  tracker.on("track", function (event) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    event.data.forEach(function (rect) {
      context.strokeStyle = "#a64ceb";
      context.strokeRect(rect.x, rect.y, rect.width, rect.height);
      context.font = "11px Helvetica";
      context.fillStyle = "#fff";
      context.fillText(
        "x: " + rect.x + "px",
        rect.x + rect.width + 5,
        rect.y + 11
      );
      context.fillText(
        "y: " + rect.y + "px",
        rect.x + rect.width + 5,
        rect.y + 22
      );
    });
  });
}

// class GRADIENT
export function GRADIENT(color1, color2) {
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
export function CREATE_IMG(name, src) {
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
export var SCRIPT = {
  SCRIPT_ID: 0,
  SINHRO_LOAD: {},
  LOAD: function addScript(src) {
    var s = document.createElement("script");
    s.onload = function () {
      SCRIPT.SCRIPT_ID++;
      console.log(
        "Script id loaded : " +
          SCRIPT.SCRIPT_ID +
          " with src : " +
          this.src +
          ">>>>>>>>>" +
          this.src
      );

      var filename = this.src.substring(
        this.src.lastIndexOf("/") + 1,
        this.src.lastIndexOf(".")
      );
      //console.log(filename)
      filename = filename.replace(".", "_");
      eval("try{SCRIPT.SINHRO_LOAD._" + filename + "(s)}catch(e){}");
    };
    s.setAttribute("src", src);
    document.body.appendChild(s);
  },
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
export function validateEmail(email) {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
