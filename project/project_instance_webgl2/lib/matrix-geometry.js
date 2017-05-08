 'use strict';

class Scale {

    constructor() {
        
    this.x = 1;
    this.y = 1;
    this.z = 1;
        
    }
    
     LinearScale ( scale_ ) {
    
        this.x = scale_;
        this.y = scale_;
        this.z = scale_;
    
    }
    
    
}


class Point {

    constructor (x , y , z){
    
        if (typeof z == 'undefined') { z = 0; }
        
        this.x = x;
        this.y = y;
        this.z = z;
        this.scale = new Scale();
        
    }
  
    get X() {
        return parseFloat(this.x * this.scale.x);
    }
    get Y() {
        return parseFloat(this.y * this.scale.y);
    }
    get Z() {
        return parseFloat(this.z * this.scale.z);
    }
    
}

class rotationVector {
    
    constructor (x , y , z){
        
        if (typeof x == 'undefined') { x = 0; }
        if (typeof y == 'undefined') { y = 0; }
        if (typeof z == 'undefined') { z = 0; }
        
        this.x = x;
        this.y = y;
        this.z = z;
        
        return this;
        
    }
    
    get X() {
        return this.x;
    }
    get Y() {
        return this.y;
    }
    get Z() {
        return this.z;
    }
    
    get RotationVector() {
    
        return [this.x,this.y,this.z];
    
    }
    
    SetDirection (x_,y_,z_){
    
        this.x = x_;
        this.y = y_;
        this.z = z_;
        
    }
    
    SetDirectionX (){
        
        this.x = 1;
        this.y = 0;
        this.z = 0;
        
    }
    
    SetDirectionY (){
        
        this.x = 0;
        this.y = 1;
        this.z = 0;
        
    }
    
    SetDirectionZ (){
        
        this.x = 0;
        this.y = 0;
        this.z = 1;
        
    }
    
    SetDirectionXY (){
        
        this.x = 1;
        this.y = 1;
        this.z = 0;
        
    }
    
    SetDirectionXZ (){
        
        this.x = 1;
        this.y = 0;
        this.z = 1;
        
    }
    
    SetDirectionYZ (){
        
        this.x = 0;
        this.y = 1;
        this.z = 1;
        
    }
    
    
}

class Position {

    constructor(x , y , z) {
        //super()
        
        if (typeof x == 'undefined') { x = 0; }
        if (typeof y == 'undefined') { y = 0; }
        if (typeof z == 'undefined') { z = 0; }
        
        this.x = x;
        this.y = y;
        this.z = z;
        
        return this;
        
    }
    
    get worldLocation() {
        
        return [this.x,this.y,this.z];
        
    }
    
    SetX (newx){
        
        this.x = newx;
    
    }
    
    SetY (newy){
     
        this.y = newy;
   
    }
    
    SetZ (newz){
      
        this.z = newz;

    }
    
    setPosition (newx , newy , newz) {
     
     this.x = newx;
     this.y = newy;
     this.z = newz;

    }

    
    
    
}

//*******************************
//*******************************
// CLASS ORIENTED
//*******************************
//*******************************
// TRIANGLE
class TriangleVertex {
    
    
    constructor( root ) {
    
        this.root = root;
        this.size = root.size;
        this.dynamicBuffer = App.dynamicBuffer;
        this.pointA = new Point(  0.0 , 1 , 0.0 );
        this.pointB = new Point(  -1 , -1 , 0 );
        this.pointC = new Point(  1 , -1 , 0);

        }
    
    // GETTER
    get vertices (){
    
        return   new Float32Array([
           this.pointA.X , this.pointA.Y * this.root.size, this.pointA.Z ,
           
           this.pointB.X * this.root.size, this.pointB.Y * this.root.size, this.pointB.Z ,
           
           this.pointC.X * this.root.size, this.pointC.Y * this.root.size, this.pointC.Z
           ]);
        
    }
    
    setScale(scale) {
        
        this.size = scale;
        
        if ( this.dynamicBuffer == true ) return;
        
        App.operation.triangle_buffer_procedure(this.root)
        
        return 'dynamicBuffer is false but i will update vertex array prototypical.';
        
    }
    
    
}

