import SYS from '../system';
import APPLICATION from '../../manifest/manifest';

var CHECK_THE_ENGINE = function () {
    document.body.style.WebkitTransform = "scale(1)";
    document.body.style.overflow = "hidden";
    // MUST BE FIXED
    function system_ready_check() {
        if (typeof GET_ALL_GAME_OBJECTS !== "undefined") {
            setTimeout(function () {
                while (RESOURCE.SUM == 0 && typeof KEYBOARD != "function") {
                    console.log("res not ready");
                }
                SYS.DEBUG.LOG("SYS : DOM readyState is load.");
                SYS.READY = true;
                if (APPLICATION.STATUS == "production") {
                    SYS.DEBUG.LOG("APPLICATION.STATUS : production");
                } else if (APPLICATION.STATUS == "develop") {
                    SYS.DEBUG.LOG("APPLICATION.STATUS : develop");
                    GET_ALL_GAME_OBJECTS();
                }
            }, 10);
        } else {
            setTimeout(system_ready_check, 25);
        }

    }

    system_ready_check();

};

window.oncontextmenu = function () {
    return false; 
    // cancel default menu
};

export default CHECK_THE_ENGINE;
