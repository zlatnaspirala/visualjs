


			var INIT_SCENE_ENABLED = true;
			
			function CAMERA_INIT(position){
			
					
			
				camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 100, 1000000 );
				camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 100, 1000000 );
				
				camera.position.set( position.x , position.y , position.z );
				
				camera.setLens(20);
				
				scene.add( camera );
					
				 // CAMERA_MOVE = new OSCILLATOR(100 , 15000 , 50)
				 // CAMERA_MOVE.value_ = position.y ;
				  
			     //MOVE ()
			     
				 
			
			}
			
			
			function MOVE () {
				
				setTimeout ( function() {
					
					if (INIT_SCENE_ENABLED == true) {
						
				camera.position.setY (CAMERA_MOVE.UPDATE());
					MOVE ()
					
					}else {
						
						camera.position.setY (400);
						
					}
					
				} , 12 )
				
				
			}
			