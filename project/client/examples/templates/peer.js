//###############################################//###############################################
//###############################################//###############################################
// USER PART OF CODE
/**
 * @Description This is part of visual-js canvas2d game engine
 * important : if you use this peer template you must start up >node signaling2D.js
 * free for use
 */

ACTIVATE_PEER();
HELLO_WORLD.ENGINE.MODULES.ACCESS_MODULE("STARTER").NEW_OBJECT("IamNewObject", 5, 50, 30, 20, 10);

var GENERIC_NAME_OBJECT = "IamJustAGameObject";
//+ SYS.MATH.RANDOM_INT_FROM_TO(1,1000000000);

HELLO_WORLD.ENGINE.MODULES.ACCESS_MODULE("STARTER").NEW_OBJECT(GENERIC_NAME_OBJECT, 35, 30, 40, 20, 10);
HELLO_WORLD.ENGINE.MODULES.ACCESS_MODULE("STARTER").GAME_OBJECTS.ACCESS(GENERIC_NAME_OBJECT).CREATE_ANIMATION(SURF, "DRAW_FRAME", 0, RESOURCE.Tiles, 45465465456456, "no", 1, 11, 1, 1, 1);

IamNewObject.ON_PEER_CREATED = {
    "DONE": function () {

        MAIN_PEER.CHANNEL.SET("LEVEL1");
        MAIN_PEER.CONNECT_TO_CHANNEL();
    }
};
IamNewObject.CREATE_PEER();
