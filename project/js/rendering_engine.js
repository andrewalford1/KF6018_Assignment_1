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

let stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

//ADD OBJECTS TO THE SCENE...
for(let i = 0; i < UPDATEABLE_OBJECTS.length; i++)
{
    UPDATEABLE_OBJECTS[i].addToScene(scene);
}

//Timing variables...
//[frameTime] The amount of time taken to compute and render a frame of animation in milliseconds.
let frameTimeMs = 0;
//[previousTime] The amount of time taken to compute and render the previous frame in milliseconds.
let previousTimeMs = 0;
//[currentTime] Stores the current time in milliseconds.
let currentTimeMs = 0;

//ANIMATION FUNCTION...
function animate()
{
    stats.begin();

    controls.update();

    //Animation code...
    //Update all the updateable objects on the canvas.
    for(let i = 0; i < UPDATEABLE_OBJECTS.length; i++)
    {
        UPDATEABLE_OBJECTS[i].update(frameTimeMs); 
    }

    stats.end();

    //Render the scene.
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    //Update timing variables.
    currentTimeMs = performance.now();
    frameTimeMs = currentTimeMs - previousTimeMs;
    previousTimeMs = currentTimeMs;
}

//Run the animation loop.
animate();

