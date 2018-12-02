//MAIN CODE...
let scene = new THREE.Scene();

//Add a skybox to the scene.
TEXTURE_LOADER.loadSkybox('skybox', '.JPEG', scene);

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

//[camera] This is the camera to view the scene through.
let camera = new Camera(new THREE.Vector3(0, 0, 100), false, 0.001);

//EVENT LISTENERS...
//Event listener to allow the scene to resize when the window is resized.
window.addEventListener('resize', function()
{
   camera.setViewPort(window.innerWidth, window.innerHeight);
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

//[TIMER] used for timing the program.
const TIMER = new Timer();
//[frameTime] Contains the time in milliseconds it took to compute the
//previously rendered frame.
let frameTime = TIMER.getFrameTimeMs();

//ANIMATION FUNCTION...
function animate()
{
    //Start recording stats.
    stats.begin();

    //Update timing variables.
    TIMER.update();
    frameTime = TIMER.getFrameTimeMs();

    //Update the camera.
    camera.update(scene, frameTime);
    camera.moveTo(UPDATEABLE_OBJECTS[0].getPosition(), frameTime);

    //Animation code...
    //Update all the updateable objects on the canvas.
    for(let i = 0; i < UPDATEABLE_OBJECTS.length; i++)
    {
        UPDATEABLE_OBJECTS[i].update(frameTime);
    }

    //Stop recording stats.
    stats.end();
}

//Run the animation loop.
animate();
