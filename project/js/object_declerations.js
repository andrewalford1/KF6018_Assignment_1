//CREATE OBJECTS...

//Stars:
var sun = new Star(16, 2, 0.01, new THREE.Vector3(0, 0, 0));

//Planets:
var newBornPlanet = new NewBornPlanet(0.01, new THREE.Vector3(32, 0, 0), 0.5, sun, 18500);
var naturePlanet = new NaturePlanet(0.01, new THREE.Vector3(48, 0, 0), 0.52, sun, 12000);
var cityPlanet = new CityPlanet(0.01, new THREE.Vector3(64, 0, 0), 0.54, sun, 25400);
var dyingPlanet = new DyingPlanet(0.01, new THREE.Vector3(92, 0, 0), 0.56, sun, 36500);

//Asteroids:
var asteroidB612 = new AsteroidB612(new THREE.Vector3(naturePlanet.getXPosition() + 4, 0, 0), 3, naturePlanet, 3650);


//GROUP OBJECTS TOGETHER...

//[updateableObjects] An array to declare all the updateable objects in the program.
var updateableObjects = [
    //Stars:
    sun,
    //Planets:
    newBornPlanet,
    naturePlanet,
    cityPlanet,
    dyingPlanet,
    //Asteroids:
    asteroidB612
];