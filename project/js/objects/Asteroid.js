/**
 * Class representing an asteroid.
 * @
 */
class Asteroid extends OrbitingObject
{
    constructor(initialPosition, orbitSpeed, orbitingObject)
    {
        //Construct the superclass.
        super(initialPosition, orbitSpeed, orbitingObject);

        //Create the asteroids surface.
        var asteroidGeometry = new THREE.OctahedronGeometry(1, 1);  
        var surfaceMaterial = new THREE.MeshStandardMaterial( 
            {color: colours.BROWN, flatShading: THREE.FlatShading, metalness: 0, roughness: 1} 
        );
        var asteroid = new THREE.Mesh(asteroidGeometry, surfaceMaterial);

        //Add the asteroid to the group.
        this.addObjectToGroup(asteroid);
        
         /**
          * Updates the planet.
          * @param {number} increment - How far to increment the planet along it's orbiting path.
          */
        this.update = function(increment)
        {
            //Move the planet along it's orbiting path.
            this.moveAlongOrbitingPath(increment);
        }
    }
}
