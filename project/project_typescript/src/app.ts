/** Import css */
require("./styles/styles.css");

import Platformer from "./examples/platformer";
import Ioc from "./libs/ioc";

const master = new Ioc();
master.singlton(Platformer, master.get.Starter);
