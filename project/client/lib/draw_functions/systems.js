
// INSTANCES CLASSES FOR SYSTEM BIZNIS
export function RIGHT_MENU_BUTTON(text, Y_OFFSET, id, res) {
  var ROOT = this;

  this.IAM = id;
  this.HOVER = false;
  this.Y_OFFSET = Y_OFFSET;
  this.text = text;

  this.icon = null;
  if (typeof res != "undefined") {
    var locName = "system_" + this.IAM.toString();
    SYS.RES.CREATE_IMG(locName, res);
    this.icon = true;
  }

  (this.POSITION = {
    x: 0,
    y: 0,

    X: function () {
      return ROOT.POSITION.x;
    },
    Y: function () {
      return ROOT.POSITION.y + ROOT.Y_OFFSET;
    },
  }),
    (this.DIMENSION = new DIMENSION(12, 2));

  this.TAP = function () {};
}
