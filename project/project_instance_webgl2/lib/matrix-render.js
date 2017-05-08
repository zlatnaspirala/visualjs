//###############################################//###############################################
//###############################################//###############################################
// RENDER
//###############################################//###############################################
//###############################################//###############################################





var animate = function(rotationObject) {
    
    var timeNow = (new Date()).getTime();
    if (lastTime != 0) {
        var elapsed              = timeNow - lastTime;
        rotationObject.rotValue += (rotationObject.rotationSpeed * elapsed) / 1000.0;
    }
    
    
    if ( typeof rotationObject.mesh === 'undefined'){
    if ( typeof rotationObject.geometry.dynamicBuffer != 'undefined' ) {
    
        if (rotationObject.type == 'cube') {
           
            if (rotationObject.geometry.dynamicBuffer == true) {
              // App.operation.cube_buffer_procedure(rotationObject)
            }
           
            
        }
        
    }
    }
    else {
    
    
    
    
    }
    
    

};



App.operation.reDrawGlobal = function () {
    
    
    looper = 0;
    
    
    reDrawID = requestAnimationFrame(reDraw);
    
    
    world.renderPerspective();
    
    for ( var t = 0; t < App.updateBeforeDraw.length;t++){
    
       App.updateBeforeDraw[t].UPDATE()
    
    }
    
    
    while (looper <= world.contentList.length-1) {
        if ("triangle" == world.contentList[looper].type) {
            world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
            world.drawTriangle(world.contentList[looper]);
            world.animate(world.contentList[looper]);
        }
        if ("square" == world.contentList[looper].type) {
            world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
            world.drawSquare(world.contentList[looper]);
            world.animate(world.contentList[looper]);
        }
        if ("cube" == world.contentList[looper].type || "cubeTex" == world.contentList[looper].type || "cubeLightTex" == world.contentList[looper].type) {
            world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
            world.drawCube(world.contentList[looper]);
            world.animate(world.contentList[looper]);
        }
        if ("pyramid" == world.contentList[looper].type) {
            world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
            world.drawPyramid(world.contentList[looper]);
            world.animate(world.contentList[looper]);
        }
        
        if ("obj" == world.contentList[looper].type) {
            world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
            world.drawObj(world.contentList[looper]);
            world.animate(world.contentList[looper]);
        }
        
        if ("squareTex" == world.contentList[looper].type) {
            world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
            world.drawSquareTex(world.contentList[looper]);
            world.animate(world.contentList[looper]);
        }
        
        looper = looper + 1;
    }
    
    
    updateFPS(1);
    
}


App.operation.CameraPerspective = function() {
    this.GL.gl.viewport(0, 0, wd, ht);
    this.GL.gl.clear(this.GL.gl.COLOR_BUFFER_BIT | this.GL.gl.DEPTH_BUFFER_BIT);
    
   // mat4.identity( world.mvMatrix )
  //  mat4.translate(world.mvMatrix  , world.mvMatrix, [ 10 , 10 , 10] );
    
    
    /* Field of view, Width height ratio, min distance of viewpoint, max distance of viewpoint, */
    mat4.perspective(this.pMatrix, degToRad( App.camera.viewAngle ), (this.GL.gl.viewportWidth / this.GL.gl.viewportHeight), App.camera.nearViewpoint , App.camera.farViewpoint );
};


var callReDraw_ = function() {
    
    requestAnimationFrame(reDraw)
    
};


