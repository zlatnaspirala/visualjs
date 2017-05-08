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


world.Add("cubeLightTex", 1 , "MyCubeTex" ,  textuteImageSamplers );

delete textuteImageSamplers;


            
App.scene.MyCubeTex.LightsData.ambientLight.r = 0.1;
App.scene.MyCubeTex.LightsData.ambientLight.g = 0.2;
App.scene.MyCubeTex.LightsData.ambientLight.b = 1;

App.scene.MyCubeTex.LightsData.ambientLight.set(0.1,0.2,1)

App.scene.MyCubeTex.LightsData.directionLight.r = 1
App.scene.MyCubeTex.LightsData.directionLight.g = 1
App.scene.MyCubeTex.LightsData.directionLight.b = 1
            
 // OR

App.scene.MyCubeTex.LightsData.directionLight.set(1,1,1)





