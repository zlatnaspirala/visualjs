/**
 * @Filename : manifest.js
 * Manifest file for visual-js application.
 * Important: Use this file just for edit fields, dont press enter for new line.
 * Created by Nikola Lukic zlatnaspirala@gmail.com
 * www.maximumroulette.com 2016
 */
var APPLICATION = {
    NAME: "VISUAL-JS",
    TYPE: "client",
    VERSION: "3.0.0",
    STATUS: "develop",
    MULTILANGUAGE: false,
    // false for fiddle support , we need absolute path.
    IMAGE_LOADER_PREFIX: true,
    EDITOR: true,
    EDITOR_AUTORUN: false,
    LOCAL_SERVER: "localhost",
    DEVELOPERS: ["Nikola Lukic Zlatnaspirala@gmail.com"],
    ACCESSIBILITY: {
        VIRTUAL_KEYBOARD_FOR_DESKTOP: false,
        ACTIVATE_VK_FOR_DESKTOP: function () {
            CREATE_VIRTUAL_KEYBOARD();
            HIDE_KEYBOARD();
            APPLICATION.ACCESSIBILITY.VIRTUAL_KEYBOARD_FOR_DESKTOP = true;
        },
        DEACTIVATE_VK_FOR_DESKTOP: function () {
            APPLICATION.ACCESSIBILITY.VIRTUAL_KEYBOARD_FOR_DESKTOP = false
        }
    },
    SINGLE_BROADCAST: true,
    MULTIRTC_PEER: true,
    PROGRAM: {
        // MONITOR is innerWidth.Height or CANVAS is canvas width
        CALCULATING_POSITION_BY: "CANVAS",
        RENDER_SPEED: 5,
        UPDATE_SPEED: 5
    },
    SYSTEM: {
        COLOR: "#afa9aa",
        HOVER_COLOR: "#5991FF",
        TEXT_COLOR: "black",
        ACTOR_X: "",
        ACTOR_Y: ""
    },
};

export default APPLICATION;
