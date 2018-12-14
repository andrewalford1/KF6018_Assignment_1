/**
 * Abstract class representing an updatable object.
 * @extends AssignmentObject
 */
class UpdateableObject extends AssignmentObject
{
    /**
     * Create an updateable object.
     * @param {Vector3} initialPosition - The initial position of the planet.
     */
    constructor(initialPosition)
    {
        //Construct the superclass.
        super(initialPosition);

        //Define this class as abstract.
        if (this.constructor === UpdateableObject) 
        {
            throw new Error("Can't instantiate abstract class!");
        }

        //[m_active] If true then the object is currently active.
        let m_active = false;

        //PUBLIC METHODS...
        
        /**
         * @return Tells you if this object is active or not.
         */
        this.isActive = function()
        {
            return this.m_active;
        }        

        /**
         * Set whether or not the object is active.
         * @param {boolean} active - If true then the object will become active.
         */
        this.setActive = function(active)
        {
            this.m_active = active;
        }

        /**
         * Abstract method to be implemented in the subclass.
         * Will update the inheriting object.
         * @param {number} frameTimeMs - The time in milliseconds it took to compute the previous rendered frame.
         */
        this.update = function(frameTimeMs)
        {
            throw new Error('You have to implement the method Update(frameTimeMs).');
        }
    }


}