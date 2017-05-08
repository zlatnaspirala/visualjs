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
App.scene.MyCubeTex.rotationSpeed = 70;
delete textuteImageSamplers;


var oscilltor_variable = new OSCILLATOR(0.05 , 2 , 0.01)

setInterval(function(){
            
App.scene.MyCubeTex.geometry.setScale(oscilltor_variable.UPDATE())
            
} , 10)




