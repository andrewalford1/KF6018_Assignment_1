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
     * @param {number} fullOrbitMs - How long it takes the planet to fully orbit around the orbiting object.
     */
    constructor(rotationSpeed, initialPosition, orbitSpeed, orbitingObject, fullOrbitMs)
    {
        //Construct the superclass.
        super(2, 2, colours.GREY, rotationSpeed, initialPosition, orbitSpeed, orbitingObject, fullOrbitMs,
        "Description of the city planet");

        //[stoneBuildingMaterial] A material for all the buildings that are made out of stone.
        var stoneBuildingMaterial = new THREE.MeshPhysicalMaterial( 
            {color: colours.GREY, flatShading: THREE.FlatShading, metalness: 0, roughness: 1} );

        //[glassMaterial] A material for all buildings that are made out of glass.
        var glassMaterial = new THREE.MeshPhysicalMaterial(
            {color: colours.GREY, flatShading: THREE.FlatShading, metalness: 1,
            roughness: 0.5, reflectivity: 1, transparent: true, opacity: 0.5}
        );

        //Create protection shield 
        var protectionShieldGeometry = new THREE.IcosahedronGeometry(3,1);
        var protectionShieldWireFrameMaterial = new THREE.MeshPhysicalMaterial(
            {color: colours.LIGHT_BLUE, flatShading: THREE.FlatShading, metalness: 0, roughness: 1, 
            roughness: 0.5, reflectivity: 1, wireframe: true} );
        var protectionShieldMaterial = new THREE.MeshPhysicalMaterial(
            {color: 0xA3FDFF, flatShading: THREE.FlatShading, metalness: 0, roughness: 1,
            roughness: 0.5, reflectivity: 1, transparent: true, opacity: 0.5} );
        var protectionWireShield = new THREE.Mesh(protectionShieldGeometry, protectionShieldWireFrameMaterial);
        var protectionShield = new THREE.Mesh(protectionShieldGeometry,protectionShieldMaterial); 
        
//-------------------------------------------------------------------------------------------------
        //Create building 'A'.
        var buildingAGeometry = new THREE.BoxGeometry(0.3, 0.8, 0.3);
        var buildingA = new THREE.Mesh(buildingAGeometry, stoneBuildingMaterial);
        buildingA.castShadow = true;
        buildingA.receiveShadow = true;
        buildingA.position.set(0.0, 0.0, 0.0);

        //Create building 'B'.
        var buildingBGeometry = new THREE.BoxGeometry(0.3, 0.6, 0.2);
        var buildingB = new THREE.Mesh(buildingBGeometry, stoneBuildingMaterial);
        buildingB.castShadow = true;
        buildingB.receiveShadow = true;
        buildingB.position.set(-0.23, -0.1, -0.2);

        //Create building 'C'.
        var buildingCGeometry = new THREE.BoxGeometry(0.3, 0.4, 0.2);
        var buildingC = new THREE.Mesh(buildingCGeometry, stoneBuildingMaterial);
        buildingC.castShadow = true;
        buildingC.receiveShadow = true;
        buildingC.position.set(0.32, -0.2, 0.0);
        
//-----------------------------------------------------------------------------------------------------
        //Create building 'D'.
        var buildingDGeometry = new THREE.BoxGeometry(0.3, 0.7, 0.3);
        var buildingD = new THREE.Mesh(buildingDGeometry, stoneBuildingMaterial);
        buildingD.castShadow = true;
        buildingD.receiveShadow = true;
        buildingD.position.set(0.0, 2.85, 0.0);

        //Create building 'E'.
        var glassBridgeGeometry = new THREE.BoxGeometry(0.6, 0.14, 0.3);
        var glassBridge = new THREE.Mesh(glassBridgeGeometry, stoneBuildingMaterial);//glassMaterial
        glassBridge.castShadow = true;
        glassBridge.receiveShadow = true;
        glassBridge.position.set(0.45, 3.06, 0.0);

        //Create building 'F'.
        var buildingFGeometry = new THREE.BoxGeometry(0.3, 0.35, 0.3);
        var buildingF = new THREE.Mesh(buildingFGeometry, stoneBuildingMaterial);
        buildingF.castShadow = true;
        buildingF.receiveShadow = true;
        buildingF.position.set(0.6, 2.82, 0.0);

//-------------------------------------------------------------------------------------------------------------
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
        secondGroupOfBuildings.add(glassBridge);
        secondGroupOfBuildings.add(buildingF);
        //Set the position and rotation of the block of buildings.
        secondGroupOfBuildings.position.set(0.0, 0.9, 0.0);
        secondGroupOfBuildings.rotation.set(0.0, 0.0, 3.75);

//-----------------------------------------------------------------------------------------------------------------
        //Create the museum...
        var museumGeometry =  new THREE.BoxGeometry( 0.3,0.35, 1.0 );
        //Part 'A' of the museum
        var museumPartA = new THREE.Mesh( museumGeometry, stoneBuildingMaterial );
        museumPartA.castShadow = true;
        museumPartA.receiveShadow = true;
        museumPartA.position.set(0.0, 0.0, 0.0);
        museumPartA.rotation.set(0.0, 0.0, 0.0);
        //Part 'B' of the museum
        var museumPartB = new THREE.Mesh( museumGeometry, stoneBuildingMaterial );
        museumPartB.castShadow = true;
        museumPartB.receiveShadow = true;
        museumPartB.position.set(0.4, 0.0, 0.34);
        museumPartB.rotation.set(0.0, 1.6, 0.0);
        //Part 'C' of the museum
        var museumPartC = new THREE.Mesh( museumGeometry, stoneBuildingMaterial );
        museumPartC.castShadow = true;
        museumPartC.receiveShadow = true;
        museumPartC.position.set(0.4, 0.0, -0.355);
        museumPartC.rotation.set(0.0, 1.6, 0.0);
        //Part 'D' of the museum
        var museumPartD = new THREE.Mesh( museumGeometry, stoneBuildingMaterial );
        museumPartD.castShadow = true;
        museumPartD.receiveShadow = true;
        museumPartD.position.set(0.5, 0.0, -0.37);
        museumPartD.rotation.set(0.0, 0.0, 0.0);
        //Part 'E' of the museum

        var museumGroup = new THREE.Group();
        museumGroup.add(museumPartA);
        museumGroup.add(museumPartB);
        museumGroup.add(museumPartC);
        museumGroup.add(museumPartD);
        //museumGroup.add(museumPartE);
        museumGroup.position.set(1.5, 1.2, 0.0);
        museumGroup.rotation.set(0.0, 0.0, -1.1);
//---------------------------------------------------------------------------------------------------

        //All the details to the planet.
        this.addObjectToGroup(firstGroupOfBuildings);
        this.addObjectToGroup(secondGroupOfBuildings);
        this.addObjectToGroup(protectionWireShield);
        this.addObjectToGroup(protectionShield);
        this.addObjectToGroup(museumGroup);
    }
}
