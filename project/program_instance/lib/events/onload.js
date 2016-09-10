

window.onload = function(){


SYS.SCRIPT.LOAD("res/resource.audio")
SYS.SCRIPT.LOAD("lib/audio/audio.js")
SYS.SCRIPT.LOAD("lib/events/onunload.js")
SYS.SCRIPT.LOAD("lib/events/onbeforeunload.js")
SYS.SCRIPT.LOAD("lib/events/onresize.js")
SYS.SCRIPT.LOAD("lib/multi_screens/multi_screens.js")
SYS.SCRIPT.LOAD("lib/events/keyboard_editor.js")
if (APPLICATION.EDITOR == true){
SYS.SCRIPT.LOAD("lib/editor/editor.js")
} else {GET_ALL_GAME_OBJECTS = null}
SYS.SCRIPT.LOAD("lib/nui/camera/mdetect.js")
SYS.SCRIPT.LOAD("lib/program_modul.js")



if (APPLICATION.MULTIRTC_PEER == true) {
	
	  TEST = new SYS.XML.READ ('lib/webrtc/public/index.html');
	
		SYS.SCRIPT.LOAD("lib/webrtc/public/RTCMultiConnection2.2.js")
		SYS.SCRIPT.LOAD("lib/webrtc/public/linkify.js")
	
	     window['MAIN_PEER'] = new Object();
		 window['MAIN_PEER'] = new Object();
		 window['MAIN_PEER'].ADDRESS = 'localhost';
		 
		 
	  ACTIVATE_PEER = function (){
		  
		  if (SYS.DOM.E('RTC_HELP').innerHTML == '') {
			  
		   SYS.DOM.E('RTC_HELP').innerHTML =  TEST.DONE();
			  
		  }
		   
 setTimeout (function(){
			
		
	 if ( typeof RTCMultiConnection == 'function'   &&  typeof rtcMultiConnection == 'undefined'  && typeof getElement == 'function' ) {
		
			
        SYS.SCRIPT.LOAD("lib/webrtc/public/ui.peer-connection.js")
		
		document.querySelector('#message-sound').src =  SYS.SOUND.RES.SOUNDS[0].src;

        SYS.SCRIPT.LOAD("lib/webrtc/public/ui.users-list.js")
        SYS.SCRIPT.LOAD("lib/webrtc/public/ui.settings.js")
        SYS.SCRIPT.LOAD("lib/webrtc/public/ui.share-files.js")
		
		 
		}
		else{
				
		SYS.SCRIPT.LOAD("lib/webrtc/public/ui.main.js");
		ACTIVATE_PEER()
			
		}

		}, 150);

	};

}


if (APPLICATION.BOX2D == true){

   SYS.SCRIPT.SINHRO_LOAD._prototypeBox2d = function(s){
   
	SYS.SCRIPT.LOAD("lib/box2d/js/box2d/common/b2Settings.js")
    SYS.SCRIPT.LOAD("lib/box2d/js/box2d/common/math/b2Vec2.js")
	
  

	
		SYS.SCRIPT.SINHRO_LOAD._b2Mat22 = function(s){
		
				SYS.SCRIPT.LOAD("lib/box2d/js/box2d/common/math/b2Math.js")
				SYS.SCRIPT.LOAD("lib/box2d/js/box2d/collision/b2AABB.js")
				SYS.SCRIPT.LOAD("lib/box2d/js/box2d/collision/b2Bound.js")
				SYS.SCRIPT.LOAD("lib/box2d/js/box2d/collision/b2BoundValues.js")
				SYS.SCRIPT.LOAD("lib/box2d/js/box2d/collision/b2Pair.js")
				SYS.SCRIPT.LOAD("lib/box2d/js/box2d/collision/b2PairCallback.js")
				SYS.SCRIPT.LOAD("lib/box2d/js/box2d/collision/b2BufferedPair.js")
				SYS.SCRIPT.LOAD("lib/box2d/js/box2d/collision/b2PairManager.js")
				SYS.SCRIPT.LOAD("lib/box2d/js/box2d/collision/b2BroadPhase.js")
				SYS.SCRIPT.LOAD("lib/box2d/js/box2d/collision/b2Collision.js")
				SYS.SCRIPT.LOAD("lib/box2d/js/box2d/collision/Features.js")
				SYS.SCRIPT.LOAD("lib/box2d/js/box2d/collision/b2ContactID.js")
				SYS.SCRIPT.LOAD("lib/box2d/js/box2d/collision/b2ContactPoint.js")
				SYS.SCRIPT.LOAD("lib/box2d/js/box2d/collision/b2Distance.js")
				SYS.SCRIPT.LOAD("lib/box2d/js/box2d/collision/b2Manifold.js")
				SYS.SCRIPT.LOAD("lib/box2d/js/box2d/collision/b2OBB.js")
				SYS.SCRIPT.LOAD("lib/box2d/js/box2d/collision/b2Proxy.js")
				SYS.SCRIPT.LOAD("lib/box2d/js/box2d/collision/ClipVertex.js")
				SYS.SCRIPT.LOAD("lib/box2d/js/box2d/collision/shapes/b2Shape.js")
				SYS.SCRIPT.LOAD("lib/box2d/js/box2d/collision/shapes/b2ShapeDef.js")
							
							SYS.SCRIPT.LOAD("lib/box2d/js/box2d/collision/shapes/b2BoxDef.js")
							SYS.SCRIPT.LOAD("lib/box2d/js/box2d/collision/shapes/b2CircleDef.js")
							SYS.SCRIPT.LOAD("lib/box2d/js/box2d/collision/shapes/b2CircleShape.js")
							SYS.SCRIPT.LOAD("lib/box2d/js/box2d/collision/shapes/b2MassData.js")
							SYS.SCRIPT.LOAD("lib/box2d/js/box2d/collision/shapes/b2PolyDef.js")
							SYS.SCRIPT.LOAD("lib/box2d/js/box2d/collision/shapes/b2PolyShape.js")
							SYS.SCRIPT.LOAD("lib/box2d/js/box2d/dynamics/b2Body.js")
							SYS.SCRIPT.LOAD("lib/box2d/js/box2d/dynamics/b2BodyDef.js")
							SYS.SCRIPT.LOAD("lib/box2d/js/box2d/dynamics/b2CollisionFilter.js")
							SYS.SCRIPT.LOAD("lib/box2d/js/box2d/dynamics/b2Island.js")
							SYS.SCRIPT.LOAD("lib/box2d/js/box2d/dynamics/b2TimeStep.js")
							SYS.SCRIPT.LOAD("lib/box2d/js/box2d/dynamics/contacts/b2ContactNode.js")
							SYS.SCRIPT.LOAD("lib/box2d/js/box2d/dynamics/contacts/b2Contact.js")
							SYS.SCRIPT.LOAD("lib/box2d/js/box2d/dynamics/contacts/b2ContactConstraint.js")
							SYS.SCRIPT.LOAD("lib/box2d/js/box2d/dynamics/contacts/b2ContactConstraintPoint.js")
							SYS.SCRIPT.LOAD("lib/box2d/js/box2d/dynamics/contacts/b2ContactRegister.js")
							SYS.SCRIPT.LOAD("lib/box2d/js/box2d/dynamics/contacts/b2ContactSolver.js")
							SYS.SCRIPT.LOAD("lib/box2d/js/box2d/dynamics/contacts/b2CircleContact.js")
							SYS.SCRIPT.LOAD("lib/box2d/js/box2d/dynamics/contacts/b2Conservative.js")
							SYS.SCRIPT.LOAD("lib/box2d/js/box2d/dynamics/contacts/b2NullContact.js")
							SYS.SCRIPT.LOAD("lib/box2d/js/box2d/dynamics/contacts/b2PolyAndCircleContact.js")
							SYS.SCRIPT.LOAD("lib/box2d/js/box2d/dynamics/contacts/b2PolyContact.js")
							SYS.SCRIPT.LOAD("lib/box2d/js/box2d/dynamics/b2ContactManager.js")
							SYS.SCRIPT.LOAD("lib/box2d/js/box2d/dynamics/b2World.js")
							SYS.SCRIPT.LOAD("lib/box2d/js/box2d/dynamics/b2WorldListener.js")
							
							SYS.SCRIPT.LOAD("lib/box2d/js/box2d/dynamics/joints/b2JointNode.js")

				SYS.SCRIPT.SINHRO_LOAD._b2JointNode = function(s){
				
				
						SYS.SCRIPT.LOAD("lib/box2d/js/box2d/dynamics/joints/b2Joint.js")
						SYS.SCRIPT.LOAD("lib/box2d/js/box2d/dynamics/joints/b2JointDef.js")
						SYS.SCRIPT.LOAD("lib/box2d/js/box2d/dynamics/joints/b2DistanceJoint.js")
						SYS.SCRIPT.LOAD("lib/box2d/js/box2d/dynamics/joints/b2DistanceJointDef.js")
						SYS.SCRIPT.LOAD("lib/box2d/js/box2d/dynamics/joints/b2Jacobian.js")
						SYS.SCRIPT.LOAD("lib/box2d/js/box2d/dynamics/joints/b2GearJoint.js")
						SYS.SCRIPT.LOAD("lib/box2d/js/box2d/dynamics/joints/b2GearJointDef.js")
						SYS.SCRIPT.LOAD("lib/box2d/js/box2d/dynamics/joints/b2MouseJoint.js")
						SYS.SCRIPT.LOAD("lib/box2d/js/box2d/dynamics/joints/b2MouseJointDef.js")
						SYS.SCRIPT.LOAD("lib/box2d/js/box2d/dynamics/joints/b2PrismaticJoint.js")
						SYS.SCRIPT.LOAD("lib/box2d/js/box2d/dynamics/joints/b2PrismaticJointDef.js")
						SYS.SCRIPT.LOAD("lib/box2d/js/box2d/dynamics/joints/b2PulleyJoint.js")
						SYS.SCRIPT.LOAD("lib/box2d/js/box2d/dynamics/joints/b2PulleyJointDef.js")
						SYS.SCRIPT.LOAD("lib/box2d/js/box2d/dynamics/joints/b2RevoluteJoint.js")
						SYS.SCRIPT.LOAD("lib/box2d/js/box2d/dynamics/joints/b2RevoluteJointDef.js")
				
              };
				
              };			   
   
       
	   SYS.SCRIPT.LOAD("lib/box2d/js/box2d/common/math/b2Mat22.js")
	   
	   
   };


    SYS.SCRIPT.LOAD("lib/box2d/lib/prototypeBox2d.js")

    

}
////
// END OF FIZIKA
////


document.body.style.WebkitTransform = 'scale(1)';
document.body.style.overflow = "hidden";


function system_ready_check(){
	
if (typeof GET_ALL_GAME_OBJECTS !== 'undefined' && typeof SYS.SOUND.RES.SOUNDS != 'undefined' ) {

//.ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").NEW_OBJECT	
setTimeout(function(){

	//################################################################
	// IMPORTANT - make stable system 100% 
	//- yuo need to have one minimum source for audio!
	//################################################################
	while(RESOURCE.SUM == 0 && typeof KEYBOARD != 'function' && typeof  SYS.SOUND.RES.SOUNDS[0].src != 'string'    )
	{console.log("res not ready");}
	
    SYS.DEBUG.LOG("SYS : DOM readyState is load.")
	SYS.READY = true;
	
if (APPLICATION.STATUS == "production" )
{
	SYS.DEBUG.LOG("APPLICATION.STATUS : production")

	 
}
else if (APPLICATION.STATUS == "develop" &&  APPLICATION.EDITOR == true )
{
   SYS.DEBUG.LOG("APPLICATION.STATUS : develop");
   GET_ALL_GAME_OBJECTS()
}	
	

if (APPLICATION.ACCOUNT_SERVICE_AUTO_RUN == true){
	ACCOUNT_SYSTEM.CONNECT();	
}



SYS.SCRIPT.LOAD("starter/run.js")
	
}, 100);

}else {
	
	setTimeout( system_ready_check , 25 );
	
}


}


system_ready_check()

};


 
 
 
 
window.oncontextmenu = function ()
{
    return false;// cancel default menu
}	