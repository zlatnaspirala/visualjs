
module.exports = build = (config) => {

  var fs = require("fs");
  var path = require('path');

  function read(f) {return fs.readFileSync(f).toString();}
  function getDirectories(srcpath) {
    return fs.readdirSync(srcpath).filter(function(file) {
      return fs.statSync(path.join(srcpath, file)).isDirectory();
    });
  }

  var APPLICATION = config;
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
        if((i + 1) == items.length && main_length == false) {
          // FILE_STRING += "  // end off object  ";
        }
        if((i + 1) == items.length && main_length == true) {
          console.log("EXE GEN", name_of_animation_path);
        }
      }

      if(!err) {
        setTimeout(function() {
          GEN(name_of_animation_path, ALL_FILES_OF_OBJECT);
        }, 4000);
      }
    });
  }

  var TEST;
  function GEN(name_of_animation_path, ALL_FILES_OF_OBJECT) {
    TEST = "";

    ALL_FILES_OF_OBJECT.forEach(function(item) {
      console.log("EXE GEN", name_of_animation_path);
      READ(APPLICATION.PATH_OF_WWW + "cache/" + name_of_animation_path + "/" + item);
    });

    setTimeout(function() {
      console.log("wait 1 sec");
      CreateFile(APPLICATION.PATH_OF_WWW + "starter/visual.js", TEST);
    }, 1200);
  }

  console.log(APPLICATION.PATH_OF_WWW);
  var LIST_OFF_ALL_VISUAL_DIR = getDirectories(APPLICATION.PATH_OF_WWW + "cache/");
  var local__x = -1;

  for(var i in LIST_OFF_ALL_VISUAL_DIR) {
    local__x++;
    val = LIST_OFF_ALL_VISUAL_DIR[i];
    //console.log("Obj Created :" , LIST_OFF_ALL_VISUAL_DIR[i]);
    if((local__x + 1) == LIST_OFF_ALL_VISUAL_DIR.length) {
      console.log("Obj Created: ", LIST_OFF_ALL_VISUAL_DIR[i]);
      GET_FILES_NAME(APPLICATION.PATH_OF_WWW + "cache/" + LIST_OFF_ALL_VISUAL_DIR[i], LIST_OFF_ALL_VISUAL_DIR[i], true);
    } else {
      console.log("Obj Created :", LIST_OFF_ALL_VISUAL_DIR[i]);
      GET_FILES_NAME(APPLICATION.PATH_OF_WWW + "cache/" + LIST_OFF_ALL_VISUAL_DIR[i], LIST_OFF_ALL_VISUAL_DIR[i], false);
    }
  }

  function CreateFile(path_, CONTENT) {
    fs.writeFile(path_, CONTENT, function(err) {
      if(err) {
        return console.log(err);
      } else {
        console.log('\x1b[36m%s\x1b[0m', "......................................");
        console.log('\x1b[36m%s\x1b[0m', ".                                    .");
        console.log('\x1b[36m%s\x1b[0m', ". Visual-js 3 Build editor script    .");
        console.log('\x1b[36m%s\x1b[0m', ". Version " + CONFIG.VERSION + "                      .");
        console.log('\x1b[36m%s\x1b[0m', ". Port: " + CONFIG.EDITOR_PORT + "                         .");
        console.log('\x1b[36m%s\x1b[0m', ". Thanks for using my software! 😘   .");
        console.log('\x1b[36m%s\x1b[0m', "......................................");
        
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

}