//DECLARE LOADERS...
const TEXTURE_LOADER = new TextureLoader('res/textures/');
const MODEL_LOADER = new ModelLoader('res/models/');

//CREATE OBJECTS...

//Stars:
const SUN = new Star(32, 2, 0.01, new THREE.Vector3(0, 0, 0), true);

//Planets:
const NEW_BORN_PLANET = new NewBornPlanet(0.01, new THREE.Vector3(62, 0, 0), 0.5, SUN, 18500, !(SUN.getSpinsClockwise()));
const NATURE_PLANET = new NaturePlanet(0.01, new THREE.Vector3(78, 0, 0), 0.52, SUN, 12000, !(SUN.getSpinsClockwise()));
const CITY_PLANET = new CityPlanet(0.01, new THREE.Vector3(100, 0, 0), 0.54, SUN, 25400, !(SUN.getSpinsClockwise()));
const DYING_PLANET = new DyingPlanet(MODEL_LOADER.load('dying_planet'), 0.01, new THREE.Vector3(164, 0, 0), 0.56, SUN, 46500, !(SUN.getSpinsClockwise()));

//Asteroids:
const ASTEROID_B612 = new AsteroidB612(
    new THREE.Vector3(NATURE_PLANET.getXPosition() + 4, 0, 0), 3, NATURE_PLANET, 3650, !(NATURE_PLANET.getOrbitsClockwise())
);

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
];

//SET-UP CODE...

//Make updateable objects active.
for(let i = 0; i < UPDATEABLE_OBJECTS.length; i++)
{
    UPDATEABLE_OBJECTS[i].setActive(true);
}