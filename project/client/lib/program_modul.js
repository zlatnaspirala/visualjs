
export function CREATE_SYSTEM_BUTTONS() {

  if(typeof window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]] !== "undefined" && typeof window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]].ENGINE !== "undefined") {
    window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]].ENGINE.CREATE_MODUL("GUI_STARTER");
    if(NOMOBILE == 0) {
      CREATE_VIRTUAL_KEYBOARD();
      HIDE_KEYBOARD();
    } else {
      if(APPLICATION.ACCESSIBILITY.VIRTUAL_KEYBOARD_FOR_DESKTOP == true) {
        CREATE_VIRTUAL_KEYBOARD();
        HIDE_KEYBOARD();
      }
    }
  } else {
    setTimeout(function() {
      //we dont wait any async
      CREATE_SYSTEM_BUTTONS();
    }, 50);
  }
}


export function CREATE_VIRTUAL_KEYBOARD() {

  ________MAKE_VK(11, 5, 7, 7, 10);

  // value 1 speed
  window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("STARTER").NEW_OBJECT("___VIRTUALKEYBOARD_LABEL", 18, 32, 60, 10, 1);
  window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("STARTER").GAME_OBJECTS.ACCESS("___VIRTUALKEYBOARD_LABEL").CREATE_TEXTBOX("", 10, "black", "lime");
  window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("STARTER").GAME_OBJECTS.ACCESS("___VIRTUALKEYBOARD_LABEL").TEXTBOX.EDIT = false;
  ___VIRTUALKEYBOARD_LABEL.TEXT_FOR = null;
  ___VIRTUALKEYBOARD_LABEL.DRAG = false;
  // caps handler
  ___VIRTUALKEYBOARD_LABEL.CAPS = false;
  // backspace handler
  ___VIRTUALKEYBOARD_LABEL.BACKSPACE_DOWN = false;

  ___VIRTUALKEYBOARD_LABEL.SPEEDUPBACKSPACE = function() {
    setTimeout(function() {

      if(___VIRTUALKEYBOARD_LABEL.BACKSPACE_DOWN == true) {

        ___VIRTUALKEYBOARD_LABEL.SPEED__BACKSPACE();

      }

    }, 1000);

  };

  ___VIRTUALKEYBOARD_LABEL.DELTA_INC_TIMER_BACKSPACE = 400;
  ___VIRTUALKEYBOARD_LABEL.SPEED__BACKSPACE = function() {

    ___VIRTUALKEYBOARD_LABEL.SPEED__BACKSPACE__TIMER = setInterval(function() {

      if(___VIRTUALKEYBOARD_LABEL.BACKSPACE_DOWN == true) {

        ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT = ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT.substring(0, ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT.length - 1);

        if(___VIRTUALKEYBOARD_LABEL.DELTA_INC_TIMER_BACKSPACE < 300) {

          ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT = ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT.substring(0, ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT.length - 1);

        }

        if(___VIRTUALKEYBOARD_LABEL.DELTA_INC_TIMER_BACKSPACE < 100) {

          ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT = ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT.substring(0, ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT.length - 1);
          ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT = ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT.substring(0, ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT.length - 1);

        }

        if(___VIRTUALKEYBOARD_LABEL.DELTA_INC_TIMER_BACKSPACE > 5) {
          ___VIRTUALKEYBOARD_LABEL.DELTA_INC_TIMER_BACKSPACE = ___VIRTUALKEYBOARD_LABEL.DELTA_INC_TIMER_BACKSPACE - 100;
        } else {
          ___VIRTUALKEYBOARD_LABEL.DELTA_INC_TIMER_BACKSPACE = 5;

        }
        //console.log("___VIRTUALKEYBOARD_LABEL.DELTA_INC_TIMER_BACKSPACE" + " " + ___VIRTUALKEYBOARD_LABEL.DELTA_INC_TIMER_BACKSPACE)
      } else {

        clearInterval(___VIRTUALKEYBOARD_LABEL.SPEED__BACKSPACE__TIMER);
        ___VIRTUALKEYBOARD_LABEL.DELTA_INC_TIMER_BACKSPACE = 400;
      }

    }, ___VIRTUALKEYBOARD_LABEL.DELTA_INC_TIMER_BACKSPACE);

  };

};

