//MAIN CODE...
var scene = new THREE.Scene();

// Ambient light
var lightAmbient = new THREE.AmbientLight(colours.WHITE, 0.2); // soft white light
scene.add(lightAmbient);

//point light.
var pointLight = new THREE.PointLight(colours.WHITE, 1);
pointLight.position.set(25, 50, 25);
pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;
scene.add(pointLight);

//Perspective projection parameters.
var camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000
);

//[controls] Used to orbit around the scene (just for debugging).
var controls = new THREE.OrbitControls(camera);

//Set the initial position of the camera.
camera.position.set(0, 0, 100);
controls.update();

var renderer = new THREE.WebGLRenderer();

//Size of the 2D projection.
renderer.setSize(window.innerWidth, window.innerHeight);

//Set the background colour.
renderer.setClearColor(colours.BLACK);

//shadows.
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

//Connect the renderer to the canvas.
document.body.appendChild(renderer.domElement);

var stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

//ADD OBJECTS TO THE SCENE...
for(i = 0; i < updateableObjects.length; i++)
{
    updateableObjects[i].addToScene(scene);
}

//Timing variables...
//[frameTime] The amount of time taken to compute and render a frame of animation in milliseconds.
var frameTimeMs = 0;
//[previousTime] The amount of time taken to compute and render the previous frame in milliseconds.
var previousTimeMs = 0;
//[currentTime] Stores the current time in milliseconds.
var currentTimeMs = 0;

//ANIMATION FUNCTION...
function animate()
{
    stats.begin();

    controls.update();

    //Animation code...
    //Update all the updateable objects on the canvas.
    for(i = 0; i < updateableObjects.length; i++)
    {
        updateableObjects[i].update(frameTimeMs); 
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