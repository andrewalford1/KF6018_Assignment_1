/**
 * Class representing a sky box.
 * @extends UpdateableObject
 */
class SkyBox
{
    constructor(scene, path, textures)
    {
        if(!Array.isArray(textures) || textures.length != 6)
        {
            //Throw an error if the user has not submitted an
            //appropritatly sized array.
            throw new Error('An array of six textures must be given for the skybox.');
        }
        else
        {
            //Load the skybox.
            new THREE.CubeTextureLoader()
            .setPath(path)
            .load(
                textures,
                function(cubeTexture)
                {
                    //Allocate the textures to the scene's background.
                    scene.background = cubeTexture;
                },
                //Display download progress.
                function(xhr)
                {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                },
                //Display any download errors.
                function(xhr)
                {
                    console.log('An error has occurred whilst loading: ' + textures);
                }
            );
        }
    }
}