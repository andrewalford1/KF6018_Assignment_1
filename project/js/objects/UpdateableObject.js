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

        /**
         * Abstract method to be implemented in the subclass.
         * Will update the inheriting object.
         * @param {number} frameTimeMs - The time in milliseconds it took to compute the previous rendered frame.
         */
        this.update = function(frameTimeMs)
        {
            throw new Error("You have to implement the method Update(frameTimeMs).");
        }
    }


}