// SQUARE
class SquareVertex {
    
    
    constructor( root ) {

        this.classRoot = this;
        this.root = root;
        this.size = root.size;
        this.pointA = new Point(  1 ,  1 , 0 );
        this.pointB = new Point( -1 ,  1 , 0 );
        this.pointC = new Point(  1 , -1 , 0 );
        this.pointD = new Point( -1 , -1 , 0 );
        this.dynamicBuffer = true;
        
        this.texCoordsPoints = {
         
            right_top     : new Point( 1.0, 1.0, 0 ),
            left_top  : new Point( 0.0, 1.0, 0 ),
            right_bottom    : new Point( 1.0, 0.0, 0 ),
            left_bottom : new Point( 0.0, 0.0, 0 ),
            
            
            
        };
        
        
    }
    
    // GETTER
    get vertices (){
        
        return   new Float32Array([
                                   this.pointA.X * this.size, this.pointA.Y * this.size, this.pointA.Z ,
                                   
                                   this.pointB.X * this.size, this.pointB.Y * this.size, this.pointB.Z ,
                                   
                                   this.pointC.X * this.size , this.pointC.Y * this.size, this.pointC.Z ,
                                   
                                   this.pointD.X * this.size, this.pointD.Y * this.size, this.pointD.Z
                                   ]);
        
    }
    
    get texCoords () {
    
        return  new Float32Array([
                                  this.texCoordsPoints.right_top.X , this.texCoordsPoints.right_top.Y,
                                  this.texCoordsPoints.left_top.X , this.texCoordsPoints.left_top.Y,
                                  this.texCoordsPoints.right_bottom.X , this.texCoordsPoints.right_bottom.Y,
                                  this.texCoordsPoints.left_bottom.X , this.texCoordsPoints.left_bottom.Y,
                                  ]);
        
        
   }
    
    
    get indices () { return  [
                              0,  1,  2,      3,  2,  1,    // front
                              
                              ];
    }
    
    setScale(scale) {
        
        this.size = scale;
        
        if ( this.dynamicBuffer == true ) return;
        
        App.operation.square_buffer_procedure(this.root)
        
        return 'dynamicBuffer is false but i will update vertex array prototypical.';
        
    }
    
}

class CubeVertex {

    constructor (root) {
    
        
        this.root = root;
        this.size = root.size;
        this.basePoint = 1.0 * this.size;
        this.basePointNeg = -1.0 * this.size;
        this.dynamicBuffer = true;
        
        this.osciTest = new OSCILLATOR(0,2,0.002);
        // for scale by ori
        this.Front = {
            
            pointA : new Point(0,0,0),
            pointB : new Point(0,0,0),
            pointC : new Point(0,0,0),
            pointD : new Point(0,0,0),
            
        };
        this.Back = {
            
            pointA : new Point(0,0,0),
            pointB : new Point(0,0,0),
            pointC : new Point(0,0,0),
            pointD : new Point(0,0,0),
            
        };
        this.Top = {
            
            pointA : new Point(0,0,0),
            pointB : new Point(0,0,0),
            pointC : new Point(0,0,0),
            pointD : new Point(0,0,0),
            
        };
        this.Bottom = {
            
            pointA : new Point(0,0,0),
            pointB : new Point(0,0,0),
            pointC : new Point(0,0,0),
            pointD : new Point(0,0,0),
            
        };
        this.Right = {
            
            pointA : new Point(0,0,0),
            pointB : new Point(0,0,0),
            pointC : new Point(0,0,0),
            pointD : new Point(0,0,0),
            
        };
        this.Left = {
            
            pointA : new Point(0,0,0),
            pointB : new Point(0,0,0),
            pointC : new Point(0,0,0),
            pointD : new Point(0,0,0),
            
        };
        
        
        
        
    }
    
    setScaleByX(scale) {
        
        //for scale
        this.Left.pointA.x = -scale;
        this.Left.pointB.x = -scale;
        this.Left.pointC.x = -scale;
        this.Left.pointD.x = -scale;
        this.Right.pointA.x = scale;
        this.Right.pointB.x = scale;
        this.Right.pointC.x = scale;
        this.Right.pointD.x = scale;
        this.Top.pointA.x = -scale;
        this.Top.pointB.x = -scale;
        this.Top.pointC.x = scale;
        this.Top.pointD.x = scale;
        this.Bottom.pointA.x = -scale;
        this.Bottom.pointB.x = scale;
        this.Bottom.pointC.x = scale;
        this.Bottom.pointD.x = -scale;
        this.Front.pointA.x = -scale;
        this.Front.pointB.x = scale;
        this.Front.pointC.x = scale;
        this.Front.pointD.x = -scale;
        this.Back.pointA.x = -scale;
        this.Back.pointB.x = -scale;
        this.Back.pointC.x = scale;
        this.Back.pointD.x = scale;
        
        if ( this.dynamicBuffer == true ) return;
        
        App.operation.cube_buffer_procedure(this.root)
        return 'dynamicBuffer is false but i will update vertex array prototypical.';
        
    }
    
