/**
 * @class RECT
 * @constructor
 * @param TEXT
 * @param ROOT_GAME_OBJECT
 * @param radius color
 * @param colorText
 */
function RECT(TEXT, ROOT_GAME_OBJECT, radius, color, colorText) {

    //default values by init
    //this.FOCUS = false;
    this.TEXT_ANGLE = 0;
    this.TEXT_COLOR = colorText;
    this.TEXT_ALIGN = "center";
    this.TEXT = TEXT;
    this.EDIT = true;
    this.BACKGROUND_OPACITY = 0.5;
    this.TEXT_OPACITY = 1;
    this.textBaseline = "middle";
    this.textResizeByWidth = false;
    this.POSITION = ROOT_GAME_OBJECT.POSITION;
    this.DIMENSION = ROOT_GAME_OBJECT.DIMENSION;
    this.x = function () {
        return POSITION.X();
    };
    this.y = function () {
        return POSITION.Y();
    };
    this.width = function () {
        return this.DIMENSION.WIDHT();
    };
    this.height = function () {
        return this.DIMENSION.HEIGHT();
    };
    this.radius = parseFloat(radius);
    this.color = color;
    this.border_color = "rgba(121,121,222,0.9)";
    this.border_on_focus_color = "blue";
    this.border_on_focus_width_line = 5;
    this.font = "20px Arial";

    this.DRAW = function (s) {

        s.save();

        s.globalAlpha = this.BACKGROUND_OPACITY;
        roundedRect(s, "", this.POSITION.X(), this.POSITION.Y(), this.DIMENSION.WIDTH(), this.DIMENSION.HEIGHT(), this.radius, this.color);

        s.textBaseline = this.textBaseline;

        if (ROOT_GAME_OBJECT.FOCUS == true) {
            s.lineWidth = this.border_on_focus_width_line;
            s.fillStyle = this.border_on_focus_color;
            roundedRect(s, "", this.POSITION.X(), this.POSITION.Y(), this.DIMENSION.WIDTH(), this.DIMENSION.HEIGHT(), this.radius, this.color, "stroke", this.border_color);
        } else {

            s.lineWidth = this.border_width_line;
            s.fillStyle = this.border_color;
            roundedRect(s, "", this.POSITION.X(), this.POSITION.Y(), this.DIMENSION.WIDTH(), this.DIMENSION.HEIGHT(), this.radius, this.color, "stroke", this.border_color);

        }

        s.textAlign = this.TEXT_ALIGN;
        s.font = this.font;
        s.fillStyle = this.TEXT_COLOR;
        s.globalAlpha = this.TEXT_OPACITY;

        if (this.textResizeByWidth == false) {

            drawRotatedTextNoSkrech(s, this.TEXT, this.POSITION.X(), this.POSITION.Y(), this.TEXT_ANGLE, this.DIMENSION.WIDTH(), this.DIMENSION.HEIGHT());

        } else {

            drawRotatedText(s, this.TEXT, this.POSITION.X(), this.POSITION.Y(), this.TEXT_ANGLE, this.DIMENSION.WIDTH(), this.DIMENSION.HEIGHT());
            //s.textAlign = "start";

        }

        s.restore();

    };

}
