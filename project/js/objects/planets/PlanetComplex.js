/**
 * Class representing a more complex planet that does not follow expected geometry.
 * @extends OrbitingObject
 */
class PlanetComplex extends OrbitingObject
{
    /**
     * Create a planet.
     * @param {number} rotationSpeed - How quickly the planet rotates.
     * @param {Vector3} initialPosition - The initial position of the planet.
     * @param {number} orbitSpeed - How quickly the planet orbits around other objects.
     * @param {AssignmentObject} orbitingObject - This is the object that the planet is orbiting.
     * @param {number} fullOrbitMs - How long it takes the planet to fully orbit around the orbiting object.
     * @param {string} objectDescription - A description of the object.
     * @param {boolean} orbitsClockwise - If true then the object orbits the other object clockwise.
     */
    constructor(baseModel, rotationSpeed, initialPosition, orbitSpeed, orbitingObject, fullOrbitMs, objectDescription, orbitsClockwise)
    {
        //Construct the superclass.
        super(initialPosition, orbitSpeed, orbitingObject, fullOrbitMs, objectDescription, orbitsClockwise);

        //Define this class as abstract.
        if (this.constructor === Planet) 
        {
            throw new Error("Can't instantiate abstract class!");
        }

        //Add the planet to the object group.
        this.addObjectToGroup(baseModel);

        //PUBLIC METHODS...

         /**
          * Updates the planet.
         * @param {number} frameTimeMs - The time in milliseconds it took to compute the previous rendered frame.
         */
        this.update = function(frameTimeMs)
        {
            //Check if the planet is active.
            if(this.isActive())
            {
                //Check which direction the planet is moving in, then spin the planet on it's axis.
                if(this.getOrbitsClockwise())
                {
                     this.getObject().rotation.y += rotationSpeed;
                }                
                else
                {
                     this.getObject().rotation.y -= rotationSpeed;
                }

                //Move the planet along it's orbiting path.
                this.moveAlongOrbitingPath(frameTimeMs); 
            }
        }
    }
}


