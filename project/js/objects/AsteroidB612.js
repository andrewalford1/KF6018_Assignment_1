/**
 * Class representing an asteroid.
 * @extends OrbitingObject
 */
class AsteroidB612 extends OrbitingObject
{
    /**
     * Create AsteroidB612.
     * @param {Vector3} initialPosition - The initial position of the planet.
     * @param {number} orbitSpeed - How quickly the planet orbits around other objects.
     * @param {AssignmentObject} orbitingObject - This is the object that the planet is orbiting.
     * @param {number} fullOrbitMs - How long it takes the planet to fully orbit around the orbiting object.
     * @param {boolean} orbitsClockwise - If true then the object orbits the other object clockwise.
     */
    constructor(initialPosition, orbitSpeed, orbitingObject, fullOrbitMs, orbitsClockwise)
    {
        //Construct the superclass.
        super(initialPosition, orbitSpeed, orbitingObject, fullOrbitMs,
        "A description of AsteroidB612.", orbitsClockwise);

        //Create the asteroids surface.
        var asteroidGeometry = new THREE.OctahedronGeometry(0.8, 1);  
        var surfaceMaterial = new THREE.MeshStandardMaterial( 
            {color: colours.DARK_GREEN, flatShading: THREE.FlatShading, metalness: 0, roughness: 1} 
        );
        var asteroid = new THREE.Mesh(asteroidGeometry, surfaceMaterial);

        //Create the first volcano.
        var volcano1Geometry = new THREE.CylinderGeometry( 0.06, 0.15, 0.175, 10 );//new THREE.ConeGeometry( 0.2, 0.35, 10 ); 
        var volcano1 = new THREE.Mesh(volcano1Geometry, surfaceMaterial);
        volcano1.position.set(-0.4, 0.43, 0.45);
        volcano1.rotation.set(0.8, 0.0, 0.6);

        //Create the second volcano.
        var volcano2Geometry = new THREE.CylinderGeometry( 0.1, 0.2, 0.25, 10 );//new THREE.ConeGeometry( 0.2, 0.35, 10 ); 
        var volcano2 = new THREE.Mesh(volcano2Geometry, surfaceMaterial);
        volcano2.position.set(0.45, -0.5, 0.35);
        volcano2.rotation.set(2.4, 0.0, -0.6);

        //Create the third volcano.
        var volcano3Geometry = new THREE.CylinderGeometry( 0.08, 0.16, 0.18, 10 );//new THREE.ConeGeometry( 0.2, 0.35, 10 ); 
        var volcano3 = new THREE.Mesh(volcano3Geometry, surfaceMaterial);
        volcano3.position.set(-0.20, -0.3, -0.68);
        volcano3.rotation.set(-2.0, 0.0, 0.4);

        //Create the first segment of the rose's stem.
        var stemAGeometry = new THREE.CylinderGeometry( 0.01, 0.014, 0.15, 10 );//new THREE.ConeGeometry( 0.2, 0.35, 10 ); 
        var stemA = new THREE.Mesh(stemAGeometry, surfaceMaterial);
        stemA.position.set(0.2, 0.22, 0.2);
        stemA.rotation.set(0.1, 0.0, -0.4);

        //Create the second segment of the rose's stem.
        var stemBGeometry = new THREE.CylinderGeometry( 0.005, 0.01, 0.15, 10 );//new THREE.ConeGeometry( 0.2, 0.35, 10 ); 
        var stemB = new THREE.Mesh(stemBGeometry, surfaceMaterial);
        stemB.position.set(0.215, 0.355, 0.205);
        stemB.rotation.set(0.0, 0.0, 0.2);

        //Create the rose.
        var roseGeometry = new THREE.SphereGeometry( 0.05, 5, 5 );
        var roseMaterial = new THREE.MeshStandardMaterial(
            {color: colours.RED, flatShading: THREE.FlatShading, metalness: 0, roughness: 1}
        );
        var rose = new THREE.Mesh(roseGeometry, roseMaterial);
        rose.position.set(0.2, 0.42, 0.21);
        rose.rotation.set(0.0, 0.0, 0.4);

        //Create a group for rose
        var groupRose = new THREE.Group();
        groupRose.add(stemA);
        groupRose.add(stemB);
        groupRose.add(rose);
        //position of the group rose
        groupRose.position.y = 0.5;

        //Create the glass bell.
        var glassBellGeometry = new THREE.OctahedronGeometry(0.2,2);//new THREE.SphereGeometry( 0.17, 6, 6 );
        var glassBellMaterial = new THREE.MeshPhysicalMaterial(
            {color: colours.GREY, flatShading: THREE.FlatShading, metalness: 1, 
            roughness: 0.5, reflectivity: 1, transparent: true, opacity: 0.4}
        );
        var glassBell = new THREE.Mesh( glassBellGeometry, glassBellMaterial);
        glassBell.position.set(0.19, 0.8, 0.2);
        glassBell.rotation.set(-0.2, 0.0, 0.4);

        //Add objects to the group.
        this.addObjectToGroup(asteroid);
        this.addObjectToGroup(volcano1);
        this.addObjectToGroup(volcano2);
        this.addObjectToGroup(volcano3);
        this.addObjectToGroup(groupRose);
        this.addObjectToGroup(glassBell);

         /**
          * Updates the asteroid.
         * @param {number} frameTimeMs - The time in milliseconds it took to compute the previous rendered frame.
         */
        this.update = function(frameTimeMs)
        {
            //Check if the object is active.
            if(this.isActive())
            {
                //Move the asteroid along it's orbiting path.
                this.moveAlongOrbitingPath(frameTimeMs);
            }
        }
    }
}
