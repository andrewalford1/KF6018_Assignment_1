/**
 * Utility class used to load textures into the scene.
 * @author Andrew Alford
 */
class TextureLoader
{
    /**
     * Constructor for the Texture Loader.
     * @param {string} filePath - This is the file path to the location where
     *                            textures are stored.
     */
    constructor(filePath)
    {
        //INITIALISE MEMBER VARIABLES...

        //[M_SKYBOX_LOADER] Loader to load a skybox into the world.
        const M_SKYBOX_LOADER = new THREE.CubeTextureLoader();
        M_SKYBOX_LOADER.setPath(filePath);

        //PUBLIC METHODS...

        /**
         * Loads a skybox for the scene.
         * @param {string} fileName - This is the name of the file to be loaded.
         * @param {string} fileType - This is the type of file to be loaded (i.e. .jpg/.png/etc.).
         * @param {THREE.Scene} scene - This is the scene that will use the skybox.
         */
        this.loadSkybox = function(fileName, fileType, scene)
        {
            //[textures] Holds the file locations of the textures
            //to be loaded.
            let textures = 
            [
                fileName + '/' + fileName + '_px' + fileType,
                fileName + '/' + fileName + '_nx' + fileType,
                fileName + '/' + fileName + '_py' + fileType,
                fileName + '/' + fileName + '_ny' + fileType,
                fileName + '/' + fileName + '_pz' + fileType,
                fileName + '/' + fileName + '_nz' + fileType
            ];

            //Load the skybox.
            M_SKYBOX_LOADER.load(
                textures,
                function(cubeTexture)
                {
                    //Add the skybox to the scene.
                    scene.background = cubeTexture;
                },
                //Called while loading is in progress.
                function (xhr) 
                {
                    console.log(fileName + ' texture: ' + ( xhr.loaded / xhr.total * 100 ) + '% loaded');
                },
                //Called if errors occur when loading the model.
                function (error) 
                {
                    console.log('An error has occured when loading model: ' + fileName + ' texture.');
                }
            );
        }
    }
}