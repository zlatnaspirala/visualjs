
import { sys, ActivateModifiers, loadEditor, runEditor, loadEditorObjects } from 'visual-js';
ActivateModifiers();

// Run editor
runEditor();
loadEditor();

sys.SCRIPT.LOAD("res/animations/resource.js").then(()=> {
  console.log("window.RESOURCE2 ", window.RESOURCE)
});

sys.DOM.CREATE_SURFACE("SURF", "examples", 100, 99.4, "DIAMETRIC");
examples.ENGINE.CREATE_MODUL("STARTER");
var smodul = examples.ENGINE.MODULES.ACCESS_MODULE("STARTER");

// sys.SCRIPT.LOAD('starter/visual.js', true)

console.log("TEST", sys.SCRIPT)
// examples.ENGINE.EXIT_EDIT_MODE();

loadEditorObjects();
