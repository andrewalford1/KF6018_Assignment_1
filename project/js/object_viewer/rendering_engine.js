//MAIN CODE...
let scene = new THREE.Scene();

//Add a skybox to the scene.
TEXTURE_LOADER.loadSkybox('skybox', '.JPEG', scene);

// Ambient light
let lightAmbient = new THREE.AmbientLight(colours.WHITE, 0.3); // soft white light
scene.add(lightAmbient);

//point light
let pointLight = new THREE.PointLight(colours.WHITE, 1, 9000);
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

/**
 * Makes the object being poointed to visibile, and
 * all other objects invisible.
 * @param {number} objectPointer - A pointer to the object you
 *                                 want to be visible.
 * @param {ObjectManager} objectManager - The object manager
 *                                        being used to manage all
 *                                        the objects in the project.
 */
function viewObject(objectPointer, objectManager)
{
    //Make all objects invisible except for the one being pointed to 
    //by the object pointer.
    for(let i = 0; i < objectManager.getSize(); i++)
    { 
        if(i != objectPointer)
        {
            objectManager.getObject(i).setVisibility(false);
            objectManager.setActive(i, false);   
        }
        else
        {

            objectManager.getObject(i).setVisibility(true);
            objectManager.setActive(i, true);   
        }
    }

    //Add the objects name to the page.
    htmlAccessor.OBJECT_INFORMATION.textContent = (
        objectManager.getObject(objectPointer).getObject().name
    );
}


//[camera] This is the camera to view the scene through.
let camera = new Camera(new THREE.Vector3(100, 0, 0), false, 0.001);

//Add all objects to the scene.
objectManager.addAllToScene(scene);

//[objectPointer] Points to the current object being viewed.
let objectPointer = 0;
//View the first object.
viewObject(objectPointer, objectManager);

//[USER_INPUT] Used to retrieve input from the user.
const USER_INPUT = new KeyboardInput();

//Show the objects name.
htmlAccessor.OBJECT_INFORMATION.style.visibility = 'visible';

//EVENT LISTENERS...
//Event listener to allow the scene to resize when the window is resized.
window.addEventListener('resize', function()
{
   camera.setViewPort(window.innerWidth, window.innerHeight);
});
//Event listener to switch the current object being viewed when the user
//taps the screen and releases their finger.
document.addEventListener('touchend', function()
{
    objectPointer++;

    if(objectPointer > objectManager.getSize() - 1)
    {
        objectPointer = 0;
    }

    viewObject(objectPointer, objectManager);
});

//[TIMER] used for timing the program.
const TIMER = new Timer();
//[frameTime] Contains the time in milliseconds it took to compute the
//previously rendered frame.
let frameTime = TIMER.getFrameTimeMs();

//--------------------------------------------------------------
//material A for the objecs in the loading screen 
let blueMaterial = new THREE.MeshPhysicalMaterial({color: colours.DARK_BLUE, flatShading: THREE.FlatShading,
                   metalness: 0.0, roughness: 0.5, reflectivity: 0.0} );
//material B for the objecs in the loading screen 
let greenMaterial= new THREE.MeshPhysicalMaterial({color: colours.DARK_GREEN, flatShading: THREE.FlatShading,
                   metalness: 0.0, roughness: 0.5, reflectivity: 0.0} );
//declare objects in the loading screen
let loadingScreen = {
    scene: new THREE.Scene(),
    planetPartBlue: new THREE.Mesh(new THREE.OctahedronGeometry(1,2), blueMaterial),
    planetPartGreen: new THREE.Mesh(new THREE.OctahedronGeometry(1,2), greenMaterial),
    ambientLight: new THREE.AmbientLight( colours.WHITE, 0.2 ),
    pointLight: new THREE.PointLight( colours.WHITE, 2, 50000),
    loadingTime: 0,
    planetGroup: new THREE.Group()
};
//set position of the objects
 loadingScreen.planetPartBlue.position.set(0, 0, 5.001);
 loadingScreen.planetPartGreen.position.set(0, 0, 5);
 //add objects to the group
 loadingScreen.planetGroup.add(loadingScreen.planetPartGreen);
 loadingScreen.planetGroup.add(loadingScreen.planetPartBlue);
 //position of  the group
 loadingScreen.planetGroup.position.set(95, 0, -5);
 //add the planetGroup to the loading screen scene
 loadingScreen.scene.add(loadingScreen.planetGroup);
 //add ambient light to the loading screen scene
 loadingScreen.scene.add(loadingScreen.ambientLight);
 //set pointLight
 loadingScreen.pointLight.position.set( 350, 50, -50 );
 //add the point light to the loading screen scene
 loadingScreen.scene.add(loadingScreen.pointLight);
//------------------------------------------------------------

//ANIMATION FUNCTION...
function animate()
{
   
   //Animation of the loading screen
   //The if statement will end once the loadingScreen.loadingTime will be over 100
    if( loadingScreen.loadingTime <100){
        //rotate planetPartBlue
        loadingScreen.planetPartBlue.rotation.x = 0.6;
        loadingScreen.planetPartBlue.rotation.y = 0.01;  
        loadingScreen.planetPartBlue.rotation.z = -0.7;
        //rotate planetPartGreen
        loadingScreen.planetPartGreen.rotation.x = 0.05;
        loadingScreen.planetPartGreen.rotation.y += 0.008;
        loadingScreen.planetPartGreen.rotation.z = 6;

        loadingScreen.loadingTime++;

        camera.update(loadingScreen.scene, loadingScreen.loadingTime);
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

    if(USER_INPUT.isPressed(keys.A) 
        || USER_INPUT.isPressed(keys.D))
    {
        if(USER_INPUT.isPressed(keys.D))
        {
            objectPointer++;

            if(objectPointer > objectManager.getSize() - 1)
            {
                objectPointer = 0;
            }
        }
        else if(USER_INPUT.isPressed(keys.A))
        {
            objectPointer--;

            if(objectPointer < 0)
            {
                objectPointer = objectManager.getSize() - 1;
            }
        }

        viewObject(objectPointer, objectManager);
    }

    USER_INPUT.update();
}

//Run the animation loop.
animate();
