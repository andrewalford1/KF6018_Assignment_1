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
        new THREE.Vector3(0, 0, 0), 
        rotatesClockwise
    )
);

const pTREASURE_PLANET = objectManager.addObject(
    new TreasurePlanet(
        BASE_ROTATION_SPEED + 0.01, 
        new THREE.Vector3(150, 0, 0), 
        BASE_ORBIT_SPEED + 0.5, 
        objectManager.getObject(pSUN), 
        BASE_FULL_ROTATION_MS + 18500, 
        !(objectManager.getObject(pSUN).getSpinsClockwise())
    )
);

const pNATURE_PLANET = objectManager.addObject(
    new NaturePlanet(
        BASE_ROTATION_SPEED + 0.01, 
        new THREE.Vector3(200, 0, 0), 
        BASE_ORBIT_SPEED + 0.52, 
        objectManager.getObject(pSUN), 
        BASE_FULL_ROTATION_MS + 12000, 
        !(objectManager.getObject(pSUN).getSpinsClockwise())
    )
);

const pCITY_PLANET = objectManager.addObject(
    new CityPlanet(
        BASE_ROTATION_SPEED + 0.01, 
        new THREE.Vector3(300, 0, 0), 
        BASE_ORBIT_SPEED + 0.54, 
        objectManager.getObject(pSUN), 
        BASE_FULL_ROTATION_MS + 25400, 
        !(objectManager.getObject(pSUN).getSpinsClockwise())
    )
);

const pDYING_PLANET = objectManager.addObject(
    new DyingPlanet(
        MODEL_LOADER.loadModel(
            'dying_planet',
            new THREE.MeshStandardMaterial({
                color: colours.BROWN, 
                flatShading: THREE.FlatShading, 
                metalness: 0, 
                roughness: 1
            })
        ), 
        BASE_ROTATION_SPEED + 0.01, 
        new THREE.Vector3(375, 0, 0), 
        BASE_ORBIT_SPEED + 0.56, 
        objectManager.getObject(pSUN), 
        BASE_FULL_ROTATION_MS + 46500, 
        !(objectManager.getObject(pSUN).getSpinsClockwise())
    )
);

const pASTEROID = objectManager.addObject(
    new AsteroidB612(
        new THREE.Vector3(objectManager.getObject(pNATURE_PLANET).getXPosition() + 20, 0, 0), 
        BASE_ORBIT_SPEED + 3, 
        objectManager.getObject(pNATURE_PLANET), 
        BASE_FULL_ROTATION_MS + 3650, 
        !(objectManager.getObject(pNATURE_PLANET).getOrbitsClockwise())
    )
);

const pMOON = objectManager.addObject(
    new Moon(
        new THREE.Vector3(objectManager.getObject(pCITY_PLANET).getXPosition() + 35, 0, 0), 
        BASE_ORBIT_SPEED + 7, 
        objectManager.getObject(pCITY_PLANET), 
        BASE_FULL_ROTATION_MS + 12000, 
        !(objectManager.getObject(pCITY_PLANET).getOrbitsClockwise())
    )
);

const pSPACESHIP = objectManager.addObject(
    new Spaceship(
        new THREE.Vector3(250, 0, 0), 
        BASE_ORBIT_SPEED + 0.25, 
        objectManager.getObject(pSUN), 
        BASE_FULL_ROTATION_MS + 24000, 
        !(objectManager.getObject(pSUN).getSpinsClockwise()),
        MODEL_LOADER.loadTexturedModel('plane'),
        MODEL_LOADER.loadModel('propellers',
                    new THREE.MeshStandardMaterial({
                color: colours.GREY, 
                flatShading: THREE.FlatShading, 
                metalness: 0, 
                roughness: 1
            }))
    )
);