export function ________MAKE_VK(H, V, step, w, h) {

  for(var y = 0;y < V;y = y + 1) {
    for(var x = 0;x < H;x = x + 1) {

      var name = "___VIRTUALKEYBOARD_" + x + y;
      var PASS_VK_CODE_ = "";
      var width_extra = 0;
      var SPECIAL_COMMAND = null;

      var LETTER = 0;
      if(x == 0 && y == 1) {
        LETTER = 16; //q
        PASS_VK_CODE_ = "q";
      } else if(x == 1 && y == 1) {
        LETTER = 22; //w
        PASS_VK_CODE_ = "w";
      } else if(x == 2 && y == 1) {
        LETTER = 4; //e
        PASS_VK_CODE_ = "e";
      } else if(x == 3 && y == 1) {
        LETTER = 17; //r
        PASS_VK_CODE_ = "r";
      } else if(x == 4 && y == 1) {
        LETTER = 19; //t
        PASS_VK_CODE_ = "t";
      } else if(x == 5 && y == 1) {
        LETTER = 25; //z
        PASS_VK_CODE_ = "z";
      } else if(x == 6 && y == 1) {
        LETTER = 20; //u
        PASS_VK_CODE_ = "u";
      } else if(x == 7 && y == 1) {
        LETTER = 8; //i
        PASS_VK_CODE_ = "i";
      } else if(x == 8 && y == 1) {
        LETTER = 14; //o
        PASS_VK_CODE_ = "o";
      } else if(x == 9 && y == 1) {
        LETTER = 15; //p
        PASS_VK_CODE_ = "p";
      } else if(x == 10 && y == 1) {
        LETTER = 28; //m UBACI ZA TACKU
        PASS_VK_CODE_ = "[";
      } else if(x == 10 && y == 0) {

        LETTER = 25; //Backspace
        width_extra = 10;
        PASS_VK_CODE_ = "Backspace";
      }
      //line 2
      else if(x == 0 && y == 2) {
        LETTER = 0; //a
        PASS_VK_CODE_ = "a";
      } else if(x == 1 && y == 2) {
        LETTER = 18; //s
        PASS_VK_CODE_ = "s";
      } else if(x == 2 && y == 2) {
        LETTER = 3; //d
        PASS_VK_CODE_ = "d";
      } else if(x == 3 && y == 2) {
        LETTER = 5; //f
        PASS_VK_CODE_ = "f";
      } else if(x == 4 && y == 2) {
        LETTER = 6; //g
        PASS_VK_CODE_ = "g";
      } else if(x == 5 && y == 2) {
        LETTER = 7; //h
        PASS_VK_CODE_ = "h";
      } else if(x == 6 && y == 2) {
        LETTER = 9; //j
        PASS_VK_CODE_ = "j";
      } else if(x == 7 && y == 2) {
        LETTER = 10; //k
        PASS_VK_CODE_ = "k";
      } else if(x == 8 && y == 2) {
        LETTER = 11; //l
        PASS_VK_CODE_ = "l";
      } else if(x == 9 && y == 2) {

        LETTER = 28; // SPECIAL : ENTER
        //width_extra = 10;
        PASS_VK_CODE_ = ";";

      } else if(x == 10 && y == 2) {

        LETTER = 28; // SPECIAL : ENTER
        //width_extra = 10;
        PASS_VK_CODE_ = "'";

      } else if(x == 11 && y == 2) {

        LETTER = 0; // enter
        width_extra = 10;
        PASS_VK_CODE_ = "enter2";
      }
      //line 3
      else if(x == 0 && y == 3) {
        LETTER = 24; //y
        PASS_VK_CODE_ = "y";
      } else if(x == 1 && y == 3) {
        LETTER = 23; //x
        PASS_VK_CODE_ = "x";
      } else if(x == 2 && y == 3) {
        LETTER = 2; //c
        PASS_VK_CODE_ = "c";
      } else if(x == 3 && y == 3) {
        LETTER = 21; //v
        PASS_VK_CODE_ = "v";
      } else if(x == 4 && y == 3) {
        LETTER = 1; //b
        PASS_VK_CODE_ = "b";
      } else if(x == 5 && y == 3) {
        LETTER = 13; //n
        PASS_VK_CODE_ = "n";
      } else if(x == 6 && y == 3) {
        LETTER = 12; //m
        PASS_VK_CODE_ = "m";
      } else if(x == 7 && y == 3) {
        LETTER = 27; //m
        PASS_VK_CODE_ = ",";
      } else if(x == 8 && y == 3) {
        LETTER = 27; //m UBACI ZA TACKU
        PASS_VK_CODE_ = ".";
      } else if(x == 9 && y == 3) {
        LETTER = 30; //m UBACI ZA TACKU
        PASS_VK_CODE_ = "/";
      } else if(x == 10 && y == 3) {
        LETTER = 31; //m UBACI ZA TACKU
        PASS_VK_CODE_ = "Caps";
      }

      //down line
      else if(x == 0 && y == 4) {
        LETTER = 24; //y
        PASS_VK_CODE_ = "_";
      } else if(x == 1 && y == 4) {
        LETTER = 23; //x
        PASS_VK_CODE_ = "-";
      } else if(x == 2 && y == 4) {
        LETTER = 2; //c
        PASS_VK_CODE_ = "+";
      } else if(x == 3 && y == 4) {
        LETTER = 21; //v
        PASS_VK_CODE_ = "=";
      } else if(x == 4 && y == 4) {
        LETTER = 1; //b
        PASS_VK_CODE_ = "space";
        width_extra = 24;
      } else if(x == 5 && y == 4) { /** unhandled */
      } else if(x == 6 && y == 4) { /** unhandled */
      } else if(x == 7 && y == 4) { /** unhandled */
      } else if(x == 8 && y == 4) {
        LETTER = 27; //m UBACI ZA TACKU
        PASS_VK_CODE_ = ".com";
      } else if(x == 9 && y == 4) {
        LETTER = 30; //m UBACI ZA TACKU
        PASS_VK_CODE_ = "hide";
        SPECIAL_COMMAND = "hide";
      } else if(x == 10 && y == 4) {
        LETTER = 31; //m UBACI ZA TACKU
        PASS_VK_CODE_ = "Enter";
        width_extra = 12;
      }

      // NUMBERS
      else if(x == 0 && y == 0) {
        LETTER = 33; // o
        PASS_VK_CODE_ = "0";
      } else if(x == 1 && y == 0) {
        LETTER = 34; // o
        PASS_VK_CODE_ = "1";
      } else if(x == 2 && y == 0) {
        LETTER = 35; // o
        PASS_VK_CODE_ = "2";
      } else if(x == 3 && y == 0) {
        LETTER = 36; // o
        PASS_VK_CODE_ = "3";
      } else if(x == 4 && y == 0) {
        LETTER = 37; // o
        PASS_VK_CODE_ = "4";
      } else if(x == 5 && y == 0) {
        LETTER = 38; // o
        PASS_VK_CODE_ = "5";
      } else if(x == 6 && y == 0) {
        LETTER = 39; // o
        PASS_VK_CODE_ = "6";
      } else if(x == 7 && y == 0) {
        LETTER = 40; // o
        PASS_VK_CODE_ = "7";
      } else if(x == 8 && y == 0) {
        LETTER = 41; // o
        PASS_VK_CODE_ = "8";
      } else if(x == 9 && y == 0) {
        LETTER = 42; // o
        PASS_VK_CODE_ = "9";
      } else if(x == 10 && y == 0) {
        LETTER = 32; // o
        PASS_VK_CODE_ = "0";
      }

      /////////////////////////
      // CREATING SYS KEYBOARD
      // eliminate rigth of space
      if(!((x >= 5 && y == 4) && (x <= 7 && y == 4))) {

        var ___ID = Math.random();
        window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").NEW_OBJECT(name, x + (step * x), y + (step * 1.5 * y) + 40, w + width_extra, h, 10);
        //window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).CREATE_ANIMATION( SURF , "DRAW_FRAME" , LETTER , RESOURCE.imagesFont1  , ___ID , "no" , 1,11,1,1,1)
        window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).CREATE_TEXTBOX(PASS_VK_CODE_, 10, "black", "lime");
        window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).DRAG = false;
        window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.EDIT = false;
        window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).PASS_VK_CODE = PASS_VK_CODE_;

        window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TOUCH_UP = function() {
          ___VIRTUALKEYBOARD_LABEL.BACKSPACE_DOWN = false;
          ___VIRTUALKEYBOARD_LABEL.SPEEDUP = false;

        };

        window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TOUCH_DOWN = function() {

          if(window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(this.NAME).TEXTBOX.TEXT == "Backspace") {

            ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT = ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT.substring(0, ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT.length - 1);
            //console.log("VIRTUAL KEYBOARD : Backspace ")
            ___VIRTUALKEYBOARD_LABEL.BACKSPACE_DOWN = true;
            ___VIRTUALKEYBOARD_LABEL.SPEEDUPBACKSPACE();

          } else if(window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(this.NAME).TEXTBOX.TEXT == "hide") {

            HIDE_KEYBOARD();
            //console.log("VIRTUAL KEYBOARD :  HIDE_KEYBOARD() ")

          } else if(window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(this.NAME).TEXTBOX.TEXT == "Enter") {

            VK_ENTER();
            //console.log("VIRTUAL KEYBOARD :  enter!! ")

          } else if(window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(this.NAME).TEXTBOX.TEXT == "Caps") {

            VK_CAPS();
            //console.log("VIRTUAL KEYBOARD :  caps !! ")

          } else if(window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(this.NAME).TEXTBOX.TEXT == "space") {

            HELLO_WORLD.ENGINE.MODULES.ACCESS_MODULE("STARTER").GAME_OBJECTS.ACCESS("___VIRTUALKEYBOARD_LABEL").TEXTBOX.TEXT += " ";
            //console.log("VIRTUAL KEYBOARD :  caps !! ")

          } else {

            HELLO_WORLD.ENGINE.MODULES.ACCESS_MODULE("STARTER").GAME_OBJECTS.ACCESS("___VIRTUALKEYBOARD_LABEL").TEXTBOX.TEXT += window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(this.NAME).TEXTBOX.TEXT;

          }

        };

      }

      // extra
      if(y == 2 && x == 10) {
        var name = "___VIRTUALKEYBOARD_" + (x + 1) + y;
        x = 11;

        PASS_VK_CODE_ = "\\";
        var ___ID = Math.random();
        window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").NEW_OBJECT(name, x + (step * x), y + (step * 1.5 * y) + 40, w + width_extra, h, 10);

        //window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).CREATE_ANIMATION( SURF , "DRAW_FRAME" , LETTER , RESOURCE.imagesFont1  , ___ID , "no" , 1,11,1,1,1)
        window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).CREATE_TEXTBOX(PASS_VK_CODE_, 10, "black", "lime");
        window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).DRAG = false;
        window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.EDIT = false;
        window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TAP = function() {
          //console.log("VIRTUAL KEYBOARD : " + this.NAME);

        };

        x = 10;

      }

      // extra
      if(y == 1 && x == 10) {
        var name = "___VIRTUALKEYBOARD_" + (x + 1) + y;
        x = 11;
        PASS_VK_CODE_ = "]";
        var ___ID = Math.random();
        window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").NEW_OBJECT(name, x + (step * x), y + (step * 1.5 * y) + 40, w + width_extra, h, 10);
        //window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).CREATE_ANIMATION( SURF , "DRAW_FRAME" , LETTER , RESOURCE.imagesFont1  , ___ID , "no" , 1,11,1,1,1)
        window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).CREATE_TEXTBOX(PASS_VK_CODE_, 10, "black", "lime");
        window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).DRAG = false;
        window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.EDIT = false;

        window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TAP = function() {

          //console.log("VIRTUAL KEYBOARD : " + this.NAME);

        };

        x = 12;

      }

      ///////////////////////

    }
  }

};

