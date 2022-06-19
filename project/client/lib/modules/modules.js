
import { GAME_OBJECT } from '../game_object/game_object';

/**
 * @example Use MODUL class on begin of program with
 * @example HELLO_WORLD.ENGINE.CREATE_MODUL("STARTER");
 * @Class MODUL
 * @constructor
 * @param {String} Name name is passed value for modul name.
 * @param {String} Name name is passed value for modul name.
 */
export function MODUL(name, PROGRAM_NAME) {

  var ROOT_MODUL = this;
  //ENGINE WILL BE BIG SWITCHER

  this.PARENT = PROGRAM_NAME;
  this.NAME = name;
  this.GAME_OBJECTS = new Array();

  this.NEW_OBJECT = function(name__, x, y, w, h, speed) {

    ROOT_MODUL.GAME_OBJECTS.push(new GAME_OBJECT(name__, ROOT_MODUL.NAME, x, y, w, h, speed, ROOT_MODUL.PARENT));

  };

  // Netwotk object
  this.NEW_NETWORK_OBJECT = function(object_) {

    ROOT_MODUL.GAME_OBJECTS.push(new GAME_OBJECT(object_.NAME, ROOT_MODUL.NAME, object_.POSITION.x, object_.POSITION.y, object_.DIMENSION.W, object_.DIMENSION.H, object_.POSITION.thrust, ROOT_MODUL.PARENT));

    if(object_.TYPE_OF_GAME_OBJECT.indexOf("ANIMATION") != -1) {

      window[object_.NAME].CREATE_ANIMATION(SURF, object_.ANIMATION.TYPE, 0, RESOURCE.Tiles, 123423444, "no", 1, 11, 1, 1, 1);

    }

  };

  this.NEW_NETWORK_POSITION = function(object_) {

    if(typeof object_.nameOfObject !== "undefined") {

      window[object_.nameOfObject].POSITION.SET_POSITION(object_.x, object_.y, "DIAMETRIC");

    }

  };

  this.NEW_NETWORK_DIMENSION = function(object_) {

    if(typeof object_.nameOfObject !== "undefined") {

      window[object_.nameOfObject].DIMENSION.W = object_.W;
      window[object_.nameOfObject].DIMENSION.H = object_.H;

    }

  };

  this.DESTROY_OBJECT = function(name__) {

    ROOT_MODUL.GAME_OBJECTS.forEach(function(item, index, object) {

      if(item.NAME == name__) {
        if(index > -1) {
          ROOT_MODUL.GAME_OBJECTS.splice(index, 1);
          delete window[name__];
        }
        console.log("OBJ DELETED:" + ROOT_MODUL.GAME_OBJECTS.indexOf(name__) + "  ACCESS GLOBAL  : " + window["name__"]);
      }

    });
  };

  this.DRAW_GAME_OBJECTS = function(s) {

    for(var x = 0;x < ROOT_MODUL.GAME_OBJECTS.length;x++) {

      ROOT_MODUL.GAME_OBJECTS[x].DRAW(s);

      if(ROOT_MODUL.GAME_OBJECTS[x].EDITOR.ENABLE == true) {
        ROOT_MODUL.GAME_OBJECTS[x].DRAW_ACTOR(s);
      }

    }

  };

  ROOT_MODUL.BREAK_AT_MOMENT = false;

  this.UPDATE_GAME_OBJECTS = function() {

    for(var x = 0;x < ROOT_MODUL.GAME_OBJECTS.length;x++) {

      if(ROOT_MODUL.BREAK_AT_MOMENT == true) {
        ROOT_MODUL.BREAK_AT_MOMENT = false;
        console.log("BREAK");
        break;
      }

      if(ROOT_MODUL.GAME_OBJECTS[x].COLLISION != null) {

        for(var z = 0;z < ROOT_MODUL.GAME_OBJECTS.length;z++) {

          // FOR PLAYER EXIST REGIME
          if(ROOT_MODUL.GAME_OBJECTS[z].COLLISION != null && ROOT_MODUL.GAME_OBJECTS[z].NAME != ROOT_MODUL.GAME_OBJECTS[x].NAME && typeof PLAYER != "undefined" && window[ROOT_MODUL.PARENT].ENGINE.GAME_TYPE == "PLATFORMER") {

            if(typeof PLAYER != "undefined") { //&&   ROOT_MODUL.GAME_OBJECTS[z].PLAYER.TYPE == "PLATFORMER"
              //Y by H
              if((ROOT_MODUL.GAME_OBJECTS[z].POSITION.Y() + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.HEIGHT()) > ROOT_MODUL.GAME_OBJECTS[x].POSITION.Y() && (ROOT_MODUL.GAME_OBJECTS[z].POSITION.Y() < ROOT_MODUL.GAME_OBJECTS[x].POSITION.Y() + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.HEIGHT())) {

                if((ROOT_MODUL.GAME_OBJECTS[z].POSITION.X() + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.WIDTH()) > ROOT_MODUL.GAME_OBJECTS[x].POSITION.X() - 2 && (ROOT_MODUL.GAME_OBJECTS[z].POSITION.X() + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.WIDTH() < ROOT_MODUL.GAME_OBJECTS[x].POSITION.X() + ROOT_MODUL.GAME_OBJECTS[x].POSITION.thrust * 12)) {
                  if(ROOT_MODUL.GAME_OBJECTS[z].POSITION.STATIC == false && ROOT_MODUL.GAME_OBJECTS[z].POSITION.IN_MOVE == true) {

                    SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + "COLLIDE right1 WITH:" + ROOT_MODUL.GAME_OBJECTS[x].NAME);
                    ROOT_MODUL.GAME_OBJECTS[z].POSITION.x = ROOT_MODUL.GAME_OBJECTS[x].POSITION.x - ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.W * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                    ROOT_MODUL.GAME_OBJECTS[z].POSITION.targetX = ROOT_MODUL.GAME_OBJECTS[x].POSITION.x - ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.W * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;

                  } else {

                    if(typeof ROOT_MODUL.GAME_OBJECTS[z].PLAYER != "undefined" && ROOT_MODUL.GAME_OBJECTS[z].PLAYER.TYPE == "PLATFORMER" && ROOT_MODUL.GAME_OBJECTS[x].POSITION.STATIC == false) {

                      SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + "COLLIDE rigth2 WITH:" + ROOT_MODUL.GAME_OBJECTS[x].NAME);
                      ROOT_MODUL.GAME_OBJECTS[x].POSITION.x = ROOT_MODUL.GAME_OBJECTS[z].POSITION.x + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.W * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                      ROOT_MODUL.GAME_OBJECTS[x].POSITION.targetX = ROOT_MODUL.GAME_OBJECTS[z].POSITION.x + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.W * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;

                    }

                  }

                  ROOT_MODUL.GAME_OBJECTS[x].ON_COLLISION(ROOT_MODUL.GAME_OBJECTS[z].NAME);

                } else if((ROOT_MODUL.GAME_OBJECTS[z].POSITION.X()) < ROOT_MODUL.GAME_OBJECTS[x].POSITION.X() + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.WIDTH() + 2 && (ROOT_MODUL.GAME_OBJECTS[z].POSITION.X() > ROOT_MODUL.GAME_OBJECTS[x].POSITION.X() + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.WIDTH() - ROOT_MODUL.GAME_OBJECTS[x].POSITION.thrust * 12)) {
                  if(ROOT_MODUL.GAME_OBJECTS[z].POSITION.STATIC == false && ROOT_MODUL.GAME_OBJECTS[z].POSITION.IN_MOVE == true) {
                    SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + "COLLIDE left1 WITH:" + ROOT_MODUL.GAME_OBJECTS[x].NAME);
                    ROOT_MODUL.GAME_OBJECTS[z].POSITION.x = ROOT_MODUL.GAME_OBJECTS[x].POSITION.x + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.W * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                    ROOT_MODUL.GAME_OBJECTS[z].POSITION.targetX = ROOT_MODUL.GAME_OBJECTS[x].POSITION.x + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.W * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                  } else {
                    if(typeof ROOT_MODUL.GAME_OBJECTS[z].PLAYER != "undefined" && ROOT_MODUL.GAME_OBJECTS[z].PLAYER.TYPE == "PLATFORMER" && ROOT_MODUL.GAME_OBJECTS[x].POSITION.STATIC == false) {

                      SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + "COLLIDE left2 WITH:" + ROOT_MODUL.GAME_OBJECTS[x].NAME);
                      ROOT_MODUL.GAME_OBJECTS[x].POSITION.x = ROOT_MODUL.GAME_OBJECTS[z].POSITION.x - ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.W * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                      ROOT_MODUL.GAME_OBJECTS[x].POSITION.targetX = ROOT_MODUL.GAME_OBJECTS[z].POSITION.x - ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.W * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;

                    }

                  }

                }
                ROOT_MODUL.GAME_OBJECTS[x].ON_COLLISION(ROOT_MODUL.GAME_OBJECTS[z].NAME);

              }
              //
              if(ROOT_MODUL.GAME_OBJECTS[z].POSITION.X() + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.WIDTH() > ROOT_MODUL.GAME_OBJECTS[x].POSITION.X() + ROOT_MODUL.GAME_OBJECTS[x].POSITION.thrust * 12 && ROOT_MODUL.GAME_OBJECTS[z].POSITION.X() < ROOT_MODUL.GAME_OBJECTS[x].POSITION.X() + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.WIDTH() - ROOT_MODUL.GAME_OBJECTS[x].POSITION.thrust * 12) {

                if(ROOT_MODUL.GAME_OBJECTS[z].POSITION.Y() + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.HEIGHT() > ROOT_MODUL.GAME_OBJECTS[x].POSITION.Y() && ROOT_MODUL.GAME_OBJECTS[z].POSITION.Y() + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.HEIGHT() < ROOT_MODUL.GAME_OBJECTS[x].POSITION.Y() + ROOT_MODUL.GAME_OBJECTS[x].POSITION.thrust * 12) {

                  if(ROOT_MODUL.GAME_OBJECTS[z].POSITION.STATIC == false && ROOT_MODUL.GAME_OBJECTS[z].POSITION.IN_MOVE == true) {

                    //$$$$$$$$$$$$$$
                    if(typeof ROOT_MODUL.GAME_OBJECTS[z].PLAYER != "undefined" && ROOT_MODUL.GAME_OBJECTS[z].PLAYER.TYPE == "PLATFORMER") {
                      SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + "COLLIDE TOP1 WITH:" + ROOT_MODUL.GAME_OBJECTS[x].NAME);
                      ROOT_MODUL.GAME_OBJECTS[z].POSITION.y = ROOT_MODUL.GAME_OBJECTS[x].POSITION.y - ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                      ROOT_MODUL.GAME_OBJECTS[z].POSITION.targetY = ROOT_MODUL.GAME_OBJECTS[x].POSITION.y - ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                      //ROOT_MODUL.GAME_OBJECTS[z].POSITION.y = ROOT_MODUL.GAME_OBJECTS[x].POSITION.y - ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                      //ROOT_MODUL.GAME_OBJECTS[z].POSITION.targetY = ROOT_MODUL.GAME_OBJECTS[x].POSITION.y -  ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;

                      PLAYER.FREEZ = true;
                      PLAYER.Y = 0;
                      PLAYER.CONTROL.JUMP = false;

                      if(PLAYER.BREAK_AT_MOMENT_STATUS == false) {
                        ROOT_MODUL.BREAK_AT_MOMENT = true;
                        PLAYER.BREAK_AT_MOMENT_STATUS = true;
                      }
                      ROOT_MODUL.GAME_OBJECTS[x].ON_COLLISION(ROOT_MODUL.GAME_OBJECTS[z].NAME);
                      break;
                    }
                    //$$$$$$$$$$$$$$
                    ROOT_MODUL.GAME_OBJECTS[x].ON_COLLISION(ROOT_MODUL.GAME_OBJECTS[z].NAME);

                  } else {

                    //$$$$$$$$$$$$$$
                    if(typeof ROOT_MODUL.GAME_OBJECTS[z].PLAYER != "undefined" && ROOT_MODUL.GAME_OBJECTS[z].PLAYER.TYPE == "PLATFORMER") {

                      SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + "COLLIDE TOP2 WITH:" + ROOT_MODUL.GAME_OBJECTS[x].NAME);

                      ROOT_MODUL.GAME_OBJECTS[x].POSITION.y = ROOT_MODUL.GAME_OBJECTS[z].POSITION.y + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                      ROOT_MODUL.GAME_OBJECTS[x].POSITION.targetY = ROOT_MODUL.GAME_OBJECTS[z].POSITION.y + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;

                      PLAYER.FREEZ = true;
                      PLAYER.Y = 0;
                      PLAYER.CONTROL.JUMP = false;

                      if(PLAYER.BREAK_AT_MOMENT_STATUS == false) {
                        ROOT_MODUL.BREAK_AT_MOMENT = true;
                        PLAYER.BREAK_AT_MOMENT_STATUS = true;
                      }

                      ROOT_MODUL.GAME_OBJECTS[x].ON_COLLISION(ROOT_MODUL.GAME_OBJECTS[z].NAME);
                      break;
                    }

                  }

                } else if(ROOT_MODUL.GAME_OBJECTS[z].POSITION.Y() < ROOT_MODUL.GAME_OBJECTS[x].POSITION.Y() + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.HEIGHT() && ROOT_MODUL.GAME_OBJECTS[z].POSITION.Y() > ROOT_MODUL.GAME_OBJECTS[x].POSITION.Y() + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.HEIGHT() - ROOT_MODUL.GAME_OBJECTS[x].POSITION.thrust * 12) {

                  if(ROOT_MODUL.GAME_OBJECTS[z].POSITION.STATIC == false && ROOT_MODUL.GAME_OBJECTS[z].POSITION.IN_MOVE == true) {

                    SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + "COLLIDE botton1 WITH:" + ROOT_MODUL.GAME_OBJECTS[x].NAME);
                    ROOT_MODUL.GAME_OBJECTS[z].POSITION.y = ROOT_MODUL.GAME_OBJECTS[x].POSITION.y + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                    ROOT_MODUL.GAME_OBJECTS[z].POSITION.targetY = ROOT_MODUL.GAME_OBJECTS[x].POSITION.y + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                    //ROOT_MODUL.GAME_OBJECTS[x].POSITION.y = ROOT_MODUL.GAME_OBJECTS[z].POSITION.y - ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                    //ROOT_MODUL.GAME_OBJECTS[x].POSITION.targetY = ROOT_MODUL.GAME_OBJECTS[z].POSITION.y - ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;


                  } else {

                    //$$$$$$$$$$$$$$
                    if(typeof ROOT_MODUL.GAME_OBJECTS[z].PLAYER != "undefined" && ROOT_MODUL.GAME_OBJECTS[z].PLAYER.TYPE == "PLATFORMER") {

                      SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + "COLLIDE botton2 WITH:" + ROOT_MODUL.GAME_OBJECTS[x].NAME);

                      ROOT_MODUL.GAME_OBJECTS[x].POSITION.y = ROOT_MODUL.GAME_OBJECTS[z].POSITION.y - ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                      ROOT_MODUL.GAME_OBJECTS[x].POSITION.targetY = ROOT_MODUL.GAME_OBJECTS[z].POSITION.y - ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;

                      PLAYER.FREEZ = true;
                      PLAYER.Y = 0;
                      PLAYER.CONTROL.JUMP = false;

                      if(PLAYER.BREAK_AT_MOMENT_STATUS == false) {
                        ROOT_MODUL.BREAK_AT_MOMENT = true;
                        PLAYER.BREAK_AT_MOMENT_STATUS = true;
                      }

                      ROOT_MODUL.GAME_OBJECTS[x].ON_COLLISION(ROOT_MODUL.GAME_OBJECTS[z].NAME);
                      break;
                    }
                    //$$$$$$$$$$$$$$

                  }
                  ROOT_MODUL.GAME_OBJECTS[x].ON_COLLISION(ROOT_MODUL.GAME_OBJECTS[z].NAME);
                }

              }

              ////////
            }

          } else if(ROOT_MODUL.GAME_OBJECTS[z].COLLISION != null && ROOT_MODUL.GAME_OBJECTS[z].NAME != ROOT_MODUL.GAME_OBJECTS[x].NAME) { //&& typeof PLAYER == 'undefined'
            //Y by H
            if((ROOT_MODUL.GAME_OBJECTS[z].POSITION.Y() + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.HEIGHT()) > ROOT_MODUL.GAME_OBJECTS[x].POSITION.Y() && (ROOT_MODUL.GAME_OBJECTS[z].POSITION.Y() < ROOT_MODUL.GAME_OBJECTS[x].POSITION.Y() + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.HEIGHT())) {

              if((ROOT_MODUL.GAME_OBJECTS[z].POSITION.X() + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.WIDTH()) > ROOT_MODUL.GAME_OBJECTS[x].POSITION.X() - 2 && (ROOT_MODUL.GAME_OBJECTS[z].POSITION.X() + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.WIDTH() < ROOT_MODUL.GAME_OBJECTS[x].POSITION.X() + ROOT_MODUL.GAME_OBJECTS[x].POSITION.thrust * 12)) {
                if(ROOT_MODUL.GAME_OBJECTS[z].POSITION.STATIC == false && ROOT_MODUL.GAME_OBJECTS[z].POSITION.IN_MOVE == true) {
                  SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + " COLLIDE (noplayer) right WITH:" + ROOT_MODUL.GAME_OBJECTS[x].NAME);

                  ROOT_MODUL.GAME_OBJECTS[z].POSITION.x = ROOT_MODUL.GAME_OBJECTS[x].POSITION.x - ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.W * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                  ROOT_MODUL.GAME_OBJECTS[z].POSITION.targetX = ROOT_MODUL.GAME_OBJECTS[x].POSITION.x - ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.W * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;

                } else if(ROOT_MODUL.GAME_OBJECTS[z].POSITION.STATIC == false) {
                  SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + "COLLIDE (noplayer) rigth WITH:" + ROOT_MODUL.GAME_OBJECTS[x].NAME);
                  ROOT_MODUL.GAME_OBJECTS[x].POSITION.x = ROOT_MODUL.GAME_OBJECTS[z].POSITION.x + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.W * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                  ROOT_MODUL.GAME_OBJECTS[x].POSITION.targetX = ROOT_MODUL.GAME_OBJECTS[z].POSITION.x + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.W * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;

                }

              } else if((ROOT_MODUL.GAME_OBJECTS[z].POSITION.X()) < ROOT_MODUL.GAME_OBJECTS[x].POSITION.X() + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.WIDTH() + 2 && (ROOT_MODUL.GAME_OBJECTS[z].POSITION.X() > ROOT_MODUL.GAME_OBJECTS[x].POSITION.X() + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.WIDTH() - ROOT_MODUL.GAME_OBJECTS[x].POSITION.thrust * 12)) {
                if(ROOT_MODUL.GAME_OBJECTS[z].POSITION.STATIC == false && ROOT_MODUL.GAME_OBJECTS[z].POSITION.IN_MOVE == true) {
                  SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + "COLLIDE (noplayer) left WITH:" + ROOT_MODUL.GAME_OBJECTS[x].NAME);
                  ROOT_MODUL.GAME_OBJECTS[z].POSITION.x = ROOT_MODUL.GAME_OBJECTS[x].POSITION.x + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.W * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                  ROOT_MODUL.GAME_OBJECTS[z].POSITION.targetX = ROOT_MODUL.GAME_OBJECTS[x].POSITION.x + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.W * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                } else if(ROOT_MODUL.GAME_OBJECTS[z].POSITION.STATIC == false) {
                  SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + "COLLIDE (noplayer) left WITH:" + ROOT_MODUL.GAME_OBJECTS[x].NAME);
                  ROOT_MODUL.GAME_OBJECTS[x].POSITION.x = ROOT_MODUL.GAME_OBJECTS[z].POSITION.x - ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.W * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                  ROOT_MODUL.GAME_OBJECTS[x].POSITION.targetX = ROOT_MODUL.GAME_OBJECTS[z].POSITION.x - ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.W * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;

                }

              }

            }
            //
            if(ROOT_MODUL.GAME_OBJECTS[z].POSITION.X() + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.WIDTH() > ROOT_MODUL.GAME_OBJECTS[x].POSITION.X() + ROOT_MODUL.GAME_OBJECTS[x].POSITION.thrust * 12 && ROOT_MODUL.GAME_OBJECTS[z].POSITION.X() < ROOT_MODUL.GAME_OBJECTS[x].POSITION.X() + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.WIDTH() - ROOT_MODUL.GAME_OBJECTS[x].POSITION.thrust * 12) {

              if(ROOT_MODUL.GAME_OBJECTS[z].POSITION.Y() + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.HEIGHT() > ROOT_MODUL.GAME_OBJECTS[x].POSITION.Y() && ROOT_MODUL.GAME_OBJECTS[z].POSITION.Y() + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.HEIGHT() < ROOT_MODUL.GAME_OBJECTS[x].POSITION.Y() + ROOT_MODUL.GAME_OBJECTS[x].POSITION.thrust * 12) {

                if(ROOT_MODUL.GAME_OBJECTS[z].POSITION.STATIC == false && ROOT_MODUL.GAME_OBJECTS[z].POSITION.IN_MOVE == true) {
                  SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + "COLLIDE (noplayer) top WITH:" + ROOT_MODUL.GAME_OBJECTS[x].NAME);
                  ROOT_MODUL.GAME_OBJECTS[z].POSITION.y = ROOT_MODUL.GAME_OBJECTS[x].POSITION.y - ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                  ROOT_MODUL.GAME_OBJECTS[z].POSITION.targetY = ROOT_MODUL.GAME_OBJECTS[x].POSITION.y - ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;

                } else if(ROOT_MODUL.GAME_OBJECTS[z].POSITION.STATIC == false) {
                  SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + "COLLIDE (noplayer) botton WITH:" + ROOT_MODUL.GAME_OBJECTS[x].NAME);
                  ROOT_MODUL.GAME_OBJECTS[x].POSITION.y = ROOT_MODUL.GAME_OBJECTS[z].POSITION.y + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                  ROOT_MODUL.GAME_OBJECTS[x].POSITION.targetY = ROOT_MODUL.GAME_OBJECTS[z].POSITION.y + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;

                }

              } else if(ROOT_MODUL.GAME_OBJECTS[z].POSITION.Y() < ROOT_MODUL.GAME_OBJECTS[x].POSITION.Y() + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.HEIGHT() && ROOT_MODUL.GAME_OBJECTS[z].POSITION.Y() > ROOT_MODUL.GAME_OBJECTS[x].POSITION.Y() + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.HEIGHT() - ROOT_MODUL.GAME_OBJECTS[x].POSITION.thrust * 12) {

                if(ROOT_MODUL.GAME_OBJECTS[z].POSITION.STATIC == false && ROOT_MODUL.GAME_OBJECTS[z].POSITION.IN_MOVE == true) {

                  SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + "COLLIDE (noplayer) onTop WITH:" + ROOT_MODUL.GAME_OBJECTS[x].NAME);
                  ROOT_MODUL.GAME_OBJECTS[z].POSITION.y = ROOT_MODUL.GAME_OBJECTS[x].POSITION.y + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                  ROOT_MODUL.GAME_OBJECTS[z].POSITION.targetY = ROOT_MODUL.GAME_OBJECTS[x].POSITION.y + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;

                } else if(ROOT_MODUL.GAME_OBJECTS[z].POSITION.STATIC == false) {

                  SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + "COLLIDE (noplayer) onTop WITH:" + ROOT_MODUL.GAME_OBJECTS[x].NAME);
                  ROOT_MODUL.GAME_OBJECTS[x].POSITION.y = ROOT_MODUL.GAME_OBJECTS[z].POSITION.y - ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                  ROOT_MODUL.GAME_OBJECTS[x].POSITION.targetY = ROOT_MODUL.GAME_OBJECTS[z].POSITION.y - ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;

                }

              }
              ROOT_MODUL.GAME_OBJECTS[x].ON_COLLISION(ROOT_MODUL.GAME_OBJECTS[z].NAME);
            }

          }

        }

      }

      if(typeof ROOT_MODUL.GAME_OBJECTS[x] !== "undefined") {

        if(ROOT_MODUL.GAME_OBJECTS[x].DESTROY_AFTER != null) {
          if(ROOT_MODUL.GAME_OBJECTS[x].DESTROY_AFTER < 1) {
            ROOT_MODUL.DESTROY_OBJECT(ROOT_MODUL.GAME_OBJECTS[x].NAME);
          }
        }
        if(typeof ROOT_MODUL.GAME_OBJECTS[x] !== "undefined") {
          ROOT_MODUL.GAME_OBJECTS[x].UPDATE();
        }

      }

    }

  };

}
