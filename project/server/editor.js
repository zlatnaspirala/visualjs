
var fs = require("fs");
var path = require("path");
var express = require("express");
var app = express();
var http = require("http");
var mkdirp = require("mkdirp");

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}

function random(low, high) {
  return Math.random() * (high - low) + low;
}

var CONFIG = require("./config.js");

var server = http.createServer(app);
var io = require("socket.io")(server,
  {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  });

server.listen(CONFIG.EDITOR_PORT);

console.log('\x1b[36m%s\x1b[0m', "......................................");
console.log('\x1b[36m%s\x1b[0m', ".                                    .");
console.log('\x1b[36m%s\x1b[0m', ". Visual-js On Page Editor           .");
console.log('\x1b[36m%s\x1b[0m', ". Version " + CONFIG.VERSION + "                      .");
console.log('\x1b[36m%s\x1b[0m', ". Port: " + CONFIG.EDITOR_PORT + "                         .");
console.log('\x1b[36m%s\x1b[0m', ". Thanks for using my software! 😘   .");
console.log('\x1b[36m%s\x1b[0m', "......................................");

function deleteFile(filePath) {
  try {
    fs.unlinkSync(filePath);
    io.sockets.emit("RETURN", "FILE_DELETED", filePath);
  } catch(err) {
    console.warn('Editor cmd deleteFile faild...');
  }
}

function createFile(path_, script_inner, client_path, ACTION) {
  fs.writeFile(path_, "  " + script_inner + " ", function(err) {
    if(err) {
      return console.log(err);
    } else {
      if(ACTION == "AFTER_F5") {
        io.sockets.emit("RETURN", "LOAD_SCRIPT_AFTER_F5", client_path);
      } else if(ACTION == "LOAD_NOW") {
        io.sockets.emit("RETURN", "LOAD_SCRIPT", client_path, 1);
      }
    }
  });
}