export function HIDE_KEYBOARD() {
  ___VIRTUALKEYBOARD_LABEL.VISIBLE = false;
  ___KBSTATUS(11, 5, false);
  ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT = "";
}

export function SHOW_KEYBOARD(textIsForThisNameObj) {
  ___VIRTUALKEYBOARD_LABEL.TEXT_FOR = window[textIsForThisNameObj];
  ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT = ___VIRTUALKEYBOARD_LABEL.TEXT_FOR.TEXTBOX.TEXT;
  ___VIRTUALKEYBOARD_LABEL.VISIBLE = true;
  ___KBSTATUS(11, 5, true);
};

export function VK_ENTER() {
  window[___VIRTUALKEYBOARD_LABEL.TEXT_FOR.NAME].TEXTBOX.TEXT = ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT;
  ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT = "";
  HIDE_KEYBOARD();
};

export function VK_CAPS() {
  if(___VIRTUALKEYBOARD_LABEL.CAPS == false) {
    ___KBSTATUS_CAPS_ON(11, 5);
    ___VIRTUALKEYBOARD_LABEL.CAPS = true;
  } else {
    ___KBSTATUS_CAPS_OFF(11, 5);
    ___VIRTUALKEYBOARD_LABEL.CAPS = false;
  }
};

// help hide keyb
export function ___KBSTATUS(H, V, WHAT) {

  for(var y = 0;y < V;y = y + 1) {
    for(var x = 0;x < H;x = x + 1) {

      var name = "___VIRTUALKEYBOARD_" + x + y;
      var PASS_VK_CODE_ = "";
      var width_extra = 0;
      var SPECIAL_COMMAND = null;

      var LETTER = 0;

      // CREATING SYS KEYBOARD
      // eliminate rigth of space
      if(!((x >= 5 && y == 4) && (x <= 7 && y == 4))) {

        window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).VISIBLE = WHAT;

      }

      // extra
      if(y == 2 && x == 10) {
        var name = "___VIRTUALKEYBOARD_" + (x + 1) + y;
        x = 11;
        window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).VISIBLE = WHAT;
        x = 10;

      }

      // extra
      if(y == 1 && x == 10) {
        var name = "___VIRTUALKEYBOARD_" + (x + 1) + y;
        x = 11;
        window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).VISIBLE = WHAT;
        x = 12;

      }

    }
  }

};

