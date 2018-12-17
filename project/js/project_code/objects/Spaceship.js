class Spaceship extends OrbitingObject
{
    /**
     * Create an orbiting object.
     * @param {Vector3} initialPosition - The initial position of the planet.
     * @param {number} orbitSpeed - How quickly the planet orbits around other objects.
     * @param {AssignmentObject} orbitingObject - This is the object that the planet is orbiting.
     * @param {number} fullOrbitMs - How long it takes the planet to fully orbit around the orbiting object.
     * @param {boolean} orbitsClockwise - If true then the object orbits the other object clockwise.
     */
    constructor(initialPosition, orbitSpeed, orbitingObject, fullOrbitMs, orbitsClockwise, model, model2)
    {
        //Construct the superclass.
        super(initialPosition, orbitSpeed, orbitingObject, fullOrbitMs, orbitsClockwise);

        //Set the name for this planet.
        this.getObject().name = 'Space Plane';

        let PLANE = new THREE.Group();
        PLANE.add(model);
        model2.position.set(0, 0, -6);
        model2.scale.set(1.5, 1.5, 1.5);
        PLANE.add(model2);

        //Add the planet's base model.
        this.addObjectToGroup(PLANE); 

        ///PUBLIC METHODS...

        let iFrame = 0;

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
                model2.rotation.z = iFrame / 50;
                iFrame++;
            }
        }       
    }
}