    setScaleByY(scale) {
        
        //for scale
        this.Left.pointA.y = -scale;
        this.Left.pointB.y = -scale;
        this.Left.pointC.y = scale;
        this.Left.pointD.y = scale;
        
        this.Right.pointA.y = -scale;
        this.Right.pointB.y = scale;
        this.Right.pointC.y = scale;
        this.Right.pointD.y = -scale;
        
        
        this.Top.pointA.y = scale;
        this.Top.pointB.y = scale;
        this.Top.pointC.y = scale;
        this.Top.pointD.y = scale;
        
        this.Bottom.pointA.y = -scale;
        this.Bottom.pointB.y = -scale;
        this.Bottom.pointC.y = -scale;
        this.Bottom.pointD.y = -scale;
        
        
        this.Front.pointA.y = -scale;
        this.Front.pointB.y = -scale;
        this.Front.pointC.y = scale;
        this.Front.pointD.y = scale;
        
        this.Back.pointA.y = -scale;
        this.Back.pointB.y = scale;
        this.Back.pointC.y = scale;
        this.Back.pointD.y = -scale;
        
        
        if ( this.dynamicBuffer == true ) return;
        
        App.operation.cube_buffer_procedure(this.root)
        return 'dynamicBuffer is false but i will update vertex array prototypical.';
        
    }
    
    
    setScaleByZ(scale) {
        
        //for scale
        
        this.Left.pointA.z = -scale;
        this.Left.pointB.z = scale;
        this.Left.pointC.z = scale;
        this.Left.pointD.z = -scale;
        
        this.Right.pointA.z = -scale;
        this.Right.pointB.z = -scale;
        this.Right.pointC.z = scale;
        this.Right.pointD.z = scale;
        
        
        this.Top.pointA.z = scale;
        this.Top.pointB.z = scale;
        this.Top.pointC.z = scale;
        this.Top.pointD.z = scale;
        
        this.Bottom.pointA.z = -scale;
        this.Bottom.pointB.z = -scale;
        this.Bottom.pointC.z = -scale;
        this.Bottom.pointD.z = -scale;
        
        
        this.Front.pointA.z = scale;
        this.Front.pointB.z = scale;
        this.Front.pointC.z = scale;
        this.Front.pointD.z = scale;
        
        this.Back.pointA.z = -scale;
        this.Back.pointB.z = -scale;
        this.Back.pointC.z = -scale;
        this.Back.pointD.z = -scale;
        
        
        if ( this.dynamicBuffer == true ) return;
        
        App.operation.cube_buffer_procedure(this.root)
        return 'dynamicBuffer is false but i will update vertex array prototypical.';
        
    }
    

    
    setScale(scale) {
     
        this.size = scale;
        //for scale
        this.basePoint = 1.0 * this.size;
        this.basePointNeg = -1.0 * this.size;
        if ( this.dynamicBuffer == true ) return;

        App.operation.cube_buffer_procedure(this.root)
        return 'dynamicBuffer is false but i will update vertex array prototypical.';
    
    }
 