// caps staff
export function ___KBSTATUS_CAPS_ON(H, V, WHAT) {

  for(var y = 0;y < V;y = y + 1) {
    for(var x = 0;x < H;x = x + 1) {

      var name = "___VIRTUALKEYBOARD_" + x + y;
      var PASS_VK_CODE_ = "";
      var width_extra = 0;
      var SPECIAL_COMMAND = null;
      var LETTER = 0;

      // CREATING SYS KEYBOARD
      if(name != "___VIRTUALKEYBOARD_44" && name != "___VIRTUALKEYBOARD_100" && name != "___VIRTUALKEYBOARD_103" && name != "___VIRTUALKEYBOARD_104" && name != "___VIRTUALKEYBOARD_94") {

        // eliminate rigth of space
        if(!((x >= 5 && y == 4) && (x <= 7 && y == 4))) {

          window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.TEXT = window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.TEXT.toUpperCase();

        }

        // extra
        if(y == 2 && x == 10) {
          var name = "___VIRTUALKEYBOARD_" + (x + 1) + y;
          x = 11;
          window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.TEXT = window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.TEXT.toUpperCase();
          x = 10;

        }

        // extra
        if(y == 1 && x == 10) {
          var name = "___VIRTUALKEYBOARD_" + (x + 1) + y;
          x = 11;
          window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.TEXT = window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.TEXT.toUpperCase();
          x = 12;

        }

        //for special
        if(___VIRTUALKEYBOARD_101.TEXTBOX.TEXT != "{") {
          ___VIRTUALKEYBOARD_101.TEXTBOX.TEXT = "{";
        }

        if(___VIRTUALKEYBOARD_102.TEXTBOX.TEXT != "\"") {
          ___VIRTUALKEYBOARD_102.TEXTBOX.TEXT = "\"";
        }

        if(___VIRTUALKEYBOARD_93.TEXTBOX.TEXT != "?") {
          ___VIRTUALKEYBOARD_93.TEXTBOX.TEXT = "?";
        }

        if(name == "___VIRTUALKEYBOARD_111") {
          ___VIRTUALKEYBOARD_111.TEXTBOX.TEXT = "}";
        } else if(name == "___VIRTUALKEYBOARD_92") {
          ___VIRTUALKEYBOARD_92.TEXTBOX.TEXT = ":";
        } else if(name == "___VIRTUALKEYBOARD_112") {
          ___VIRTUALKEYBOARD_112.TEXTBOX.TEXT = "|";
        } else if(name == "___VIRTUALKEYBOARD_73") {
          ___VIRTUALKEYBOARD_73.TEXTBOX.TEXT = "<";
        } else if(name == "___VIRTUALKEYBOARD_83") {
          ___VIRTUALKEYBOARD_83.TEXTBOX.TEXT = ">";
        } else if(name == "___VIRTUALKEYBOARD_10") {
          ___VIRTUALKEYBOARD_10.TEXTBOX.TEXT = "!";
        } else if(name == "___VIRTUALKEYBOARD_20") {
          ___VIRTUALKEYBOARD_20.TEXTBOX.TEXT = "@";
        } else if(name == "___VIRTUALKEYBOARD_30") {
          ___VIRTUALKEYBOARD_30.TEXTBOX.TEXT = "#";
        } else if(name == "___VIRTUALKEYBOARD_40") {
          ___VIRTUALKEYBOARD_40.TEXTBOX.TEXT = "$";
        } else if(name == "___VIRTUALKEYBOARD_50") {
          ___VIRTUALKEYBOARD_50.TEXTBOX.TEXT = "%";
        } else if(name == "___VIRTUALKEYBOARD_60") {
          ___VIRTUALKEYBOARD_60.TEXTBOX.TEXT = "^";
        } else if(name == "___VIRTUALKEYBOARD_70") {
          ___VIRTUALKEYBOARD_70.TEXTBOX.TEXT = "&";
        } else if(name == "___VIRTUALKEYBOARD_80") {
          ___VIRTUALKEYBOARD_80.TEXTBOX.TEXT = "*";
        } else if(name == "___VIRTUALKEYBOARD_90") {
          ___VIRTUALKEYBOARD_90.TEXTBOX.TEXT = "(";
        } else if(name == "___VIRTUALKEYBOARD_00") {
          ___VIRTUALKEYBOARD_00.TEXTBOX.TEXT = ")";
        }

      }

    }
  }

};

