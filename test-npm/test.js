
import { sys, ActivateModifiers } from 'visual-js';

ActivateModifiers();

sys.DOM.CREATE_SURFACE("SURF", "examples", 100, 99.4, "DIAMETRIC");
examples.ENGINE.CREATE_MODUL("STARTER");

console.log("What is sys.RUNNING_PROGRAMS ", sys.RUNNING_PROGRAMS);

var smodul = examples.ENGINE.MODULES.ACCESS_MODULE("STARTER");

// smodul.NEW_OBJECT("IamNewObject", 5, 50, 12, 15, 10);