        get vertices () { return new Float32Array([
          // Front face
          this.basePointNeg + this.Front.pointA.X , this.basePointNeg + this.Front.pointA.Y,  this.basePoint + this.Front.pointA.Z,
          this.basePoint + this.Front.pointB.X, this.basePointNeg+ this.Front.pointB.Y,  this.basePoint+ this.Front.pointB.Z,
          this.basePoint + this.Front.pointC.X,  this.basePoint+ this.Front.pointC.Y,  this.basePoint+ this.Front.pointC.Z,
          this.basePointNeg + this.Front.pointD.X,  this.basePoint+ this.Front.pointD.Y,  this.basePoint + this.Front.pointD.Z,
          
          // Back face
          this.basePointNeg+ this.Back.pointA.X, this.basePointNeg + this.Back.pointA.Y, this.basePointNeg+ this.Back.pointA.Z,
          this.basePointNeg+ this.Back.pointB.X,  this.basePoint+ this.Back.pointB.Y, this.basePointNeg+ this.Back.pointB.Z,
          this.basePoint+ this.Back.pointC.X,  this.basePoint+ this.Back.pointC.Y, this.basePointNeg+ this.Back.pointC.Z,
          this.basePoint+ this.Back.pointD.X, this.basePointNeg+ this.Back.pointD.Y, this.basePointNeg+ this.Back.pointD.Z,
          
          // Top face
          this.basePointNeg+ this.Top.pointA.X ,  this.basePoint+ this.Top.pointA.Y, this.basePointNeg+ this.Top.pointA.Z,
          this.basePointNeg+ this.Top.pointB.X ,  this.basePoint+ this.Top.pointB.Y,  this.basePoint+ this.Top.pointA.Z,
          this.basePoint+ this.Top.pointC.X ,  this.basePoint+ this.Top.pointC.Y,  this.basePoint+ this.Top.pointA.Z,
          this.basePoint+ this.Top.pointD.X ,  this.basePoint+ this.Top.pointD.Y, this.basePointNeg+ this.Top.pointA.Z,
          
          // Bottom face
          this.basePointNeg+ this.Bottom.pointA.X, this.basePointNeg+ this.Bottom.pointA.Y, this.basePointNeg+ this.Bottom.pointA.Z,
          this.basePoint+ this.Bottom.pointB.X, this.basePointNeg+ this.Bottom.pointB.Y, this.basePointNeg+ this.Bottom.pointB.Z,
          this.basePoint+ this.Bottom.pointC.X, this.basePointNeg+ this.Bottom.pointC.Y,  this.basePoint+ this.Bottom.pointC.Z,
          this.basePointNeg+ this.Bottom.pointD.X, this.basePointNeg+ this.Bottom.pointD.Y,  this.basePoint+ this.Bottom.pointD.Z,
          
          // Right face
          this.basePoint+ this.Right.pointA.X, this.basePointNeg+ this.Right.pointA.Y, this.basePointNeg+ this.Right.pointA.Z,
          this.basePoint+ this.Right.pointB.X,  this.basePoint+ this.Right.pointB.Y, this.basePointNeg+ this.Right.pointB.Z,
          this.basePoint+ this.Right.pointC.X,  this.basePoint+ this.Right.pointC.Y,  this.basePoint+ this.Right.pointC.Z,
          this.basePoint+ this.Right.pointD.X, this.basePointNeg+ this.Right.pointD.Y,  this.basePoint+ this.Right.pointD.Z,
          
          // Left face
          this.basePointNeg+ this.Left.pointA.X, this.basePointNeg+ this.Left.pointA.Y, this.basePointNeg+ this.Left.pointA.Z,
          this.basePointNeg+ this.Left.pointB.X, this.basePointNeg+ this.Left.pointB.Y,  this.basePoint+ this.Left.pointB.Z,
          this.basePointNeg+ this.Left.pointC.X,  this.basePoint+ this.Left.pointC.Y,  this.basePoint+ this.Left.pointC.Z,
          this.basePointNeg+ this.Left.pointD.X,  this.basePoint+ this.Left.pointD.Y, this.basePointNeg+ this.Left.pointD.Z
          ]);
        }
 /////////////////
 
    
    /////////////////
    
    
        get texCoords () {return  new Float32Array([
          // Front face
          0.0 , 0.0,
          0.0, 1.0,
          1.0, 1.0,
          1.0, 0.0,
          
          // Back face
          1.0, 1.0,
          1.0, 0.0,
          0.0, 0.0,
          0.0, 1.0,
          
          // Top face
          1.0, 0.0,
          0.0, 0.0,
          0.0, 1.0,
          1.0, 1.0,
          
          // Bottom face
          0.0, 0.0,
          0.0, 1.0,
          1.0, 1.0,
          1.0, 0.0,
          
          // Right face
          0.0, 0.0,
          0.0, 1.0,
          1.0, 1.0,
          1.0, 0.0,
          
          // Left face
          0.0, 0.0,
          0.0, 1.0,
          1.0, 1.0,
          1.0, 0.0
          ]);
        }
        
