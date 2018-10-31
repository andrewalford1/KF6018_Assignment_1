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
const geometry = new THREE.CylinderGeometry( 0.1, 0.1, 10, 8 );

//Materials.
const poleMaterial = new THREE.MeshPhongMaterial( {color: colours.WHITE} );

//Meshes.
const pole = new THREE.Mesh(geometry, poleMaterial);

var test = new THREE.Group();
test.add(pole);
test.add(newBornPlanet);

class Planet
{

    constructor(colour, radius, smoothness, initialX, initialY)
    {
        const m_colour = colour;
        const m_Radius = radius;
        const m_smoothness = smoothness;
        var m_xPos = initialX;
        var m_yPos = initialY;

        this.getName = function()
        {
            alert(initialY);
        }

        this.setPos = function(x, y)
        {
            m_xPos = x;
            m_yPos = y;
        }

        this.getPos = function()
        {
            alert(m_xPos);
        }
    }
}