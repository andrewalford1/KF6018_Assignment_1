//CREATE OBJECTS...

//Stars:
const SUN = new Star(16, 2, 0.01, new THREE.Vector3(0, 0, 0));

//Planets:
const NEW_BORN_PLANET = new NewBornPlanet(0.01, new THREE.Vector3(32, 0, 0), 0.5, SUN, 18500);
const NATURE_PLANET = new NaturePlanet(0.01, new THREE.Vector3(48, 0, 0), 0.52, SUN, 12000);
const CITY_PLANET = new CityPlanet(0.01, new THREE.Vector3(64, 0, 0), 0.54, SUN, 25400);
const DYING_PLANET = new DyingPlanet(0.01, new THREE.Vector3(92, 0, 0), 0.56, SUN, 36500);

//Asteroids:
const ASTEROID_B612 = new AsteroidB612(
    new THREE.Vector3(NATURE_PLANET.getXPosition() + 4, 0, 0), 3, NATURE_PLANET, 3650
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
    ASTEROID_B612
];