//FUNCTIONS

/**
 * @brief Animates the scene.
 */
function animate()
{
    requestAnimationFrame(animate);

    //Animation code...
    newBornPlanet.update();

    renderer.render(scene, camera);
}


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

camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 10;

var renderer = new THREE.WebGLRenderer();

//Size of the 2D projection.
renderer.setSize(window.innerWidth, window.innerHeight);

//Set the background colour.
renderer.setClearColor(colours.GREEN);

//shadows.
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

//Connect the renderer to the canvas.
document.body.appendChild(renderer.domElement);

//Add objects to the scene.
let newBornPlanet = new Planet(3, 2, colours.SIENNA, 0, 0, 0);
newBornPlanet.addToScene(scene);

//Run the animation loop.
animate();