        get indices () { return  [
         0,  1,  2,      0,  2,  3,    // front
         4,  5,  6,      4,  6,  7,    // back
         8,  9,  10,     8,  10, 11,   // top
         12, 13, 14,     12, 14, 15,   // bottom
         16, 17, 18,     16, 18, 19,   // right
         20, 21, 22,     20, 22, 23    // left
         ];
        }
    
   



}

class GeoOfColor {

    constructor ( type_ ){
    
        if ( typeof type_ != 'undefined') {
          
         
            
            if (type_ == '4x4' || type_ == "square" ) {
            
                return    new Float32Array (  [
                            1.0, 0.0, 0.0, 1.0, //Top right
                            0.0, 1.0, 0.0, 1.0, //Top left
                            0.0, 0.0, 1.0, 1.0, //Bottom right
                            0.5, 1.0, 0.5, 1.0  //Bottom left
                            ]);
                
            
            }
            else if (type_ == 'triangle') {
            
                return [
                 1.0, 0.0, 0.0, 1.0, // Top
                 0.0, 1.0, 0.0, 1.0, // Right
                 0.0, 0.0, 1.0, 1.0  // Bottom
                 ];
            
            
            }
   
            else if (type_ == 'Piramide4'  ){
            
               this.front = "test";
                
                
              return   new Float32Array ( [
                 // Front face
                 1.0, 0.0, 0.0, 1.0,
                 0.0, 1.0, 0.0, 1.0,
                 0.0, 0.0, 1.0, 1.0,
                 
                 // Right face
                 1.0, 0.0, 0.0, 1.0,
                 0.0, 0.0, 1.0, 1.0,
                 0.0, 1.0, 0.0, 1.0,
                 
                 // Back face
                 1.0, 0.0, 0.0, 1.0,
                 0.0, 1.0, 0.0, 1.0,
                 0.0, 0.0, 1.0, 1.0,
                 
                 // Left face
                 1.0, 0.0, 0.0, 1.0,
                 0.0, 0.0, 1.0, 1.0,
                 0.0, 1.0, 0.0, 1.0,
                 
                 // Bottom left
                 0.0, 1.0, 0.0, 1.0,
                 0.0, 0.0, 1.0, 1.0,
                 0.0, 1.0, 0.0, 1.0,
                 
                 // Bottom right
                 0.0, 1.0, 0.0, 1.0,
                 0.0, 1.0, 0.0, 1.0,
                 0.0, 0.0, 1.0, 1.0
                 ]);
            
            }
            else if (type_ == 'cube') {
            
                return [
                        [1.0, 1.0, 1.0, 1.0], // Front face
                        [1.0, 1.0, 0.0, 1.0], // Back face
                        [0.0, 1.0, 0.0, 1.0], // Top face
                        [1.0, 0.5, 0.5, 1.0], // Bottom face
                        [1.0, 0.0, 1.0, 1.0], // Right face
                        [0.0, 0.0, 1.0, 1.0]  // Left face
                        ];
                        
            }
            else if (type_ == 'cubelight' || type_ == 'cube light'){
            
                return  new Float32Array ([
                         // Front face
                         0.0,  0.0,  1.0,
                         0.0,  0.0,  1.0,
                         0.0,  0.0,  1.0,
                         0.0,  0.0,  1.0,
                         
                         // Back face
                         0.0,  0.0, -1.0,
                         0.0,  0.0, -1.0,
                         0.0,  0.0, -1.0,
                         0.0,  0.0, -1.0,
                         
                         // Top face
                         0.0,  1.0,  0.0,
                         0.0,  1.0,  0.0,
                         0.0,  1.0,  0.0,
                         0.0,  1.0,  0.0,
                         
                         // Bottom face
                         0.0, -1.0,  0.0,
                         0.0, -1.0,  0.0,
                         0.0, -1.0,  0.0,
                         0.0, -1.0,  0.0,
                         
                         // Right face
                         1.0,  0.0,  0.0,
                         1.0,  0.0,  0.0,
                         1.0,  0.0,  0.0,
                         1.0,  0.0,  0.0,
                         
                         // Left face
                         -1.0,  0.0,  0.0,
                         -1.0,  0.0,  0.0,
                         -1.0,  0.0,  0.0,
                         -1.0,  0.0,  0.0
                         ]);
            
            
            
            }
            
    
            
            
            
            
        }
        else {
        
            return     [
                        1.0, 0.0, 0.0, 1.0, //Top right
                        0.0, 1.0, 0.0, 1.0, //Top left
                        0.0, 0.0, 1.0, 1.0, //Bottom right
                        0.5, 1.0, 0.5, 1.0  //Bottom left
                        ];
            
        
        }
        
    }


}

