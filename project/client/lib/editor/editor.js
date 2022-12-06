
import {io} from "socket.io-client";
import SYS from '../system';
import APPLICATION from '../../manifest/manifest';

console.log('\x1b[36m%s\x1b[0m', "......................................");
console.log('\x1b[36m%s\x1b[0m', ".                                    .");
console.log('\x1b[36m%s\x1b[0m', ". Visual-js Editor                   .");
console.log('\x1b[36m%s\x1b[0m', ". Version 3.0.0                      .");
console.log('\x1b[36m%s\x1b[0m', ". Thanks for using my software!      .");
console.log('\x1b[36m%s\x1b[0m', "......................................");

var LOCAL_COMMUNICATOR;

export const runEditor = () => {
  LOCAL_COMMUNICATOR = {};
  let testPromiseLoadedScript = [];

  if(APPLICATION.EDITOR_AUTORUN == true || APPLICATION.EDITOR == true) {

    LOCAL_COMMUNICATOR = io.connect("http://" + APPLICATION.LOCAL_SERVER + ":1013");

    LOCAL_COMMUNICATOR.on("connect", function() {
      console.log("%c" + "Connected with Editor.", "background: #000; color: lime");
    });

    LOCAL_COMMUNICATOR.on("realtime", function(user, data) {
      if(data != "") {
        console.log("chat data empty", user, data);
      } else {
        console.log("chat data empty");
      }
    });

    function loadNext() {
      var src = testPromiseLoadedScript.shift();
      if (typeof src === 'undefined') {
        const postScriptReady = new CustomEvent("postScriptReady", { detail: 'good'});
        dispatchEvent(postScriptReady);
         return;
      }
      var s = document.createElement("script");
      s.src=src;
      if(s.addEventListener) {
        s.addEventListener("load",loadNext,false);
      } 
      else if(s.readyState) {
        s.onreadystatechange = loadNext;
      }
      document.body.appendChild(s);
     }

    LOCAL_COMMUNICATOR.on("RETURN", function(action, data, sumOfObjs) {

      if(action == "GET_ALL_GAME_OBJECTS") {
        console.log(data + "<GET_ALL_GAME_OBJECTS> nothing ");
      } else if(action == "LOAD_SCRIPT") {

        console.log(data + "<GET_ALL_GAME_OBJECTS>  sumOfObjs ", sumOfObjs);
        if (testPromiseLoadedScript.length == sumOfObjs - 1) {
          // test - usually on page load
          // put all in array
          testPromiseLoadedScript.push(data);
          loadNext();
        } else {
          testPromiseLoadedScript.push(data);
        }

      } else if(action == "LOAD_SCRIPT_AFTER_F5") {
        // 
      } else if(action == "REFRESH") {
        location.reload();
      }
      else if(action == "ERROR") {
        alert("Server says error:" + data);
      }

    });

  }

};

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

export function SET_WIDTH(name, PROGRAM_NAME, MODUL, W) {
  LOCAL_COMMUNICATOR.emit("SET_WIDTH", name, PROGRAM_NAME, MODUL, W);
}

export function SET_HEIGHT(name, PROGRAM_NAME, MODUL, H) {
  LOCAL_COMMUNICATOR.emit("SET_HEIGHT", name, PROGRAM_NAME, MODUL, H);
}

export function SET_ANIMATION_SPEED(name, PROGRAM_NAME, MODUL, S) {
  LOCAL_COMMUNICATOR.emit("SET_ANIMATION_SPEED", name, PROGRAM_NAME, MODUL, S);
}

export function SET_ANIMATION_TYPE(name, PROGRAM_NAME, MODUL, S) {
  LOCAL_COMMUNICATOR.emit("SET_ANIMATION_TYPE", name, PROGRAM_NAME, MODUL, S);
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

export function SET_MAIN_INTERVAL(PROGRAM_NAME, d, u) {
  LOCAL_COMMUNICATOR.emit("SET_MAIN_INTERVAL", PROGRAM_NAME, d, u);
}

export function DELETE_FROM_VISUAL_SCRIPTS(PROGRAM_NAME) {
  LOCAL_COMMUNICATOR.emit("DELETE_FROM_VISUAL_SCRIPTS", PROGRAM_NAME);
}
