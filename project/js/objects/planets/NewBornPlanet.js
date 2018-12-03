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
        super(rotationSpeed, initialPosition, orbitSpeed, orbitingObject, fullOrbitMs, orbitsClockwise);

        //Set the name for this planet.
        this.getObject().name = 'New Born Planet';

        //Load the dying planet's model and add it to the group.
        this.addObjectToGroup(this.createGenericPlanetBase(3, 2, colours.BLUE));
    }
}
