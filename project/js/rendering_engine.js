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
for(let i = 0; i < UPDATEABLE_OBJECTS.length; i++)
{
    UPDATEABLE_OBJECTS[i].addToScene(scene);
}

let text = document.getElementById('object_info');
text.style.visibility = 'hidden';

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

    //TEMP CODE - checks if the camera is looking at the sun. (could be used for lens-flare).
    camera.updateMatrix();
    camera.updateMatrixWorld();
    var frustum = new THREE.Frustum();
    frustum.setFromMatrix(new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse));  

    // Your 3d point to check
    var pos = UPDATEABLE_OBJECTS[0].getPosition();
    if (frustum.containsPoint(pos)) {
        // Do something with the position...
        text.style.visibility = 'visible';
        text.textContent = "This is a sun.";
    }
    else
    {
        text.textContent = "This is not a sun";
    }

    //END OF TEMP CODE.

    stats.end();

    //Render the scene.
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    //Update timing variables.
    TIMER.update();
}

//Run the animation loop.
animate();

