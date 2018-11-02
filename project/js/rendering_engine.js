//FUNCTIONS

/**
 * @brief Animates the scene.
 */
function animate()
{
    requestAnimationFrame(animate);

    controls.update();

    //Animation code...
    //newBornPlanet.update();

    planets[0].orbit(sun, incrementor);

    for(i = 0; i < planets.length; i++)
    {
        planets[i].addToScene(scene);
        planets[i].orbit(sun, incrementor);
    }

    incrementor += 0.01;
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

var controls = new THREE.OrbitControls(camera);

//Set the initial position of the camera.
camera.position.set(0, 0, 25);
controls.update();

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

var geometry = new THREE.CylinderGeometry( 8, 5, 1, 32 );
var material = new THREE.MeshBasicMaterial( {color: colours.WHITE} );
var cylinder = new THREE.Mesh( geometry, material );
//scene.add( cylinder );

let sun = new Planet(3, 2, colours.YELLOW, 0.01, 0, 0, 0);
sun.addToScene(scene);

var distance = 2;
var planets = [
    new Planet(3, 2, colours.BLUE, 0.01, 8, 0, 0),
    new Planet(3, 2, colours.PURPLE, 0.01, 16, 0, 0),
    new Planet(3, 2, colours.RED, 0.01, 24, 0, 0),
    new Planet(3, 2, colours.MAGENTA, 0.01, 32, 0, 0),
];

for(i = 0; i < planets.length; i++)
{
    planets[i].addToScene(scene);
}

var incrementor = 0;

// //Add objects to the scene.
// let newBornPlanet = new NewBornPlanet(3, 2, colours.SIENNA, 0.01, 0, 0, 0);
// newBornPlanet.addToScene(scene);
// newBornPlanet.showPole(true);

//Run the animation loop.
animate();