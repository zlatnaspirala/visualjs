
import APPLICATION from '../../manifest/manifest';
import SYS from '../system';
import { CONVERTOR, RESOURCE } from '../init';
import { ADD } from '../editor/editor';

export function EVENTS(canvas, ROOT_ENGINE) {

  var ROOT_EVENTS = this;
  this.ROOT_ENGINE = ROOT_ENGINE;

  //Mobile device
  if(NOMOBILE == 0) {

    /**
     * Use for Mobile device.
     * @event touchstart
     */
    canvas.addEventListener("touchstart", function(e) {

      e.preventDefault();

      var touchList = e.changedTouches;

      //SYS.MOUSE.PRESS = true;

      SYS.MOUSE.x = touchList[0].pageX;
      SYS.MOUSE.y = touchList[0].pageY;

      ROOT_EVENTS.CALCULATE_TOUCH_OR_CLICK();

    }, false);

    /**
     * Use for Mobile device.
     * @event touchend
     */
    canvas.addEventListener("touchend", function(e) {

      e.preventDefault();

      var touchList = e.changedTouches;

      SYS.MOUSE.PRESS = false;

      SYS.MOUSE.x = touchList[0].pageX;
      SYS.MOUSE.y = touchList[0].pageY;

      ROOT_EVENTS.CALCULATE_TOUCH_UP_OR_MOUSE_UP();
    }, false);

    /**
     * Use for Mobile device.
     * @event touchcancel
     */
    canvas.addEventListener("touchcancel", function(e) {

      e.preventDefault();

      var touchList = e.changedTouches;

      SYS.MOUSE.PRESS = false;

      SYS.MOUSE.x = touchList[0].pageX;
      SYS.MOUSE.y = touchList[0].pageY;

      ROOT_EVENTS.CALCULATE_TOUCH_UP_OR_MOUSE_UP();
    }, false);

    /**
     * Use for Mobile device.
     * @event touchmove
     */
    canvas.addEventListener("touchmove", function(e) {

      e.preventDefault();

      var touchList = e.changedTouches;

      //SYS.MOUSE.PRESS = true;

      SYS.MOUSE.x = touchList[0].pageX;
      SYS.MOUSE.y = touchList[0].pageY;

      ROOT_EVENTS.CALCULATE_TOUCH_MOVE_OR_MOUSE_MOVE();
    }, false);

  } else {

    /**
     * Use for Desktop device.
     * @event click
     */
    canvas.addEventListener("click", function(e) {

      //SYS.MOUSE.PRESS = true;


      SYS.MOUSE.x = e.layerX;
      SYS.MOUSE.y = e.layerY;

      ROOT_EVENTS.CALCULATE_TOUCH_OR_CLICK();
      //SYS.DEBUG.LOG("SYS : CLICK EVENT " + canvas);

    }, false);

    /**
     * Use for Desktop device.
     * @event mouseup
     */
    canvas.addEventListener("mouseup", function(e) {

      SYS.MOUSE.PRESS = false;
      SYS.MOUSE.BUTTON_PRESSED = null;

      SYS.MOUSE.x = e.layerX;
      SYS.MOUSE.y = e.layerY;

      ROOT_EVENTS.CALCULATE_TOUCH_UP_OR_MOUSE_UP();

    }, false);

    /**
     * Use for Desktop device.
     * @event onmousemove
     */
    canvas.onmousemove = function(e) {

      SYS.MOUSE.x = e.layerX;
      SYS.MOUSE.y = e.layerY;

      ROOT_EVENTS.CALCULATE_TOUCH_MOVE_OR_MOUSE_MOVE();

    };

    /**
     * Use for Desktop device.
     * @event onmousedown
     */
    canvas.onmousedown = function(e) {

      SYS.MOUSE.PRESS = true;

      if(e.which == 3) {
        SYS.MOUSE.BUTTON_PRESSED = "RIGHT";
        SYS.MOUSE.ON_RIGHT_BTN_PRESSED();
        SYS.DEBUG.LOG("Right button clicked");
      } else if(e.which == 2) {
        SYS.MOUSE.BUTTON_PRESSED = "MID";
        SYS.MOUSE.ON_MID_BTN_PRESSED();
        SYS.DEBUG.LOG("Mid button clicked");
      } else if(e.which == 1) {
        SYS.MOUSE.BUTTON_PRESSED = "LEFT";
        SYS.MOUSE.ON_LEFT_BTN_PRESSED();
        SYS.DEBUG.LOG("Left button clicked");
      }

      SYS.MOUSE.x = e.layerX;
      SYS.MOUSE.y = e.layerY;

      ROOT_EVENTS.CALCULATE_TOUCH_DOWN_OR_MOUSE_DOWN();

    };

    //console.log("This is PC desktop device.");
  }

  //Calculate touch or click event
  this.CALCULATE_TOUCH_OR_CLICK = function() {

    for(var x = 0;x < this.ROOT_ENGINE.MODULES.length;x++) {

      for(var z = 0;z < ROOT_EVENTS.ROOT_ENGINE.MODULES[x].GAME_OBJECTS.length;z++) {

        var local_go = ROOT_EVENTS.ROOT_ENGINE.MODULES[x].GAME_OBJECTS[z];
        if(SYS.MOUSE.x > local_go.POSITION.X() && SYS.MOUSE.x < local_go.POSITION.X() + local_go.DIMENSION.WIDTH() && SYS.MOUSE.y > local_go.POSITION.Y() && SYS.MOUSE.y < local_go.POSITION.Y() + local_go.DIMENSION.HEIGHT()) {

          if(ROOT_EVENTS.ROOT_ENGINE.ENGINE_EDITOR == false && local_go.VISIBLE != false) {

            SYS.DEBUG.LOG("SYS : touch or click event on game object : " + local_go.NAME);
            local_go.FOCUS = true;
            local_go.TAP();

          }

        }

      }

    }

  };

  // CALCULATE MOUSE MOVE OR TOUCH MOVE
  this.CALCULATE_TOUCH_MOVE_OR_MOUSE_MOVE = function() {

    for(var x = 0;x < this.ROOT_ENGINE.MODULES.length;x++) {

      var first_pass = false;

      for(var z = 0;z < ROOT_EVENTS.ROOT_ENGINE.MODULES[x].GAME_OBJECTS.length;z++) {

        //-------------------------------//-------------------------------//-------------------------------
        var local_go = ROOT_EVENTS.ROOT_ENGINE.MODULES[x].GAME_OBJECTS[z];
        if(SYS.MOUSE.x > local_go.POSITION.X() && SYS.MOUSE.x < local_go.POSITION.X() + local_go.DIMENSION.WIDTH() && SYS.MOUSE.y > local_go.POSITION.Y() && SYS.MOUSE.y < local_go.POSITION.Y() + local_go.DIMENSION.HEIGHT()) {

          //SYS.DEBUG.LOG( "SYS : touchmove event on game object : " + local_go.NAME);
          // EVENT ONLY OUT OF EDITOR
          if(ROOT_EVENTS.ROOT_ENGINE.ENGINE_EDITOR == false && local_go.VISIBLE == true) {

            local_go.TOUCH_MOVE();

            if(SYS.MOUSE.PRESS == true && local_go.DRAG == true && first_pass == false && local_go.DRAG_STATUS == true) {

              first_pass = true;

              local_go.DRAG_DELTA = (local_go.DRAG_START_X);
              var local_ = CONVERTOR.PIX_TO_PER(parseFloat(local_go.DRAG_DELTA.toFixed(2)));
              local_go.POSITION.TRANSLATE_BY_X(parseFloat(CONVERTOR.PIX_TO_PER(SYS.MOUSE.x).toFixed(2)) - Math.abs(local_));

              local_go.DRAG_DELTA = (local_go.DRAG_START_Y);
              var local_ = CONVERTOR.PIY_TO_PER(parseFloat(local_go.DRAG_DELTA.toFixed(2)));
              local_go.POSITION.TRANSLATE_BY_Y(parseFloat(CONVERTOR.PIY_TO_PER(SYS.MOUSE.y).toFixed(2)) - Math.abs(local_));

            }

          }

        } else {}
        //-------------------------------//-------------------------------//-------------------------------


        //-------------------------------//-------------------------------//-------------------------------
        //EDITOR
        //-------------------------------//-------------------------------//-------------------------------
        if(local_go.EDITOR.ENABLE == true) {

          //-------------------------------//-------------------------------//-------------------------------
          // DRAG in EDITOR
          //-------------------------------//-------------------------------//-------------------------------

          if(SYS.MOUSE.PRESS == true && local_go.EDITOR.ACTOR_DRAG == true && first_pass == false) {

            first_pass = true;

            local_go.EDITOR.ACTOR_DELTA = (local_go.EDITOR.ACTOR_START_X + local_go.EDITOR.ACTORS_AREA_HEIGHT);
            var local_ = CONVERTOR.PIX_TO_PER(parseFloat(local_go.EDITOR.ACTOR_DELTA.toFixed(2)));
            local_go.POSITION.TRANSLATE_BY_X(parseFloat(CONVERTOR.PIX_TO_PER(SYS.MOUSE.x).toFixed(2)) - Math.abs(local_));

            local_go.EDITOR.ACTOR_DELTA = (local_go.EDITOR.ACTOR_START_Y + local_go.EDITOR.ACTORS_AREA_HEIGHT);
            var local_ = CONVERTOR.PIY_TO_PER(parseFloat(local_go.EDITOR.ACTOR_DELTA.toFixed(2)));
            local_go.POSITION.TRANSLATE_BY_Y(parseFloat(CONVERTOR.PIY_TO_PER(SYS.MOUSE.y).toFixed(2)) - Math.abs(local_));

          }

          //-------------------------------//-------------------------------//-------------------------------
          //-------------------------------//-------------------------------//-------------------------------


          //-------------------------------//-------------------------------//-------------------------------
          // OBJECT MOVE
          // ACTOR X
          if(local_go.EDITOR.ACTOR_X_IN_MOVE == true) {
            local_go.EDITOR.ACTOR_DELTA = (local_go.EDITOR.ACTOR_START_X);
            var local_ = CONVERTOR.PIX_TO_PER(parseFloat(local_go.EDITOR.ACTOR_DELTA.toFixed(1)));
            local_go.POSITION.TRANSLATE_BY_X(parseFloat(CONVERTOR.PIX_TO_PER(SYS.MOUSE.x).toFixed(1)) - Math.abs(local_));
          }
          // ACTOR Y
          if(local_go.EDITOR.ACTOR_Y_IN_MOVE == true) {
            local_go.EDITOR.ACTOR_DELTA = (local_go.EDITOR.ACTOR_START_Y);
            var local_ = CONVERTOR.PIY_TO_PER(parseFloat(local_go.EDITOR.ACTOR_DELTA.toFixed(1)));
            local_go.POSITION.TRANSLATE_BY_Y(parseFloat(CONVERTOR.PIY_TO_PER(SYS.MOUSE.y).toFixed(1)) - Math.abs(local_));
          }

          //-------------------------------//-------------------------------//-------------------------------


          //HOVER
          //-------------------------------//-------------------------------//-------------------------------
          if(SYS.MOUSE.x > local_go.POSITION.X() + local_go.EDITOR.ACTORS_AREA_HEIGHT && SYS.MOUSE.x < local_go.POSITION.X() + local_go.EDITOR.ACTORS_AREA_HEIGHT * 15 && SYS.MOUSE.y > local_go.POSITION.Y() && SYS.MOUSE.y < local_go.POSITION.Y() + local_go.EDITOR.ACTORS_AREA_HEIGHT) {

            local_go.EDITOR.ACTOR_BLUE_HOVER = true;

          } else {

            local_go.EDITOR.ACTOR_BLUE_HOVER = false;

          }
          //-------------------------------//-------------------------------//-------------------------------


          //-------------------------------//-------------------------------//-------------------------------
          if(SYS.MOUSE.x > local_go.POSITION.X() && SYS.MOUSE.x < local_go.POSITION.X() + local_go.EDITOR.ACTORS_AREA_HEIGHT && SYS.MOUSE.y > local_go.POSITION.Y() + local_go.EDITOR.ACTORS_AREA_HEIGHT && SYS.MOUSE.y < local_go.POSITION.Y() + local_go.EDITOR.ACTORS_AREA_HEIGHT * 15) {

            local_go.EDITOR.ACTOR_GREEN_HOVER = true;
            //SYS.DEBUG.LOG( "SYS : green Y-ACTOR event on game object : " + local_go.NAME);

          } else {

            local_go.EDITOR.ACTOR_GREEN_HOVER = false;

          }
          //-------------------------------//-------------------------------//-------------------------------

          //-------------------------------//-------------------------------//-------------------------------
        } // END OF EDITOR


        if(local_go.EDITOR.GAME_OBJECT_MENU.VISIBLE == true) {

          local_go.EDITOR.ACTOR_DRAG = false;

          for(var q = 0;q < local_go.EDITOR.BUTTONS.length;q++) {

            if(SYS.MOUSE.x > local_go.EDITOR.BUTTONS[q].POSITION.x && SYS.MOUSE.x < local_go.EDITOR.BUTTONS[q].POSITION.x + local_go.EDITOR.BUTTONS[q].DIMENSION.WIDTH() && SYS.MOUSE.y > local_go.EDITOR.BUTTONS[q].POSITION.y + local_go.EDITOR.BUTTONS[q].Y_OFFSET && SYS.MOUSE.y < local_go.EDITOR.BUTTONS[q].POSITION.y + local_go.EDITOR.BUTTONS[q].Y_OFFSET + local_go.EDITOR.BUTTONS[q].DIMENSION.HEIGHT()) {

              local_go.EDITOR.BUTTONS[q].HOVER = true;

            } else {

              local_go.EDITOR.BUTTONS[q].HOVER = false;

            }

          }

        }
        //-------------------------------//-------------------------------//-------------------------------


      }

    }

    if(ROOT_ENGINE.GUI.VISIBLE == true) {

      for(var x = 0;x < ROOT_ENGINE.GUI.BUTTONS.length;x++) {

        if(SYS.MOUSE.x > ROOT_ENGINE.GUI.BUTTONS[x].POSITION.x && SYS.MOUSE.x < ROOT_ENGINE.GUI.BUTTONS[x].POSITION.x + ROOT_ENGINE.GUI.BUTTONS[x].DIMENSION.WIDTH() && SYS.MOUSE.y > ROOT_ENGINE.GUI.BUTTONS[x].POSITION.y + ROOT_ENGINE.GUI.BUTTONS[x].Y_OFFSET && SYS.MOUSE.y < ROOT_ENGINE.GUI.BUTTONS[x].POSITION.y + ROOT_ENGINE.GUI.BUTTONS[x].Y_OFFSET + ROOT_ENGINE.GUI.BUTTONS[x].DIMENSION.HEIGHT()) {

          ROOT_ENGINE.GUI.BUTTONS[x].HOVER = true;

        } else {
          ROOT_ENGINE.GUI.BUTTONS[x].HOVER = false;
        }

      }

    }

    // LIST GUI SYSTEM EVENTS

    if(ROOT_ENGINE.GUI.VISIBLE == true) {

      for(var x = 0;x < ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES.length;x++) {

        if(SYS.MOUSE.x > ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.x && SYS.MOUSE.x < ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.x + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].DIMENSION.WIDTH() && SYS.MOUSE.y > ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.y + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].Y_OFFSET && SYS.MOUSE.y < ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.y + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].Y_OFFSET + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].DIMENSION.HEIGHT()) {

          ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].HOVER = true;

        } else {
          ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].HOVER = false;
        }

      }

      //BUTTONS_GAME_OBJECTS
      for(var x = 0;x < ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS.length;x++) {

        if(SYS.MOUSE.x > ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.x && SYS.MOUSE.x < ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.x + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].DIMENSION.WIDTH() && SYS.MOUSE.y > ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.y + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].Y_OFFSET && SYS.MOUSE.y < ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.y + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].Y_OFFSET + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].DIMENSION.HEIGHT()) {

          ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].HOVER = true;

        } else {
          ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].HOVER = false;
        }

      }

    }
    //


  };

  // CALCULATE_TOUCH_UP_OR_MOUSE_UP
  this.CALCULATE_TOUCH_UP_OR_MOUSE_UP = function() {

    for(var x = 0;x < this.ROOT_ENGINE.MODULES.length;x++) {

      for(var z = 0;z < ROOT_EVENTS.ROOT_ENGINE.MODULES[x].GAME_OBJECTS.length;z++) {

        var local_go = ROOT_EVENTS.ROOT_ENGINE.MODULES[x].GAME_OBJECTS[z];

        local_go.EDITOR.ACTOR_X_IN_MOVE = false;
        local_go.EDITOR.ACTOR_Y_IN_MOVE = false;

        //-------------------------------//-------------------------------//-------------------------------
        // EDITOR
        //-------------------------------//-------------------------------//-------------------------------
        if(local_go.EDITOR.ENABLE == true) {

          local_go.EDITOR.ACTOR_DRAG = false;

          //-------------------------------//-------------------------------//-------------------------------
        } // end of EDITOR
        //-------------------------------//-------------------------------//-------------------------------

        // EVENT ONLY OUT OF EDITOR
        if(ROOT_EVENTS.ROOT_ENGINE.ENGINE_EDITOR == false) {

          if(SYS.MOUSE.x > local_go.POSITION.X() && SYS.MOUSE.x < local_go.POSITION.X() + local_go.DIMENSION.WIDTH() && SYS.MOUSE.y > local_go.POSITION.Y() && SYS.MOUSE.y < local_go.POSITION.Y() + local_go.DIMENSION.HEIGHT()) {

            if(local_go.VISIBLE == true) {
              local_go.TOUCH_UP();
              SYS.DOM.E(SYS.RUNNING_PROGRAMS[0]).style.cursor = "auto";
            }

          }

        }

      }

    }

  };

  this.CALCULATE_TOUCH_DOWN_OR_MOUSE_DOWN = function() {

    var selected_something = false;

    for(var x = 0;x < this.ROOT_ENGINE.MODULES.length;x++) {

      for(var z = 0;z < ROOT_EVENTS.ROOT_ENGINE.MODULES[x].GAME_OBJECTS.length;z++) {

        var local_go = ROOT_EVENTS.ROOT_ENGINE.MODULES[x].GAME_OBJECTS[z];

        if(SYS.MOUSE.x > local_go.POSITION.X() && SYS.MOUSE.x < local_go.POSITION.X() + local_go.DIMENSION.WIDTH() && SYS.MOUSE.y > local_go.POSITION.Y() && SYS.MOUSE.y < local_go.POSITION.Y() + local_go.DIMENSION.HEIGHT()) {

          local_go.EDITOR.SELECTED = true;

          selected_something = true;

          if(local_go.TYPE_OF_GAME_OBJECT == "TEXT_BOX" && local_go.TEXTBOX.EDIT == true && local_go.VISIBLE == true) {

            if(NOMOBILE == 1) { // for desktop mouse		HARD CODE 0/1


              if(APPLICATION.ACCESSIBILITY.VIRTUAL_KEYBOARD_FOR_DESKTOP == true) {
                ROOT_EVENTS.ROOT_ENGINE.KEYBOARD.TARGET_MODUL = local_go.PARENT;
                ROOT_EVENTS.ROOT_ENGINE.KEYBOARD.TARGET = local_go.NAME;
                SHOW_KEYBOARD(local_go.NAME);

              } else { //normal for desktop
                local_go.FOCUS = true;
                ROOT_EVENTS.ROOT_ENGINE.KEYBOARD.CAPTURE_CHAR = local_go.TEXTBOX.TEXT;
                ROOT_EVENTS.ROOT_ENGINE.KEYBOARD.TARGET_MODUL = local_go.PARENT;
                ROOT_EVENTS.ROOT_ENGINE.KEYBOARD.TARGET = local_go.NAME;
              }

            } else { // for mobile VirtualKeyboard
              ROOT_EVENTS.ROOT_ENGINE.KEYBOARD.TARGET_MODUL = local_go.PARENT;
              ROOT_EVENTS.ROOT_ENGINE.KEYBOARD.TARGET = local_go.NAME;
              SHOW_KEYBOARD(local_go.NAME);

            }

          }

          // EVENT ONLY OUT OF EDITOR
          if(ROOT_EVENTS.ROOT_ENGINE.ENGINE_EDITOR == false && local_go.VISIBLE == true) {

            local_go.FOCUS = true;
            local_go.TOUCH_DOWN();
            SYS.DEBUG.LOG("SYS : touchDown or mouseDown event on game object : " + local_go.NAME);

            // if drag is enabled
            if(local_go.DRAG == true) {
              //$$$$$$$$

              //if (  SYS.MOUSE.x > local_go.POSITION.X()    && SYS.MOUSE.x < local_go.POSITION.X() +  local_go.DIMENSION.WIDTH()  && SYS.MOUSE.y > local_go.POSITION.Y()&&SYS.MOUSE.y < local_go.POSITION.Y() +    local_go.DIMENSION.HEIGHT()) {

              if(SYS.MOUSE.BUTTON_PRESSED == "LEFT") {

                SYS.DOM.E(local_go.PROGRAM_NAME).style.cursor = "MOVE";
                local_go.DRAG = true;
                local_go.DRAG_START_X = parseFloat(SYS.MOUSE.x.toFixed(2) - local_go.POSITION.X());
                local_go.DRAG_START_Y = parseFloat(SYS.MOUSE.y.toFixed(2) - local_go.POSITION.Y());
              }

              //	}


              //$$$$$$$$
            }

          }

        } else {

          local_go.FOCUS = false;

        }

        //-------------------------------//-------------------------------//-------------------------------
        // EDITOR
        //-------------------------------//-------------------------------//-------------------------------
        if(local_go.EDITOR.ENABLE == true) {

          //################
          if(local_go.EDITOR.GAME_OBJECT_MENU.VISIBLE == true) {

            local_go.EDITOR.ACTOR_DRAG = false;

            for(var q = 0;q < local_go.EDITOR.BUTTONS.length;q++) {

              if(SYS.MOUSE.x > local_go.EDITOR.BUTTONS[q].POSITION.x && SYS.MOUSE.x < local_go.EDITOR.BUTTONS[q].POSITION.x + local_go.EDITOR.BUTTONS[q].DIMENSION.WIDTH() && SYS.MOUSE.y > local_go.EDITOR.BUTTONS[q].POSITION.y + local_go.EDITOR.BUTTONS[q].Y_OFFSET && SYS.MOUSE.y < local_go.EDITOR.BUTTONS[q].POSITION.y + local_go.EDITOR.BUTTONS[q].Y_OFFSET + local_go.EDITOR.BUTTONS[q].DIMENSION.HEIGHT()) {

                //-----------------------------------------------------------------------------//-----------------------------------------------------------------------------
                if(local_go.EDITOR.BUTTONS[q].IAM == "1") {
                  // DESTROY OBJECT
                  ROOT_EVENTS.ROOT_ENGINE.MODULES[x].DESTROY_OBJECT(local_go.NAME);
                  //DESTROY( name , canvas.id  , local_go.PARENT )
                  DESTROY(local_go.NAME);
                  SYS.DEBUG.LOG("DESTROY_OBJECT");

                }
                //-----------------------------------------------------------------------------//-----------------------------------------------------------------------------
                else if(local_go.EDITOR.BUTTONS[q].IAM == "2") {

                  var local_res = prompt("Destroy game_object ( Time not count in editor ):", "10");
                  if(!isNaN(parseFloat(local_res.charAt(0)))) {
                    var _name = local_go.NAME;

                    local_go.DESTROY_ME_AFTER_X_SECUND(local_res, _name, x, ROOT_EVENTS);

                  } else {
                    alert("ERROR MSG: ADD_ANIMATION not success.");
                  }

                  SYS.DEBUG.LOG("test2");

                }
                //-----------------------------------------------------------------------------//-----------------------------------------------------------------------------
                else if(local_go.EDITOR.BUTTONS[q].IAM == "3") {
                  var resource_list = "";
                  for(var key in RESOURCE) {
                    if(RESOURCE.hasOwnProperty(key) && key != "SUM") {
                      resource_list += "  " + key + ", ";
                    }
                  }

                  var local_res = prompt("Full list of images source : \n " + resource_list + "   \n \n Enter name of animation resource object :", "demo1");
                  if(isNaN(parseFloat(local_res.charAt(0)))) {
                    ADD_ANIMATION(local_go.NAME, local_go.PROGRAM_NAME, local_go.PARENT, local_res);
                  } else {
                    alert("ERROR MSG: ADD_ANIMATION not success.");
                  }

                  SYS.DEBUG.LOG("add animation....");

                }
                //-----------------------------------------------------------------------------
                else if(local_go.EDITOR.BUTTONS[q].IAM == "4") {
                  if(local_go.COLLISION == null) {
                    ////////////////////////////
                    // ADD COLLIDER
                    ///////////////////////////
                    var local_res = prompt("Enter outline margin collider.", "1.02");
                    if(!isNaN(parseFloat(local_res.charAt(0)))) {

                      ADD_COLLISION(local_go.NAME, local_go.PROGRAM_NAME, local_go.PARENT, local_res);
                      local_go.EDITOR.BUTTONS[q].text = "Remove collision";

                      //local_go.REMOVE_COLLISION(local_go.NAME  , local_go.PROGRAM_NAME , local_go.PARENT);
                      SYS.DEBUG.LOG("add collider");
                    } else {
                      alert("ERROR MSG: ADD_COLLISION not success.");
                    }
                    //////////////////////////
                  } else if(local_go.EDITOR.BUTTONS[q].text == "Remove collision") {

                    REMOVE_COLLISION();
                    local_go.COLLISION = null;
                    local_go.EDITOR.BUTTONS[q].text = "Add collision";
                    SYS.DEBUG.LOG("remove collider");

                  }

                }
                //-----------------------------------------------------------------------------
                else if(local_go.EDITOR.BUTTONS[q].IAM == "5") {

                  if(typeof PLAYER === "undefined") {

                    var local_res = prompt("Enter player type : ", "NORMAL");
                    if(isNaN(parseFloat(local_res.charAt(0)))) {
                      CREATE_PLAYER(local_go.NAME, local_go.PROGRAM_NAME, local_go.PARENT, local_res, q);
                      local_go.EDITOR.BUTTONS[q].text = "Deatach player";
                      SYS.DEBUG.LOG("atach player");

                    }

                  } else if(typeof local_go.PLAYER != "undefined") {

                    DEATACH_PLAYER(local_go.NAME, local_go.PROGRAM_NAME, local_go.PARENT);

                    local_go.PLAYER = undefined;
                    PLAYER = undefined;
                    //delete (local_go.PLAYER);
                    //delete (PLAYER);


                    local_go.EDITOR.BUTTONS[q].text = "Atach player";
                    SYS.DEBUG.LOG("deatach player , also destroy PLAYER global object.");

                  }

                }
                //-----------------------------------------------------------------------------
                //-----------------------------------------------------------------------------
                else if(local_go.EDITOR.BUTTONS[q].IAM == "6") {

                  if(local_go.PARTICLE == null) {

                    var local_res = prompt("Enter particle type : ", "FONTAN");
                    if(isNaN(parseFloat(local_res.charAt(0)))) {

                      ADD_PARTICLE(local_go.NAME, local_go.PROGRAM_NAME, local_go.PARENT, local_res);
                      local_go.CREATE_PARTICLE(local_res);
                      local_go.EDITOR.BUTTONS[q].text = "Remove particle";
                      SYS.DEBUG.LOG("atach player");

                    }

                  } else if(typeof local_go.PARTICLE != null) {

                    REMOVE_PARTICLE(local_go.NAME, local_go.PROGRAM_NAME, local_go.PARENT);
                    local_go.TYPE_OF_GAME_OBJECT = "empty";
                    delete (local_go.PARTICLE);
                    local_go.PARTICLE = null;
                    local_go.EDITOR.BUTTONS[q].text = "Add particle";
                    SYS.DEBUG.LOG("particle removed from " + local_go.NAME);

                  }

                }
                //-----------------------------------------------------------------------------
                //-----------------------------------------------------------------------------
                else if(local_go.EDITOR.BUTTONS[q].IAM == "7") {

                  if(local_go.TEXTBOX == null) {

                    var local_res = prompt("Enter text value : ", "HELLO");
                    var local_color = prompt("Enter color value : ", "red");
                    var local_textcolor = prompt("Enter Text color value : ", "black");
                    var local_radius = prompt("Enter rect radius  value : ", 15);
                    local_res = "" + local_res.toString();
                    ADD_TEXTBOX(local_go.NAME, local_go.PROGRAM_NAME, local_go.PARENT, local_res, local_radius, local_color, local_textcolor);
                    local_go.CREATE_TEXTBOX(local_res, local_radius, local_color, local_textcolor);
                    local_go.EDITOR.BUTTONS[q].text = "Remove textbox";
                    SYS.DEBUG.LOG("atach textbox");

                  } else if(typeof local_go.TEXTBOX != null) {

                    REMOVE_TEXTBOX(local_go.NAME, local_go.PROGRAM_NAME, local_go.PARENT);
                    local_go.TYPE_OF_GAME_OBJECT = "empty";
                    delete (local_go.TEXTBOX);
                    local_go.TEXTBOX = null;
                    local_go.EDITOR.BUTTONS[q].text = "Add textbox";
                    SYS.DEBUG.LOG("textbox removed from " + local_go.NAME + " . And .TEXTBOX is :" + local_go.TEXTBOX);

                  }

                }
                //-----------------------------------------------------------------------------
                //-----------------------------------------------------------------------------
                else if(local_go.EDITOR.BUTTONS[q].IAM == "8") {

                  if(local_go.WEBCAM == null) {

                    var local_res = prompt("Choose NORMAL if you wanna simple webcam view or enter value 'NUI' for motion detect component + webcam view : ", "NORMAL");

                    if(local_res == "NORMAL") {

                      var local_type_of_dim = prompt("Just press enter to make video with the same dimensions like game_object , any other value set dimensions of webcam video. ", "GAME_OBJECT");

                      if(local_type_of_dim == "GAME_OBJECT") {

                        local_go.CREATE_WEBCAM(local_res, local_type_of_dim);
                        ADD_WEBCAM(local_go.NAME, local_go.PROGRAM_NAME, local_go.PARENT, local_res, local_type_of_dim);

                        local_go.EDITOR.BUTTONS[q].text = "Remove webcam";
                        SYS.DEBUG.LOG("atach webcam");
                      } else {

                        // DIMENSIONS_TYPE = WEBCAM_DIMENSION
                        local_go.CREATE_WEBCAM(local_res, local_type_of_dim);
                        ADD_WEBCAM(local_go.NAME, local_go.PROGRAM_NAME, local_go.PARENT, local_res, "WEBCAM_DIMENSION");

                        local_go.EDITOR.BUTTONS[q].text = "Remove webcam";
                        SYS.DEBUG.LOG("atach webcam");
                      }

                    } else if(local_res == "NUI") {

                      var local_type_of_dim = prompt("Just press enter to make video with the same dimensions like game_object , any other value set dimensions of webcam video. ", "GAME_OBJECT");

                      var detectPointByVer = prompt(" Sum of motion detect point for vertical line, 8 is optimal for max value and 1 is minimum . ", 6);
                      var detectPointByHor = prompt(" Sum of motion detect point for horizontal line, 8 is optimal for max value and 1 is minimum . ", 6);

                      if(!isNaN(detectPointByVer) && !isNaN(detectPointByHor) && isNaN(local_type_of_dim)) {

                        local_go.CREATE_WEBCAM(local_res, local_type_of_dim);
                        ADD_WEBCAM(local_go.NAME, local_go.PROGRAM_NAME, local_go.PARENT, local_res, local_type_of_dim, detectPointByVer, detectPointByHor);

                        local_go.EDITOR.BUTTONS[q].text = "Remove webcam";
                        SYS.DEBUG.LOG("atach webcam");

                      } else {

                        SYS.DEBUG.WARNING(" Error in CREATE_WEBCAM procedure Description : type of dimensions must be string , Sum of point must be number.");

                      }

                    }

                  } else {

                    local_go.DESTROY_WEBCAM();
                    REMOVE_WEBCAM(local_go.NAME, local_go.PROGRAM_NAME, local_go.PARENT);
                  }
                }
              } else {
                local_go.EDITOR.GAME_OBJECT_MENU.VISIBLE = false;
              }

            }
          }

          if(SYS.MOUSE.x > local_go.EDITOR.ACTOR_DRAG_RECT_POS.X() + local_go.EDITOR.ACTORS_AREA_HEIGHT && SYS.MOUSE.x < local_go.EDITOR.ACTOR_DRAG_RECT_POS.X() + local_go.EDITOR.ACTOR_DRAG_RECT_DIM.WIDTH() + local_go.EDITOR.ACTORS_AREA_HEIGHT && SYS.MOUSE.y > local_go.EDITOR.ACTOR_DRAG_RECT_POS.Y() + local_go.EDITOR.ACTORS_AREA_HEIGHT && SYS.MOUSE.y < local_go.EDITOR.ACTOR_DRAG_RECT_POS.Y() + local_go.EDITOR.ACTOR_DRAG_RECT_DIM.HEIGHT() + local_go.EDITOR.ACTORS_AREA_HEIGHT) {

            if(SYS.MOUSE.BUTTON_PRESSED == "LEFT") {
              local_go.EDITOR.ACTOR_DRAG = true;
              local_go.EDITOR.ACTOR_START_X = parseFloat(SYS.MOUSE.x.toFixed(2) - local_go.POSITION.X() - local_go.EDITOR.ACTORS_AREA_HEIGHT);
              local_go.EDITOR.ACTOR_START_Y = parseFloat(SYS.MOUSE.y.toFixed(2) - local_go.POSITION.Y() - local_go.EDITOR.ACTORS_AREA_HEIGHT);
            } else if(SYS.MOUSE.BUTTON_PRESSED == "RIGHT") {

              if(local_go.EDITOR.GAME_OBJECT_MENU.VISIBLE == false) {

                for(var w = 0;w < local_go.EDITOR.BUTTONS.length;w++) {

                  local_go.EDITOR.BUTTONS[w].POSITION.x = SYS.MOUSE.x;
                  local_go.EDITOR.BUTTONS[w].POSITION.y = SYS.MOUSE.y;

                }
                local_go.EDITOR.GAME_OBJECT_MENU.VISIBLE = true;

              }

            }

          }

          // HOVER  ACTORS
          if(local_go.EDITOR.ACTOR_BLUE_HOVER == true) {

            local_go.EDITOR.ACTOR_X_IN_MOVE = true;
            local_go.EDITOR.ACTOR_START_X = parseFloat(SYS.MOUSE.x.toFixed(2) - local_go.POSITION.X());

          } else if(local_go.EDITOR.ACTOR_GREEN_HOVER == true) {

            local_go.EDITOR.ACTOR_Y_IN_MOVE = true;
            local_go.EDITOR.ACTOR_START_Y = parseFloat(SYS.MOUSE.y.toFixed(2) - local_go.POSITION.Y());

          }

          if(selected_something == false) {

            local_go.DESELECT_ALL();

          }


        }
        // end of EDITOR

        if(selected_something == false && local_go.NAME.indexOf("___VIRTUALKEYBOARD") == -1) {
          ROOT_EVENTS.ROOT_ENGINE.KEYBOARD.TARGET_MODUL = undefined;
          ROOT_EVENTS.ROOT_ENGINE.KEYBOARD.TARGET = undefined;
        }
        // local_go

      }

    }

    if(ROOT_ENGINE.ENGINE_EDITOR == true) {

      if(ROOT_ENGINE.GUI.VISIBLE == false && selected_something == false && SYS.MOUSE.BUTTON_PRESSED == "RIGHT") {

        for(var x = 0;x < ROOT_ENGINE.GUI.BUTTONS.length;x++) {

          ROOT_ENGINE.GUI.BUTTONS[x].POSITION.x = SYS.MOUSE.x;
          ROOT_ENGINE.GUI.BUTTONS[x].POSITION.y = SYS.MOUSE.y;

        }

        ROOT_ENGINE.GUI.VISIBLE = true;

      } else if(ROOT_ENGINE.GUI.VISIBLE == true) {

        for(var x = 0;x < ROOT_ENGINE.GUI.BUTTONS.length;x++) {

          if(SYS.MOUSE.x > ROOT_ENGINE.GUI.BUTTONS[x].POSITION.x && SYS.MOUSE.x < ROOT_ENGINE.GUI.BUTTONS[x].POSITION.x + ROOT_ENGINE.GUI.BUTTONS[x].DIMENSION.WIDTH() && SYS.MOUSE.y > ROOT_ENGINE.GUI.BUTTONS[x].POSITION.y + ROOT_ENGINE.GUI.BUTTONS[x].Y_OFFSET && SYS.MOUSE.y < ROOT_ENGINE.GUI.BUTTONS[x].POSITION.y + ROOT_ENGINE.GUI.BUTTONS[x].Y_OFFSET + ROOT_ENGINE.GUI.BUTTONS[x].DIMENSION.HEIGHT()) {

            if(ROOT_ENGINE.GUI.BUTTONS[x].IAM == "1") {

              // ADD NEW OBJECT
              var sign_name = prompt("Enter gameObject name :", "noname");
              if(isNaN(parseFloat(sign_name.charAt(0)))) {
                var sign_name2 = prompt("Enter gameObject parent modul :", "STARTER");
                if(isNaN(parseFloat(sign_name.charAt(0)))) {

                  ADD(sign_name, 45, 45, 10, 10, canvas.id, sign_name2);

                } else {
                  alert("ERROR MSG: GameObject name created not success.");
                }
              } else {
                alert("ERROR MSG: GameObject name created not success.");
              }

            } else if(ROOT_ENGINE.GUI.BUTTONS[x].IAM == "2") {
              for(var z = 0;z < SYS.RUNNING_PROGRAMS.length;z++) {
                window[SYS.RUNNING_PROGRAMS[z]].ENGINE.EXIT_EDIT_MODE();
              }
            } else if(ROOT_ENGINE.GUI.BUTTONS[x].IAM == "3") {

              //runtime only
              // change draw interval and update
              var sign_name = prompt("Enter   program DRAW_INTERVAL :", 15);
              if(!isNaN(parseFloat(sign_name))) {
                var sign_name2 = prompt("Enter  program UPDATE_INTERVAL :", 15);
                if(!isNaN(parseFloat(sign_name2))) {

                  SYS.DEBUG.LOG("Program interval now is   " + sign_name + "  . best range is [1 , 70]  ");

                  window[ROOT_ENGINE.PROGRAM_ID].DRAW_INTERVAL = parseFloat(sign_name);
                  window[ROOT_ENGINE.PROGRAM_ID].UPDATE_INTERVAL = parseFloat(sign_name2);

                  SET_MAIN_INTERVAL(ROOT_ENGINE.PROGRAM_ID, sign_name, sign_name2);

                } else {
                  alert("ERROR MSG: Program interval not success changed.");
                }
              } else {
                alert("ERROR MSG: Program interval not success changed.");
              }

            } else if(ROOT_ENGINE.GUI.BUTTONS[x].IAM == "4") {

              if(APPLICATION.ACCOUNT_SERVICE_AUTO_RUN == true) {
                APPLICATION.ACCOUNT_SERVICE_AUTO_RUN = false;
                ROOT_ENGINE.GUI.BUTTONS[3].text = "Switch AutoConnect to true";

              } else {
                APPLICATION.ACCOUNT_SERVICE_AUTO_RUN = true;
                ROOT_ENGINE.GUI.BUTTONS[3].text = "Switch AutoConnectt to false";

              }

              SAVE("Application", APPLICATION);

            } else if(ROOT_ENGINE.GUI.BUTTONS[x].IAM == "5") {

              if(APPLICATION.EDITOR_AUTORUN == true) {
                APPLICATION.EDITOR_AUTORUN = false;
                ROOT_ENGINE.GUI.BUTTONS[4].text = "Switch editorAutoRun to true";

              } else {
                APPLICATION.EDITOR_AUTORUN = true;
                ROOT_ENGINE.GUI.BUTTONS[4].text = "Switch editorAutoRun to false";

              }

              SAVE("Application", APPLICATION);

            }

          }

        }

        ROOT_ENGINE.GUI.VISIBLE = false;

      }

      if(ROOT_ENGINE.GUI.LIST_OF_OBJECTS.VISIBLE == true) {

        for(var x = 0;x < ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES.length;x++) {
          if(SYS.MOUSE.x > ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.x && SYS.MOUSE.x < ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.x + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].DIMENSION.WIDTH() && SYS.MOUSE.y > ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.y + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].Y_OFFSET && SYS.MOUSE.y < ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.y + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].Y_OFFSET + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].DIMENSION.HEIGHT()) {
            ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].TAP();
          }
        }

        // GUI BUTTON LIST SYSTEM TAP EVENT
        for(var x = 0;x < ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS.length;x++) {
          if(SYS.MOUSE.x > ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.x && SYS.MOUSE.x < ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.x + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].DIMENSION.WIDTH() && SYS.MOUSE.y > ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.y + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].Y_OFFSET && SYS.MOUSE.y < ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.y + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].Y_OFFSET + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].DIMENSION.HEIGHT()) {
            ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].TAP();
          }
        }

      }

    }

  };

}
