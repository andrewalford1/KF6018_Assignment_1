//All our project code goes here...

//[TEXTURE_LOADER] Used to load textures.
const TEXTURE_LOADER = new TextureLoader('res/textures/');
//[M_MODEL_LOADER] Used to load models.
const MODEL_LOADER = new ModelLoader('res/models/');

//[objectManager] Used to manage all our objects.
let objectManager = new ObjectManager();

let origin = new THREE.Vector3(0, 0, 0);

//OBJECT DECLARATIONS...
//(Note: Each variable is a pointer to the object 
//so they can be accessed later on).
const pSUN = objectManager.addObject(
     new Star(
        32, 
        2, 
        0.01, 
        origin, 
        true
    )
);

const pTREASURE_PLANET = objectManager.addObject(
    new TreasurePlanet(
        0.01, 
        origin, 
        0.5, 
        null, 
        18500, 
        true
    )
);

const pNATURE_PLANET = objectManager.addObject(
    new NaturePlanet(
        0.01, 
        origin, 
        0.52, 
        null, 
        12000, 
        true
    )
);

const pCITY_PLANET = objectManager.addObject(
    new CityPlanet(
        0.01, 
        origin, 
        0.54, 
        null, 
        25400, 
        true
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
        0.01, 
        origin, 
        0.56, 
        null, 
        46500, 
        true
    )
);

const pASTEROID = objectManager.addObject(
    new AsteroidB612(
        origin, 
        3, 
        null, 
        3650, 
        true
    )
);

const pMOON = objectManager.addObject(
    new Moon(
        origin, 
        7, 
        null, 
        12000, 
        true
    )
);

const pSPACESHIP = objectManager.addObject(
    new Spaceship(
        origin, 
        0.25, 
        null, 
        24000, 
        true
    )
);
