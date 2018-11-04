/**
 * Class representing an object that can orbit any other AssignmentObject.
 * @extends AssignmentObject
 */
class OrbitingObject extends AssignmentObject
{
    constructor(initialPosition, orbitSpeed, orbitingObject)
    {
        //Construct the superclass.
        super(initialPosition);

        //[m_orbitSpeed] Member variable to determine how quickly this object will orbit other objects.
        var m_orbitSpeed = orbitSpeed;

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
          * @param {number} increment - How far to increment the object along it's orbiting path.
          */
        this.moveAlongOrbitingPath = function(increment)
        {
            //Calculate the new position of the planets orbit.
            this.setPosition(new THREE.Vector3(
                orbitingObject.getXPosition() + M_DISTANCE_TO_ORBITING_OBJECT * Math.sin(Math.PI + (increment * m_orbitSpeed)),
                0,
                orbitingObject.getZPosition() + M_DISTANCE_TO_ORBITING_OBJECT * Math.cos(Math.PI + (increment * m_orbitSpeed))
            ));
        }
    }
}