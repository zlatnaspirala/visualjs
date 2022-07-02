
import APPLICATION from "../../manifest/manifest";
import SYS from '../system';

/**
 * @example Use MODUL class on begin of program with
 * @example HELLO_WORLD.ENGINE.CREATE_MODUL("STARTER");
 * @description ML ML is main object for multilanuage strings returning
 * @constructor
 * @param {String} Name name is passed value for modul name.
 * @param {String} Name name is passed value for modul name.
 */
let ML;

if (APPLICATION.MULTILANGUAGE == true) {
    ML = {
        ROOT: this,
        DATA: new SYS.XML.READ("res/system/ml/ml.xml", "CONVER_TO_OBJ"),
        CURRENT_LANGUAGE: "English",

        get: function (alias) {
            this.DATA.NewDataSet.lang.forEach(function (i) {
                if (alias == i.ALIAS["#text"]) {
                    eval(" var RESULT = i." + ML.CURRENT_LANGUAGE + "[\"#text\"]; ");
                    console.log(RESULT);
                    return RESULT;
                }
            });
        },

    };

}

export default ML;
