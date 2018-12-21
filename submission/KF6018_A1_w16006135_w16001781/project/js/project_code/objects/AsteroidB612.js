/**
 * Class representing an asteroid.
 * @extends OrbitingObject
 * @author Sabina Irimia (w16001781)
 */
class AsteroidB612 extends OrbitingObject
{
    /**
     * Create AsteroidB612.
     * @param {Vector3} initialPosition - The initial position of the asteroid.
     * @param {number} orbitSpeed - How quickly the asteroid orbits around other objects.
     * @param {AssignmentObject} orbitingObject - This is the object that the asteroid is orbiting.
     * @param {number} fullOrbitMs - How long it takes the asteroid to fully orbit around the orbiting object.
     * @param {boolean} orbitsClockwise - If true then the object orbits the other object clockwise.
     */
    constructor(initialPosition, orbitSpeed, orbitingObject, fullOrbitMs, orbitsClockwise)
    {
        //Construct the superclass.
        super(initialPosition, orbitSpeed, orbitingObject, fullOrbitMs, orbitsClockwise);

        //Set the name for this asteroid.
        this.getObject().name = 'Asteroid: B612';

        //Scale the asteroid.
        this.getObject().scale.set(2, 2, 2); 

        //Create the asteroids surface.
        var asteroidGeometry = new THREE.OctahedronGeometry(0.8, 1);  
        var surfaceMaterial = new THREE.MeshStandardMaterial( 
            {color: colours.DARK_GREEN, flatShading: THREE.FlatShading, metalness: 0, roughness: 1} 
        );
        var asteroid = new THREE.Mesh(asteroidGeometry, surfaceMaterial);

        //Create the first volcano.
        var volcano1Geometry = new THREE.CylinderGeometry( 0.06, 0.15, 0.175, 10 );//new THREE.ConeGeometry( 0.2, 0.35, 10 ); 
        var volcano1 = new THREE.Mesh(volcano1Geometry, surfaceMaterial);
        volcano1.castShadow = true;
        volcano1.receiveShadow = true;
        volcano1.position.set(-0.4, 0.43, 0.45);//position
        volcano1.rotation.set(0.8, 0.0, 0.6);//rotation

        //Create the second volcano.
        var volcano2Geometry = new THREE.CylinderGeometry( 0.1, 0.2, 0.25, 10 );//new THREE.ConeGeometry( 0.2, 0.35, 10 ); 
        var volcano2 = new THREE.Mesh(volcano2Geometry, surfaceMaterial);
        volcano2.castShadow = true;
        volcano2.receiveShadow = true;
        volcano2.position.set(0.45, -0.5, 0.35);//position
        volcano2.rotation.set(2.4, 0.0, -0.6);//rotation

        //Create the third volcano.
        var volcano3Geometry = new THREE.CylinderGeometry( 0.08, 0.16, 0.18, 10 );//new THREE.ConeGeometry( 0.2, 0.35, 10 ); 
        var volcano3 = new THREE.Mesh(volcano3Geometry, surfaceMaterial);
        volcano3.castShadow = true;
        volcano3.receiveShadow = true;
        volcano3.position.set(-0.20, -0.3, -0.68);//position
        volcano3.rotation.set(-2.0, 0.0, 0.4);//rotation

        //Create the first segment of the rose's stem.
        var roseStemAGeometry = new THREE.CylinderGeometry( 0.01, 0.014, 0.15, 10 );//new THREE.ConeGeometry( 0.2, 0.35, 10 );
        var roseStemA = new THREE.Mesh(roseStemAGeometry, surfaceMaterial);
        roseStemA.castShadow = true;
        roseStemA.receiveShadow = true;
        roseStemA.position.set(0.2, 0.22, 0.2);//position
        roseStemA.rotation.set(0.1, 0.0, -0.4);//rotation

        //Create the second segment of the rose's stem.
        var roseStemBGeometry = new THREE.CylinderGeometry( 0.005, 0.01, 0.15, 10 );//new THREE.ConeGeometry( 0.2, 0.35, 10 ); 
        var roseStemB = new THREE.Mesh(roseStemBGeometry, surfaceMaterial);
        roseStemB.castShadow = true;
        roseStemB.receiveShadow = true;
        roseStemB.position.set(0.215, 0.355, 0.205);//position
        roseStemB.rotation.set(0.0, 0.0, 0.2);//rotation

        //Create the rose.
        var roseGeometry = new THREE.TorusKnotBufferGeometry(0.007, 0.06, 33, 3, 2, 17);
        var roseMaterial = new THREE.MeshStandardMaterial({color: colours.RED, flatShading: THREE.FlatShading, metalness: 0, roughness: 1});
        var rose = new THREE.Mesh(roseGeometry, roseMaterial);
        rose.castShadow = true;
        rose.receiveShadow = true;
        rose.position.set(0.2, 0.42, 0.21);
        rose.rotation.set(-0.5, 0.4, 0.4);

        //Create a group for rose
        var groupRose = new THREE.Group();
        groupRose.add(roseStemA);
        groupRose.add(roseStemB);
        groupRose.add(rose);
        //position of the group rose
        groupRose.position.set(0.0, 0.5, 0.0);

        //Create the glass bell
        //Bottom part of the glass bell 
        var glassBellPartAGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.3, 10, 2.0, true, 0.0, 6.3);
        var glassBellMaterial = new THREE.MeshPhysicalMaterial({color: colours.GREY, flatShading: THREE.FlatShading,
                                metalness: 0.5, roughness: 0.3, reflectivity: 1, transparent: true, opacity: 0.4});
        var glassBellPartA = new THREE.Mesh( glassBellPartAGeometry, glassBellMaterial );
        glassBellPartA.castShadow = true;
        glassBellPartA.receiveShadow = true;
        glassBellPartA.position.set(0.21, 1.3, 0.21);
        glassBellPartA.rotation.set(0.4, 0.0, -0.4);
        //Top part of the glass bell
        var glassBellPartBGeometry = new THREE.SphereGeometry(0.17, 10, 4, 0, 6.3, 0, 1.1);
        var glassBellPartB = new THREE.Mesh( glassBellPartBGeometry, glassBellMaterial );
        glassBellPartB.castShadow = true;
        glassBellPartB.receiveShadow = true;
        glassBellPartB.position.set(0.24, 1.36, 0.235);
        glassBellPartB.rotation.set(0.28, -0.3, -0.4);

        var glassBell = new THREE.Group();
        glassBell.add(glassBellPartA);
        glassBell.add(glassBellPartB);
        glassBell.position.set(0.0, -0.5, 0.0);

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
