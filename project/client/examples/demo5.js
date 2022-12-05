
SMODULE.NEW_OBJECT("TESLA", 45, 35, 20, 10, 10);
TESLA.TYPE_OF_GAME_OBJECT = "CUSTOM";

TESLA.FREE = {};
TESLA.FREE.X = new OSCILLATOR(1, VIEW.W(), 2);
TESLA.FREE.Y = new OSCILLATOR(1, VIEW.H(), 11);

TESLA.FREE.COLOR = {};
TESLA.FREE.COLOR.RED = new OSCILLATOR(0, 255, 1);
TESLA.FREE.COLOR.GREEN = new OSCILLATOR(0, 255, 3);
TESLA.FREE.COLOR.BLUE = new OSCILLATOR(0, 255, 5);

TESLA.FREE.DIM = new OSCILLATOR(1, 200, 1);

HELLO_WORLD.MAP.CLEAR_MAP = false;

var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
var text = "";

TESLA.CUSTOM = function (s) {

    s.fillStyle = "rgb(" + TESLA.FREE.COLOR.RED.UPDATE() + " , " + TESLA.FREE.COLOR.GREEN.UPDATE() + " , " + TESLA.FREE.COLOR.BLUE.UPDATE() + ")";
    s.strokeStyle = "rgb(" + TESLA.FREE.COLOR.RED.UPDATE() + " , " + TESLA.FREE.COLOR.GREEN.UPDATE() + " , " + TESLA.FREE.COLOR.BLUE.UPDATE() + ")";

    s.beginPath();
    s.lineWidth = TESLA.FREE.DIM.UPDATE();
    s.moveTo(TESLA.FREE.X.UPDATE(), TESLA.FREE.Y.UPDATE());
    ORBIT(50, 50, 1, this.POSITION);
    s.lineTo(TESLA.FREE.X.UPDATE(), TESLA.FREE.Y.UPDATE());
    s.stroke();

};
