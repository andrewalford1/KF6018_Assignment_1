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
     * @param {boolean} orbitsClockwise - If true then the object orbits the other object clockwise.
     */
    constructor(initialPosition, orbitSpeed, orbitingObject, fullOrbitMs, orbitsClockwise)
    {
        //Construct the superclass.
        super(initialPosition);

        //Define this class as abstract.
        if (this.constructor === OrbitingObject) 
        {
            throw new Error('OrbitingObject: Cannot instantiate ' +
                'abstract class!');
        }

        //ERROR CHECK PARAMETERS
        if(!(typeof orbitSpeed === 'number'))
        {
            throw new Error('OrbitingObject: orbitSpeed must be a number.');
        }
        if(!(orbitingObject instanceof AssignmentObject 
            || orbitingObject == null))
        {
            throw new Error('OrbitingObject: This object can only orbit ' 
                + 'other AssignmentObjects');
        }
        if(!(typeof fullOrbitMs === 'number'))
        {
            throw new Error('OrbitingObject: fullOrbitMs must be a number.');
        }
        if(!(typeof orbitsClockwise === typeof true))
        {
            throw new Error('OrbitingObject: orbitsClockwise must be a ' +
                'boolean value');
        }

        //[orbitsClockwise] If true then the object orbits the other 
        //object clockwise.
        let m_orbitsClockwise = orbitsClockwise;

        //[m_orbitSpeed] Member variable to determine how quickly
        //this object will orbit other objects.
        let m_orbitSpeed = orbitSpeed;

        //[m_fullOrbitMs] Member variable to determine how long it 
        //takes the object to do a full cycle around the object 
        //it is orbiting (milliseconds).
        let m_fullOrbitMs = fullOrbitMs;

        //[m_elaspedTimeMs] Member variable to track how long an 
        //object is along it's orbit cycle (milliseconds).
        let m_elaspedTimeMs = 0;

        //[m_distanceToOrbitingObject] Member variable to determine 
        //the distance between this object and the object that it is rendering.
        let m_distanceToOrbitingObject;

        //[m_orbiting] Will only be true if this object  
        //is currently orbiting another object.
        let m_orbiting = false;

        //If an orbiting object has been given then calculate
        //the distance between this object and the object it orbits.
        if(orbitingObject != null)
        {
            m_distanceToOrbitingObject = Math.round(
                orbitingObject.getPosition().distanceTo(this.getPosition())
            );
            m_orbiting = true;
        }

        /**
         * @return Returns the orbiting speed of the object.
         */
        this.getOrbitSpeed = function()
        {
            return m_orbitSpeed;
        }

        /**
         * Allows the orbit speed to be set.
         * @param {number} orbitSpeed - This is the new orbit speed for the object.
         */
        this.setOrbitSpeed = function(orbitSpeed)
        {
            if(!(typeof orbitSpeed === 'number'))
            {
                throw new Error('OrbitingObject: orbitSpeed must be a number.');
            }

            m_orbitSpeed = orbitSpeed;
        }

        /**
         * @return Returns the direction that the object is orbiting in. 
         *         (Will return 'true' if clockwise - otherwise 'false' is returned).
         */
        this.getOrbitsClockwise = function()
        {
            return m_orbitsClockwise;
        }

        /**
         * Allows the orbiting direction of the object to be set.
         * @param {boolean} orbitsClockwise - If true then the object will start orbiting the
         *                                    other object clockwise.
         */
        this.setOrbitsClockwise = function(orbitsClockwise)
        {
            if(!(typeof orbitsClockwise === typeof true))
            {
                throw new Error('OrbitingObject: orbitsClockwise must be a ' +
                    'boolean value');
            }

            m_orbitsClockwise = orbitsClockwise;
        }

         /**
          * Moves the object along it's orbiting path.
          * @param {number} frameTimeMs - The time in milliseconds it took to compute the previous rendered frame.
          */
        this.moveAlongOrbitingPath = function(frameTimeMs)
        {
            if(!(typeof frameTimeMs === 'number' 
                || Number.isInteger(frameTimeMs)))
            {
                throw new Error('OrbitingObject: frameTimeMs must ' +
                    'be a number.');
            }

            //Only do the maths if this object is orbiting 
            //another object.
            if(m_orbiting)
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

                if(m_orbitsClockwise)
                {
                    increment *= -1;
                }

                this.setPosition(new THREE.Vector3(
                    orbitingObject.getXPosition() + m_distanceToOrbitingObject * Math.sin(increment),
                    0,
                    orbitingObject.getZPosition() + m_distanceToOrbitingObject * Math.cos(increment)
                ));
            }
        }
    }
}