
var dl = require('delivery');
var fs = require("fs");
var path = require('path');
var mysql = require('mysql');
var express = require("express");
var app = express();
var http = require('http');
var https = require('https');
var mkdirp = require('mkdirp')

function read(f) {return fs.readFileSync(f).toString();}
function include(f) {eval.apply(global, [read(f)]);}
function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}

var APPLICATION = require('./config.js');
var FILE_STRING = "";
var SUM_OF_IMAGES = 0;

// LIST OFF ALL FILES
function GET_FILES_NAME(path, name_of_animation_path, main_length) {
  var name_of_animation_path = name_of_animation_path;
  //console.log(path , "<PATH");
  var ALL_FILES_OF_OBJECT = [];

  fs.readdir(path, function(err, items) {
    console.log(items, "<items");
    for(var i = 0;i < items.length;i++) {
      if(i == 0) {
        FILE_STRING += ' /* Visual js version 0.5 app Build object  ' + name_of_animation_path + '  */  ';
        SUM_OF_IMAGES++;
      }
      console.log(items[i], "");
      ALL_FILES_OF_OBJECT.push(items[i]);
      // FILE_STRING  = " " + FILE_STRING + "";
      if((i + 1) == items.length && main_length == false) {
        // FILE_STRING += "  // end off object  ";
      }
      if((i + 1) == items.length && main_length == true) {
        //FILE_STRING += "  SYS.DEBUG.LOG('Generated visual script loaded.')";
        console.log("EXE GEN", name_of_animation_path);
      }
    }

    if(!err) {
      setTimeout(function() {
        GEN(name_of_animation_path, ALL_FILES_OF_OBJECT);
      }, 2000);
    }
  });
}

var TEST;
function GEN(name_of_animation_path, ALL_FILES_OF_OBJECT) {
  TEST = "";

  ALL_FILES_OF_OBJECT.forEach(function(item) { /* etc etc */

    console.log("EXE GEN", name_of_animation_path)
    READ(APPLICATION.PATH_OF_WWW + "lib/visual_script/" + name_of_animation_path + "/" + item);
  });

  setTimeout(function() {
    console.log("wait 1 sec");
    CreateFile(APPLICATION.PATH_OF_WWW + "starter/visual.js", TEST);
  }, 1200);
}

// LIST OFF ALL DIRECTORY
console.log(APPLICATION.PATH_OF_WWW);
var LIST_OFF_ALL_VISUAL_DIR = getDirectories(APPLICATION.PATH_OF_WWW + "lib/visual_script/");
var local__x = -1;

console.log("   ");
console.log("......................................");
console.log(".Build app generator");
console.log("......................................");

for(var i in LIST_OFF_ALL_VISUAL_DIR) {
  local__x++;
  val = LIST_OFF_ALL_VISUAL_DIR[i];
  //console.log("Obj Created :" , LIST_OFF_ALL_VISUAL_DIR[i]);
  if((local__x + 1) == LIST_OFF_ALL_VISUAL_DIR.length) {
    console.log("Obj Created: ", LIST_OFF_ALL_VISUAL_DIR[i]);
    GET_FILES_NAME(APPLICATION.PATH_OF_WWW + "lib/visual_script/" + LIST_OFF_ALL_VISUAL_DIR[i], LIST_OFF_ALL_VISUAL_DIR[i], true);
  } else {
    console.log("Obj Created :", LIST_OFF_ALL_VISUAL_DIR[i]);
    GET_FILES_NAME(APPLICATION.PATH_OF_WWW + "lib/visual_script/" + LIST_OFF_ALL_VISUAL_DIR[i], LIST_OFF_ALL_VISUAL_DIR[i], false);
  }
}

function CreateFile(path_, CONTENT) {
  fs.writeFile(path_, CONTENT, function(err) {
    if(err) {
      return console.log(err);
    } else {
      console.log("......................................");
      console.log("   ");
      console.log("The build file was created DONE.");
      console.log("   ");
    }
  });
}

function READ(filePath) {
  fs.readFile(filePath, {encoding: 'utf-8'}, function(err, data) {
    if(!err) {
      TEST += "\n" + data;
    } else {
      console.log("ERROR IN BUILD : ", err);
    }
  });
}
