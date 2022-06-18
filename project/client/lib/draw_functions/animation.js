/**
 * ANIMATION
 * @example new ANIMATION()
 * @class ANIMATION
 * @constructor
 * @param {context2d} surf
 * @param {String} TYPE_
 * @param radius FrameIndex
 * @param {String} source
 * @param PARENT
 * @param ID
 * @param {yes} blink_ Every other value returns false (No blink)
 * @param {number} min_
 * @param {number} max_
 * @param {number} step
 * @param {number} speed_
 * @param {number} opacity_
 * @return nothing
 *
 * @constructor
 * @param {String} Name name is passed value for modul name.
 * @param {String} Name name is passed value for modul name.
 */
export function ANIMATION(surf, TYPE_, FrameIndex, source, PARENT, ID, blink_, min_, max_, step, speed_, opacity_) {

  var SURFACE = surf;
  this.TYPE = TYPE_;
  this.DRAW_TYPE = "PARENT";

  this.ROTATE = {

    ENABLE: true,
    ANGLE: 0 //new SYS.MATH.OSCILLATOR(0, 360 , 0.1)

  };

  if(speed_ !== undefined) {
    this.speed = speed_;
    this.initial_speed = speed_;
  } else {
    this.speed = null;
  }

  if(blink_ == "yes") {
    this.blink = new OSCILLATOR(min_, max_, step);
  } else {
    this.blink = null;
  }

  if(ID === undefined) {
    var local1 = SYS.MATH.RANDOM_INT_FROM_TO(1, 666);
    var local2 = SYS.MATH.RANDOM_INT_FROM_TO(666, 1234);
    this.ID = "ID" + (local1 + local2) + local2 * 66;
  } else {
    this.ID = ID;
  }

  // Add offset
  this.X = function() {
    return PARENT.POSITION.X();
  };
  this.Y = function() {
    return PARENT.POSITION.Y();
  };

  this.W = function() {
    return PARENT.DIMENSION.WIDTH();
  };
  this.H = function() {
    return PARENT.DIMENSION.HEIGHT();
  };

  // OK
  for(var x = 0;x < source.source.length;x++) {
    window["f_" + this.ID + x] = new Image();

    if(APPLICATION.IMAGE_LOADER_PREFIX == true) {
      window["f_" + this.ID + x].src = "res/animations/" + source.source[x];
    } else {
      window["f_" + this.ID + x].src = source.source[x].toString();
    }

    window["f_" + this.ID + x].onload = function() {
      SYS.RES.SUM_OF_LOADED_IMAGES++;
    };
  }

  this.NUMBERS_OF_FRAMES = source.source.length;
  if(FrameIndex == null) {
    this.CURRENT_FRAME = 0;
  } else {
    this.CURRENT_FRAME = FrameIndex;
  }

  this.SET_SPEED = function(new_speed) {

    if(typeof new_speed != "undefined" && new_speed != null || typeof new_speed != "number") {
      this.initial_speed = new_speed;
    } else {
      SYS.DEBUG.WARNING(" SPEED ARRGS must be number .");
    }

  };

  this.DRAW = function(x_, y_, w_, h_, blink_status) {

    if(blink_status == "yes") {
      SURFACE.globalAlpha = Math.sin(this.blink.UPDATE());
    }

    if(this.TYPE == "LOOP") {

      if(this.DRAW_TYPE == "PARENT") {

        if(this.ROTATE.ENABLE == false) {
          SURFACE.drawImage(window["f_" + this.ID + this.CURRENT_FRAME], this.X(), this.Y(), this.W(), this.H());
        } else {
          drawRotatedImage(window["f_" + this.ID + this.CURRENT_FRAME], this.X(), this.Y(), SYS.MATH.TO_RADIANS(this.ROTATE.ANGLE), this.W(), this.H(), SURFACE);
        }

      } else if(this.DRAW_TYPE == "DIRECT") {

        SURFACE.drawImage(window["f_" + this.ID + this.CURRENT_FRAME], x_, y_, w_, h_);

      } else {
        SYS.DOM.WARN("error in draw loop , class animator with id:" + this.ID + " " + this.CURRENT_FRAME + "<");
      }

      if(this.CURRENT_FRAME < this.NUMBERS_OF_FRAMES - 1) {

        if(this.speed == null) {
          this.CURRENT_FRAME++;
        } else {

          if(this.speed > 0) {
            this.speed--;
          } else {
            this.CURRENT_FRAME++;
            this.speed = this.initial_speed;
          }

        }

      } else {
        this.CURRENT_FRAME = 0;
      }

    } else if(this.TYPE == "DRAW_FRAME") {
      if(this.DRAW_TYPE == "PARENT" && this.CURRENT_FRAME < this.NUMBERS_OF_FRAMES) {
        if(this.ROTATE.ENABLE == false) {
          SURFACE.drawImage(window["f_" + this.ID + this.CURRENT_FRAME], this.X(), this.Y(), this.W(), this.H());
        } else {
          drawRotatedImage(window["f_" + this.ID + this.CURRENT_FRAME], this.X(), this.Y(), SYS.MATH.TO_RADIANS(this.ROTATE.ANGLE), this.W(), this.H(), SURFACE);
        }
      } else if(this.DRAW_TYPE == "DIRECT" && this.CURRENT_FRAME < this.NUMBERS_OF_FRAMES) {
        SURFACE.drawImage(window["f_" + this.ID + this.CURRENT_FRAME], this.X(), this.Y(), this.W(), this.H());
      } else {
        SYS.DEBUG.WARNING("error in animation draw procedure , class animator says : type is DRAW FRAME . this is id : " + this.ID + ">>>may be > this.CURRENT_FRAME<this.NUMBERS_OF_FRAMES is not true , Also DRAW_TYPE must be PARENT or DIRECT!");
      }
    }
    SURFACE.globalAlpha = 1;
  };

}
