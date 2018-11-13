/**
 * Class representing a sky box.
 * @extends UpdateableObject
 */
class SkyBox extends AssignmentObject
{
    /**
     * Create a SkyBox.
     * @param {string array} textures - An array containing the file locations of the
     *                                  textures to be used. must be in order:
     *                                  - RIGHT
     *                                  - LEFT
     *                                  - TOP
     *                                  - BOTTOM
     *                                  - FRONT
     *                                  - BACK
     * @param {number} size - The size of the skybox.
     */
    constructor(textures, size)
    {
        //Construct the superclass.
        super(new THREE.Vector3(0,0,0), "");

        //Check if enough textures have been provided.
        if(textures.length < 6)
        {
            throw new Error("The skybox requires 6 textures. (Front, Back, Left, Right, Top, Bottom)");
        }

        //[SKYBOX_MESH] This is the mesh for the skybox.
        const SKYBOX_MESH = new THREE.Mesh(
            new THREE.BoxGeometry(size, size, size), 
            [
                new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load(textures[0]), side: THREE.BackSide}), //RIGHT
                new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load(textures[1]), side: THREE.BackSide}), //LEFT
                new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load(textures[2]), side: THREE.BackSide}), //TOP
                new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load(textures[3]), side: THREE.BackSide}), //BOTTOM
                new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load(textures[4]), side: THREE.BackSide}), //FRONT
                new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load(textures[5]), side: THREE.BackSide}), //BACK
            ]
        );

        //Add the mesh to the object.
        this.addObjectToGroup(SKYBOX_MESH);
    }
}