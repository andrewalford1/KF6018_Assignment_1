
/**
 * Utility class used to load OBJ models into the scene.
 * @author Andrew Alford (w16006135)
 */
class ModelLoader
{
    /**
     * Constructor for the model loader.
     * @param {string} filePath - This is the file path to the location where 
     *                            models are stored.
     */
    constructor(filePath)
    {
        //INITIALISE MEMBER VARIABLES...

        //[M_LOADER] This is the tool used to load models.
        const M_LOADER = new THREE.OBJLoader();
        M_LOADER.setPath(filePath);
        //[M_MAT_LOADER] This is the tool used to load materials.
        const M_MAT_LOADER = new THREE.MTLLoader();
        M_MAT_LOADER.setPath(filePath);
        
        //PUBLIC METHODS...

        /**
         * Loads OBJ models.
         * @param {string} fileName - This is the name of the file to be loaded.
         */
        this.load = function(fileName)
        {
            //[model] Will hold the model being loaded.
            var model = new THREE.Object3D();

            //Load the material.
            M_MAT_LOADER.load
            (
                fileName + '/' + fileName + '.mtl',
                //Called when the material has loaded.
                function(materials)
                {
                    //Preload the materials and pass them to the object loader.
                    materials.preload();
                    M_LOADER.setMaterials(materials);
                },
                //Called while loading is in progress.
                function (xhr) 
                {
                    console.log(fileName + ' materials: ' + ( xhr.loaded / xhr.total * 100 ) + '% loaded');
                },
                //Called if errors occur when loading the model.
                function (error) 
                {
                    console.log('An error has occured when loading model: ' + fileName + ' materials.');
                }
            );

            //Load the model.
            M_LOADER.load(
                fileName + '/' + fileName + '.obj',
                //Called when the model has loaded.
                function(object)
                {
                    model.add(object);
                },
                //Called while loading is in progress.
                function (xhr) 
                {
                    console.log(fileName + ' model: ' + ( xhr.loaded / xhr.total * 100 ) + '% loaded');
                },
                //Called if errors occur when loading the model.
                function (error) 
                {
                    console.log('An error has occured when loading model: ' + fileName + ' model.');
                }
            );

            return model;
        }
    }
}