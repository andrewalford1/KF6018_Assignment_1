const RADIUS = 3;
const SMOOTHNESS = 2;

//Geometries.
const planetGeometry = new THREE.OctahedronGeometry(RADIUS, SMOOTHNESS);
//Meshes.
const newBornPlanet = new THREE.Mesh(planetGeometry, getPlanetMaterial(colours.SIENNA));

//Define shadow traits.
newBornPlanet.castShadow = true;
newBornPlanet.receiveShadow = true;

//Set rotation.
//newBornPlanet.rotation.z = Math.PI / -16;


//Geometries.
var geometry = new THREE.CylinderGeometry( 0.1, 0.1, 10, 8 );

//Materials.
const poleMaterial = new THREE.MeshPhongMaterial( {color: colours.WHITE} );

//Meshes.
const pole = new THREE.Mesh(geometry, poleMaterial);
