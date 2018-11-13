//MAIN CODE...
let scene = new THREE.Scene();

// Ambient light
let lightAmbient = new THREE.AmbientLight(colours.WHITE, 0.2); // soft white light
scene.add(lightAmbient);

//point light.
let pointLight = new THREE.PointLight(colours.WHITE, 1);
pointLight.position.set(25, 50, 25);
pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;
scene.add(pointLight);

//Perspective projection parameters.
let camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000
);

//[controls] Used to orbit around the scene (just for debugging).
let controls = new THREE.OrbitControls(camera);

//Set the initial position of the camera.
camera.position.set(0, 0, 100);
controls.update();

let renderer = new THREE.WebGLRenderer();

//Size of the 2D projection.
renderer.setSize(window.innerWidth, window.innerHeight);

//Set the background colour.
renderer.setClearColor(colours.BLACK);

//shadows.
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

//[VR_ENABLED] If true then the renderer will render the scene in VR.
const VR_ENABLED = false;

//[vr_effect] Will contain the virtual reality effect.
let vr_effect;

//Set up the renderer for VR (if it is enabled).
if(VR_ENABLED)
{
    vr_effect = new THREE.StereoEffect(renderer);
    vr_effect.setSize(window.innerWidth, window.innerHeight);
}

//Connect the renderer to the canvas.
document.body.appendChild(renderer.domElement);

//Event listener to allow the scene to resize when the widn
window.addEventListener('resize', function()
{
   const WIDTH = window.innerWidth;
   const HEIGHT = window.innerHeight;
   renderer.setSize(WIDTH, HEIGHT);
   camera.aspect = WIDTH / HEIGHT;
   camera.updateProjectionMatrix();
});

//STATS HERE FOR DEBUGGING, REMOVE FROM FINAL PROJECT!
let stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

//ADD OBJECTS TO THE SCENE...
//Add updatable objects to the scene.
for(let i = 0; i < UPDATEABLE_OBJECTS.length; i++)
{
    UPDATEABLE_OBJECTS[i].addToScene(scene);
}
//Add other objects to the scene.
//SKYBOX.addToScene(scene); //Removed until it is working.

//[TIMER] used for timing the program.
const TIMER = new Timer();

//ANIMATION FUNCTION...
function animate()
{
    stats.begin();

    controls.update();

    //Animation code...
    //Update all the updateable objects on the canvas.
    for(let i = 0; i < UPDATEABLE_OBJECTS.length; i++)
    {
        UPDATEABLE_OBJECTS[i].update(TIMER.getFrameTimeMs());
    }

//     //TEMP CODE - checks if the camera is looking at a specific object. (could be used for lens-flare).
//     camera.updateMatrix();
//     camera.updateMatrixWorld();
//     var frustum = new THREE.Frustum();
//     frustum.setFromMatrix(new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse));

//     // Your 3d point to check
//     var pos = UPDATEABLE_OBJECTS[5].getPosition();
//     if (frustum.containsPoint(pos)) {
//         // Do something with the position...
//         htmlAccessor.OBJECT_INFORMATION.style.visibility = 'visible';
//         htmlAccessor.OBJECT_INFORMATION.textContent = UPDATEABLE_OBJECTS[5].getDescription();
//     }
//     else
//     {
//         htmlAccessor.OBJECT_INFORMATION.style.visibility = 'hidden';
//     }

    //END OF TEMP CODE.

    //Render the scene.
    requestAnimationFrame(animate);

    //If virtual reality is enabled.
    if(VR_ENABLED)
    {
        //Render the scene in virtual reality.
        vr_effect.render( scene, camera );
    }
    else
    {
        //Render the scene as normal.
        renderer.render(scene, camera);
    }

    //Stop recording stats.
    stats.end();

    //Update timing variables.
    TIMER.update();
}

//Run the animation loop.
animate();
