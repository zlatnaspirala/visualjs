## Application Programming Interface Documentation for Visual JS 1.0 - 3d part of webgl 2 ##

 Main html file : webgl2.html
 Place for editing and creating new object elements is function webGLStart :

```
function webGLStart() {

   /*
   TypeOfObject ENU value :
    triangle
    square
    pyramid
    cube
    cubeTex
    cubeLightTex
    obj - need callback
   */

   // world.Add( TypeOfObject ,  Size );
   world.Add("triangle",0.1);

}
```


Importing obj file (for obj we need extra callback function - direct loading obj file) :

```
function onLoadObj(meshes){

              App.meshes = meshes;
              OBJ.initMeshBuffers(world.GL.gl, App.meshes.skeleton);
              world.Add("obj" , 1 ,"objectFile" );

}
```

```
function webGLStart() {

   OBJ.downloadMeshes({'skeleton': 'res/3d-objects/skeleton.obj' } , onLoadObj  );

}
```
