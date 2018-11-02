class Planet extends AssignmentObject
{
    constructor(radius, smoothness, colour, rotationSpeed, initialPosition, orbitSpeed)
    {
        //Construct the superclass.
        super(initialPosition);

        //[m_orbitSpeed] How quickly the planet orbits other objects.
        var m_orbitSpeed = orbitSpeed;

        //Create the planet's surface.
        const M_GEOMETRY = new THREE.OctahedronGeometry(radius, smoothness);
        const M_MATERIAL = new THREE.MeshStandardMaterial( {color: colour, flatShading: THREE.FlatShading, metalness: 0, roughness: 1} );
        const planetSurface = new THREE.Mesh(M_GEOMETRY, M_MATERIAL);

        //Set up shadows for the planet's surface.
        //Define shadow traits.
        planetSurface.castShadow = true;
        planetSurface.receiveShadow = true;

        //Create the planet's pole.
        const POLE_GEOMETRY = new THREE.CylinderGeometry( 0.1, 0.1, (radius * 2.5), 4 );
        const POLE_MESH = new THREE.MeshStandardMaterial( {color: colours.WHITE, flatShading: THREE.FlatShading, metalness: 0, roughness: 1} );
        const POLE = new THREE.Mesh(POLE_GEOMETRY, POLE_MESH);
        POLE.visible = false;

        //[PLANET] Groups all items that make up the planet.
        const PLANET = new THREE.Group();
        PLANET.add(planetSurface);
        PLANET.add(POLE);

        this.addObjectToGroup(PLANET);

        /**
         * @brief Sets the visibility of the planet's pole.
         * @param visible - If true the the planet's pole will be visible,
         *                  otherwise the pole will be invisible.
         */
        this.showPole = function(visible)
        {
            POLE.visible = visible;
        }

        /**
         * @brief Updates the planet.
         * @param orbitingObject - This is the object that the planet orbits around.
         * @param increment - Used to move the planet along it's orbiting path.
         */
        this.updatePlanet = function(orbitingObject, increment)
        {
            //Spin the planet on its axis.
            PLANET.rotation.y += rotationSpeed;

            //[distanceBetweenObjects] Work out the distance between the planet and the object it is orbiting.
            var distanceBetweenObjects =  orbitingObject.getPosition().distanceTo(this.getPosition());

            //Calculate the new position of the planets orbit.
            this.setPosition(new THREE.Vector3(
                orbitingObject.getXPosition() + distanceBetweenObjects * Math.sin(Math.PI + (increment * m_orbitSpeed)),
                0,
                orbitingObject.getXPosition() + distanceBetweenObjects * Math.cos(Math.PI + (increment * m_orbitSpeed))
            ));
        }

        //TASKS: Remove planet as group. Find a way to put update() in the superclass and override it in this class.
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