//MAIN CODE...
let scene = new THREE.Scene();

//Add a skybox to the scene.
TEXTURE_LOADER.loadSkybox('skybox', '.JPEG', scene);

// Ambient light
let lightAmbient = new THREE.AmbientLight(colours.WHITE, 0.2); // soft white light
scene.add(lightAmbient);

//point light
let pointLight = new THREE.PointLight(colours.WHITE, 1, 5000);
pointLight.position.set(80, 200, 80);
pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;
scene.add(pointLight);

//point light2
let pointLight2 = new THREE.PointLight(colours.WHITE, 1, 5000);
pointLight2.position.set(-50, 150, -50);
pointLight2.castShadow = true;
pointLight2.shadow.mapSize.width = 1024;
pointLight2.shadow.mapSize.height = 1024;
scene.add(pointLight2);


//[camera] This is the camera to view the scene through.
let camera = new Camera(new THREE.Vector3(0, 500, 0), false, 0.001); //top down view.
//let camera = new Camera(new THREE.Vector3(0, 2, 0), true, 0.001);
//Add the camera to the spaceship.
//UPDATEABLE_OBJECTS[P_SPACESHIP].addObjectToGroup(camera.getInstance());

//EVENT LISTENERS...
//Event listener to allow the scene to resize when the window is resized.
window.addEventListener('resize', function()
{
   camera.setViewPort(window.innerWidth, window.innerHeight);
});

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
    //Update timing variables.
    TIMER.update();
    frameTime = TIMER.getFrameTimeMs();

    //Update the camera.
    camera.update(scene, frameTime);

    //Animation code...
    //Update all the updateable objects on the canvas.
    for(let i = 0; i < UPDATEABLE_OBJECTS.length; i++)
    {
        UPDATEABLE_OBJECTS[i].update(frameTime);
    }
}

//Run the animation loop.
animate();
