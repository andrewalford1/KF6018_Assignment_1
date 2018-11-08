//CREATE OBJECTS...

//Stars:
const SUN = new Star(32, 2, 0.01, new THREE.Vector3(0, 0, 0), "The sun is mass of incandescent gas, a gigantic nuclear furnace. \n Where hydrogen is built into helium at a temperature of millions of degrees", true);

//Planets:
const NEW_BORN_PLANET = new NewBornPlanet(0.01, new THREE.Vector3(62, 0, 0), 0.5, SUN, 18500);
const NATURE_PLANET = new NaturePlanet(0.01, new THREE.Vector3(78, 0, 0), 0.52, SUN, 12000);
const CITY_PLANET = new CityPlanet(0.01, new THREE.Vector3(100, 0, 0), 0.54, SUN, 25400);
const DYING_PLANET = new DyingPlanet(0.01, new THREE.Vector3(124, 0, 0), 0.56, SUN, 36500);

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

//SET-UP CODE...

//Make objects active.
for(let i = 0; i < UPDATEABLE_OBJECTS.length; i++)
{
    UPDATEABLE_OBJECTS[i].setActive(true); 
}

UPDATEABLE_OBJECTS[0].setInFocus(true);