/**
 * Class describing a dying planet.
 * @extends Planet
 */
class DyingPlanet extends PlanetComplex
{
    /**
     * Create the dying planet.
     * @param {number} rotationSpeed - How quickly the planet rotates.
     * @param {Vector3} initialPosition - The initial position of the planet.
     * @param {number} orbitSpeed - How quickly the planet orbits around other objects.
     * @param {AssignmentObject} orbitingObject - This is the object that the planet is orbiting.
     * @param {number} fullOrbitMs - How long it takes the planet to fully orbit around the orbiting object.
     * @param {boolean} orbitsClockwise - If true then the object orbits the other object clockwise.
     */
    constructor(model, rotationSpeed, initialPosition, orbitSpeed, orbitingObject, fullOrbitMs, orbitsClockwise)
    {
        //Construct the superclass.
        super(model, rotationSpeed, initialPosition, orbitSpeed, orbitingObject, fullOrbitMs,
        "Description of the dying planet.", orbitsClockwise);
    }
}