/**
 * Class representing a spaceship.
 * @extends OrbitingObject
 * @author Andrew Alford (w16006135)
 */
class Spaceship extends OrbitingObject
{
    /**
     * Create an orbiting object.
     * @param {Vector3} initialPosition - The initial position of the planet.
     * @param {number} orbitSpeed - How quickly the planet orbits around other objects.
     * @param {AssignmentObject} orbitingObject - This is the object that the planet is orbiting.
     * @param {number} fullOrbitMs - How long it takes the planet to fully orbit around the orbiting object.
     * @param {boolean} orbitsClockwise - If true then the object orbits the other object clockwise.
     * @param {ModelLoader} modelLoader - Used to load the models used by the spaceship.
     */
    constructor(initialPosition, orbitSpeed, orbitingObject, fullOrbitMs, orbitsClockwise, modelLoader)
    {
        //Construct the superclass.
        super(initialPosition, orbitSpeed, orbitingObject, fullOrbitMs, orbitsClockwise);

        //Set the name for this planet.
        this.getObject().name = 'Space Plane';

        //[SPACE_PLANE] This is the model for the spaceship.
        let SPACE_PLANE = new THREE.Group();
        SPACE_PLANE.add(MODEL_LOADER.loadTexturedModel('plane'));

        //[propellers] These are the propellers of the plane.
        let propellers = MODEL_LOADER.loadModel(
            'propellers',
            new THREE.MeshStandardMaterial({
                color: colours.GREY, 
                flatShading: THREE.FlatShading, 
                metalness: 0, 
                roughness: 1
            })
        );

        //Position the propellers.
        propellers.position.set(0, 0, -6);
        propellers.scale.set(1.5, 1.5, 1.5);
        //[PROPELLER_SPEED] how fast the propellers spin.
        let PROPELLER_SPEED = 10;

        //Add the propellers to the ship.
        SPACE_PLANE.add(propellers);

        //Add the ship's model.
        this.addObjectToGroup(SPACE_PLANE); 

        ///PUBLIC METHODS...

        //[updateCounter] Counts the number of times this object has been updated.
        let updateCounter = 0;

        /**
         * Updates the asteroid. (Overridden from the superclass).
         * @param {number} frameTimeMs - The time in milliseconds it took to compute the previous rendered frame.
         */
        this.update = function(frameTimeMs)
        {
            //Check if the object is active.
            if(this.isActive())
            {
                //Move the asteroid along it's orbiting path.
                this.moveAlongOrbitingPath(frameTimeMs);
                propellers.rotation.z = updateCounter / PROPELLER_SPEED;
                updateCounter++;
            }
        }       
    }
}