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
camera.position.set(0, 0, 25);
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

//CREATE OBJECTS...

//[sun] The sun is the object that all other planets orbit around.
let sun = new Star(16, 2, 0.01, new THREE.Vector3(0, 0, 0));

//[planets] An array to hold all the planets in the solar system.
var planets = [
    new Planet(3, 2, colours.BLUE, 0.05, new THREE.Vector3(32, 0, 0), 1),
    new Planet(6, 2, colours.GREEN, 0.05, new THREE.Vector3(48, 0, 0), 1.2),
    new Planet(12, 2, colours.RED, 0.05, new THREE.Vector3(64, 0, 0), 1.4),
    new Planet(9, 2, colours.MAGENTA, 0.05, new THREE.Vector3(92, 0, 0), 1.6)
];

//ADD OBJECTS TO THE SCENE...

//Add the sun to the scene.
sun.addToScene(scene);

//Add the planets to the scene.
for(i = 0; i < planets.length; i++)
{
    planets[i].addToScene(scene);
}

//[incrementor] Used to track the planets orbit.
var incrementor = 0;

//ANIMATION FUNCTION...
function animate()
{
    requestAnimationFrame(animate);

    controls.update();

    //Animation code...
    //Update all the planets.
    for(i = 0; i < planets.length; i++)
    {
        planets[i].updatePlanet(sun, incrementor); 
    }

    incrementor += 0.01;

    //Render the scene.
    renderer.render(scene, camera);
}

//Run the animation loop.
animate();