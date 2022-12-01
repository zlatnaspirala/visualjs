
/**
 * @description
 * Make javascript images resources objects data,
 * This is dev tools (GUI on page). Dont't use it in prodc.
 * @Developer Nikola Lukic
 * @email zlatnaspirala@gmail.com
 */

 module.exports = res = (config) => {

var fs = require("fs");
var path = require('path');

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}

// var config = config;

var FILE_STRING = `/** ojsa */\n
                    import SYS from '../../lib/system'
                    export var RESOURCE = {}; \n
                    RESOURCE.SUM = 0;   \n`;

var SUM_OF_IMAGES = 0;

function GET_FILES_NAME(path, name_of_animation_path, main_length) {
  fs.readdir(path, function(err, items) {
    for(var i = 0;i < items.length;i++) {
      if(i == 0) {
        // import {RESOURCE} from './lib/init';
        // FILE_STRING += "import {RESOURCE} from './lib/init'; \n";
        FILE_STRING += '  RESOURCE.' + name_of_animation_path + '={"source":[';
        SUM_OF_IMAGES++;
      }
      FILE_STRING = " " + FILE_STRING + "'" + name_of_animation_path + "/" + items[i] + "' , \n";
      if((i + 1) == items.length && main_length == false) {
        FILE_STRING += " ] }; \n";
      }
      if((i + 1) == items.length && main_length == true) {
        FILE_STRING += " ] }; window.RESOURCE = RESOURCE;  /**SYS.DEBUG.LOG('Resources loaded. ' + " + SUM_OF_IMAGES + ");*/ \n  RESOURCE.SUM = " + SUM_OF_IMAGES + "; ";
        CreateFile(config.PATH_OF_WWW + "res/animations/resource.js", FILE_STRING);
      }
    }
  });
}

// console.log(config.PATH_OF_WWW);
var LIST_OFF_ALL_ANIMATION_DIR = getDirectories(config.PATH_OF_WWW + "res/animations/");
var local__x = -1;

console.log('\x1b[36m%s\x1b[0m', "......................................");
console.log('\x1b[36m%s\x1b[0m', ".                                    .");
console.log('\x1b[36m%s\x1b[0m', ". Visual-js Resource builder         .");
console.log('\x1b[36m%s\x1b[0m', ". Version 3.0.0                      .");
console.log('\x1b[36m%s\x1b[0m', ". Thanks for using my software! 😘   .");
console.log('\x1b[36m%s\x1b[0m', "......................................");

for(var i in LIST_OFF_ALL_ANIMATION_DIR) {
  local__x++;
  val = LIST_OFF_ALL_ANIMATION_DIR[i];
  console.log('\x1b[33m%s\x1b[0m', "Obj Created :", LIST_OFF_ALL_ANIMATION_DIR[i]);
  if((local__x + 1) == LIST_OFF_ALL_ANIMATION_DIR.length) {
    GET_FILES_NAME(config.PATH_OF_WWW + "res/animations/" + val, val, true);
  } else {
    GET_FILES_NAME(config.PATH_OF_WWW + "res/animations/" + val, val, false);
  }
}

CreateFile(config.PATH_OF_WWW + "res/animations/resource.list", LIST_OFF_ALL_ANIMATION_DIR);

function CreateFile(path_, CONTENT) {
  fs.writeFile(path_, CONTENT.toString(), function(err) {
    var Reset = "\x1b[0m";
    if(err) {
      return console.log(err);
    } else {
      console.log('\x1b[36m%s\x1b[42m', `${path_}`);
      if (path_.indexOf('resource.list') !== -1) {
        console.log("\x1b[42m", "The resources list file was created. 🤘 [DONE]", Reset );
      } else {
        console.log("\x1b[42m", "The resources file was created. 🤘 [DONE]", Reset);
      }
    }
  });
}


 }