/**
 * Class representing a star.
 * @extends AssignmentObject
 */
class Star extends AssignmentObject
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
        const sun = new THREE.Mesh(M_GEOMETRY, M_MATERIAL);

        //Set up shadows for the planet's surface.
        //Define shadow traits.
        sun.castShadow = false;
        sun.receiveShadow = false;

        this.addObjectToGroup(sun);
    }
}