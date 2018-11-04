class Asteroid extends OrbitingObject
{
    constructor(initialPosition, orbitSpeed)
    {
        //Construct the superclass.
        super(initialPosition, orbitSpeed);

        //Create the asteroid.
        var geometry = new THREE.BoxGeometry( 5, 5, 5 );
        var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
        var cube = new THREE.Mesh( geometry, material );

        this.addObjectToGroup(cube);

         /**
          * Updates the planet.
          * @param {AssignmentObject} objectToOrbit - This is the object that the planet is orbiting.
          * @param {number} increment - How far to increment the planet along it's orbiting path.
          */
        this.update = function(objectToOrbit, increment)
        {
            //Move the planet along it's orbiting path.
            this.moveAlongOrbitingPath(objectToOrbit, increment);
        }
    }
}