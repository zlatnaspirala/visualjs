/*
 
 Nikola Lukic
 webGl2 api example 
 
 */



// ADDING PRIMITIVE SHAPES
//world.Add("triangle",  1 , "MyTriangle" );

//world.Add("square", 1 , "MySquare");



var textuteImageSamplers = {
    source : [    "res/images/complex_texture_1/diffuse.png"   ] ,
    mix_operation : "multiply" , // ENUM : multiply , divide ,
};


//world.Add("cubeLightTex", 1 , "MyVideo" ,  textuteImageSamplers );
//App.scene.MyVideo.streamTextures = new ACCESS_CAMERA( "webcam_beta" );


 






function onLoadObj(meshes){
    
    App.meshes = meshes;
    OBJ.initMeshBuffers(world.GL.gl, App.meshes.TV);
 
    setTimeout( function() {
               
               world.Add("obj" , 1 ,"TV" , textuteImageSamplers , App.meshes.TV );
               
               App.scene.TV.position.y = 0
               App.scene.TV.position.z = -4
               App.scene.TV.rotationSpeed = 0
               App.scene.TV.rotValue = 90
               App.scene.TV.LightsData.ambientLight.set(1,1,1)
               App.scene.TV.streamTextures = new ACCESS_CAMERA( "webcam_beta" );
              
               },1000)
    
}

OBJ.downloadMeshes({'TV': 'res/3d-objects/balltest2.obj'  } , onLoadObj  );






