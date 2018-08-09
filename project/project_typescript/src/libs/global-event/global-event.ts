import Browser from "../class/browser";

class GlobalEvent {

  /**
	  * @Description window based events
  	*/
  public get: {[key: string]: any} = {};

  private browser: Browser;

  public constructor(browser: Browser) {

    this.browser = browser;
    // this.attachEvent("onresize" , function(e) {console.log("test resize" + event); });
    // this.attachEvent("onmousedown" , function(e) {console.log("mouse down" + event); });

  }

  public attachEvent(name: string, callback) {
    this.get[name] = callback;
    window[name]  = (event) => {
      this.get[name](event);
    };
  }

}
export default GlobalEvent;
