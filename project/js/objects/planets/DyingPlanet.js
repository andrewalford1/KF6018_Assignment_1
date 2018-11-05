/**
 * Class describing a dying planet.
 * @extends Planet
 */
class DyingPlanet extends Planet
{
    /**
     * Create the dying planet.
     * @param {number} rotationSpeed - How quickly the planet rotates.
     * @param {Vector3} initialPosition - The initial position of the planet.
     * @param {number} orbitSpeed - How quickly the planet orbits around other objects.
     * @param {AssignmentObject} orbitingObject - This is the object that the planet is orbiting.
     * @param {number} fullOrbitMs - How long it takes the planet to fully orbit around the orbiting object.
     */
    constructor(rotationSpeed, initialPosition, orbitSpeed, orbitingObject, fullOrbitMs)
    {
        //Construct the superclass.
        super(10, 2, colours.BROWN, rotationSpeed, initialPosition, orbitSpeed, orbitingObject, fullOrbitMs);
    }
}