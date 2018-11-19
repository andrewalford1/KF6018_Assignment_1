/**
 * Class representing a sky box.
 * @extends UpdateableObject
 */
class SkyBox
{
    constructor(scene, path, textures)
    {
        var l = new THREE.CubeTextureLoader()
        l.setPath(path);
        l.load(
            textures,
            function(cubeTexture)
            {
                //Allocate the textures to the scene's background.
                scene.background = cubeTexture;
            }
        );
    }
}