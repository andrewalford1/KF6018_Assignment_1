
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
        //ERROR CHECK PARAMETERS...
        if(!(typeof filePath === 'string' || filePath instanceof String))
        {
            throw new Error('ModelLoader: The given file path must be a string.');
        }

        //INITIALISE MEMBER VARIABLES...

        //[M_LOADER] This is the tool used to load models.
        const M_LOADER = new THREE.OBJLoader();
        M_LOADER.setPath(filePath);
        //[M_MAT_LOADER] This is the tool used to load materials.
        const M_MAT_LOADER = new THREE.MTLLoader();
        M_MAT_LOADER.setPath(filePath);
        
        //PUBLIC METHODS...

        /**
         * Loads a model with a given texture 
         * (If texture is null then no texture will be applied).
         * @param {string} fileName - This is the file name of the
         *                            model to be loaded.
         * @param {THREE.Material} material - The material to be
         *                                    applied to the model.
         */
        this.loadModel = function(fileName, material)
        {
            //ERROR CHECKING PARAMETERS...
            if(!(typeof filePath === 'string' || filePath instanceof String))
            {
                throw new Error('ModelLoader: The given file name must ' +
                    'be a string.');
            }

            //[model] Will hold the model being loaded.
            let model = new THREE.Object3D();

            //Load the model.
            M_LOADER.load(
                fileName + '/' + fileName + '.obj',
                //Called when the model has loaded.
                function(object)
                {
                    //If a material has been given then add it to the model.
                    if(material instanceof THREE.Material)
                    {
                        object.traverse(function(child)
                        {
                            if(child instanceof THREE.Mesh)
                            {
                                child.material = material;
                            }
                        })
                    }
                    
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

        /**
         * Loads a textured OBJ model.
         * @param {string} fileName - This is the name of the file to be loaded.
         */
        this.loadTexturedModel = function(fileName)
        {
            //ERROR CHECKING PARAMETERS...
            if(!(typeof filePath === 'string' || filePath instanceof String))
            {
                throw new Error('ModelLoader: The given file name must ' +
                    'be a string.');
            }
            
            //[model] Will hold the model being loaded.
            let model = new THREE.Object3D();

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