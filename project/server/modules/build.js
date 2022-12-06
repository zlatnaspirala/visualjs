
module.exports = build = (config) => {

  var APPLICATION = config;
  var fs = require("fs");
  var path = require('path');

  function getDirectories(srcpath) {
    return fs.readdirSync(srcpath).filter(function(file) {
      return fs.statSync(path.join(srcpath, file)).isDirectory();
    });
  }

  // LIST OFF ALL FILES
  async function GET_FILES_NAME(path, name_of_animation_path, main_length) {
    var name_of_animation_path = name_of_animation_path;
    return new Promise((resolve) => {
      //console.log(name_of_animation_path, " name_of_animation_path ");
      fs.readdir(path, function(err, items) {
        var ALL_FILES_OF_OBJECT = [];
        for(var i = 0;i < items.length;i++) {
          // console.log(items[i], "u push");
          ALL_FILES_OF_OBJECT.push(items[i]);
        }
        if(!err) {
          setTimeout(function() {
            resolve()
            GEN(name_of_animation_path, ALL_FILES_OF_OBJECT);
          }, 1);
        }
      });
    });
  }

  var TEST;
  var detIndex = 0;
  function GEN(name_of_animation_path, allfiles) {
    TEST = "";
    var allMyPromise = [];
    allfiles.forEach(function(item) {
      allMyPromise.push(READ(APPLICATION.PATH_OF_WWW + "cache/" + name_of_animation_path + "/" + item));
    });
    Promise.all(allMyPromise).then((e) => {
      if(detIndex == LIST_OFF_ALL_VISUAL_DIR.length - 1) {
        console.log(".Build =============! ", detIndex);
        CreateFile(APPLICATION.PATH_OF_WWW + "starter/visual.js", TEST);
      }
      detIndex++;
    });
  }

  var LIST_OFF_ALL_VISUAL_DIR = getDirectories(APPLICATION.PATH_OF_WWW + "cache/");
  var local__x = -1;
  console.log(APPLICATION.PATH_OF_WWW);
  for(var i in LIST_OFF_ALL_VISUAL_DIR) {
    local__x++;
    val = LIST_OFF_ALL_VISUAL_DIR[i];
    if((local__x + 1) == LIST_OFF_ALL_VISUAL_DIR.length) {
      // console.log("Obj Created: ", LIST_OFF_ALL_VISUAL_DIR[i]);
      GET_FILES_NAME(APPLICATION.PATH_OF_WWW + "cache/" + LIST_OFF_ALL_VISUAL_DIR[i], LIST_OFF_ALL_VISUAL_DIR[i], true);
    } else {
      // console.log("Obj Created :", LIST_OFF_ALL_VISUAL_DIR[i]);
      GET_FILES_NAME(APPLICATION.PATH_OF_WWW + "cache/" + LIST_OFF_ALL_VISUAL_DIR[i], LIST_OFF_ALL_VISUAL_DIR[i], false);
    }
  }

  function CreateFile(path_, CONTENT) {
    fs.writeFile(path_, CONTENT, function(err) {
      if(err) {
        return console.log(err);
      } else {
        console.log("   ");
        console.log("The build file was created DONE.");
        console.log("   ");
      }
    });
  }

  function READ(filePath) {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, {encoding: 'utf-8'}, function(err, data) {
        if(!err) {
          TEST += "\n" + data;
          resolve('good');
        } else {
          reject();
          console.log("ERROR IN BUILD : ", err);
        }
      });
    });
  }


}