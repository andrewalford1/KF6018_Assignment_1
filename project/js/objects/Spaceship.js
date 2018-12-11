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
    constructor(initialPosition, orbitSpeed, orbitingObject, fullOrbitMs, orbitsClockwise)
    {
        //Construct the superclass.
        super(initialPosition, orbitSpeed, orbitingObject, fullOrbitMs, orbitsClockwise);

        //CREATE SPACESHIP COMPONENTS...
        const BASE = new THREE.Mesh(
            new THREE.CylinderGeometry(5, 10, 2, 32),
            new THREE.MeshStandardMaterial({
                color: colours.SILVER,
                flatShading: THREE.FlatShading,
                metalness: 1,
                roughness: 1
            })
        );

        const DOME = new THREE.Mesh(
            new THREE.SphereGeometry(5, 32, 32),
            new THREE.MeshPhysicalMaterial({
                color: colours.LIGHT_BLUE,
                flatShading: THREE.FlatShading,
                metalness: 0,
                roughness: 0.5,
                reflectivity: 1,
                transparent: true,
                opacity: 0.5,
                side: THREE.DoubleSide
            })
        );

        //ADD COMPONENTS TO THE GROUP...
        this.addObjectToGroup(BASE);
        this.addObjectToGroup(DOME); 

        ///PUBLIC METHODS...

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
            }
        }       
    }
}