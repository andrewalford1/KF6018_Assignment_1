/**
 * This class is the top of the heiriarchy for all 
 * objects created for the assignment.
 * @author Andrew Alford
 */
class AssignmentObject
{
    /**
     * Creates an assignment object.
     * @param {Vector3} initialPosition - This is the initial position
     *                                    of the assignment object.
     */
    constructor(initialPosition)
    {
        //Define this class as abstract.
        if (this.constructor === AssignmentObject) 
        {
            throw new Error('AssignmentObject: You cannot ' + 
                'instantiate abstract class!');
        }
        //ERROR CHECK PARAMETERS
        if(!(initialPosition instanceof THREE.Vector3))
        {
            throw new Error('AssignmentObject: initialPosition ' +
                'must be a Vector3.');
        }

        //[OBJECT] This is the object the class encases.
        const OBJECT = new THREE.Group();
        OBJECT.position.copy(initialPosition);

        //[m_inFocus] If true then the object is currently being focused on.
        let m_inFocus = false;

        /**
         * @Return Returns 'true' if the object is in focus. 
         *         (Otherwise 'false' is returned).
         */
        this.isInFocus = function()
        {
            return m_inFocus;
        }

        /**
         * Allows the object to be set in focus.
         * @param {boolean} inFocus - If true then the object will 
         *                            be focused on.
         */
        this.setInFocus = function(inFocus)
        {
            if(!(typeof inFocus === typeof true))
            {
                throw new Error('AssignmentObject: inFocus must be a ' +
                    'boolean value');
            }

            m_inFocus = inFocus;

            //Check if the object is in focus.
            if(m_inFocus)
            {
                //Display it's description.
                htmlAccessor.OBJECT_INFORMATION.style.visibility = 'visible';
                htmlAccessor.OBJECT_INFORMATION.textContent = this.getDescription();
            }
            else
            {
                //Hide the object's description if it is no longer in focus.
                htmlAccessor.OBJECT_INFORMATION.style.visibility = 'hidden';
            }

        }

        /**
         * Allows the visibility of the object to be set.
         * @param {boolean} visible - If true then the object will be visible.
         *                            (Otherwise invisible).
         */
        this.setVisibility = function(visible)
        {
            if(!(typeof visible === typeof true))
            {
                throw new Error('AssignmentObject: inFocus must be a ' +
                    'boolean value');
            }

            OBJECT.visible = visible;
        }

        /**
         * Allows the full position of the object to be set.
         * @param {THREE.Vector3} position - A vector3 containing the new
         *                                  'X', 'Y', and 'Z' coordinates 
         *                                   for the object.
         */
        this.setPosition = function(position)
        {
            if(!(position instanceof THREE.Vector3))
            {
                throw new Error('AssignmentObject: position ' +
                    'must be a Vector3.');
            }   
              
            OBJECT.position.copy(position);
        }

        /**
         * Allows the 'X' coordinate of the object to be set.
         * @param {number} x - This is the new 'X' coordinate for the object.
         */
        this.setXPosition = function(x)
        {
            if(!(typeof x === 'number'))
            {
                throw new Error('AssignmentObject: x ' +
                    'must be an integer.');
            }

            OBJECT.position.setX(x);
        }

        /**
         * Allows the 'Y' coordinate of the object to be set.
         * @param {number} y - This is the new 'Y' coordinate for the object.
         */
        this.setYPosition = function(y)
        {
            if(!(typeof y === 'number'))
            {
                throw new Error('AssignmentObject: y ' +
                    'must be an integer.');
            }

            OBJECT.position.setY(y);
        }

        /**
         * Allows the 'Z' coordinate of the object to be set.
         * @param {number} z - This is the new 'Z' coordinate for the object.
         */
        this.setZPosition = function(z)
        {
            if(!(typeof z === 'number'))
            {
                throw new Error('AssignmentObject: z ' +
                    'must be an integer.');
            }

            OBJECT.position.setZ(z);
        }

        /**
         * @return Returns the object's position as a Vector3.
         */
        this.getPosition = function()
        {
            return OBJECT.position;
        }

        /**
         * @return Returns the object's 'X' coordinate.
         */
        this.getXPosition = function()
        {
            return OBJECT.position.x;
        }

        /**
         * @return Returns the object's 'Y' coordinate.
         */
        this.getYPosition = function()
        {
            return OBJECT.position.y;
        }

        /**
         * @return Returns the object's 'Z' coordinate.
         */
        this.getZPosition = function()
        {
            return OBJECT.position.z;
        }

        /**
         * Allows the object to be scaled.
         * @param {THREE.Vector3} scale - How much to scale the object by.
         */
        this.setScale = function(scale)
        {
            if(!(scale instanceof THREE.Vector3))
            {
                throw new Error('AssignmentObject: scale ' +
                    'must be a Vector3.');
            } 

            OBJECT.scale.copy(scale);
        }

        /**
         * @return Returns the scale of the object.
         */
        this.getScale = function()
        {
            return OBJECT.scale;
        }

        /**
         * Adds the object to a given scene.
         * @param {THREE.Scene} scene - This is the scene to add the object to.
         */
        this.addToScene = function(scene)
        {
            if(!(scene instanceof THREE.Scene))
            {
                throw new Error('AssignmentObject: scene must be a ' +
                    'type of THREE.Scene.');
            }

            scene.add(OBJECT);
        }

        /**
         * Allows another object to be added to the main object.
         * @param {THREE.Object3D} object - This is the other object
         *                                  to be added to the main object. 
         */
        this.addObjectToGroup = function(object)
        {
            if(!(object instanceof THREE.Object3D))
            {
                throw new Error('AssignmentObject: object must be a ' +
                    'type of THREE.Object3D');
            }

            OBJECT.add(object);
        }

        /**
         * @return Returns the main object.
         */
        this.getObject = function()
        {
            return OBJECT;
        }
    }
}