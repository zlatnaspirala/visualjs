
import { EVENTS } from './game_object/game_object_events';
import { KEYBOARD } from './events/keyboard';
import { RIGHT_MENU_BUTTON } from './draw_functions/systems';
import APPLICATION from '../manifest/manifest';
import { LOAD, VIEW } from './init';
import { MODUL } from './modules/modules';

/**
 * @Description Instance of ENGINE class will handle all modules and
 * gameobjects.
 * @class ENGINE
 * @example Internal . Injected like property ENGINE intro PROGRAM object.
 * @constructor
 * @return {Any} nothing
 *
 */
export function ENGINE(c) {

    var ROOT_ENGINE = this;
    // ONE PROGRAM ONE ENGINE
    //ENGINE WILL BE BIG SWITCHER
    this.PROGRAM_ID = c.id;
    //Events are part of engine
    this.EVENTS = new EVENTS(c, ROOT_ENGINE); // destroy mem IMPORTANT events must be deatached at first time than set up to undefined .
    this.MODULES = new Array();
    this.GAME_TYPE = "NO_PLAYER";
    this.KEYBOARD = new KEYBOARD(c);

    if (APPLICATION.EDITOR == true) {

        this.ENGINE_EDITOR = true;

    } else {

        this.ENGINE_EDITOR = false;

    }

    this.EXIT_EDIT_MODE = function () {

        ROOT_ENGINE.ENGINE_EDITOR = false;

        for (var x = 0; x < ROOT_ENGINE.MODULES.length; x++) {

            for (var y = 0; y < ROOT_ENGINE.MODULES[x].GAME_OBJECTS.length; y++) {

                ROOT_ENGINE.MODULES[x].GAME_OBJECTS[y].EDITOR.ENABLE = false;

            }

        }

    };

    this.GO_TO_EDIT_MODE = function () {

        ROOT_ENGINE.ENGINE_EDITOR = true;

        for (var x = 0; x < ROOT_ENGINE.MODULES.length; x++) {

            for (var y = 0; y < ROOT_ENGINE.MODULES[x].GAME_OBJECTS.length; y++) {

                ROOT_ENGINE.MODULES[x].GAME_OBJECTS[y].EDITOR.ENABLE = true;

            }

        }

    };

    this.GUI = {

        VISIBLE: false,
        BUTTONS: [
            new RIGHT_MENU_BUTTON("Add new gameObject ", 0, "1"),
            new RIGHT_MENU_BUTTON("Exit edit mode", 20, "2"),
            new RIGHT_MENU_BUTTON("Set render speed", 40, "3"),
            new RIGHT_MENU_BUTTON("Switch AutoConnect to true", 60, "4", "res/system/images/html5/HTML5-Offline-Storage.png"),
            new RIGHT_MENU_BUTTON("Switch EditorAutoRun to true", 80, "5", "res/system/images/html5/HTML5-Offline-Storage.png")],
        CHECK_ON_START: function () {

            if (LOAD("Application") == false) {
                console.log("no cache data about application");
            } else {

                APPLICATION = LOAD("Application");
                SYS.DEBUG.LOG("APPLICATION object was loaded from localstorage. " + APPLICATION.ACCOUNT_SERVICE_AUTO_RUN);
                if (APPLICATION.ACCOUNT_SERVICE_AUTO_RUN == true) {
                    ROOT_ENGINE.GUI.BUTTONS[3].text = "Switch AutoConnect to false";
                } else {
                    ROOT_ENGINE.GUI.BUTTONS[3].text = "Switch AutoConnect to true";
                }

                if (APPLICATION.EDITOR_AUTORUN == true) {
                    ROOT_ENGINE.ENGINE_EDITOR = true;
                    ROOT_ENGINE.GUI.BUTTONS[4].text = "Switch editorAutoRun to false";
                } else {
                    ROOT_ENGINE.ENGINE_EDITOR = false;
                    ROOT_ENGINE.GUI.BUTTONS[4].text = "Switch editorAutoRun to true";
                }

            }

        },
        GRID: {
            VISIBLE: true,
            MAP_SIZE_X: 10,
            MAP_SIZE_Y: 10,
            STEP: 10,
            COLOR: APPLICATION.SYSTEM.HOVER_COLOR,
        },

        LIST_OF_OBJECTS: {

            VISIBLE: true,
            LIST: ROOT_ENGINE.MODULES,
            BUTTONS_MODULES: [],
            BUTTONS_GAME_OBJECTS: [],

            GET_MODULES: function (_give_me_reference_object_) {

                for (var s = 0; s < ROOT_ENGINE.MODULES.length; s++) {

                    ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES.push(new RIGHT_MENU_BUTTON(ROOT_ENGINE.MODULES[s].NAME, 15 * s, s + 1));

                    ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[s].TAP = function () {
                        //console.log(this.IAM)
                        ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS = [];
                        for (var w = 0; w < ROOT_ENGINE.MODULES[this.IAM - 1].GAME_OBJECTS.length; w++) {

                            ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS.push(new RIGHT_MENU_BUTTON(ROOT_ENGINE.MODULES[this.IAM - 1].GAME_OBJECTS[w].NAME, 14 * w, w + 1));
                            ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[w].POSITION.x += 100;

                            var _pass_name = ROOT_ENGINE.MODULES[this.IAM - 1].GAME_OBJECTS[w].NAME;

                            ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[w]._pass_name = _pass_name;

                            ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[w].TAP = function () {

                                console.log("  ON_PAGE EDITOR   :::: reference comes from : " + _give_me_reference_object_.NAME + " ::::::: reference for" + this._pass_name);

                                window[_give_me_reference_object_.NAME]._REF = this._pass_name;

                                console.log(">>>>>>>>" + window[_give_me_reference_object_.NAME].NAME + "::::::::::" + window[_give_me_reference_object_.NAME]._REF);

                                window[SYS.RUNNING_PROGRAMS[0]].ENGINE.GUI.LIST_OF_OBJECTS.REMOVE_LIST_OBJ_MODULES();

                            };

                        }

                    };

                }

            },

            REMOVE_LIST_OBJ_MODULES: function () {

                ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES = [];
                ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS = [];

            }

        },

    };

    this.GUI.LIST_OF_OBJECTS.GET_MODULES();
    this.GUI.CHECK_ON_START();

    this.DRAW_MODULES = function (s) {

        if (ROOT_ENGINE.GUI.GRID.VISIBLE == true && ROOT_ENGINE.ENGINE_EDITOR == true) {

            s.fillStyle = ROOT_ENGINE.GUI.GRID.COLOR;
            for (var x = 0; x < ROOT_ENGINE.GUI.GRID.MAP_SIZE_X * ROOT_ENGINE.GUI.GRID.STEP; x += ROOT_ENGINE.GUI.GRID.STEP) {

                s.fillRect(VIEW.W(x), VIEW.H(0), 1, VIEW.H());
                s.fillRect(VIEW.W(0), VIEW.H(x), VIEW.W(), 1);

            }

        }

        for (var x = 0; x < ROOT_ENGINE.MODULES.length; x++) {
            ROOT_ENGINE.MODULES[x].DRAW_GAME_OBJECTS(s);
        }

        if (ROOT_ENGINE.ENGINE_EDITOR == true) {

            if (ROOT_ENGINE.GUI.VISIBLE == true) {

                for (var x = 0; x < ROOT_ENGINE.GUI.BUTTONS.length; x++) {
                    s.textBaseline = "middle";

                    if (ROOT_ENGINE.GUI.BUTTONS[x].HOVER == false) {
                        s.fillStyle = APPLICATION.SYSTEM.COLOR;
                        s.fillRect(ROOT_ENGINE.GUI.BUTTONS[x].POSITION.X(), ROOT_ENGINE.GUI.BUTTONS[x].POSITION.Y(), ROOT_ENGINE.GUI.BUTTONS[x].DIMENSION.WIDTH(), ROOT_ENGINE.GUI.BUTTONS[x].DIMENSION.HEIGHT());
                        s.fillStyle = APPLICATION.SYSTEM.TEXT_COLOR;
                        s.fillText(ROOT_ENGINE.GUI.BUTTONS[x].text, ROOT_ENGINE.GUI.BUTTONS[x].POSITION.X(), ROOT_ENGINE.GUI.BUTTONS[x].POSITION.Y() + ROOT_ENGINE.GUI.BUTTONS[x].DIMENSION.HEIGHT() / 2, ROOT_ENGINE.GUI.BUTTONS[x].DIMENSION.WIDTH());
                    } else {
                        s.fillStyle = APPLICATION.SYSTEM.HOVER_COLOR;
                        s.fillRect(ROOT_ENGINE.GUI.BUTTONS[x].POSITION.X(), ROOT_ENGINE.GUI.BUTTONS[x].POSITION.Y(), ROOT_ENGINE.GUI.BUTTONS[x].DIMENSION.WIDTH(), ROOT_ENGINE.GUI.BUTTONS[x].DIMENSION.HEIGHT());
                        s.fillStyle = APPLICATION.SYSTEM.TEXT_COLOR;
                        s.fillText(ROOT_ENGINE.GUI.BUTTONS[x].text, ROOT_ENGINE.GUI.BUTTONS[x].POSITION.X(), ROOT_ENGINE.GUI.BUTTONS[x].POSITION.Y() + ROOT_ENGINE.GUI.BUTTONS[x].DIMENSION.HEIGHT() / 2, ROOT_ENGINE.GUI.BUTTONS[x].DIMENSION.WIDTH());

                        if (ROOT_ENGINE.GUI.BUTTONS[x].icon == true) {
                            try {
                                s.drawImage(window["image_system_" + ROOT_ENGINE.GUI.BUTTONS[x].IAM], ROOT_ENGINE.GUI.BUTTONS[x].POSITION.X() + ROOT_ENGINE.GUI.BUTTONS[x].DIMENSION.WIDTH() - 30, ROOT_ENGINE.GUI.BUTTONS[x].POSITION.Y() - 5, 30, 30);
                            } catch (e) { /* Not nessesery */
                            }
                        }

                    }

                }

            }

            //
            for (var x = 0; x < ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES.length; x++) {
                s.textBaseline = "middle";

                if (ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].HOVER == false) {
                    s.fillStyle = APPLICATION.SYSTEM.COLOR;
                    s.fillRect(ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.X(), ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.Y(), ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].DIMENSION.WIDTH(), ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].DIMENSION.HEIGHT());
                    s.fillStyle = APPLICATION.SYSTEM.TEXT_COLOR;
                    s.fillText(ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].text, ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.X(), ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.Y() + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].DIMENSION.HEIGHT() / 2, ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].DIMENSION.WIDTH());
                } else {
                    s.fillStyle = APPLICATION.SYSTEM.HOVER_COLOR;
                    s.fillRect(ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.X(), ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.Y(), ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].DIMENSION.WIDTH(), ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].DIMENSION.HEIGHT());
                    s.fillStyle = APPLICATION.SYSTEM.COLOR;
                    s.fillText(ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].text, ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.X(), ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.Y() + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].DIMENSION.HEIGHT() / 2, ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].DIMENSION.WIDTH());
                }

            }

            for (var x = 0; x < ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS.length; x++) {
                s.textBaseline = "middle";

                if (ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].HOVER == false) {
                    s.fillStyle = APPLICATION.SYSTEM.COLOR;
                    s.fillRect(ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.X(), ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.Y(), ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].DIMENSION.WIDTH(), ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].DIMENSION.HEIGHT());
                    s.fillStyle = APPLICATION.SYSTEM.TEXT_COLOR;
                    s.fillText(ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].text, ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.X(), ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.Y() + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].DIMENSION.HEIGHT() / 2, ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].DIMENSION.WIDTH());
                } else {
                    s.fillStyle = APPLICATION.SYSTEM.HOVER_COLOR;
                    s.fillRect(ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.X(), ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.Y(), ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].DIMENSION.WIDTH(), ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].DIMENSION.HEIGHT());
                    s.fillStyle = APPLICATION.SYSTEM.COLOR;
                    s.fillText(ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].text, ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.X(), ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.Y() + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].DIMENSION.HEIGHT() / 2, ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].DIMENSION.WIDTH());
                }

            }

            //


        }

    };

    this.UPDATE_MODULES = function () {

        for (var x = 0; x < ROOT_ENGINE.MODULES.length; x++) {

            ROOT_ENGINE.MODULES[x].UPDATE_GAME_OBJECTS();

        }

    };

    this.CREATE_MODUL = function (name) {

        // window[name] = new MODUL(name);

        ROOT_ENGINE.MODULES.push(new MODUL(name, ROOT_ENGINE.PROGRAM_ID));

    };

    this.DESTROY_MODUL = function (name) {

        // window[name] = new MODUL(name);
        console.log(ROOT_ENGINE.MODULES.indexOf(name));

        ROOT_ENGINE.MODULES.forEach(function (item, index, object) {

            // (item, index, object)
            if (item.NAME == name) {

                if (index > -1) {
                    ROOT_ENGINE.MODULES.splice(index, 1);
                }

                console.log(ROOT_ENGINE.MODULES.indexOf(name));
            }

        });

    };

}