export function ___KBSTATUS_CAPS_OFF(H, V, WHAT) {

  for(var y = 0;y < V;y = y + 1) {
    for(var x = 0;x < H;x = x + 1) {

      var name = "___VIRTUALKEYBOARD_" + x + y;
      var PASS_VK_CODE_ = "";
      var width_extra = 0;
      var SPECIAL_COMMAND = null;
      var LETTER = 0;

      // CREATING SYS KEYBOARD
      if(name != "___VIRTUALKEYBOARD_44" && name != "___VIRTUALKEYBOARD_100" && name != "___VIRTUALKEYBOARD_103" && name != "___VIRTUALKEYBOARD_104" && name != "___VIRTUALKEYBOARD_94") {

        // eliminate rigth of space
        if(!((x >= 5 && y == 4) && (x <= 7 && y == 4))) {

          window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.TEXT = window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.TEXT.toLowerCase();
          //console.log('caps OFF' + x + ' x y ' + y)

        }

        // extra
        if(y == 2 && x == 10) {
          var name = "___VIRTUALKEYBOARD_" + (x + 1) + y;
          x = 11;
          window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.TEXT = window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.TEXT.toLowerCase();
          x = 10;

        }

        // extra
        if(y == 1 && x == 10) {
          var name = "___VIRTUALKEYBOARD_" + (x + 1) + y;
          x = 11;
          window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.TEXT = window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.TEXT.toLowerCase();
          x = 12;

        }

        //for special
        if(___VIRTUALKEYBOARD_101.TEXTBOX.TEXT != "[") {
          ___VIRTUALKEYBOARD_101.TEXTBOX.TEXT = "[";
        }

        if(___VIRTUALKEYBOARD_102.TEXTBOX.TEXT != "'") {
          ___VIRTUALKEYBOARD_102.TEXTBOX.TEXT = "'";
        }

        if(___VIRTUALKEYBOARD_93.TEXTBOX.TEXT != "/") {
          ___VIRTUALKEYBOARD_93.TEXTBOX.TEXT = "/";
        }

        //for special
        if(name == "___VIRTUALKEYBOARD_111") {
          ___VIRTUALKEYBOARD_111.TEXTBOX.TEXT = "]";
        } else if(name == "___VIRTUALKEYBOARD_93") {
          ___VIRTUALKEYBOARD_92.TEXTBOX.TEXT = ";";
        } else if(name == "___VIRTUALKEYBOARD_112") {
          ___VIRTUALKEYBOARD_112.TEXTBOX.TEXT = "\\";
        } else if(name == "___VIRTUALKEYBOARD_73") {
          ___VIRTUALKEYBOARD_73.TEXTBOX.TEXT = ",";
        } else if(name == "___VIRTUALKEYBOARD_83") {
          ___VIRTUALKEYBOARD_83.TEXTBOX.TEXT = ".";
        } else if(name == "___VIRTUALKEYBOARD_10") {
          ___VIRTUALKEYBOARD_10.TEXTBOX.TEXT = "1";
        } else if(name == "___VIRTUALKEYBOARD_20") {
          ___VIRTUALKEYBOARD_20.TEXTBOX.TEXT = "2";
        } else if(name == "___VIRTUALKEYBOARD_30") {
          ___VIRTUALKEYBOARD_30.TEXTBOX.TEXT = "3";
        } else if(name == "___VIRTUALKEYBOARD_40") {
          ___VIRTUALKEYBOARD_40.TEXTBOX.TEXT = "4";
        } else if(name == "___VIRTUALKEYBOARD_50") {
          ___VIRTUALKEYBOARD_50.TEXTBOX.TEXT = "5";
        } else if(name == "___VIRTUALKEYBOARD_60") {
          ___VIRTUALKEYBOARD_60.TEXTBOX.TEXT = "6";
        } else if(name == "___VIRTUALKEYBOARD_70") {
          ___VIRTUALKEYBOARD_70.TEXTBOX.TEXT = "7";
        } else if(name == "___VIRTUALKEYBOARD_80") {
          ___VIRTUALKEYBOARD_80.TEXTBOX.TEXT = "8";
        } else if(name == "___VIRTUALKEYBOARD_90") {
          ___VIRTUALKEYBOARD_90.TEXTBOX.TEXT = "9";
        } else if(name == "___VIRTUALKEYBOARD_00") {
          ___VIRTUALKEYBOARD_00.TEXTBOX.TEXT = "0";
        }

      }
      //for special
      if(name == "___VIRTUALKEYBOARD_101") {
        ___VIRTUALKEYBOARD_101.TEXTBOX.TEXT = "[";
      }

    }
  }

};
