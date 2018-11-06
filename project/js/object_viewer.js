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

//ADD OBJECT TO THE SCENE...
const OBJECT = new Star(32, 2, 0.01, new THREE.Vector3(0, 0, 0));
OBJECT.setActive(true);
OBJECT.addToScene(scene);

let renderer = new THREE.WebGLRenderer();

//Size of the 2D projection.
renderer.setSize(window.innerWidth, window.innerHeight);

//Set the background colour.
//Input the colour of your object here to work out an appropriate background colour.
let bg = new THREE.Color(colours.YELLOW);
bg.offsetHSL(0.5, 0, 0);
renderer.setClearColor(bg);

//shadows.
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

//Connect the renderer to the canvas.
document.body.appendChild(renderer.domElement);

//Shows the program stats.
let stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

//CAMERA SET-UP...
//Perspective projection parameters.
let camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000
);

//[controls] Used to orbit around the scene (just for debugging).
let controls = new THREE.OrbitControls(camera);

//Set the initial position of the camera.
camera.position.set(0, 0, 250);
//Point the camera at the object.
camera.lookAt(OBJECT.getPosition());
controls.update();

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
    
    //Update the object.
    OBJECT.update(frameTimeMs);

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
