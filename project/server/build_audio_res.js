
// High definition
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
var SUM_OF_AUDIOS = 0;

// LIST OFF ALL FILES
function GET_FILES_NAME(path) {
  fs.readdir(path, function(err, items) {

    for(var i = 0;i < items.length;i++) {

      var local = items[i];
      local = local.replace(".", "_");

      if(i == 0) {
        FILE_STRING += ' \n var AUDIO_RESOURCE = new Object(); AUDIO_RESOURCE ={"source":[';
        SUM_OF_AUDIOS++;
      }

      FILE_STRING = " " + FILE_STRING + "'" + items[i] + "' , \n";

      if((i + 1) == items.length) {

        FILE_STRING += " ] }; \n";

      }

      if((i + 1) == items.length) {

        FILE_STRING += "SYS.DEBUG.LOG('Audio resources loaded. ' + " + SUM_OF_AUDIOS + "); \n  AUDIO_RESOURCE.SUM = " + SUM_OF_AUDIOS + "; ";
        CreateFile(APPLICATION.PATH_OF_WWW + "res/resource.audio", FILE_STRING);

      }

    }

  });
}

GET_FILES_NAME(APPLICATION.PATH_OF_WWW + "res/audio/");

function CreateFile(path_, CONTENT) {

  fs.writeFile(path_, CONTENT, function(err) {
    if(err) {
      return console.log(err);
    } else {
      //console.log("List of the resources object names : " , LIST_OFF_ALL_ANIMATION_DIR ); 
      console.log("......................................");
      console.log("   ");
      console.log("The resources file was created DONE.");
      console.log("   ");
    }
  });

}