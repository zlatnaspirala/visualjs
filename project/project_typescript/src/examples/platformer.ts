import * as Matter from "matter-js";
import TextureComponent from "../libs/class/visual-methods/texture";
import GlobalEvent from "../libs/global-event/global-event";
import Starter from "../libs/starter";

/**
 * @author Nikola Lukic
 * @class Platformer
 * @param Starter
 * @description This is game logic part
 * we stil use class based methodology.
 * About resource we use require
 */

class Platformer {

  public gameName: string = "platformer";
  public version: number = 0.1;

  private starter: Starter;
  private levelAccess: {[key: string]: (r: Platformer) => void} = {};

  // for now player is simple object
  private player: any = {};
  private ground: any = {};
  private circle: any = {};

  // shortcut for view size
  private v: any;

  private globalEvent: GlobalEvent;

  constructor(starter: Starter) {

    this.starter = starter;
    this.levelAccess.level1 = this.level1;
    this.v = starter.getView();

    // Load level (in same class for now)
    this.init("level1");
  }

  private init(level: string) {

    const root = this;
    this.levelAccess[level](root);

  }

  /**
   * @description Finally game start at here
   * @function level1
   * @return void
   */
  private level1(r: Platformer): void {
 
   
    const imgRes = [require("./imgs/floor.png"),
                    require("./imgs/target.png")];

    r.player = Matter.Bodies.rectangle(r.v.getWidth(10), r.v.getWidth(22), r.v.getWidth(33), r.v.getWidth(33),
    {
    render: {
        visualComponent : new TextureComponent(imgRes),
        sprite: {
            lalala: true,
        },
    } as Matter.IBodyRenderOptions | any },
    );

    r.ground = Matter.Bodies.rectangle(r.v.getWidth(50), r.v.getHeight(80), r.v.getWidth(50),  r.v.getHeight(20), {
        isStatic: true,
        label: "ground",
        render: {
            visualComponent : new TextureComponent(imgRes),
            sprite: {
                lalala: true,
            },
        } as Matter.IBodyRenderOptions | any,
    });

    r.ground.render.visualComponent.setVerticalTiles(3);

    r.circle = Matter.Bodies.circle(r.v.getWidth(50), r.v.getHeight(30), r.v.getWidth(20), {
        label: "target",
        density: 0.0005,
        friction: 0.01,
        frictionAir: 0.06,
        restitution: 0.3,
        render: {
            wireframes: true,
            fillStyle: "blue",
            sprite: {
               lalala: true,
            }
        }
    } as Matter.IBodyDefinition | any );

    // add bodies
    Matter.World.add(r.starter.getWorld(), [
        r.circle,
        r.ground,
        r.player,
    ]);

    this.globalEvent = r.starter.ioc.get.GlobalEvent;

    this.globalEvent.attachEvent("onmousemove" , function(event) {

            // let nik = () => this.mouseConstraint.mouse.mouseup(event: MouseEvent);
            const bodiesUnder = Matter.Query.point( [r.player]  , { x: event.pageX , y: event.pageY });

            if (bodiesUnder.length > 0) {

              const bodyToClick = bodiesUnder[1];
              console.log(bodyToClick);

            }

        });

    let counter = 0;
    let scaleFactor = 0;

    Matter.Events.on(r.starter.getEngine(), "beforeUpdate", function(event) {
            counter += 1;

            if (counter === 40) {

               // Matter.Body.setStatic(bodyG, true);
              if (scaleFactor > 1) {
               // Matter.Body.scale(bodyF, scaleFactor, scaleFactor);
              }

            }

            // Matter.Body.setAngle(r.player, -Math.PI * 0);

            if (counter >= 60 * 2.5) {

                //Matter.Body.setVelocity(r.player, { x: 0, y: -10 });
                counter = 0;
                scaleFactor = 1;

            }

        });

    console.log("LEVEL1 STARTED");
  }

}
export default Platformer;
