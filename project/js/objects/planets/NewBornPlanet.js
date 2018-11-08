/**
 * Class describing a new born planet.
 * @extends Planet
 */
class NewBornPlanet extends Planet
{
    /**
     * Create the new born planet.
     * @param {number} rotationSpeed - How quickly the planet rotates.
     * @param {Vector3} initialPosition - The initial position of the planet.
     * @param {number} orbitSpeed - How quickly the planet orbits around other objects.
     * @param {AssignmentObject} orbitingObject - This is the object that the planet is orbiting.
     * @param {number} fullOrbitMs - How long it takes the planet to fully orbit around the orbiting object.
     * @param {boolean} orbitsClockwise - If true then the object orbits the other object clockwise.
     */
    constructor(rotationSpeed, initialPosition, orbitSpeed, orbitingObject, fullOrbitMs, orbitsClockwise)
    {
        //Construct the superclass.
        super(3, 2, colours.BLUE, rotationSpeed, initialPosition, orbitSpeed, orbitingObject, fullOrbitMs,
        "Description of the new born planet.", orbitsClockwise);
    }
}
