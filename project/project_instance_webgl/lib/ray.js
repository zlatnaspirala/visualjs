

function  Raycaster()  {

var ROOT = this;
ROOT.RECALL = function(){};
ROOT.raycaster = new THREE.Raycaster();


ROOT.onDocumentMouseMove  = function ( event ) {
event.preventDefault();
//	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
//	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

};

ROOT.onDocumentclick  = function ( event ) {

event.preventDefault();

mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

};

document.addEventListener( 'mousemove', ROOT.onDocumentMouseMove, false );
document.addEventListener( 'click', ROOT.onDocumentclick, false );

ROOT.AUTO_UPDATE = function(){

ROOT.raycaster.setFromCamera( mouse, camera );

var intersects = ROOT.raycaster.intersectObjects( scene.children );

if ( intersects.length > 0 ) {

	if ( INTERSECTED != intersects[ 0 ].object ) {

		try {
		INTERSECTED = intersects[ 0 ].object;
		ROOT.RECALL(INTERSECTED)
		console.log( 'recall for ' + INTERSECTED );
		//console.log (INTERSECTED.material );
		}catch(e){console.log("error in raycaster" + e)}


	} 


}
else {

	INTERSECTED = null;

}

};	

PROGRAM.AUTO_UPDATE.push(ROOT);


ROOT.DESTROY = function(){

document.removeEventListener( 'mousemove', ROOT.onDocumentMouseMove );
document.removeEventListener( 'click', ROOT.onDocumentclick );

PROGRAM.AUTO_UPDATE.unset(ROOT);


};

}