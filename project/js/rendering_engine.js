//FUNCTIONS

/**
 * @brief Animates the scene.
 */
function animate()
{
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    renderer.render(scene, camera);
}


//MAIN CODE...
var scene = new THREE.Scene();

//Lighting
var spotLight = new THREE.SpotLight(0xFFFFFF);
spotLight.position.set(30, 60, 60);
spotLight.intensity = 0.6;
scene.add(spotLight);

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

//Connect the renderer to the canvas.
document.body.appendChild(renderer.domElement);

//Add objects to the scene.
scene.add(cube);

//Run the animation loop.
animate();