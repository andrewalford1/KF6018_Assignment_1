/**
 * A class to manage all the objects in the project.
 * @author Andrew Alford
 */
class ObjectManager
{
    /**
     * Constructor for the object declarator.
     */
    constructor()
    {
        //INITIALISE MEMBER VARIABLES...

        //[m_updateableObjects] An array to hold all the objects declared.
        let m_updateableObjects = [];

        //PUBLIC METHODS...
        
        /**
         * Adds an object to the list of objects in the project.
         * @param {UpdateableObject} object - This is the object to be added.
         */
        this.addObject = function(object)
        {
            if(object instanceof UpdateableObject)
            {
                //Add the object to the array.
                m_updateableObjects.push(object); 

                //Return the location of that object in the array.
                return m_updateableObjects.length - 1;  
            }
            else
            {
                //Throw an error.
                throw new Error('ObjectDeclarator: All objects being managed ' +
                    'must be of type UpdateableObject');
            }
        }

        /**
         * Retrieves an object from the list of objects.
         * @param {number} objectPointer - A pointer to the objects location 
         *                                 in the array.
         */
        this.getObject = function(objectPointer)
        {
            if(typeof objectPointer === 'number' || Number.isInteger(objectPointer))
            {
                return m_updateableObjects[objectPointer]; 
            }
            else
            {
                throw new Error('ObjectDeclarator: the given object pointer ' +
                    'must be an integer.');
            }
        }

        /**
         * Sets all the objects active/inactive.
         * @param {boolean} active - If 'true' then all the
         *                           objects will become active.
         */
        this.setAllActive = function(active)
        {
            //Error check the parameters.
            if(!(typeof active === typeof true))
            {
                throw new Error('ObjectDeclarator: active must ' + 
                    'be a boolean value.');
            }
            else
            {
                //Loop through all objects.
                for(let i = 0; i < m_updateableObjects.length; i++)
                {
                    m_updateableObjects[i].setActive(active);
                }
            }
        }

        /**
         * Sets a specific object active/inactive.
         * @param {number} objectPointer - 
         * @param {boolean} active - If 'true' then the object will 
         *                           become active.
         */
        this.setActive = function(objectPointer, active)
        {
            //Error check the parameters.
            if(!(typeof objectPointer === 'number' || Number.isInteger(objectPointer)))
            {
                throw new Error('ObjectDeclarator: the given object pointer ' +
                    'must be an integer.');
            }
            else if(!(typeof active === typeof true))
            {
                throw new Error('ObjectDeclarator: active must ' + 
                    'be a boolean value.');
            }
            else
            {
                //Set the object active/inactive.
                m_updateableObjects[objectPointer].setActive(true);
            }
        }

        /**
         * Adds all the objects to a given scene.
         * @param {THREE.Scene} scene - This is the scene to add all
         *                              of the objects to.
         */
        this.addAllToScene = function(scene)
        {
            if(!(scene instanceof THREE.Scene))
            {
                throw new Error('ObjectDeclarator: scene must be a ' +
                    'type of THREE.Scene.');
            }
            else
            {
                //Loop through all objects and add them to the scene.
                for(let i = 0; i < m_updateableObjects.length; i++)
                {
                    m_updateableObjects[i].addToScene(scene);
                }
            }
        }

        /**
         * Updates all of the objects.
         * @param {number} frameTimeMs - The time in milliseconds it took to
         *                               compute the previous rendered frame.
         */
        this.updateAllObjects = function(frameTimeMs)
        {
            //Error check parameters.
            if(!(typeof frameTimeMs === 'number' 
                || Number.isInteger(frameTimeMs)))
            {
                throw new Error('ObjectDeclarator: frameTimeMs must ' + 
                    'be a number.');
            }
            else
            {
                //Loop through all the objects and update them.
                for(let i = 0; i < m_updateableObjects.length; i++)
                {
                    m_updateableObjects[i].update(frameTimeMs);
                }
            }
        }
    }
}
