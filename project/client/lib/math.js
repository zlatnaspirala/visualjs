import SYS from './system';
import APPLICATION from '../manifest/manifest';
import {SET_NEW_START_UP_POS} from './editor/editor';
import {CONVERTOR} from './init';

/**
 * Simple number round.
 * @function round
 * @param {number} value
 * @param {number} decimals
 * @return {number} Number
 */
export function round(value, decimals) {
  if(typeof value === "object" || typeof decimals === "object") {
    SYS.DEBUG.WARNING(
      "SYS : warning for procedure 'SYS.MATH.NUMBER_ROUND'  Desciption : Replace object with string ,  this >> " +
      typeof value +
      " << must be string or number."
    );
  } else if(typeof value === "undefined" || typeof decimals === "undefined") {
    SYS.DEBUG.WARNING(
      "SYS : warning for procedure 'SYS.MATH.NUMBER_ROUND'  Desciption : arguments (value, decimals) cant be undefined ,  this >> " +
      typeof value +
      " << must be string or number."
    );
  } else {
    return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
  }
}

export function randomIntFromTo(min, max) {
  if(typeof min === "object" || typeof max === "object") {
    SYS.DEBUG.WARNING(
      "SYS : warning for procedure 'SYS.MATH.RANDOM_INT_FROM_TO'  Desciption : Replace object with string ,  this >> " +
      typeof min +
      " and " +
      typeof min +
      " << must be string or number."
    );
  } else if(typeof min === "undefined" || typeof max === "undefined") {
    SYS.DEBUG.WARNING(
      "SYS : warning for procedure 'SYS.MATH.RANDOM_INT_FROM_TO'  Desciption : arguments (min, max) cant be undefined ,  this >> " +
      typeof min +
      " and " +
      typeof min +
      "  << must be string or number."
    );
  } else {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

// Convert toDegrees/toRadians
export function toDegrees(angle) {
  if(typeof angle === "string" || typeof angle === "number") {
    return angle * (180 / Math.PI);
  } else {
    SYS.DEBUG.WARNING(
      "SYS : warning for procedure 'SYS.MATH.TO_RADIANS'  Desciption : Input arr ,  angle >> " +
      typeof angle +
      "  << must be string or number."
    );
  }
}

export function toRadians(angle) {
  if(typeof angle === "string" || typeof angle === "number") {
    return angle * (Math.PI / 180);
  } else {
    SYS.DEBUG.WARNING(
      "SYS : warning for procedure 'SYS.MATH.TO_RADIANS'  Desciption : Input arr ,  angle >> " +
      typeof angle +
      "  << must be string or number."
    );
  }
}

export var isOdd = function(x) {
  return x & 1;
};

export var isEven = function(x) {
  return !(x & 1);
};

export function ORBIT(cx, cy, angle, p) {
  var s = Math.sin(angle);
  var c = Math.cos(angle);

  // translate point back to origin:
  p.x -= cx;
  p.y -= cy;

  // rotate point
  let xnew = p.x * c - p.y * s;
  let ynew = p.x * s + p.y * c;

  // translate point back:
  p.x = xnew + cx;
  p.y = ynew + cy;
  return p;
}

//GET PULSE VALUES IN REAL TIME
export function OSCILLATOR(min, max, step) {
  if(
    (typeof min === "string" || typeof min === "number") &&
    (typeof max === "string" || typeof max === "number") &&
    (typeof step === "string" || typeof step === "number")
  ) {
    var ROOT = this;
    this.min = parseFloat(min);
    this.max = parseFloat(max);
    this.step = parseFloat(step);
    this.value_ = parseFloat(min);
    this.status = 0;
    this.on_maximum_value = function() {};
    this.on_minimum_value = function() {};
    this.UPDATE = function(STATUS_) {
      if(STATUS_ === undefined) {
        if(this.status == 0 && this.value_ < this.max) {
          this.value_ = this.value_ + this.step;
          if(this.value_ >= this.max) {
            this.value_ = this.max;
            this.status = 1;
            ROOT.on_maximum_value();
          }
          return this.value_;
        } else if(this.status == 1 && this.value_ > this.min) {
          this.value_ = this.value_ - this.step;
          if(this.value_ <= this.min) {
            this.value_ = this.min;
            this.status = 0;
            ROOT.on_minimum_value();
          }
          return this.value_;
        }
      } else {
        return this.value_;
      }
    };
  } else {
    SYS.DEBUG.WARNING(
      "SYS : warning for procedure 'SYS.MATH.OSCILLATOR'  Desciption : Replace object with string or number,  min >> " +
      typeof min +
      " and max >>" +
      typeof max +
      "  and step >>" +
      typeof step +
      " << must be string or number."
    );
  }
}

// GET INCREMENT VALUES IN REAL TIME
export function INCREMENTATOR(min, max, step, stop_after) {
  if(
    (typeof min === "string" || typeof min === "number") &&
    (typeof max === "string" || typeof max === "number") &&
    (typeof step === "string" || typeof step === "number")
  ) {
    if(typeof stop_after != "undefined") {
      this.stop_after = stop_after;
    } else {
      this.stop_after = 1;
    }
    this.loops = 0;
    this.min = parseFloat(min);
    this.max = parseFloat(max);
    this.step = parseFloat(step);
    this.value_ = parseFloat(min);
    this.status = 0;

    this.UPDATE = function(STATUS_) {
      if(STATUS_ === undefined) {
        if(this.status == 0 && this.value_ < this.max) {
          this.value_ = this.value_ + this.step;
          if(this.value_ >= this.max) {
            this.value_ = this.min;
            if(this.loops == this.stop_after) {
              this.status = 1;
            }
          }
          return this.value_;
        } else {
          return this.value_;
        }
      }
    };
    //AUTO UPDATE HERE
  } else {
    SYS.DEBUG.WARNING(
      "SYS : warning for procedure 'SYS.MATH.OSCILLATOR'  Desciption : Replace object with string or number,  min >> " +
      typeof min +
      " and max >>" +
      typeof max +
      "  and step >>" +
      typeof step +
      " << must be string or number."
    );
  }
}

export function DIMENSION(w, h, type_) {
  var ROOT_DIMENSION = this;
  if(typeof type_ == "undefined") {
    this.type = "REF_CANVAS";
  } else {
    this.type = type_;
  }

  if(typeof w === undefined) {
    this.W = 10;
    SYS.DEBUG.WARNING(
      "SYS : warning for procedure new 'DIMENSION'  Desciption : arguments (w , h ) are  undefined ,  system will setup 10% of width and height."
    );
  } else {
    this.W = w;
  }
  if(typeof h === undefined) {
    this.H = 10;
    SYS.DEBUG.WARNING(
      "SYS : warning for procedure new 'DIMENSION'  Desciption : arguments (w , h ) are  undefined ,  system will setup 10% of width and height."
    );
  } else {
    this.H = h;
  }

  this.WIDTH = function() {
    if(ROOT_DIMENSION.type == "NORMAL") {
      return (window.innerWidth / 100) * this.W;
    } else if(ROOT_DIMENSION.type == "REF_CANVAS") {
      return (SYS.DOM.E(SYS.RUNNING_PROGRAMS[0]).width / 100) * this.W;
    }
  };

  this.HEIGHT = function() {
    if(ROOT_DIMENSION.type == "NORMAL") {
      return (window.innerHeight / 100) * this.H;
    } else if(ROOT_DIMENSION.type == "REF_CANVAS") {
      return (SYS.DOM.E(SYS.RUNNING_PROGRAMS[0]).height / 100) * this.H;
    }
  };
}

export function POSITION(curentX, curentY, targetX_, targetY_, thrust_) {
  var ROOT = this;
  this.FREEZ = false;

  ROOT.CANVAS_ = window[SYS.RUNNING_PROGRAMS[0]].ENGINE.PROGRAM_ID;

  this.ON_TARGET_POSITION = function() {};

  //parameters
  this.x = curentX;
  this.y = curentY;
  this.targetX = targetX_;
  this.targetY = targetY_;
  this.velX = 0;
  this.velY = 0;

  this.thrust = thrust_;
  if(APPLICATION.PROGRAM.CALCULATING_POSITION_BY == "MONITOR") {
    this.TYPE = "NORMAL";
  } else if(APPLICATION.PROGRAM.CALCULATING_POSITION_BY == "CANVAS") {
    this.TYPE = "REF_CANVAS";
  }

  this.IN_MOVE = true;
  //metods

  this.SET_SPEED = function(num_) {
    if(typeof num_ === "number") {
      this.thrust = num_;
    } else {
      SYS.DEBUG.WARNING(
        "SYS : warning for method 'POSITION.SET_SPEED'  Desciption : arguments (w , h ) must be type of number."
      );
    }
  };

  this.TRANSLATE_BY_X = function(x_) {
    this.IN_MOVE = true;
    this.targetX = x_;
  };
  this.TRANSLATE_BY_Y = function(y_) {
    this.IN_MOVE = true;
    this.targetY = y_;
  };
  this.TRANSLATE = function(x_, y_) {
    this.IN_MOVE = true;
    this.targetX = x_;
    this.targetY = y_;
  };

  this.SET_POSITION = function(x_, y_, type_) {
    if(type_ == "DIAMETRIC") {
      this.targetX = x_;
      this.targetY = y_;

      this.x = x_;
      this.y = y_;

      this.IN_MOVE = false;
    } else {
      this.targetX = CONVERTOR.PIX_TO_PER(x_);
      this.targetY = CONVERTOR.PIX_TO_PER(y_);

      this.x = CONVERTOR.PIY_TO_PER(x_);
      this.y = CONVERTOR.PIY_TO_PER(y_);

      this.IN_MOVE = false;
    }
  };

  this.UPDATE = function() {

    var tx = this.targetX - this.x,
      ty = this.targetY - this.y,
      dist = Math.sqrt(tx * tx + ty * ty),
      rad = Math.atan2(ty, tx),
      angle = (rad / Math.PI) * 180;
    this.velX = (tx / dist) * this.thrust;
    this.velY = (ty / dist) * this.thrust;

    // stop the box if its too close so it doesn't just rotate and bounce
    if(this.IN_MOVE == true) {
      if(dist > this.thrust) {
        this.x += this.velX;
        this.y += this.velY;

        if(ROOT.SHARE_POSITION == true) {
          MAIN_PEER.REMOTE_DATA.NEW_POSITION(window[this.parentGameObject]);
        }
      } else {
        this.x = this.targetX;
        this.y = this.targetY;
        this.IN_MOVE = false;
        ROOT.ON_TARGET_POSITION();

        if(ROOT.SHARE_POSITION == true) {
          MAIN_PEER.REMOTE_DATA.NEW_POSITION(window[this.parentGameObject]);
        }

        try {
          if(APPLICATION.EDITOR == true) {
            SET_NEW_START_UP_POS(
              this.parentGameObject,
              this.PROGRAM_NAME,
              this.parentModul,
              this.targetX,
              this.targetY,
              this.DIMENSION.W,
              this.DIMENSION.H
            );
          }
        } catch(e) {
          console.log(e + ":::in:::SET_NEW_START_UP_POS");
        }
      }
    }
  };

  this.X = function() {
    if(ROOT.TYPE == "NORMAL") {
      return (window.innerWidth / 100) * this.x;
    } else if(ROOT.TYPE == "REF_CANVAS") {
      return (SYS.DOM.E(ROOT.CANVAS_).width / 100) * this.x;
    }
  };

  this.Y = function() {

    if(ROOT.TYPE == "NORMAL") {
      return (window.innerHeight / 100) * this.y;
    } else if(ROOT.TYPE == "REF_CANVAS") {
      return (SYS.DOM.E(ROOT.CANVAS_).height / 100) * this.y;
    }
  };

}
