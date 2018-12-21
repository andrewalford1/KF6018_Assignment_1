/**
 * Utility class to control a THREE.js Camera.
 * Used for filming and rednering.
 * @author Andrew Alford (w16006135)
 */
class Camera
{
    /**
     * Constructor for the Camera class.
     * @param {THREE.Vector3} initialPosition - This is the initial position
     *                                          of the camera.
     * @param {boolean} vrEnabled - If true then the scene should be rendered
     *                              in VR.
     * @param {number} cameraSpeed - How fast the camera can move (Units Per Second).
     */
    constructor(initialPosition, vrEnabled, cameraSpeed)
    {
        //INITIALISE MEMBER VARIABLES...

        //[M_CAMERA] This is the camera to view the scene through.
        const M_CAMERA = new THREE.PerspectiveCamera(
            75, window.innerWidth / window.innerHeight, 0.1, 1000
        );
        //Set the initial position of the camera.
        M_CAMERA.position.copy(initialPosition);

        //[m_controls] These are the controls for moving the camera.
        let m_controls;

        if(vrEnabled)
        {
            m_controls = new THREE.DeviceOrientationControls(M_CAMERA);
        }
        else
        {
            m_controls = new THREE.OrbitControls(M_CAMERA);
        }

        //[M_RENDERER] Used to render the scene to the camera.
        const M_RENDERER = new THREE.WebGLRenderer();
        //Initialise properties of the renderer...
        M_RENDERER.setSize(window.innerWidth, window.innerHeight);
        M_RENDERER.setClearColor(colours.BLACK);
        M_RENDERER.shadowMap.enabled = true;
        M_RENDERER.shadowMap.type = THREE.PCFSoftShadowMap;
        //Connect the renderer to the canvas.
        document.body.appendChild(M_RENDERER.domElement);

        //[useVR] If true then the scene should be rendered in VR.
        let useVR = vrEnabled;

        //[VR_EFFECT] Will contain the virtual reality effect.
        const VR_EFFECT = new THREE.StereoEffect(M_RENDERER);
        VR_EFFECT.setSize(window.innerWidth, window.innerHeight);

        //[speed] How fast the camera can move (Units Per Second).
        let speed = cameraSpeed;

        //PUBLIC METHODS...

        /**
         * Updates the camera.
         * @param {THREE.Object3D} scene - This is the scene that the camera
         *                                 is filming.
         * @param {number} frameTimeMs - The time in milliseconds it took to
         *                               compute the previously rendered frame.
         */
        this.update = function(scene, frameTimeMs)
        {
            //Update the camera controls.
            m_controls.update();

            //Render the scene.
            requestAnimationFrame(animate);

            //If virtual reality is enabled.
            if(useVR)
            {
                //Render the scene in virtual reality.
                VR_EFFECT.render(scene, M_CAMERA);
            }
            else
            {
                //Render the scene as normal.
                M_RENDERER.render(scene, M_CAMERA);
            }
        }

        /**
         * Allows the user to toggle VR.
         * @param {boolean} vrEnabled - If true then the scene should be
         *                              rendered in VR.
         * @return
         */
        this.enableVR = function(vrEnabled)
        {
            useVR = vrEnabled;
        }

        /**
         * Checks if the camera is looking at a specific object.
         * param {AssignmentObject} object - This is the object being checked
         *                                   by the camera.
         */
        this.isLookingAt = function(object)
        {
            M_CAMERA.updateMatrix();
            M_CAMERA.updateMatrixWorld();

            //[frustum] Contains everything that the camera can see.
            let frustum = new THREE.Frustum();
            frustum.setFromMatrix(new THREE.Matrix4().multiplyMatrices(
                M_CAMERA.projectionMatrix,
                M_CAMERA.matrixWorldInverse)
            );

            //Check the position of the object is within the camera's frustum.
            if(frustum.containsPoint(object.getPosition()))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        /**
         * Allows the view prot of the camera to be set.
         * @param {number} This is the width of the camera's viewport.
         * @param {number} This is the height of the camera's viewport.
         */
        this.setViewPort = function(width, height)
        {
            //Update the size of the render.
            M_RENDERER.setSize(width, height);
            //Update the aspect ratio of the camera.
            M_CAMERA.aspect = width/height;
            //Update the camera projection matrix.
            M_CAMERA.updateProjectionMatrix();
        }

        /**
         * @return Returns an instance of the camera.
         */
        this.getInstance = function()
        {
            return M_CAMERA;
        }
    }
}
