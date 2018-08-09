/**
 * @author Nikola Lukic
 * @Description webGl2 api example
 * @Example Loading obj file
 */

// LOAD MESH FROM OBJ FILES...
// if you dont use obj or complex mesh you no need for this func

function onLoadObj(meshes) {

    App.meshes = meshes;
    OBJ.initMeshBuffers(world.GL.gl, App.meshes.church);

    do {
        console.log("...");
    } while (!App.meshes.church.textureBuffer)

    do {
        console.log("...");
    } while (typeof App.meshes.church.indexBuffer === 'undefined')

    var textuteImageSamplers2 = {
        source: ["res/images/texture_metalic1.jpg"],
        mix_operation: "multiply", // ENUM : multiply , divide ,
    };

    setTimeout(function () {

        world.Add("obj", 1, "objectFileChurch", textuteImageSamplers2, App.meshes.church);

    }, 2000)

}
OBJ.downloadMeshes({
    'church': 'res/3d-objects/monkey.obj'
}, onLoadObj);

var textuteImageSamplers = {
    source: ["res/images/complex_texture_1/diffuse.png"],
    mix_operation: "multiply", // ENUM : multiply , divide ,
};
