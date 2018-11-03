/**
 * Class representing a planet.
 * @extends AssignmentObject
 */
class Planet extends AssignmentObject
{
    /**
     * Create a planet.
     * @param {number} radius - The radius of the planet.
     * @param {number} smoothness - How smooth the surface of the planet will be.
     * @param {colour} colour - The colour that the planet will be.
     * @param {number} rotationSpeed - How quickly the planet rotates.
     * @param {Vector3} initialPosition - The initial position of the planet.
     * @param {number} orbitSpeed - How quickly the planet orbits around other objects.
     */
    constructor(radius, smoothness, colour, rotationSpeed, initialPosition, orbitSpeed)
    {
        //Construct the superclass.
        super(initialPosition);

        //[m_orbitSpeed] How quickly the planet orbits other objects.
        var m_orbitSpeed = orbitSpeed;

        //Create the planet's surface.
        const PLANET_GEOMETRY = new THREE.OctahedronGeometry(radius, smoothness);
        const PLANET_MATERIAL = new THREE.MeshStandardMaterial( {color: colour, flatShading: THREE.FlatShading, metalness: 0, roughness: 1} );
        const PLANET_SURFACE = new THREE.Mesh(PLANET_GEOMETRY, PLANET_MATERIAL);

        //Set up shadows for the planet's surface.
        //Define shadow traits.
        PLANET_SURFACE.castShadow = true;
        PLANET_SURFACE.receiveShadow = true;

        //Create the planet's pole.
        const POLE_GEOMETRY = new THREE.CylinderGeometry( 0.1, 0.1, (radius * 2.5), 4 );
        const POLE_MESH = new THREE.MeshStandardMaterial( {color: colours.WHITE, flatShading: THREE.FlatShading, metalness: 0, roughness: 1} );
        const POLE = new THREE.Mesh(POLE_GEOMETRY, POLE_MESH);
        POLE.visible = false;

        //Add the planet to the object group.
        this.addObjectToGroup(PLANET_SURFACE);
        this.addObjectToGroup(POLE);

        //PUBLIC METHODS...

         /**
          * Sets the visibility of the planet's pole.
          * @param {boolean} visible - If true then the planer's pole will be visible,
          *                            otherwise the pole will be invisible.
          */
        this.showPole = function(visible)
        {
            POLE.visible = visible;
        }

         /**
          * Updates the planet.
          * @param {AssignmentObject} orbitingObject - This is the object that the planet is orbiting.
          * @param {number} increment - How far to increment the planet along it's orbiting path.
          */
        this.update = function(orbitingObject, increment)
        {
            //Spin the planet on its axis.
            this.getObject().rotation.y += rotationSpeed;

            //[distanceBetweenObjects] Work out the distance between the planet and the object it is orbiting.
            var distanceBetweenObjects =  orbitingObject.getPosition().distanceTo(this.getPosition());

            //Calculate the new position of the planets orbit.
            this.setPosition(new THREE.Vector3(
                orbitingObject.getXPosition() + distanceBetweenObjects * Math.sin(Math.PI + (increment * m_orbitSpeed)),
                0,
                orbitingObject.getXPosition() + distanceBetweenObjects * Math.cos(Math.PI + (increment * m_orbitSpeed))
            ));
        }
    }
}

// class NewBornPlanet extends Planet
// {
//     constructor(radius, smoothness, colour, rotationSpeed, initialX, initialY, initialZ)
//     {
//         //Construct the superclass.
//         super(radius, smoothness, colour, rotationSpeed, initialX, initialY, initialZ);

//         this.addMountians = function()
//         {
//             //Create the mountians.
//             var geometry = new THREE.ConeGeometry( 5, 5, 3 );
//             var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
//             var cone = new THREE.Mesh( geometry, material );

//             //Set position relative to the planet.
//             cone.position.set(-10,0,0);
            
//             //Add the mountians to the planet.
//             //this.addObjectToGroup(cone);
//         }

//         this.addMountians();
//     }
// }