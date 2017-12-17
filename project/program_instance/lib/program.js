/**
* Instance of Class PROGRAM is root for all other
* class instances. 
* @example new PROGRAM
* @class PROGRAM 
* @constroctor
* @param S 
* @param C
*/
function PROGRAM(s, c) {

	var PROGRAM_ROOT = this;

	this.DRAW_INTERVAL = APPLICATION.PROGRAM.RENDER_SPEED;
	this.UPDATE_INTERVAL = 15;
	this.BASELINE = "middle";
	this.GLOBAL_TRANSLATE = 0;
	this.DO_GLOBAL_TRANSLATE = false;

	PROGRAM_ROOT.TRANSLATE = function (x) {
		PROGRAM_ROOT.GLOBAL_TRANSLATE = x;
		PROGRAM_ROOT.DO_GLOBAL_TRANSLATE = true;
	};

	this.GAME_MAP = function () {

		//screens
		var ROOT = this;
		this.TOTAL_LEFT = 2;
		this.TOTAL_RIGHT = 4;
		this.TOTAL_UP = 2;
		this.TOTAL_DOWN = 4;
		this.LEFT = function () {
			return ROOT.TOTAL_LEFT * -VIEW.W();
		};
		this.WIDTH = function () {
			return ROOT.TOTAL_RIGHT * VIEW.W();
		};
		this.UP = function () {
			return ROOT.TOTAL_UP * -VIEW.H();
		};
		this.HEIGHT = function () {
			return ROOT.TOTAL_DOWN * VIEW.W();
		};
		this.CLEAR_MAP = true;

	};

	PROGRAM_ROOT.MAP = new PROGRAM_ROOT.GAME_MAP();

	this.AUTO_UPDATE = new Array();
	
	/**
	 * @memberof ENGINE
	 * @prperty ENGINE
	 */
	this.ENGINE = new ENGINE(c);

	s.textAlign = "start";
	s.textBaseline = this.BASELINE;

	this.DRAW = function () {

		if (PROGRAM_ROOT.MAP.CLEAR_MAP == true) {

			s.clearRect(PROGRAM_ROOT.MAP.LEFT(), PROGRAM_ROOT.MAP.UP(), PROGRAM_ROOT.MAP.WIDTH(), PROGRAM_ROOT.MAP.HEIGHT());

		}

		if (PROGRAM_ROOT.DO_GLOBAL_TRANSLATE == true) {
			PROGRAM_ROOT.DO_GLOBAL_TRANSLATE = false;
			s.translate(PROGRAM_ROOT.GLOBAL_TRANSLATE, 0);
		}

		PROGRAM_ROOT.ENGINE.DRAW_MODULES(s);
		setTimeout(function () {
			PROGRAM_ROOT.UPDATE();
		}, this.UPDATE_INTERVAL);
	};

	this.UPDATE = function () {

		PROGRAM_ROOT.ENGINE.UPDATE_MODULES();

		for (var x = 0; x < this.AUTO_UPDATE; x++) {

			ROOT.AUTO_UPDATE[x].UPDATE();

		}

		setTimeout(function () {
			PROGRAM_ROOT.DRAW();
		}, this.DRAW_INTERVAL);
	};

}
//###############################################//###############################################
//###############################################//###############################################
