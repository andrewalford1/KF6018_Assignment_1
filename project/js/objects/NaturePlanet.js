/**
 * Class describing a nature planet which only has natural elements on the surface,
 * containing trees, lakes, and mountians. (This will be the second planet).
 * @extends Planet
 */
class NaturePlanet extends Planet
{
    /**
     * Create the nature planet.
     * @param {number} rotationSpeed - How quickly the planet rotates.
     * @param {Vector3} initialPosition - The initial position of the planet.
     * @param {number} orbitSpeed - How quickly the planet orbits around other objects.
     */
    constructor(rotationSpeed, initialPosition, orbitSpeed)
    {
        //Construct the superclass.
        super(2, 2, colours.GREEN, rotationSpeed, initialPosition, orbitSpeed);

        //Create pine trees....
        //Create the pine tree similar to any other object,
        //Set their position (relative to the planet).
        //then use the function below to add them to the planet.
        //this.addObjectToGroup(pineTree_A);
        //this.addObjectToGroup(pineTree_B);
        //this.addObjectToGroup(pineTree_C);

        //Create lake...

        //Create mountians...
    }
}