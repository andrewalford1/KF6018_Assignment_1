//All our project code goes here...

//[TEXTURE_LOADER] Used to load textures.
const TEXTURE_LOADER = new TextureLoader('res/textures/');
//[M_MODEL_LOADER] Used to load models.
const MODEL_LOADER = new ModelLoader('res/models/');

//Constants to make the code more readable.
//[BASE_RADIUS] The base radius of an object.
const BASE_RADIUS = 1;
//[BASE_SMOOTHNESS] The base smoothness of an object.
const BASE_SMOOTHNESS = 1;
//[BASE_ROTATION_SPEED] The base rotation speed of an object.
const BASE_ROTATION_SPEED = 0;
//[BASE_ORBIT_SPEED] The base orbit speed of an object.
const BASE_ORBIT_SPEED = 0;
//[BASE_FULL_ROTATION_MS] The base amount of time it takes for an
//object to perform a full rotation (in milliseconds).
const BASE_FULL_ROTATION_MS = 0;
//[rotatesClockwise] If 'true' then the object rotates clockwise.
let rotatesClockwise = true;
//[origin] The origin of the scene.
let origin = new THREE.Vector3(0, 0, 0);

//[objectManager] Used to manage all our objects.
let objectManager = new ObjectManager();

//OBJECT DECLARATIONS...
//(Note: Each variable is a pointer to the object 
//so they can be accessed later on).
const pSUN = objectManager.addObject(
     new Star(
        BASE_RADIUS * 32, 
        BASE_SMOOTHNESS * 2, 
        BASE_ROTATION_SPEED + 0.01, 
        origin, 
        rotatesClockwise
    )
);

const pTREASURE_PLANET = objectManager.addObject(
    new TreasurePlanet(
        BASE_ROTATION_SPEED + 0.01, 
        origin, 
        BASE_ORBIT_SPEED + 0.5, 
        null, 
        BASE_FULL_ROTATION_MS + 18500, 
        rotatesClockwise
    )
);

const pNATURE_PLANET = objectManager.addObject(
    new NaturePlanet(
        BASE_ROTATION_SPEED + 0.01, 
        origin, 
        BASE_ORBIT_SPEED + 0.52, 
        null, 
        BASE_FULL_ROTATION_MS + 12000, 
        rotatesClockwise
    )
);

const pCITY_PLANET = objectManager.addObject(
    new CityPlanet(
        BASE_ROTATION_SPEED + 0.01, 
        origin, 
        BASE_ORBIT_SPEED + 0.54, 
        null, 
        BASE_FULL_ROTATION_MS + 25400, 
        rotatesClockwise
    )
);

const pDYING_PLANET = objectManager.addObject(
    new DyingPlanet(
        MODEL_LOADER, 
        BASE_ROTATION_SPEED + 0.01, 
        origin, 
        BASE_ORBIT_SPEED + 0.56, 
        null, 
        BASE_FULL_ROTATION_MS + 46500, 
        rotatesClockwise
    )
);

const pASTEROID = objectManager.addObject(
    new AsteroidB612(
        origin, 
        BASE_ORBIT_SPEED + 3, 
        null, 
        BASE_FULL_ROTATION_MS + 3650, 
        rotatesClockwise
    )
);

const pMOON = objectManager.addObject(
    new Moon(
        origin, 
        BASE_ORBIT_SPEED + 7, 
        null, 
        BASE_FULL_ROTATION_MS + 12000, 
        rotatesClockwise
    )
);

const pSPACESHIP = objectManager.addObject(
    new Spaceship(
        origin, 
        BASE_ORBIT_SPEED + 0.25, 
        null, 
        BASE_FULL_ROTATION_MS + 24000, 
        rotatesClockwise,
        MODEL_LOADER
    )
);

//Tweak objects to make them bigger/smaller to fit the screen.
objectManager.getObject(pSUN).setScale(new THREE.Vector3(0.75, 0.75, 0.75));
objectManager.getObject(pTREASURE_PLANET).setScale(new THREE.Vector3(7, 7, 7));
objectManager.getObject(pNATURE_PLANET).setScale(new THREE.Vector3(9, 9, 9));
objectManager.getObject(pCITY_PLANET).setScale(new THREE.Vector3(8, 8, 8));
objectManager.getObject(pDYING_PLANET).setScale(new THREE.Vector3(5, 5, 5));
objectManager.getObject(pASTEROID).setScale(new THREE.Vector3(12, 12, 12));
objectManager.getObject(pMOON).setScale(new THREE.Vector3(3, 3, 3));
objectManager.getObject(pSPACESHIP).setScale(new THREE.Vector3(5, 5, 5));
