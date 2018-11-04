/**
 * Class representing an object that can orbit any other AssignmentObject.
 * @extends AssignmentObject
 */
class OrbitingObject extends AssignmentObject
{
    constructor(initialPosition, orbitSpeed)
    {
        //Construct the superclass.
        super(initialPosition);

        //[m_orbitSpeed] Member variable to determine how quickly this object will orbit other objects.
        var m_orbitSpeed = orbitSpeed;

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
          * Updates the planet.
          * @param {AssignmentObject} orbitingObject - This is the object that the planet is orbiting.
          * @param {number} increment - How far to increment the planet along it's orbiting path.
          */
        this.moveAlongOrbitingPath = function(orbitingObject, increment)
        {
            //Add in orbit speed.
            //[distanceBetweenObjects] Work out the distance between the planet and the object it is orbiting.
            var distanceBetweenObjects =  orbitingObject.getPosition().distanceTo(this.getPosition());

            //Calculate the new position of the planets orbit.
            this.setPosition(new THREE.Vector3(
                orbitingObject.getXPosition() + distanceBetweenObjects * Math.sin(Math.PI + (increment * m_orbitSpeed)),
                0,
                orbitingObject.getXPosition() + distanceBetweenObjects * Math.cos(Math.PI + (increment * m_orbitSpeed))
            ));
        }
    }
}