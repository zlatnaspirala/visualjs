
// dev for io
import { io } from "../../node_modules/socket.io-client";
import SYS from '../system';
import APPLICATION from '../../manifest/manifest';

console.log('\x1b[36m%s\x1b[0m', "......................................");
console.log('\x1b[36m%s\x1b[0m', ".                                    .");
console.log('\x1b[36m%s\x1b[0m', ". Visual-js Editor                   .");
console.log('\x1b[36m%s\x1b[0m', ". Version 3.0.0                      .");
console.log('\x1b[36m%s\x1b[0m', ". Thanks for using my software!      .");
console.log('\x1b[36m%s\x1b[0m', "......................................");

var LOCAL_COMMUNICATOR = new Object();

if(APPLICATION.EDITOR_AUTORUN == true || APPLICATION.EDITOR == true) {

  LOCAL_COMMUNICATOR = io.connect("http://" + APPLICATION.LOCAL_SERVER + ":1013");

  LOCAL_COMMUNICATOR.on("connect", function() {
    console.log("%c" +  "Connected with Editor." , "background: #000; color: lime");
  });

  LOCAL_COMMUNICATOR.on("realtime", function(user, data) {
    if(data != "") {
      console.log("chat data empty", user, data);
    } else {
      console.log("chat data empty");
    }
  });

  LOCAL_COMMUNICATOR.on("RETURN", function(action, data) {

    if(action == "GET_ALL_GAME_OBJECTS") {
      console.log(data + "<<<<<<<<< from ");
    } else if(action == "LOAD_SCRIPT") {
      console.log("LOAD_SCRIPT : " + data);
      CALL_OR_WAIT(data);
    } else if(action == "LOAD_SCRIPT_AFTER_F5") {}
    else if(action == "ERROR") {
      alert("Server says error:" + data);
    }

    // console view  DOM
    //$('#conversation').append('<div class="shadowDiv" >'+action + ': ' + data + '</div>');
    //var objDiv = E("console");
    //objDiv.scrollTop = objDiv.scrollHeight;

  });

}


// EDITOR ACTIONS
function CALL_OR_WAIT(data) {

  var data = data;
  setTimeout(function() {
    SYS.DEBUG.LOG(data + "");
    if(typeof data != "undefined") {
      if(data.indexOf("a2") == -1) {
        setTimeout(function() {

          SYS.DEBUG.LOG("VISUAL SCRIPT EDITOR ACTION EXECUTED!");
          SYS.SCRIPT.LOAD(data);
          
        }, 100);
      } else {

        SYS.DEBUG.LOG("VISUAL SCRIPT EDITOR ACTION EXECUTED!");
        SYS.SCRIPT.LOAD(data);
        
      }
    } else {
      setTimeout(function() {
        CALL_OR_WAIT(data);
      }, 50);
    }

  }, 250);

}

export function ADD(name, x, y, w, h, PROGRAM_NAME, MODUL) {
  LOCAL_COMMUNICATOR.emit("ADD_NEW_GAME_OBJECT", name, x, y, w, h, PROGRAM_NAME, MODUL);
}

export function GET_ALL_GAME_OBJECTS() {
  LOCAL_COMMUNICATOR.emit("GET_ALL_GAME_OBJECTS");
}

export function DESTROY(name) {
  LOCAL_COMMUNICATOR.emit("DESTROY_GAME_OBJECT", name);
}

export function DESTROY_DELAY(name, sec, MODUL, PROGRAM_NAME) {
  LOCAL_COMMUNICATOR.emit("DESTROY_GAME_OBJECT_WITH_DELAY", name, sec, MODUL, PROGRAM_NAME);
}

export function SET_NEW_START_UP_POS(name, PROGRAM_NAME, MODUL, newX, newY, w, h) {
  LOCAL_COMMUNICATOR.emit("SET_NEW_START_UP_POSITION", name, PROGRAM_NAME, MODUL, newX, newY, w, h);
}

export function ADD_ANIMATION(name, PROGRAM_NAME, MODUL, RES) {
  LOCAL_COMMUNICATOR.emit("ADD_ANIMATION", name, PROGRAM_NAME, MODUL, RES);
}

export function ADD_COLLISION(name, PROGRAM_NAME, MODUL, margin) {
  LOCAL_COMMUNICATOR.emit("ADD_COLLISION", name, PROGRAM_NAME, MODUL, margin);
}

export function REMOVE_COLLISION(name, PROGRAM_NAME, MODUL) {
  LOCAL_COMMUNICATOR.emit("REMOVE_COLLISION", name, PROGRAM_NAME, MODUL);
}

export function CREATE_PLAYER(name, PROGRAM_NAME, MODUL, type__, index) {
  LOCAL_COMMUNICATOR.emit("ATACH_PLAYER", name, PROGRAM_NAME, MODUL, type__, index);
}

export function DEATACH_PLAYER(name, PROGRAM_NAME, MODUL, type__) {
  LOCAL_COMMUNICATOR.emit("DEATACH_PLAYER", name, PROGRAM_NAME, MODUL, type__);
}

export function ADD_PARTICLE(name, PROGRAM_NAME, MODUL, type__) {
  LOCAL_COMMUNICATOR.emit("ADD_PARTICLE", name, PROGRAM_NAME, MODUL, type__);
}

export function REMOVE_PARTICLE(name, PROGRAM_NAME, MODUL) {
  LOCAL_COMMUNICATOR.emit("REMOVE_PARTICLE", name, PROGRAM_NAME, MODUL);
}

export function ADD_TEXTBOX(name, PROGRAM_NAME, MODUL, text, radius, color, textcolor) {
  LOCAL_COMMUNICATOR.emit("ADD_TEXTBOX", name, PROGRAM_NAME, MODUL, text, radius, color, textcolor);
}

export function REMOVE_TEXTBOX(name, PROGRAM_NAME, MODUL) {
  LOCAL_COMMUNICATOR.emit("REMOVE_TEXTBOX", name, PROGRAM_NAME, MODUL);
}

export function ADD_WEBCAM(name, PROGRAM_NAME, MODUL, type_, type_of_dim, byV, byH) {
  LOCAL_COMMUNICATOR.emit("ADD_WEBCAM", name, PROGRAM_NAME, MODUL, type_, type_of_dim, byV, byH);
}

export function REMOVE_WEBCAM(name, PROGRAM_NAME, MODUL) {
  LOCAL_COMMUNICATOR.emit("REMOVE_WEBCAM", name, PROGRAM_NAME, MODUL);
}

export function SET_MAIN_INTERVAL(name, PROGRAM_NAME, MODUL, d, u) {
  console.log("TEST")
  LOCAL_COMMUNICATOR.emit("SET_MAIN_INTERVAL", PROGRAM_NAME, d, u);
}
