/**
 * Class representing a star.
 * @extends UpdateableObject
 */
class Star extends UpdateableObject
{
    /**
     * Create a star.
     * @param {number} radius - The radius of the planet.
     * @param {number} smoothness - How smooth the surface of the planet will be.
     * @param {number} rotationSpeed - How quickly the planet rotates.
     * @param {Vector3} initialPosition - The initial position of the planet.
     */
    constructor(radius, smoothness, rotationSpeed, initialPosition)
    {
        //Construct the superclass.
        super(initialPosition);

        //Create the planet's surface.
        const M_GEOMETRY = new THREE.OctahedronGeometry(radius, smoothness);
        const M_MATERIAL = new THREE.MeshStandardMaterial( {color: colours.YELLOW, flatShading: THREE.FlatShading, metalness: 0, roughness: 1} );
        const SUN = new THREE.Mesh(M_GEOMETRY, M_MATERIAL);

        //Set up shadows for the planet's surface.
        //Define shadow traits.
        SUN.castShadow = false;
        SUN.receiveShadow = false;

        this.addObjectToGroup(SUN);

        //PUBLIC METHODS...

        /**
         * Implementation of abstract method in superclass UpdateableObject.
         * Updates the star.
         * @param {number} frameTimeMs - The time in milliseconds it took to compute the previous rendered frame.
         */
        this.update = function(frameTimeMs)
        {
            //Check if the star is active.
            if(this.isActive())
            {
                SUN.rotation.y += rotationSpeed;
            }
        }
    }
}