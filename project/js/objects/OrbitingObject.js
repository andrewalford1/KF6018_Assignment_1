/**
 * Class representing an object that can orbit any other AssignmentObject.
 * @extends UpdateableObject
 */
class OrbitingObject extends UpdateableObject
{
    /**
     * Create an orbiting object.
     * @param {Vector3} initialPosition - The initial position of the planet.
     * @param {number} orbitSpeed - How quickly the planet orbits around other objects.
     * @param {AssignmentObject} orbitingObject - This is the object that the planet is orbiting.
     * @param {number} fullOrbitMs - How long it takes the planet to fully orbit around the orbiting object.
     */
    constructor(initialPosition, orbitSpeed, orbitingObject, fullOrbitMs)
    {
        //Construct the superclass.
        super(initialPosition);

        //Define this class as abstract.
        if (this.constructor === OrbitingObject) 
        {
            throw new Error("Can't instantiate abstract class!");
        }

        //[m_orbitSpeed] Member variable to determine how quickly this object will orbit other objects.
        let m_orbitSpeed = orbitSpeed;

        //[m_fullOrbitMs] Member variable to determine how long it takes the object to do a full 
        //cycle around the object it is orbiting (milliseconds).
        let m_fullOrbitMs = fullOrbitMs;

        //[m_elaspedTimeMs] Member variable to track how long an object is along it's orbit cycle (milliseconds).
        let m_elaspedTimeMs = 0;

        //[M_DISTANCE_TO_ORBITING_OBJECT] Member variable to determine the distance between this object
        //and the object that it is rendering.
        const M_DISTANCE_TO_ORBITING_OBJECT = Math.round(orbitingObject.getPosition().distanceTo(this.getPosition()));

        /**
         * Allows the orbit speed to be set.
         * @param {number} orbitSpeed - This is the new orbit speed for the object.
         */
        this.setOrbitSpeed = function(orbitSpeed)
        {
            m_orbitSpeed = orbitSpeed;
        }

        /**
         * @return Returns the orbiting speed of the object.
         */
        this.getOrbitSpeed = function()
        {
            return m_orbitSpeed;
        }

         /**
          * Moves the object along it's orbiting path.
          * @param {number} frameTimeMs - The time in milliseconds it took to compute the previous rendered frame.
          */
        this.moveAlongOrbitingPath = function(frameTimeMs)
        {
            //Increment the elasped time.
            m_elaspedTimeMs += frameTimeMs;

            //Check if a full orbit has occured.
            if(m_elaspedTimeMs > m_fullOrbitMs)
            {
                m_elaspedTimeMs = 0;
            }

            //[increment] How far to increment the planet along it's orbiting path.
            let increment = (Math.PI * 2) / (m_fullOrbitMs / m_elaspedTimeMs);
            
            this.setPosition(new THREE.Vector3(
                orbitingObject.getXPosition() + M_DISTANCE_TO_ORBITING_OBJECT * Math.sin(increment),
                0,
                orbitingObject.getZPosition() + M_DISTANCE_TO_ORBITING_OBJECT * Math.cos(increment)
            ));
        }
    }
}