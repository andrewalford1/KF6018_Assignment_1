/**
 * Class representing a planet.
 * @extends AssignmentObject
 */
class Planet extends OrbitingObject
{
    /**
     * Create a planet.
     * @param {number} radius - The radius of the planet.
     * @param {number} smoothness - How smooth the surface of the planet will be.
     * @param {colour} colour - The colour that the planet will be.
     * @param {number} rotationSpeed - How quickly the planet rotates.
     * @param {Vector3} initialPosition - The initial position of the planet.
     * @param {number} orbitSpeed - How quickly the planet orbits around other objects.
     * @param {AssignmentObject} orbitingObject - This is the object that the planet is orbiting.
     * @param {number} fullOrbitMs - How long it takes the planet to fully orbit around the orbiting object.
     * @param {string} objectDescription - A description of the object.
     * @param {boolean} orbitsClockwise - If true then the object orbits the other object clockwise.
     */
    constructor(radius, smoothness, colour, rotationSpeed, initialPosition, orbitSpeed, orbitingObject, fullOrbitMs, objectDescription, orbitsClockwise)
    {
        //Construct the superclass.
        super(initialPosition, orbitSpeed, orbitingObject, fullOrbitMs, objectDescription, orbitsClockwise);

        //Define this class as abstract.
        if (this.constructor === Planet) 
        {
            throw new Error("Can't instantiate abstract class!");
        }

        //Create the planet's surface.
        const PLANET_GEOMETRY = new THREE.OctahedronGeometry(radius, smoothness);
        const PLANET_MATERIAL = new THREE.MeshStandardMaterial(
            {color: colour, flatShading: THREE.FlatShading, metalness: 0, roughness: 1}
        );
        const PLANET_SURFACE = new THREE.Mesh(PLANET_GEOMETRY, PLANET_MATERIAL);

        //Set up shadows for the planet's surface.
        //Define shadow traits.
        PLANET_SURFACE.castShadow = true;
        PLANET_SURFACE.receiveShadow = true;

        //Create the planet's pole.
        const POLE_GEOMETRY = new THREE.CylinderGeometry( 0.1, 0.1, (radius * 2.5), 4 );
        const POLE_MESH = new THREE.MeshStandardMaterial( 
            {color: colours.WHITE, flatShading: THREE.FlatShading, metalness: 0, roughness: 1} 
        );
        const POLE = new THREE.Mesh(POLE_GEOMETRY, POLE_MESH);
        POLE.visible = false;

        //Add the planet to the object group.
        this.addObjectToGroup(PLANET_SURFACE);
        this.addObjectToGroup(POLE);

        //PUBLIC METHODS...

         /**
          * Sets the visibility of the planet's pole.
          * @param {boolean} visible - If true then the planer's pole will be visible,
          *                            otherwise the pole will be invisible.
          */
        this.showPole = function(visible)
        {
            POLE.visible = visible;
        }

         /**
          * Updates the planet.
         * @param {number} frameTimeMs - The time in milliseconds it took to compute the previous rendered frame.
         */
        this.update = function(frameTimeMs)
        {
            //Check if the planet is active.
            if(this.isActive())
            {
                //Check which direction the planet is moving in, then spin the planet on it's axis.
                if(this.getOrbitsClockwise())
                {
                     this.getObject().rotation.y += rotationSpeed;
                }                
                else
                {
                     this.getObject().rotation.y -= rotationSpeed;
                }

                //Move the planet along it's orbiting path.
                this.moveAlongOrbitingPath(frameTimeMs); 
            }
        }
    }
}


