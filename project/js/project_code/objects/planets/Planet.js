/**
 * Class representing a planet.
 * @extends OrbitingObject
 */
class Planet extends OrbitingObject
{
    /**
     * Create a planet.
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
        super(initialPosition, orbitSpeed, orbitingObject, fullOrbitMs, orbitsClockwise);

        //Define this class as abstract.
        if (this.constructor === Planet) 
        {
            throw new Error("Can't instantiate abstract class!");
        }

        //PUBLIC METHODS...

        /**
         * Creates a simple spherical base planet wich can then be added on
         * to create more complex planets.
         * @param {number} radius - The radius of the planet.
         * @param {number} smoothness - How smooth the surface of the planet will be.
         * @param {colour} colour - The colour that the planet will be.
         * @return Returns a THREE.Mesh of the planet base.
         */
        this.createGenericPlanetBase = function(radius, smoothness, colour)
        {
            //Create the planet's surface.
            let geometry = new THREE.OctahedronGeometry(radius, smoothness);
            let material = new THREE.MeshStandardMaterial(
                {color: colour, flatShading: THREE.FlatShading, metalness: 0, roughness: 1}
            );
            let planetBase = new THREE.Mesh(geometry, material);

            //Set up shadows for the planet's surface.
            //Define shadow traits.
            planetBase.castShadow = true;
            planetBase.receiveShadow = true;

            return planetBase;
        }

        let particleEffects = [];

        this.addParticleEffect = function(effect)
        {
            this.addObjectToGroup(effect.getObject());
            effect.setActive(true);
            particleEffects.push(effect);
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

                //Update any particle effects if the planet has them (i.e. volcano erruptions).
                if(particleEffects.length != 0)
                {
                    for(let i = 0; i <  particleEffects.length; i++)
                    {
                        particleEffects[i].update(frameTimeMs);
                    }
                }

            }
        }
    }
}


