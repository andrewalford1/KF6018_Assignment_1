/**
 * Class representing a spaceship to fly around the scene.
 * @extends Updateable Object
 * @author Andrew Alford (w16006135)
 */
class Spaceship extends UpdateableObject
{
    /**
     * Constructor for the Spaceship class.
     * @param {THREE.Vector3} initialPosition - The initial position of the
     *                                          spaceship.
     */
    constructor(initialPosition)
    {
        //Construct the superclass.
        super(initialPosition);

        const CUBE = new THREE.Mesh
        (
            new THREE.BoxGeometry(50, 10, 10),
            new THREE.MeshBasicMaterial({color: colours.BLUE})
        );

        this.addObjectToGroup(CUBE);

        let pos = new THREE.Vector3(30, 30, 0);

        //[CAMERA] This is the camera to view the scene through.
        const CAMERA = new Camera(pos, false, 0.001);

        this.addObjectToGroup(CAMERA.getInstance());
        

        //PUBLIC METHODS...

        /**
         * Updates the spaceship.
         * @param {number} frameTimeMs - The time in milliseconds it took to 
         *                               compute the previous rendered frame.
         */
        this.update = function(frameTimeMs)
        {
            //Check if the spaceship is active.
            if(this.isActive())
            {

            }
        }

        this.getCamera = function()
        {
            return CAMERA;
        }
    }
}