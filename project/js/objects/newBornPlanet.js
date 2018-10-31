//Geometries.
const geometry = new THREE.CylinderGeometry( 0.1, 0.1, 10, 8 );

//Materials.
const poleMaterial = new THREE.MeshPhongMaterial( {color: colours.WHITE} );

//Meshes.
const pole = new THREE.Mesh(geometry, poleMaterial);

var test = new THREE.Group();
test.add(pole);

class Planet
{

    constructor(radius, smoothness, colour, initialX, initialY, initialZ)
    {
        //Create the planet's surface.
        const M_GEOMETRY = new THREE.OctahedronGeometry(radius, smoothness);
        const M_MATERIAL = new THREE.MeshStandardMaterial( {color: colour, flatShading: THREE.FlatShading, metalness: 0, roughness: 1} );
        const planetSurface = new THREE.Mesh(M_GEOMETRY, M_MATERIAL);

        //Set up shadows for the planet's surface.
        //Define shadow traits.
        planetSurface.castShadow = true;
        planetSurface.receiveShadow = true;

        var m_xPosition = initialX;
        var m_yPosition = initialY;
        var m_zPosition = initialZ;

        this.setPosition = function(x, y, z)
        {
            m_xPos = x;
            m_yPos = y;
            m_zPos = z;
        }

        this.addToScene = function(scene)
        {
            scene.add(planetSurface);
        }

        this.update = function()
        {
            planetSurface.rotation.y += 0.01;
        }
    }
}