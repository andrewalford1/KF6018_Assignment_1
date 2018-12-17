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
//let camera = new Camera(new THREE.Vector3(0, 500, 0), false, 0.001); //top down view.
let camera = new Camera(new THREE.Vector3(0, 2, 0), true, 0.001);
//Add the camera to the spaceship.
objectManager.getObject(pSPACESHIP).addObjectToGroup(camera.getInstance());

//EVENT LISTENERS...
//Event listener to allow the scene to resize when the window is resized.
window.addEventListener('resize', function()
{
   camera.setViewPort(window.innerWidth, window.innerHeight);
});

//Make all objects active and add them to the scene.
objectManager.setAllActive(true);
objectManager.addAllToScene(scene);

//[TIMER] used for timing the program.
const TIMER = new Timer();
//[frameTime] Contains the time in milliseconds it took to compute the
//previously rendered frame.
let frameTime = TIMER.getFrameTimeMs();

//-----------------------------------------------------------

let blueMaterial = new THREE.MeshPhysicalMaterial({color: colours.DARK_BLUE, flatShading: THREE.FlatShading,
                   metalness: 0.0, roughness: 0.5, reflectivity: 0.0} );
let greenMaterial= new THREE.MeshPhysicalMaterial({color: colours.DARK_GREEN, flatShading: THREE.FlatShading,
                   metalness: 0.0, roughness: 0.5, reflectivity: 0.0} );

let loadingScreen = {
    scene: new THREE.Scene(),
    camera: new Camera(new THREE.Vector3(0, 500, 0), false, 0.001),
    renderer: new THREE.WebGLRenderer({ antialias: true }),
    planetPartBlue: new THREE.Mesh(new THREE.OctahedronGeometry(1,2), blueMaterial),
    planetPartGreen: new THREE.Mesh(new THREE.OctahedronGeometry(1,2), greenMaterial),
    ambientLight: new THREE.AmbientLight( colours.WHITE, 0.4 ),
    pointLight: new THREE.PointLight( colours.WHITE, 2, 50000),
    loadingTime: 0,
    planetGroup: new THREE.Group()
};

 let RESOURCES_LOADED = false;
 loadingScreen.planetPartBlue.position.set(0, 0, 5);
 loadingScreen.planetPartGreen.position.set(0, 0, 5);
 //loadingScreen.camera.position.set(0, 0, 10);
 loadingScreen.planetGroup.add(loadingScreen.planetPartGreen);
 loadingScreen.planetGroup.add(loadingScreen.planetPartBlue);
 ////if camera 1 is enabled
 //loadingScreen.planetGroup.position.set(0, 490, 0);
 ////if camera 2 is enabled
 loadingScreen.planetGroup.position.set(0, -9, 0);
 ////if camera 3 is enabled
 
 loadingScreen.planetGroup.rotation.set(-1.5, 0, 0);
 loadingScreen.scene.add(loadingScreen.planetGroup);
 loadingScreen.scene.add(loadingScreen.ambientLight);
 loadingScreen.pointLight.position.set( 100, 800, 100 );
 loadingScreen.scene.add(loadingScreen.pointLight);
 loadingScreen.renderer.setClearColor({color: 0x483E9B});

//------------------------------------------------------------

//ANIMATION FUNCTION...
function animate()
{
   
   //Animation of the loading screen
   //The if statement will end once the loadingScreen.loadingTime will be over 100
   //RESOURCES_LOADED == false
    if( RESOURCES_LOADED == true){
        
        loadingScreen.planetPartBlue.rotation.x = 0.5;//0.6;   
        loadingScreen.planetPartBlue.rotation.z = 0.07;
        loadingScreen.planetPartBlue.rotation.y += 0.001;
        
        loadingScreen.planetPartGreen.rotation.x = 0.05;//0.06;
        loadingScreen.planetPartGreen.rotation.y += 0.01;
        loadingScreen.planetPartGreen.rotation.z = 0.07;

        loadingScreen.loadingTime++;

        camera.update(loadingScreen.scene, loadingScreen.camera);
        return;

    }
    
    //Update timing variables.
    TIMER.update();
    frameTime = TIMER.getFrameTimeMs();

    //Update the camera.
    camera.update(scene, frameTime);

    //Animation code...
    //Update all the updateable objects on the canvas.
    objectManager.updateAllObjects(frameTime);
}

//Run the animation loop.
animate();
