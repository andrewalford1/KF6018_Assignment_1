//All our project code goes here...

//[TEXTURE_LOADER] Used to load textures.
const TEXTURE_LOADER = new TextureLoader('res/textures/');
//[M_MODEL_LOADER] Used to load models.
const MODEL_LOADER = new ModelLoader('res/models/');

//[objectManager] Used to manage all our objects.
let objectManager = new ObjectManager();

//OBJECT DECLARATIONS...
//(Note: Each variable is a pointer to the object 
//so they can be accessed later on).
const pSUN = objectManager.addObject(
     new Star(
        32, 
        2, 
        0.01, 
        new THREE.Vector3(0, 0, 0), 
        true
    )
);

const pTREASURE_PLANET = objectManager.addObject(
    new TreasurePlanet(
        0.01, 
        new THREE.Vector3(150, 0, 0), 
        0.5, 
        objectManager.getObject(pSUN), 
        18500, 
        !(objectManager.getObject(pSUN).getSpinsClockwise())
    )
);

const pNATURE_PLANET = objectManager.addObject(
    new NaturePlanet(
        0.01, 
        new THREE.Vector3(200, 0, 0), 
        0.52, 
        objectManager.getObject(pSUN), 
        12000, 
        !(objectManager.getObject(pSUN).getSpinsClockwise())
    )
);

const pCITY_PLANET = objectManager.addObject(
    new CityPlanet(
        0.01, 
        new THREE.Vector3(300, 0, 0), 
        0.54, 
        objectManager.getObject(pSUN), 
        25400, 
        !(objectManager.getObject(pSUN).getSpinsClockwise())
    )
);

const pDYING_PLANET = objectManager.addObject(
    new DyingPlanet(
        MODEL_LOADER.load('dying_planet'), 
        0.01, 
        new THREE.Vector3(375, 0, 0), 
        0.56, 
        objectManager.getObject(pSUN), 
        46500, 
        !(objectManager.getObject(pSUN).getSpinsClockwise())
    )
);

const pASTEROID = objectManager.addObject(
    new AsteroidB612(
        new THREE.Vector3(objectManager.getObject(pNATURE_PLANET).getXPosition() + 20, 0, 0), 
        3, 
        objectManager.getObject(pNATURE_PLANET), 
        3650, 
        !(objectManager.getObject(pNATURE_PLANET).getOrbitsClockwise())
    )
);

const pMOON = objectManager.addObject(
    new Moon(
        new THREE.Vector3(objectManager.getObject(pCITY_PLANET).getXPosition() + 35, 0, 0), 
        7, 
        objectManager.getObject(pCITY_PLANET), 
        12000, 
        !(objectManager.getObject(pCITY_PLANET).getOrbitsClockwise())
    )
);

const pSPACESHIP = objectManager.addObject(
    new Spaceship(
        new THREE.Vector3(250, 0, 0), 
        0.25, 
        objectManager.getObject(pSUN), 
        24000, 
        !(objectManager.getObject(pSUN).getSpinsClockwise())
    )
);

//Make all objects active.
objectManager.setAllActive(true);

