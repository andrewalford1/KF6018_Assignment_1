class Star extends AssignmentObject
{
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