class PiramideVertex {

    constructor (root) {
    
        this.root = root;
        this.size = root.size;
        
        this.dynamicBuffer = true;
        this.spitz = 0;
        this.basePoint = 1.0 * this.size;
        this.basePointNeg = -1.0 * this.size;
        
        
        this.colorData = {};
        
        this.colorData.Front = {
            
            pointA : new COLOR_ALPHA( 1.0, 0.0, 0.0, 1.0),
            pointB : new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0),
            pointC : new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0),
           
            
        };
        this.colorData.Back = {
           
            pointA : new COLOR_ALPHA(1.0, 0.0, 0.0, 1.0),
            pointB : new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0),
            pointC : new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0),
        
        };
        this.colorData.BottomRight = {
            
            pointA : new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0),
            pointB : new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0),
            pointC : new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0),
            
        };
        this.colorData.Bottom = {
            
            pointA : new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0),
            pointB : new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0),
            pointC : new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0),
            
        };
        this.colorData.Right = {
            
            
            // Right face
            
            pointA : new COLOR_ALPHA(1.0, 0.0, 0.0, 1.0),
            pointB : new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0),
            pointC : new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0),
            
        };
        this.colorData.Left = {
        
            pointA : new COLOR_ALPHA(1.0, 0.0, 0.0, 1.0),
            pointB : new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0),
            pointC : new COLOR_ALPHA( 0.0, 1.0, 0.0, 1.0),
            
        };
        
    
    }
    
    
    
    setScale(scale) {
        
        this.size = scale;
        
        this.basePoint = 1.0 * this.size;
        this.basePointNeg = -1.0 * this.size;
        
        if ( this.dynamicBuffer == true ) return;
        
        App.operation.piramide_buffer_procedure(this.root)
        
        return 'dynamicBuffer is false but i will update vertex array prototypical.';
        
        
    }
    
    
    setSpitz (newValueFloat) {
    
        this.spitz = newValueFloat;
        
        if ( this.dynamicBuffer == true ) return;
        
        App.operation.piramide_buffer_procedure(this.root)
    
    }
    
    
    
        // from cube
    get verticesC () { return new Float32Array( [
                 // Front face
                 -1.0, -1.0,  1.0,
                 1.0, -1.0,  1.0,
                 0.0,  15.0,  0.0,
                 0.0,  15.0,  0.0,
                 
                 // Back face
                 -1.0, -1.0, -1.0,
                 0.0,  15.0, 0.0,
                 0.0,  15.0, 0.0,
                 1.0, -1.0, -1.0,
                 
                 // Top face
                 0.0,  15.0, 0.0,
                 0.0,  15.0,  0.0,
                 0.0,  15.0,  0.0,
                 0.0,  15.0, 0.0,
                 
                 // Bottom face
                 -1.0, -1.0, -1.0,
                 1.0, -1.0, -1.0,
                 1.0, -1.0,  1.0,
                 -1.0, -1.0,  1.0,
                 
                 // Right face
                 1.0, -1.0, -1.0,
                 0.0,  15.0, 0.0,
                 0.0,  15.0,  0.0,
                 1.0, -1.0,  1.0,
                 
                 // Left face
                 -1.0, -1.0, -1.0,
                 -1.0, -1.0,  1.0,
                 0.0,  15.0,  0.0,
                 0.0,  15.0, 0.0
                 ]);
        
    }
    
    get normals () { // from cube
    
        return new Float32Array( [
                  // Front face
                  0.0,  0.0,  1.0,
                  0.0,  0.0,  1.0,
                  0.0,  0.0,  1.0,
                  0.0,  0.0,  1.0,
                  
                  // Back face
                  0.0,  0.0, -1.0,
                  0.0,  0.0, -1.0,
                  0.0,  0.0, -1.0,
                  0.0,  0.0, -1.0,
                  
                  // Top face
                  0.0,  1.0,  0.0,
                  0.0,  1.0,  0.0,
                  0.0,  1.0,  0.0,
                  0.0,  1.0,  0.0,
                  
                  // Bottom face
                  0.0, -1.0,  0.0,
                  0.0, -1.0,  0.0,
                  0.0, -1.0,  0.0,
                  0.0, -1.0,  0.0,
                  
                  // Right face
                  1.0,  0.0,  0.0,
                  1.0,  0.0,  0.0,
                  1.0,  0.0,  0.0,
                  1.0,  0.0,  0.0,
                  
                  // Left face
                  -1.0,  0.0,  0.0,
                  -1.0,  0.0,  0.0,
                  -1.0,  0.0,  0.0,
                  -1.0,  0.0,  0.0
                  ]);
    
    }
    // from cube
    get texCoords () {
           return new Float32Array( [
                  // Front face
                  0.0, 0.0,
                  1.0, 0.0,
                  1.0, 1.0,
                  0.0, 1.0,
                  
                  // Back face
                  1.0, 0.0,
                  1.0, 1.0,
                  0.0, 1.0,
                  0.0, 0.0,
                  
                  // Top face
                  0.0, 1.0,
                  0.0, 0.0,
                  1.0, 0.0,
                  1.0, 1.0,
                  
                  // Bottom face
                  1.0, 1.0,
                  0.0, 1.0,
                  0.0, 0.0,
                  1.0, 0.0,
                  
                  // Right face
                  1.0, 0.0,
                  1.0, 1.0,
                  0.0, 1.0,
                  0.0, 0.0,
                  
                  // Left face
                  0.0, 0.0,
                  1.0, 0.0,
                  1.0, 1.0,
                  0.0, 1.0
                  ])

    
    }
    
    get indices () {

        return [
        0, 1, 2,      0, 2, 3,    // Front face
        4, 5, 6,      4, 6, 7,    // Back face
        8, 9, 10,     8, 10, 11,  // Top face
        12, 13, 14,   12, 14, 15, // Bottom face
        16, 17, 18,   16, 18, 19, // Right face
        20, 21, 22,   20, 22, 23  // Left face
        ];

    }
    
   
    get color () {
        
        return new Float32Array ([
         // Front face
         this.colorData.Front.pointA.r , this.colorData.Front.pointA.g, this.colorData.Front.pointA.b , this.colorData.Front.pointA.ALPHA ,
         this.colorData.Front.pointA.r , this.colorData.Front.pointA.g, this.colorData.Front.pointA.b , this.colorData.Front.pointA.ALPHA ,
         this.colorData.Front.pointA.r , this.colorData.Front.pointA.g, this.colorData.Front.pointA.b , this.colorData.Front.pointA.ALPHA ,
         
         // Right face
          this.colorData.Right.pointA.r , this.colorData.Right.pointA.g, this.colorData.Right.pointA.b , this.colorData.Right.pointA.ALPHA ,
          this.colorData.Right.pointA.r , this.colorData.Right.pointA.g, this.colorData.Right.pointA.b , this.colorData.Right.pointA.ALPHA ,
          this.colorData.Right.pointA.r , this.colorData.Right.pointA.g, this.colorData.Right.pointA.b , this.colorData.Right.pointA.ALPHA ,
         
        // Back face
        this.colorData.Back.pointA.r , this.colorData.Back.pointA.g, this.colorData.Back.pointA.b , this.colorData.Back.pointA.ALPHA ,
        this.colorData.Back.pointA.r , this.colorData.Back.pointA.g, this.colorData.Back.pointA.b , this.colorData.Back.pointA.ALPHA ,
        this.colorData.Back.pointA.r , this.colorData.Back.pointA.g, this.colorData.Back.pointA.b , this.colorData.Back.pointA.ALPHA ,
         
         // Left face
        this.colorData.Left.pointA.r , this.colorData.Left.pointA.g, this.colorData.Left.pointA.b , this.colorData.Left.pointA.ALPHA ,
        this.colorData.Left.pointA.r , this.colorData.Left.pointA.g, this.colorData.Left.pointA.b , this.colorData.Left.pointA.ALPHA ,
        this.colorData.Left.pointA.r , this.colorData.Left.pointA.g, this.colorData.Left.pointA.b , this.colorData.Left.pointA.ALPHA ,
         
         // Bottom left
        this.colorData.Bottom.pointA.r , this.colorData.Bottom.pointA.g, this.colorData.Bottom.pointA.b , this.colorData.Bottom.pointA.ALPHA ,
        this.colorData.Bottom.pointA.r , this.colorData.Bottom.pointA.g, this.colorData.Bottom.pointA.b , this.colorData.Bottom.pointA.ALPHA ,
        this.colorData.Bottom.pointA.r , this.colorData.Bottom.pointA.g, this.colorData.Bottom.pointA.b , this.colorData.Bottom.pointA.ALPHA ,
         
         // Bottom right BottomRight
        this.colorData.BottomRight.pointA.r , this.colorData.BottomRight.pointA.g, this.colorData.BottomRight.pointA.b , this.colorData.BottomRight.pointA.ALPHA ,
        this.colorData.BottomRight.pointA.r , this.colorData.BottomRight.pointA.g, this.colorData.BottomRight.pointA.b , this.colorData.BottomRight.pointA.ALPHA ,
        this.colorData.BottomRight.pointA.r , this.colorData.BottomRight.pointA.g, this.colorData.BottomRight.pointA.b , this.colorData.BottomRight.pointA.ALPHA
         ]);
        
    

    }
    
    get vertices () {
        return new Float32Array ([
    
    0.0 ,          this.basePoint  +  this.spitz,  0.0  ,
    this.basePointNeg, this.basePointNeg   ,  this.basePoint,
    this.basePoint, this.basePointNeg   ,  this.basePoint,
    
    // Right face
    0.0  ,          this.basePoint+  this.spitz,  0.0  ,
    this.basePoint, this.basePointNeg ,  this.basePoint,
    this.basePoint, this.basePointNeg, this.basePointNeg,
    
    // Back face
    0.0   ,          this.basePoint +  this.spitz,  0.0 ,
    this.basePoint, this.basePointNeg, this.basePointNeg,
    this.basePointNeg, this.basePointNeg, this.basePointNeg,
    
    // Left face
    0.0,          this.basePoint+  this.spitz,  0.0 ,
    this.basePointNeg, this.basePointNeg, this.basePointNeg,
    this.basePointNeg, this.basePointNeg,  this.basePoint,
    
    //Bottom left
    this.basePointNeg, this.basePointNeg,  this.basePoint,
    this.basePoint, this.basePointNeg,  this.basePoint,
    this.basePoint, this.basePointNeg, this.basePointNeg,
    
    //Bottom right
    this.basePointNeg, this.basePointNeg,  this.basePoint,
    this.basePoint, this.basePointNeg, this.basePointNeg,
    this.basePointNeg, this.basePointNeg, this.basePointNeg
    ]);
 
    
    
 }
    
    
    
    
    



}



