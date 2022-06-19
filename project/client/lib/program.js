
import APPLICATION from '../manifest/manifest';
import { ENGINE  } from './engine';
import { VIEW } from './init';

/**
 * Instance of Class PROGRAM is root for all other
 * class instances.
 * @example new PROGRAM
 * @class PROGRAM
 * @constroctor
 * @param {2dCanvasContext} S
 * @param {object} C
 */
function PROGRAM(s, c) {

  /**
     * @memberof PROGRAM
     * @property {self} PROGRAM_ROOT
     */
  var PROGRAM_ROOT = this;

  /**
   * @memberof PROGRAM
   * @property {float} DRAW_INTERVAL Loaded from : APPLICATION.PROGRAM.RENDER_SPEED
   */
  this.DRAW_INTERVAL = APPLICATION.PROGRAM.RENDER_SPEED;

  /**
     * @memberof PROGRAM
     * @property {float} UPDATE_INTERVAL Default value 15
     */
  this.UPDATE_INTERVAL = 15;

  /**
     * @memberof PROGRAM
     * @property {float} BASELINE Default value 'middle'
     */
  this.BASELINE = "middle";

  /**
   * @memberof PROGRAM
   * @property {float} GLOBAL_TRANSLATE Default value 0
   */
  this.GLOBAL_TRANSLATE = 0;

  /**
     * @memberof PROGRAM
     * @property {boolean} DO_GLOBAL_TRANSLATE Default value false
     */
  this.DO_GLOBAL_TRANSLATE = false;


  /**
     * @memberof PROGRAM
     * @method TRANSLATE DO_GLOBAL_TRANSLATE
   * @param {float} x 
     */
  PROGRAM_ROOT.TRANSLATE = function(x) {
    PROGRAM_ROOT.GLOBAL_TRANSLATE = x;
    PROGRAM_ROOT.DO_GLOBAL_TRANSLATE = true;
  };

  /**
   * @class GAME_MAP
     * @memberof PROGRAM
     */
  this.GAME_MAP = function() {

    //screens
    var ROOT = this;
    this.TOTAL_LEFT = 2;
    this.TOTAL_RIGHT = 4;
    this.TOTAL_UP = 2;
    this.TOTAL_DOWN = 4;
    this.LEFT = function() {
      return ROOT.TOTAL_LEFT * -VIEW.W();
    };
    this.WIDTH = function() {
      return ROOT.TOTAL_RIGHT * VIEW.W();
    };
    this.UP = function() {
      return ROOT.TOTAL_UP * -VIEW.H();
    };
    this.HEIGHT = function() {
      return ROOT.TOTAL_DOWN * VIEW.W();
    };
    this.CLEAR_MAP = true;

  };

  /**
     * @memberof PROGRAM
     * @property {GAME_MAP} MAP
     */
  PROGRAM_ROOT.MAP = new PROGRAM_ROOT.GAME_MAP();

  this.AUTO_UPDATE = new Array();

  /**
   * @memberof PROGRAM
   * @property {ENGINE} ENGINE
   */
  this.ENGINE = new ENGINE(c);

  s.textAlign = "start";
  s.textBaseline = this.BASELINE;

  /**
    * @memberof PROGRAM
    * @method DRAW
  * @return void
    */
  this.DRAW = function() {

    if(PROGRAM_ROOT.MAP.CLEAR_MAP == true) {

      s.clearRect(PROGRAM_ROOT.MAP.LEFT(), PROGRAM_ROOT.MAP.UP(), PROGRAM_ROOT.MAP.WIDTH(), PROGRAM_ROOT.MAP.HEIGHT());

    }

    if(PROGRAM_ROOT.DO_GLOBAL_TRANSLATE == true) {
      PROGRAM_ROOT.DO_GLOBAL_TRANSLATE = false;
      s.translate(PROGRAM_ROOT.GLOBAL_TRANSLATE, 0);
    }

    PROGRAM_ROOT.ENGINE.DRAW_MODULES(s);
    setTimeout(function() {
      PROGRAM_ROOT.UPDATE();
    }, this.UPDATE_INTERVAL);
  };

  /**
   * @memberof PROGRAM
   * @method UPDATE
 * @return void
   */
  this.UPDATE = function() {

    PROGRAM_ROOT.ENGINE.UPDATE_MODULES();

    for(var x = 0;x < this.AUTO_UPDATE;x++) {

      ROOT.AUTO_UPDATE[x].UPDATE();

    }

    setTimeout(function() {
      PROGRAM_ROOT.DRAW();
    }, this.DRAW_INTERVAL);
  };

}

export default PROGRAM;
