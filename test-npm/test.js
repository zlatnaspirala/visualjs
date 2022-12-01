
import { sys, ActivateModifiers, loadEditor, runEditor, loadEditorObjects } from 'visual-js';
ActivateModifiers();

// Run editor
// runEditor();
// loadEditor();

sys.DOM.CREATE_SURFACE("SURF", "examples", 100, 99.4, "DIAMETRIC");
examples.ENGINE.CREATE_MODUL("STARTER");

var smodul = examples.ENGINE.MODULES.ACCESS_MODULE("STARTER");
// smodul.NEW_OBJECT("IamNewObject", 25, 50, 12, 25, 10);

sys.SCRIPT.LOAD('starter/visual.js', true)

console.log("TEST", sys.SCRIPT)
// examples.ENGINE.EXIT_EDIT_MODE();

// loadEditorObjects();


