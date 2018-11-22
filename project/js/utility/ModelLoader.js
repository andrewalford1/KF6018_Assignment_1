
/**
 * Utility class used to load glTF models into the scene.
 */
class ModelLoader
{
    /**
     * Loads a model.
     * @param {string} modelFolder - This is the name of the folder where the model can be found.
     *                               (Assumes model is located in 'res/models/').
     * @param {string} modelFile - This is the name of the model to be loaded 
     *                             (must include the '.gltf' extension).
     */
    constructor(modelFolder, modelFile)
    {
        //[model] Will br used to contain the model.
        let model = new THREE.Object3D();
        
        //Load the glTF model

        new THREE.GLTFLoader()
        .setPath('res/models/' + modelFolder + '/')
        .load
        (
            //model URL
            modelFile,
            //Called when the resource is loaded
            function (gltf) 
            {
                //Add the model to the pre-defined object.
                model.add(gltf.scene);
            },
            //Called while loading is progressing
            function (xhr) 
            {
                console.log(( xhr.loaded / xhr.total * 100 ) + '% loaded');
            },
            //Called if errors occur when loading the model.
            function (error) 
            {
                console.log('An error has occured when loading model: ' + modelFile);
            }
        );

        /**
         * @return Returns a THREE.Object3D object of the model for use in your program.
         */
        this.getModelInstance = function()
        {
            return model;
        }
    }
}