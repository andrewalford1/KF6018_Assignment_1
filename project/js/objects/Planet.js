/**
 * Class representing a planet.
 * @extends AssignmentObject
 */
class Planet extends OrbitingObject
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
        super(initialPosition, orbitSpeed);

        //Create the planet's surface.
        const PLANET_GEOMETRY = new THREE.OctahedronGeometry(radius, smoothness);
        const PLANET_MATERIAL = new THREE.MeshStandardMaterial(
            {color: colour, flatShading: THREE.FlatShading, metalness: 0, roughness: 1}
        );
        const PLANET_SURFACE = new THREE.Mesh(PLANET_GEOMETRY, PLANET_MATERIAL);

        //Set up shadows for the planet's surface.
        //Define shadow traits.
        PLANET_SURFACE.castShadow = true;
        PLANET_SURFACE.receiveShadow = true;

        //Create the planet's pole.
        const POLE_GEOMETRY = new THREE.CylinderGeometry( 0.1, 0.1, (radius * 2.5), 4 );
        const POLE_MESH = new THREE.MeshStandardMaterial( 
            {color: colours.WHITE, flatShading: THREE.FlatShading, metalness: 0, roughness: 1} 
        );
        const POLE = new THREE.Mesh(POLE_GEOMETRY, POLE_MESH);
        POLE.visible = false;
    
        //Temp rings.
        var ORBIT_RADIUS_G = new THREE.CylinderGeometry( radius * 2, radius * 2, 0.5, 32 );
        var ORBIT_RADIUS_M = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        var ORBIT_RADIUS = new THREE.Mesh(ORBIT_RADIUS_G, ORBIT_RADIUS_M);
        ORBIT_RADIUS.visible = false;


        //Add the planet to the object group.
        this.addObjectToGroup(PLANET_SURFACE);
        this.addObjectToGroup(POLE);
        this.addObjectToGroup(ORBIT_RADIUS);

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
          * @param {AssignmentObject} objectToOrbit - This is the object that the planet is orbiting.
          * @param {number} increment - How far to increment the planet along it's orbiting path.
          */
        this.update = function(objectToOrbit, increment)
        {
            //Spin the planet on its axis.
            this.getObject().rotation.y += rotationSpeed;

            //Move the planet along it's orbiting path.
            this.moveAlongOrbitingPath(objectToOrbit, increment);

//             for(i = 0; i < objectsInOrbit.length; i++)
//             {
//                 objectsInOrbit[i].update(this, incrementor); 
//             }
        }
    }
}


