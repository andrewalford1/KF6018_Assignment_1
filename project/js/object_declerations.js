//CHECK DEPENDANCIES...
if(typeof Star === 'undefined' || Star === null)
{
    throw new Error("Error: Object of type 'Star' has not been declared.");
}
else if(typeof NaturePlanet === 'undefined' || NaturePlanet === null)
{
    throw new Error("Error: Object of type 'NaturePlanet' has not been declared.");
}
else if(typeof CityPlanet === 'undefined' || CityPlanet === null)
{
    throw new Error("Error: Object of type 'CityPlanet' has not been declared.");
}
else if(typeof AsteroidB612 === 'undefined' || AsteroidB612 === null)
{
    throw new Error("Error: Object of type 'AsteroidB612' has not been declared.");
}

//CREATE OBJECTS...

//Stars:
var sun = new Star(16, 2, 0.01, new THREE.Vector3(0, 0, 0));

//Planets:
var newBornPlanet = new Planet(3, 2, colours.BLUE, 0.01, new THREE.Vector3(32, 0, 0), 0.5, sun, 18500);
var naturePlanet = new NaturePlanet(0.01, new THREE.Vector3(48, 0, 0), 0.52, sun, 12000);
var cityPlanet = new CityPlanet(0.01, new THREE.Vector3(64, 0, 0), 0.54, sun, 25400);
var dyingPlanet = new Planet(9, 2, colours.MAGENTA, 0.01, new THREE.Vector3(92, 0, 0), 0.56, sun, 36500);

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