function COLOR (r_,g_,b_) {
    
    
    var ROOT = this;
    ROOT.r = parseFloat(r_);
    ROOT.g = parseFloat(g_);
    ROOT.b = parseFloat(b_);
    
    ROOT.R = function() {return parseFloat(ROOT.r)};
    ROOT.G = function() {return parseFloat(ROOT.g)};
    ROOT.B = function() {return parseFloat(ROOT.b)};
    
    ROOT.set = function(r_,g_,b_) {
    
        ROOT.r = parseFloat(r_);
        ROOT.g = parseFloat(g_);
        ROOT.b = parseFloat(b_);
    
    };
    
    ROOT.print = function (){ console.log("color data RGB format : R:" + ROOT.r + "  G:" + ROOT.g + "  B:" + ROOT.b); };
    
}


function COLOR_ALPHA (r_,g_,b_,a_ ) {
    
    
    var ROOT = this;
    ROOT.r = parseFloat(r_);
    ROOT.g = parseFloat(g_);
    ROOT.b = parseFloat(b_);
    
    if (typeof a_ == 'undefined'){
       var a_ = 1.0;
    }
    
    ROOT.a = parseFloat(a_);
    
    ROOT.R = function() {return parseFloat(ROOT.r)};
    ROOT.G = function() {return parseFloat(ROOT.g)};
    ROOT.B = function() {return parseFloat(ROOT.b)};
    ROOT.ALPHA = function() {return parseFloat(ROOT.a)};
    
    ROOT.set = function(r_,g_,b_,a_) {
        
        ROOT.r = parseFloat(r_);
        ROOT.g = parseFloat(g_);
        ROOT.b = parseFloat(b_);
        ROOT.a = parseFloat(a_);
        
    };
    
    ROOT.print = function (){ console.log("color data RGB format : R:" + ROOT.r + "  G:" + ROOT.g + "  B:" + ROOT.b+ "  ALPHA:" + ROOT.ALPHA); };
    
}