var deleteFolder = function(path) {
  if(fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function(file) {
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolder(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

// Networking
var usernames = {}; // not in use

// Validate every signal in account view
io.sockets.on("connection", function(socket) {

  console.log('\x1b[32m%s\x1b[0m', "EDITOR: CONECTED WITH CLIENT APPLICATION! ");

  // DELETE_FROM_VISUAL_SCRIPTS CMD
  socket.on("DELETE_FROM_VISUAL_SCRIPTS", function(PROGRAM_NAME) {

    var localpath = CONFIG.PATH_OF_WWW + "cache/";
    var LIST_OFF_ALL_GAME_OBJECT = getDirectories(localpath);

    console.log(LIST_OFF_ALL_GAME_OBJECT, "<<LIST_OFF_ALL_GAME_OBJECT");
    var local__x = 0;
    for(var i in LIST_OFF_ALL_GAME_OBJECT) {

      local__x++;
      val = LIST_OFF_ALL_GAME_OBJECT[i];
      console.log("VAL :", LIST_OFF_ALL_GAME_OBJECT[i]);
      if(val != 'redraw') {
        deleteFolder(localpath + val);
      } else if(val == 'redraw') {
        var lp = localpath + val + '/a9.js';
        deleteFile(lp);
      }

    }

    // best
    io.sockets.emit("RETURN", "REFRESH");

  });

  //SET_MAIN_INTERVAL
  socket.on("SET_MAIN_INTERVAL", function(PROGRAM_NAME, r, u) {
    console.log("SET_MAIN_INTERVAL: ", PROGRAM_NAME, "new data ", r, " ", u);
    var local_path = CONFIG.PATH_OF_WWW + "cache/redraw";
    var local_pathC = "cache/redraw/a9.js";
    createFile(local_path + "/a9.js",
      `window["${PROGRAM_NAME}"].DRAW_INTERVAL = ` + parseFloat(r) + `; \n 
      window["${PROGRAM_NAME}"].UPDATE_INTERVAL = ` + parseFloat(u) + `; \n `,
      local_pathC, "LOAD_NOW");
  });

  // a2
  socket.on("ADD_NEW_GAME_OBJECT",
    function(name, x, y, w, h, PROGRAM_NAME, MODUL) {
      mkdirp(
        `${CONFIG.PATH_OF_WWW}cache/${name}`, {recursive: true}).then((__) => {
          console.log("ADD_NEW_GAME_OBJECT ACTION PATH =>  ", __);
          if(__) {
            var local_path = CONFIG.PATH_OF_WWW + "cache/" + name;
            var local_pathC = "cache/" + name + "/a2.js";
            //HELLO_WORD.ENGINE.MODULES.ACCESS_MODULE("STARTER").NEW_OBJECT("NIKOLA" , 45 , 45 , 10 , 10 , 6);
            createFile(
              local_path + "/" + "a2.js",
              "" +
              PROGRAM_NAME +
              ".ENGINE.MODULES.ACCESS_MODULE( '" +
              MODUL +
              "').NEW_OBJECT('" +
              name +
              "'," +
              x +
              " , " +
              y +
              "," +
              w +
              "," +
              h +
              ");",
              local_pathC,
              "LOAD_NOW"
            );
          }
        }
        );
    }
  );

  // a2
  socket.on("DESTROY_GAME_OBJECT_WITH_DELAY",
    function(name, sec, MODUL, PROGRAM_NAME) {
      console.log("DESTROY_GAME_OBJECT_WITH_DELAY :", name, sec);
      sec = sec * 20;
      var local_path = CONFIG.PATH_OF_WWW + "cache/" + name;
      var local_pathC = "cache/" + name + "/a2.js";

      createFile(
        local_path + "/" + "a2.js",
        "" +
        PROGRAM_NAME +
        ".ENGINE.MODULES.ACCESS_MODULE( '" +
        MODUL +
        "').GAME_OBJECTS.ACCESS('" +
        name +
        "').DESTROY_AFTER = " +
        sec +
        ";",
        local_pathC,
        "AFTER_F5"
      );
    }
  );

  // a2
  socket.on("SET_NEW_START_UP_POSITION",
    function(name, PROGRAM_NAME, MODUL, newX, newY, w, h) {

      // console.log("NEW POSITION FOR , process.cwd() ", process.cwd());

      var local_path = CONFIG.PATH_OF_WWW + "cache/" + name;
      var local_pathC = "cache/" + name + "/a2.js";
      //createFile(  local_path + "/" + "startup_pos.js" , "" + PROGRAM_NAME + ".ENGINE.MODULES.ACCESS_MODULE( '" +  MODUL + "').GAME_OBJECTS.ACCESS('" + name + "').POSITION.SET_POSITION( "+newX+" , "+newY+");",  local_pathC , "AFTER_F5");
      createFile(
        local_path + "/" + "a2.js",
        "" +
        PROGRAM_NAME +
        ".ENGINE.MODULES.ACCESS_MODULE( '" +
        MODUL +
        "').NEW_OBJECT('" +
        name +
        "'," +
        newX +
        " , " +
        newY +
        "," +
        w +
        "," +
        h +
        ");",
        local_pathC,
        "AFTER_F5"
      );
    }
  );

  // a3
  socket.on("ADD_ANIMATION", function(name, PROGRAM_NAME, MODUL, RES) {
    console.log("ADD ANIMATION :", name, PROGRAM_NAME, MODUL, RES);

    var local_path = CONFIG.PATH_OF_WWW + "cache/" + name;
    var local_pathC = "cache/" + name + "/a3.js";
    var ID = random(1, 9999999);
    ID = ID.toString().replace(".", "11");
    ID = parseInt(ID);
    //LOCPATH = `import SYS = require('../res/animations/resource');`;
    var LOCPATH = ` `;
    LOCPATH += "" +
      PROGRAM_NAME +
      ".ENGINE.MODULES.ACCESS_MODULE( '" +
      MODUL +
      "').GAME_OBJECTS.ACCESS('" +
      name +
      "').CREATE_ANIMATION( SURF , 'LOOP' , 1 , RESOURCE." +
      RES +
      " , " +
      ID +
      " , 'no' , 1,11,1,1,1);"
    createFile(
      local_path + "/" + "a3.js",
      LOCPATH,
      local_pathC,
      "LOAD_NOW"
    );
  });

  // a4
  socket.on("ADD_COLLISION", function(name, PROGRAM_NAME, MODUL, margin) {
    console.log("ADD_COLLISION:", name, PROGRAM_NAME, MODUL, margin);
    var local_path = CONFIG.PATH_OF_WWW + "cache/" + name;
    var local_pathC = "cache/" + name + "/a4.js";
    createFile(
      local_path + "/" + "a4.js",
      "" +
      PROGRAM_NAME +
      ".ENGINE.MODULES.ACCESS_MODULE( '" +
      MODUL +
      "').GAME_OBJECTS.ACCESS('" +
      name +
      "').CREATE_COLLISION( 'BLOCK' , " +
      margin +
      "  );",
      local_pathC,
      "LOAD_NOW"
    );
  });

  // a4
  socket.on("REMOVE_COLLISION", function(name, PROGRAM_NAME, MODUL) {
    console.log("REMOVE_COLLISION:", name, PROGRAM_NAME, MODUL);

    var local_pathC =
      CONFIG.PATH_OF_WWW + "cache/" + name + "/a4.js";

    deleteFile(local_pathC);
  });

  // a5
  socket.on("ATACH_PLAYER",
    function(name, PROGRAM_NAME, MODUL, type__, index_) {
      console.log("ATACH_PLAYER :", name, PROGRAM_NAME, MODUL, type__);
      var local_path = CONFIG.PATH_OF_WWW + "cache/" + name;
      var local_pathC = "cache/" + name + "/a5.js";
      createFile(
        local_path + "/" + "a5.js",
        "" +
        PROGRAM_NAME +
        ".ENGINE.MODULES.ACCESS_MODULE( '" +
        MODUL +
        "').GAME_OBJECTS.ACCESS('" +
        name +
        "').CREATE_PLAYER('" +
        type__ +
        "');   " +
        PROGRAM_NAME +
        ".ENGINE.MODULES.ACCESS_MODULE( '" +
        MODUL +
        "').GAME_OBJECTS.ACCESS('" +
        name +
        "').EDITOR.BUTTONS[" +
        index_ +
        "].text = 'Deatach player'; ",
        local_pathC,
        "LOAD_NOW"
      );
    }
  );

  // a5
  socket.on("DEATACH_PLAYER", function(name, PROGRAM_NAME, MODUL) {
    console.log("DEATACH_PLAYER :", name, PROGRAM_NAME, MODUL);
    var local_pathC =
      CONFIG.PATH_OF_WWW + "cache/" + name + "/a5.js";
    deleteFile(local_pathC);
  });

  // a6
  socket.on("ADD_PARTICLE", function(name, PROGRAM_NAME, MODUL, type__) {
    console.log("ADD_PARTICLE :", name, PROGRAM_NAME, MODUL, type__);
    var local_path = CONFIG.PATH_OF_WWW + "cache/" + name;
    var local_pathC = "cache/" + name + "/a6.js";
    createFile(
      local_path + "/" + "a6.js",
      "" +
      PROGRAM_NAME +
      ".ENGINE.MODULES.ACCESS_MODULE( '" +
      MODUL +
      "').GAME_OBJECTS.ACCESS('" +
      name +
      "').CREATE_PARTICLE('" +
      type__ +
      "');",
      local_pathC,
      "LOAD_NOW"
    );
  });

  // a6
  socket.on("REMOVE_PARTICLE", function(name, PROGRAM_NAME, MODUL) {
    console.log("REMOVE_PARTICLE:", name, PROGRAM_NAME, MODUL);
    var local_pathC =
      CONFIG.PATH_OF_WWW + "cache/" + name + "/a6.js";
    deleteFile(local_pathC);
  });

  // a7
  socket.on("ADD_TEXTBOX",
    function(name, PROGRAM_NAME, MODUL, text, radius, color, textcolor) {
      console.log("ADD_TEXTBOX :", name, PROGRAM_NAME, MODUL, text);
      var local_path = CONFIG.PATH_OF_WWW + "cache/" + name;
      var local_pathC = "cache/" + name + "/a7.js";
      createFile(
        local_path + "/" + "a7.js",
        "" +
        PROGRAM_NAME +
        ".ENGINE.MODULES.ACCESS_MODULE( '" +
        MODUL +
        "').GAME_OBJECTS.ACCESS('" +
        name +
        "').CREATE_TEXTBOX('" +
        text +
        "' , '" +
        radius +
        "' , '" +
        color +
        "' , '" +
        textcolor +
        "');",
        local_pathC,
        "LOAD_AFTER_F5"
      );
    }
  );

  socket.on("REMOVE_TEXTBOX", function(name, PROGRAM_NAME, MODUL) {
    console.log("REMOVE_TEXTBOX:", name, PROGRAM_NAME, MODUL);
    var local_pathC =
      CONFIG.PATH_OF_WWW + "cache/" + name + "/a7.js";
    deleteFile(local_pathC);
  });

  // b1
  socket.on("SET_WIDTH", function(name, PROGRAM_NAME, MODUL, W) {
    console.log("SET_WIDTH :", name, PROGRAM_NAME, MODUL, W);
    var local_path = CONFIG.PATH_OF_WWW + "cache/" + name;
    var local_pathC = "cache/" + name + "/B1.js";
    var LOCPATH = ` `;
    LOCPATH += "" +
      PROGRAM_NAME +
      ".ENGINE.MODULES.ACCESS_MODULE( '" +
      MODUL +
      "').GAME_OBJECTS.ACCESS('" +
      name +
      "').DIMENSION.W = " + W
    createFile(
      local_path + "/" + "B1.js",
      LOCPATH,
      local_pathC,
      "LOAD_NOW"
    );
  });

  // b2
  socket.on("SET_HEIGHT", function(name, PROGRAM_NAME, MODUL, H) {
    console.log("SET_HEIGHT :", name, PROGRAM_NAME, MODUL, H);
    var local_path = CONFIG.PATH_OF_WWW + "cache/" + name;
    var local_pathC = "cache/" + name + "/B2.js";
    var LOCPATH = ` `;
    LOCPATH += "" +
      PROGRAM_NAME +
      ".ENGINE.MODULES.ACCESS_MODULE( '" +
      MODUL +
      "').GAME_OBJECTS.ACCESS('" +
      name +
      "').DIMENSION.H = " + H
    createFile(
      local_path + "/" + "B2.js",
      LOCPATH,
      local_pathC,
      "LOAD_NOW"
    );
  });

  // ANIM1
  socket.on("SET_ANIMATION_SPEED", function(name, PROGRAM_NAME, MODUL, H) {
    console.log("SET_ANIMATION_SPEED :", name, PROGRAM_NAME, MODUL, H);
    var local_path = CONFIG.PATH_OF_WWW + "cache/" + name;
    var local_pathC = "cache/" + name + "/ANIM1.js";
    var LOCPATH = ` `;
    LOCPATH += `${PROGRAM_NAME}.ENGINE.MODULES.ACCESS_MODULE( '` + MODUL + `').GAME_OBJECTS.ACCESS('` +
      name +
      `').ANIMATION.SET_SPEED(` + H + `)`;

    createFile(
      local_path + "/" + "ANIM1.js",
      LOCPATH,
      local_pathC,
      "LOAD_NOW"
    );
  });

  //SET_NEW_START_UP_POSITION   sifra 8
  socket.on("ADD_WEBCAM",
    function(name, PROGRAM_NAME, MODUL, type_, type_of_dim, byV, byH) {
      //	LOCAL_COMMUNICATOR.emit('ADD_WEBCAM',  name , PROGRAM_NAME , MODUL , type_ , type_of_dim , byV , byH);
      console.log("ADD_WEBCAM for ", name);
      var local_path = CONFIG.PATH_OF_WWW + "cache/" + name;
      var local_pathC = "cache/" + name + "/a8.js";
      //local_go.CREATE_WEBCAM(local_res , local_type_of_dim);
      if(type_ == "NORMAL") {
        createFile(
          local_path + "/" + "a8.js",
          "" +
          PROGRAM_NAME +
          ".ENGINE.MODULES.ACCESS_MODULE( '" +
          MODUL +
          "').GAME_OBJECTS.ACCESS('" +
          name +
          "').CREATE_WEBCAM('" +
          type_ +
          "','" +
          type_of_dim +
          "');",
          local_pathC,
          "LOAD_NOW"
        );
      } else {
        // is NUI
        createFile(
          local_path + "/" + "a8.js",
          "" +
          PROGRAM_NAME +
          ".ENGINE.MODULES.ACCESS_MODULE( '" +
          MODUL +
          "').GAME_OBJECTS.ACCESS('" +
          name +
          "').CREATE_WEBCAM('" +
          type_ +
          "','" +
          type_of_dim +
          "' , '" +
          byV +
          "','" +
          byH +
          "');",
          local_pathC,
          "LOAD_NOW"
        );
      }
    }
  );

  //DESTROY_GAME_OBJECT
  socket.on("DESTROY_GAME_OBJECT", function(name) {
    console.log("DESTROY_GAME_OBJECT :", name);
    var local_path = CONFIG.PATH_OF_WWW + "cache/" + name;
    deleteFolder(local_path);
  });

  socket.on("GET_ALL_GAME_OBJECTS", function() {
    var localpath = CONFIG.PATH_OF_WWW + "cache/";
    var LIST_OFF_ALL_GAME_OBJECT = getDirectories(localpath);
    console.log(LIST_OFF_ALL_GAME_OBJECT, "<<LIST_OFF_ALL_GAME_OBJECT");

    // fix async
    var memoryTest = [];
    for(var i in LIST_OFF_ALL_GAME_OBJECT) {
      val = LIST_OFF_ALL_GAME_OBJECT[i];
      memoryTest.push(GET_FILES_NAME_TEST(CONFIG.PATH_OF_WWW + "cache/" + val));
    }

    // in hall of
    Promise.all(memoryTest).then((e) => {
      var sum = 0;
      e.forEach((i) => {
        // test
        sum += i;
      });
      console.info(`Runtime wait for some generetion of scene objects`, sum);

      var local__x = 0;
      for(var i in LIST_OFF_ALL_GAME_OBJECT) {
        local__x++;
        val = LIST_OFF_ALL_GAME_OBJECT[i];
        console.info("visualjs item:", LIST_OFF_ALL_GAME_OBJECT[i]);
        if(local__x + 1 == LIST_OFF_ALL_GAME_OBJECT.length) {
          GET_FILES_NAME(
            CONFIG.PATH_OF_WWW + "cache/" + val,
            val,
            sum
          );
        } else {
          GET_FILES_NAME(
            CONFIG.PATH_OF_WWW + "cache/" + val,
            val,
            sum
          );
        }
      }

    });

  });

  // Disconnect event
  socket.on("disconnect", function() {
    if(typeof usernames[socket.email] != "undefined") {
      ACCOUNTS.LIST[0].forEach(function(entry) {
        if(entry.email == usernames[socket.email]) {
          DELAY_SESSION_DEAD(entry.token, socket.email);
          console.log("DISCONNECTED : ", usernames[socket.email]);
          delete usernames[socket.email];
          return;
        }
      });
    }

    // update list of users in chat, client-side
    io.sockets.emit("updateusers", usernames);
    // echo globally that this client has left
    socket.broadcast.emit(
      "realtime",
      "SERVER",
      socket.username + " has disconnected"
    );
  });
});

function GET_FILES_NAME(path, name_of_go, main_length) {
  fs.readdir(path, function(err, items) {
    for(var i = 0;i < items.length;i++) {
      console.log("Post load:", items[i]);
      io.sockets.emit(
        "RETURN",
        "LOAD_SCRIPT",
        "cache/" + name_of_go + "/" + items[i],
        main_length
      );
    }
  });
}

// fix async
function GET_FILES_NAME_TEST(path) {
  return new Promise((resolve) => {
    fs.readdir(path, function(err, items) {resolve(items.length)});
  });
}
