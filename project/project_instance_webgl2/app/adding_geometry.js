/*
 
 Nikola Lukic
 webGl2 api example 
 
 */

// LOAD MESH FROM OBJ FILES...
// if you dont use obj or complex mesh you no need for this func



function onLoadObj(meshes){
    
    
    App.meshes = meshes;
    OBJ.initMeshBuffers(world.GL.gl, App.meshes.church);
    
    
    do {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>" + App.meshes.church.textureBuffer);
    }
    while ( !App.meshes.church.textureBuffer )
        
        
        
        do {
            console.log(">>>>>>>>2>>>>>>>>>>>>>>>>>" + App.meshes.church.textureBuffer);
        }
    while ( typeof App.meshes.church.indexBuffer == 'undefined')
        
        var textuteImageSamplers2 = {
            source : [    "res/images/texture_metalic1.jpg"      ] ,
            mix_operation : "multiply" , // ENUM : multiply , divide ,
        };
    
    
    setTimeout( function() {
               
               world.Add("obj" , 1 ,"objectFileChurch" , textuteImageSamplers2 , App.meshes.church );
               
               },2000)
    
}
OBJ.downloadMeshes({'church': 'res/3d-objects/monkey.obj' } , onLoadObj  );



// ADDING PRIMITIVE SHAPES
//world.Add("triangle",  1 , "MyTriangle" );

//world.Add("square", 1 , "MySquare");


var textuteImageSamplers = {
    source : [    "res/images/complex_texture_1/diffuse.png"   ] ,
    mix_operation : "multiply" , // ENUM : multiply , divide ,
};


//world.Add("cubeLightTex", 1 , "MyCubeTex" ,  textuteImageSamplers );
//world.Add("squareTex", 1 , "MySTex" ,  textuteImageSamplers );

//world.Add("pyramid",1 , "MyPyramid");



//world.Add("pyramid",1 , "MyPyramid");

//delete images_local_var;


//ACCESS YOUR OBJECT AT
// App.scene.


// SET POSITION

//App.scene.MyTriangle.position.SetX(2.5);
//App.scene.MySquare.position.SetX(-2.5);
//App.scene.MyCubeTex.position.SetY(1);
//App.scene.MyPyramid.position.SetY(-2.5);


//App.scene.objectFileChurch.position.SetX(-2.5);


// ROTATING

// Stop
//App.scene.MyCubeTex.rotationSpeed = 0;

// Rotate
//App.scene.MyCubeTex.rotationSpeed = 50;

// Direction of rotating
//App.scene.MyCubeTex.rotDirection.SetDirectionZ()
//App.scene.MyCubeTex.rotDirection.SetDirectionX()
//App.scene.MyCubeTex.rotDirection.SetDirectionY()







