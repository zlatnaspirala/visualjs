/**
 * This is part of visual-js canvas2d game engine
 * free for use
 */

function VISUAL_OSCILLATOR(min, max, step) {

    var GENERIC_NAME_OBJECT = "_oscillator_gameObject" + SYS.MATH.RANDOM_INT_FROM_TO(10000, 1000000000);
    var ___id____ = SYS.MATH.RANDOM_INT_FROM_TO(10000, 1000000000);

    HELLO_WORLD.ENGINE.MODULES.ACCESS_MODULE("STARTER").NEW_OBJECT(GENERIC_NAME_OBJECT, 0, 5, 20, 12, 10);
    HELLO_WORLD.ENGINE.MODULES.ACCESS_MODULE("STARTER").NEW_OBJECT("_oscillator_gameObject" + ___id____ + "min", 2, 7, 7, 3, 10);
    HELLO_WORLD.ENGINE.MODULES.ACCESS_MODULE("STARTER").NEW_OBJECT("_oscillator_gameObject" + ___id____ + "max", 2, 10, 7, 3, 10);
    HELLO_WORLD.ENGINE.MODULES.ACCESS_MODULE("STARTER").NEW_OBJECT("_oscillator_gameObject" + ___id____ + "delta", 2, 13, 7, 3, 10);
    HELLO_WORLD.ENGINE.MODULES.ACCESS_MODULE("STARTER").NEW_OBJECT("_oscillator_gameObject" + ___id____ + "reference", 5, 8, 10, 3, 10);

    GENERIC_NAME_OBJECT = window[GENERIC_NAME_OBJECT];
    //GENERIC_NAME_OBJECT.OBJECT = new OSCILLATOR(1,100,1);

    GENERIC_NAME_OBJECT.EDITOR.ACTORS_VISIBLE = false;
    window["_oscillator_gameObject" + ___id____ + "reference"].EDITOR.ACTORS_VISIBLE = false;
    window["_oscillator_gameObject" + ___id____ + "min"].EDITOR.ACTORS_VISIBLE = false;
    window["_oscillator_gameObject" + ___id____ + "max"].EDITOR.ACTORS_VISIBLE = false;
    window["_oscillator_gameObject" + ___id____ + "delta"].EDITOR.ACTORS_VISIBLE = false;

    window["_oscillator_gameObject" + ___id____ + "reference"].DRAG = false;
    window["_oscillator_gameObject" + ___id____ + "min"].DRAG = false;
    window["_oscillator_gameObject" + ___id____ + "max"].DRAG = false;
    window["_oscillator_gameObject" + ___id____ + "delta"].DRAG = false;

    //window["_oscillator_gameObject" + ___id____ + "reference"].CREATE_TEXTBOX("0.2" , 3 , "black" , "silver") ;

    window["_oscillator_gameObject" + ___id____ + "reference"]._REF = "";
    window["_oscillator_gameObject" + ___id____ + "reference"]._REF_PARAMETTER = "";

    window["_oscillator_gameObject" + ___id____ + "reference"].TAP = function () {

        if (window["_oscillator_gameObject" + ___id____ + "reference"]._REF == "") {
            window[SYS.RUNNING_PROGRAMS[0]].ENGINE.GUI.LIST_OF_OBJECTS.GET_MODULES(window["_oscillator_gameObject" + ___id____ + "reference"]);
            window[SYS.RUNNING_PROGRAMS[0]].ENGINE.GO_TO_EDIT_MODE();
        } else if (window["_oscillator_gameObject" + ___id____ + "reference"]._REF != "") {

            if (window["_oscillator_gameObject" + ___id____ + "reference"]._REF_PARAMETTER == "X") {}

        }

    };

    window["_oscillator_gameObject" + ___id____ + "reference"].CUSTOM = function (s) {

        s.strokeRect(this.POSITION.X() + this.DIMENSION.WIDTH() / 1.4, this.POSITION.Y(), 90, 20);
        if (this._REF == "") {

            s.fillText("CHOOSE REF", this.POSITION.X() + this.DIMENSION.WIDTH() / 1.4, this.POSITION.Y() + this.DIMENSION.HEIGHT() / 2);

        } else if (this._REF_PARAMETER == "x") {

            s.fillText(this._REF + ":pos x", this.POSITION.X() + this.DIMENSION.WIDTH() / 1.4, this.POSITION.Y() + this.DIMENSION.HEIGHT() / 2);
            window[this._REF].POSITION.TRANSLATE_BY_X(window["_oscillator_gameObject" + ___id____ + "reference"].__osci.UPDATE());

        } else if (this._REF_PARAMETER == "y") {

            s.fillText(this._REF + ":pos y", this.POSITION.X() + this.DIMENSION.WIDTH() / 1.4, this.POSITION.Y() + this.DIMENSION.HEIGHT() / 2);
            window[this._REF].POSITION.TRANSLATE_BY_Y(window["_oscillator_gameObject" + ___id____ + "reference"].__osci.UPDATE());

        }

    };

    window["_oscillator_gameObject" + ___id____ + "reference"].TYPE_OF_GAME_OBJECT = "CUSTOM";

    window["_oscillator_gameObject" + ___id____ + "min"].CREATE_TEXTBOX("0", 3, "black", "white");
    window["_oscillator_gameObject" + ___id____ + "max"].CREATE_TEXTBOX("20", 3, "black", "white");
    window["_oscillator_gameObject" + ___id____ + "delta"].CREATE_TEXTBOX("0.2", 3, "black", "white");

    window["_oscillator_gameObject" + ___id____ + "min"].TEXTBOX.font = "10px Arial";
    window["_oscillator_gameObject" + ___id____ + "max"].TEXTBOX.font = "10px Arial";
    window["_oscillator_gameObject" + ___id____ + "delta"].TEXTBOX.font = "10px Arial";

    if (typeof(min && max && step) != "undefined") {
        window["_oscillator_gameObject" + ___id____ + "min"].TEXTBOX.TEXT = min;
        window["_oscillator_gameObject" + ___id____ + "max"].TEXTBOX.TEXT = max;
        window["_oscillator_gameObject" + ___id____ + "delta"].TEXTBOX.TEXT = step;
    } else {
        window["_oscillator_gameObject" + ___id____ + "min"].TEXTBOX.TEXT = "1";
        window["_oscillator_gameObject" + ___id____ + "max"].TEXTBOX.TEXT = "100";
        window["_oscillator_gameObject" + ___id____ + "delta"].TEXTBOX.TEXT = "0.5";
    }

    min = window["_oscillator_gameObject" + ___id____ + "min"].TEXTBOX.TEXT;
    max = window["_oscillator_gameObject" + ___id____ + "max"].TEXTBOX.TEXT;
    step = window["_oscillator_gameObject" + ___id____ + "delta"].TEXTBOX.TEXT;

    window["_oscillator_gameObject" + ___id____ + "reference"].__osci = new OSCILLATOR(min, max, step);

    window["_oscillator_gameObject" + ___id____ + "min"].TEXTBOX.ON_PRESS_ENTER = function () {
        window["_oscillator_gameObject" + ___id____ + "reference"].__osci.min = parseFloat(this.TEXT);
    };
    window["_oscillator_gameObject" + ___id____ + "max"].TEXTBOX.ON_PRESS_ENTER = function () {
        window["_oscillator_gameObject" + ___id____ + "reference"].__osci.max = parseFloat(this.TEXT);
    };
    window["_oscillator_gameObject" + ___id____ + "delta"].TEXTBOX.ON_PRESS_ENTER = function () {
        window["_oscillator_gameObject" + ___id____ + "reference"].__osci.step = parseFloat(this.TEXT);
    };

    //window["_oscillator_gameObject" + ___id____ + "reference"].TEXTBOX.font = '10px Arial';
    //GENERIC_NAME_OBJECT.CREATE_ANIMATION( SURF , "DRAW_FRAME" , 5 , RESOURCE.Tiles  , ___id____ , "no" , 1,11,1,1,1) ;
    GENERIC_NAME_OBJECT.CUSTOM = function (s) {

        s.fillStyle = "#a0ba0a";
        s.fillRect(this.POSITION.X(), this.POSITION.Y() - 5, this.DIMENSION.WIDTH(), this.DIMENSION.HEIGHT());
        s.fillStyle = "black";
        s.fillText("Oscillator - editor object", this.POSITION.X(), this.POSITION.Y() + 4);

        s.fillText("Reference:", this.POSITION.X() + this.DIMENSION.WIDTH() / 1.4, this.POSITION.Y() + 4);

        s.fillText("Min:", this.POSITION.X(), this.POSITION.Y() + this.DIMENSION.HEIGHT() / 4);
        s.fillText("Max:", this.POSITION.X(), this.POSITION.Y() + 2 * this.DIMENSION.HEIGHT() / 4);
        s.fillText("Delta:", this.POSITION.X(), this.POSITION.Y() + 3 * this.DIMENSION.HEIGHT() / 4);

        s.beginPath();
        s.moveTo(this.POSITION.X(), this.POSITION.Y() + 10);
        s.lineTo(this.POSITION.X() + this.DIMENSION.WIDTH(), this.POSITION.Y() + 10);
        s.stroke();

    };

    GENERIC_NAME_OBJECT.TYPE_OF_GAME_OBJECT = "CUSTOM";

    GENERIC_NAME_OBJECT.GROUP.ADD("_oscillator_gameObject" + ___id____ + "min");
    GENERIC_NAME_OBJECT.GROUP.ADD("_oscillator_gameObject" + ___id____ + "max");
    GENERIC_NAME_OBJECT.GROUP.ADD("_oscillator_gameObject" + ___id____ + "delta");
    GENERIC_NAME_OBJECT.GROUP.ADD("_oscillator_gameObject" + ___id____ + "reference");

    return window["_oscillator_gameObject" + ___id____ + "reference"];

}
