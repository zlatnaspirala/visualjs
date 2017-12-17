
/**
 * Class ONRESIZE representing a callback method when 
 * window.onresize trigger
 *
 * @method ONRESIZE
 */
function ONRESIZE() {}

window.onresize = function (e) {

	if (SYS.DOM.RESIZE_TYPE == "DIAMETRIC") {
		
		SYS.DOM.c.width = window.innerWidth - 1; //CONVERTOR.PER_TO_PIX( SYS.DOM.W_PIX );
		SYS.DOM.c.height = window.innerHeight;   //CONVERTOR.PER_TO_PIY( SYS.DOM.H_PIX );
		//HARD CODE At THE MOMENT
		
	}
	ONRESIZE();

};
