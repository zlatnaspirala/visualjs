
import { sys } from 'visual-js';
import ActivateModifiers from './lib/proto_modify';

ActivateModifiers();

sys.DOM.CREATE_SURFACE("SURF", "examples", 100, 99.4, "DIAMETRIC");
examples.ENGINE.CREATE_MODUL("STARTER");

var smodul = examples.ENGINE.MODULES.ACCESS_MODULE("STARTER");
smodul.NEW_OBJECT("IamNewObject", 5, 50, 12, 15, 10);

console.log("What is examples ", examples);
