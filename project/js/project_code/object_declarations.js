//All our project code goes here...

//[TEXTURE_LOADER] Used to load textures.
const TEXTURE_LOADER = new TextureLoader('res/textures/');
//[M_MODEL_LOADER] Used to load models.
const MODEL_LOADER = new ModelLoader('res/models/');

//[declarator] Used to declare all our objects.
let declarator = new ObjectDeclarator();

//OBJECT DECLARATIONS...
//(Note: Each variable is a pointer to the object 
//so they can be accessed later on).
const pSUN = declarator.addObject(
     new Star(
        32, 
        2, 
        0.01, 
        new THREE.Vector3(0, 0, 0), 
        true
    )
);

const pTREASURE_PLANET = declarator.addObject(
    new TreasurePlanet(
        0.01, 
        new THREE.Vector3(150, 0, 0), 
        0.5, 
        declarator.getObject(pSUN), 
        18500, 
        !(declarator.getObject(pSUN).getSpinsClockwise())
    )
);

const pNATURE_PLANET = declarator.addObject(
    new NaturePlanet(
        0.01, 
        new THREE.Vector3(200, 0, 0), 
        0.52, 
        declarator.getObject(pSUN), 
        12000, 
        !(declarator.getObject(pSUN).getSpinsClockwise())
    )
);

const pCITY_PLANET = declarator.addObject(
    new CityPlanet(
        0.01, 
        new THREE.Vector3(300, 0, 0), 
        0.54, 
        declarator.getObject(pSUN), 
        25400, 
        !(declarator.getObject(pSUN).getSpinsClockwise())
    )
);

const pDYING_PLANET = declarator.addObject(
    new DyingPlanet(
        MODEL_LOADER.load('dying_planet'), 
        0.01, 
        new THREE.Vector3(375, 0, 0), 
        0.56, 
        declarator.getObject(pSUN), 
        46500, 
        !(declarator.getObject(pSUN).getSpinsClockwise())
    )
);

const pASTEROID = declarator.addObject(
    new AsteroidB612(
        new THREE.Vector3(declarator.getObject(pNATURE_PLANET).getXPosition() + 20, 0, 0), 
        3, 
        declarator.getObject(pNATURE_PLANET), 
        3650, 
        !(declarator.getObject(pNATURE_PLANET).getOrbitsClockwise())
    )
);

console.log(declarator.getObject(pNATURE_PLANET));

const pMOON = declarator.addObject(
    new Moon(
        new THREE.Vector3(declarator.getObject(pCITY_PLANET).getXPosition() + 35, 0, 0), 
        7, 
        declarator.getObject(pCITY_PLANET), 
        12000, 
        !(declarator.getObject(pCITY_PLANET).getOrbitsClockwise())
    )
);

console.log(declarator.getObject(pCITY_PLANET).getXPosition());

const pSPACESHIP = declarator.addObject(
    new Spaceship(
        new THREE.Vector3(250, 0, 0), 
        0.25, 
        declarator.getObject(pSUN), 
        24000, 
        !(declarator.getObject(pSUN).getSpinsClockwise())
    )
);

//Make all objects active.
declarator.setAllActive(true);

