//DECLARE LOADERS...
const TEXTURE_LOADER = new TextureLoader('res/textures/');
const MODEL_LOADER = new ModelLoader('res/models/');

//CREATE OBJECTS...
let objectPointer = 0;

//Stars:
const SUN = new Star(32, 2, 0.01, new THREE.Vector3(0, 0, 0), true);
const P_SUN = objectPointer++;

//Planets:
const NEW_BORN_PLANET = new NewBornPlanet(0.01, new THREE.Vector3(150, 0, 0), 0.5, SUN, 18500, !(SUN.getSpinsClockwise()));
const P_NEW_BORN_PLANET = objectPointer++;
const NATURE_PLANET = new NaturePlanet(0.01, new THREE.Vector3(250, 0, 0), 0.52, SUN, 12000, !(SUN.getSpinsClockwise()));
const P_NATURE_PLANET = objectPointer++;
const CITY_PLANET = new CityPlanet(0.01, new THREE.Vector3(370, 0, 0), 0.54, SUN, 25400, !(SUN.getSpinsClockwise()));
const P_CITY_PLANET = objectPointer++;
const DYING_PLANET = new DyingPlanet(MODEL_LOADER.load('dying_planet'), 0.01, new THREE.Vector3(500, 0, 0), 0.56, SUN, 46500, !(SUN.getSpinsClockwise()));
const P_DYING_PLANET = objectPointer++;

//Asteroids:
const ASTEROID_B612 = new AsteroidB612(
    new THREE.Vector3(NATURE_PLANET.getXPosition() + 20, 0, 0), 3, NATURE_PLANET, 3650, !(NATURE_PLANET.getOrbitsClockwise())
);
const P_ASTEROID_B612 = objectPointer++;

//Spaceship:
const SPACESHIP = new Spaceship(new THREE.Vector3(150, 0, 0));
const P_SPACESHIP = objectPointer++;

//GROUP OBJECTS TOGETHER...

//[UPDATEABLE_OBJECTS] An array to declare all the updateable objects in the program.
const UPDATEABLE_OBJECTS = [
    //Stars:
    SUN,
    //Planets:
    NEW_BORN_PLANET,
    NATURE_PLANET,
    CITY_PLANET,
    DYING_PLANET,
    //Asteroids:
    ASTEROID_B612,
    //Spaceship:
    SPACESHIP
];

//SET-UP CODE...

//Make updateable objects active.
for(let i = 0; i < UPDATEABLE_OBJECTS.length; i++)
{
    UPDATEABLE_OBJECTS[i].setActive(true);
}
