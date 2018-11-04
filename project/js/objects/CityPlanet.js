/**
 * Class describing an industrialised planet which has different cities around
 * it's surface. (This will be the third planet).
 * @extends Planet
 */
class CityPlanet extends Planet
{
    /**
     * Create the nature planet.
     * @param {number} rotationSpeed - How quickly the planet rotates.
     * @param {Vector3} initialPosition - The initial position of the planet.
     * @param {number} orbitSpeed - How quickly the planet orbits around other objects.
     * @param {AssignmentObject} orbitingObject - This is the object that the planet is orbiting.
     */
    constructor(rotationSpeed, initialPosition, orbitSpeed, orbitingObject)
    {
        //Construct the superclass.
        super(2, 2, colours.GREY, rotationSpeed, initialPosition, orbitSpeed, orbitingObject);

        //[stoneBuildingMaterial] A material for all the buildings that are made out of stone.
        var stoneBuildingMaterial = new THREE.MeshStandardMaterial( 
            {color: colours.GREY, flatShading: THREE.FlatShading, metalness: 0, roughness: 1} );

        //[glassMaterial] A material for all buildings that are made out of glass.
        var glassMaterial = new THREE.MeshPhysicalMaterial(
            {color: colours.GREY, flatShading: THREE.FlatShading, metalness: 1,
            roughness: 0.5, reflectivity: 1, transparent: true, opacity: 0.5}
        );

        //Create building 'A'.
        var buildingAGeometry = new THREE.BoxGeometry(0.3, 0.8, 0.3);
        var buildingA = new THREE.Mesh(buildingAGeometry, stoneBuildingMaterial);
        buildingA.position.set(0.0, 0.0, 0.0);

        //Create building 'B'.
        var buildingBGeometry = new THREE.BoxGeometry(0.3, 0.6, 0.2);
        var buildingB = new THREE.Mesh(buildingBGeometry, stoneBuildingMaterial);
        buildingB.position.set(-0.23, -0.1, -0.2);

        //Create building 'C'.
        var buildingCGeometry = new THREE.BoxGeometry(0.3, 0.4, 0.2);
        var buildingC = new THREE.Mesh(buildingCGeometry, stoneBuildingMaterial);
        buildingC.position.set(0.32, -0.2, 0.0);

        //Create building 'D'.
        var buildingDGeometry = new THREE.BoxGeometry(0.3, 0.7, 0.3);
        var buildingD = new THREE.Mesh(buildingDGeometry, stoneBuildingMaterial);
        buildingD.position.set(0.0, 2.85, 0.0);

        //Create building 'E'.
        var buildingEGeometry = new THREE.BoxGeometry(0.6, 0.14, 0.3);
        var buildingE = new THREE.Mesh(buildingEGeometry, glassMaterial);
        buildingE.position.set(0.45, 3.06, 0.0);

        //Create building 'F'.
        var buildingFGeometry = new THREE.BoxGeometry(0.3, 0.35, 0.3);
        var buildingF = new THREE.Mesh(buildingFGeometry, stoneBuildingMaterial);
        buildingF.position.set(0.6, 2.82, 0.0);

        //Group together buildings 'A', 'B', and 'C'.
        var firstGroupOfBuildings = new THREE.Group();
        firstGroupOfBuildings.add(buildingA);
        firstGroupOfBuildings.add(buildingB);
        firstGroupOfBuildings.add(buildingC);
        //Set the position and rotation of the block of buildings.
        firstGroupOfBuildings.position.set(-1.1, 1.34, 1.4);
        firstGroupOfBuildings.rotation.set(0.3, 0.6, 0.75);

        //Group together buildings 'D', 'E', and 'F'.
        var secondGroupOfBuildings = new THREE.Group();
        secondGroupOfBuildings.add(buildingD);
        secondGroupOfBuildings.add(buildingE);
        secondGroupOfBuildings.add(buildingF);
        //Set the position and rotation of the block of buildings.
        secondGroupOfBuildings.position.set(0.0, 0.9, 0.0);
        secondGroupOfBuildings.rotation.set(0.0, 0.0, 3.75);

        //Create the museum...

        //All the details to the planet.
        this.addObjectToGroup(firstGroupOfBuildings);
        this.addObjectToGroup(secondGroupOfBuildings);
    }
}
