/**
 * Class describing a nature planet which only has natural elements on the surface,
 * containing trees, lakes, and mountians. (This will be the second planet).
 * @extends Planet
 */
class NaturePlanet extends Planet 
{
    /**
     * Create the nature planet.
     * @param {number} rotationSpeed - How quickly the planet rotates.
     * @param {Vector3} initialPosition - The initial position of the planet.
     * @param {number} orbitSpeed - How quickly the planet orbits around other objects.
     * @param {AssignmentObject} orbitingObject - This is the object that the planet is orbiting.
     * @param {number} fullOrbitMs - How long it takes the planet to fully orbit around the orbiting object.
     */
    constructor(rotationSpeed, initialPosition, orbitSpeed, AssignmentObject, fullOrbitMs)
    {
        //Construct the superclass.
        super(2, 2, colours.GREEN, rotationSpeed, initialPosition, orbitSpeed, AssignmentObject, fullOrbitMs,
        "Description of the nature planet.");

        //The material for tree crowns and trunks
        var crownMaterial = new THREE.MeshPhysicalMaterial( {color: colours.DARK_GREEN, flatShading: THREE.FlatShading, metalness: 0.0, roughness: 0.6, reflectivity: 0.5});
        var trunkMaterial = new THREE.MeshPhysicalMaterial( {color: colours.BROWN, flatShading: THREE.FlatShading, metalness: 0.0, roughness: 1, reflectivity: 0.5});
        var truffulaTreeCrownPinkMaterial = new THREE.MeshPhysicalMaterial( {color: colours.PINK, flatShading: THREE.FlatShading, metalness: 0.0, roughness: 0.8, reflectivity: 0.5});
        var truffulaTreeCrownOrangeMaterial = new THREE.MeshPhysicalMaterial( {color: colours.ORANGE, flatShading: THREE.FlatShading, metalness: 0.0, roughness: 0.8, reflectivity: 0.5});
        var truffulaTreeTrunkMaterial = new THREE.MeshPhysicalMaterial( {color: colours.BLACK, flatShading: THREE.FlatShading, metalness: 0.0, roughness: 1, reflectivity: 0.5});

        //Tree Crowns Geometry
        var pineTreeCrownGeometry = new THREE.ConeGeometry( 0.3, 0.6, 10 );
        var regularTreeCrownGeometry = new THREE.TetrahedronGeometry( 0.2, 2 );
        var truffulaTreeCrownGeometry = new THREE.SphereGeometry( 0.16, 8, 8 );
        //Tree Trunks Geometry
        var pineTreeTrunkGeometry = new THREE.CylinderGeometry( 0.06, 0.1, 0.2, 10 );
        var regularTreeTrunkGeometry = new THREE.CylinderGeometry( 0.03, 0.06, 0.6, 10 );
        var truffulaTreeTrunkGeometry = new THREE.CylinderGeometry( 0.02, 0.02, 0.6, 10 );
        
        //Lake Geometry
        var lakeBaseGeometry = new THREE.CylinderGeometry( 1.1, 1.4, 0.6, 18, true ,0, 6.3);
        var lakeWaterGeometry = new THREE.CylinderGeometry( 1.11, 1, 0.01, 18);
        //Lake materials
        var lakeBaseMaterial =new THREE.MeshPhysicalMaterial( {color: colours.GREEN, flatShading: THREE.FlatShading, metalness: 0.3, roughness: 2, side: THREE.DoubleSide} );
        var lakeWaterMaterial = new THREE.MeshPhysicalMaterial( { color: colours.LIGHT_BLUE, flatShading: THREE.FlatShading, metalness: 0.3, roughness: 0.8, reflectivity: 0.5, transparent: true, opacity: 0.9});
        
        //Mountain Geometry
        var mountainGeometry = new THREE.TetrahedronGeometry(1,1);
        //Mountain Material
        var mountainMaterial = new THREE.MeshPhysicalMaterial({color: colours.GREY, flatShading: THREE.FlatShading, metalness: 0, roughness: 1} );

        
//------------------------------------------------------------------------------------------------------
        //Create pine tree 1
        //pine tree crown
        var pineTree1Crown = new THREE.Mesh( pineTreeCrownGeometry, crownMaterial );
        pineTree1Crown.castShadow = true;
        pineTree1Crown.position.set(0.0, 0.4, 0.0);//set position of the pine tree crown
        //pine tree trunk
        var pineTree1Trunk = new THREE.Mesh( pineTreeTrunkGeometry, trunkMaterial );
        pineTree1Trunk.castShadow = true;
        pineTree1Trunk.position.set(0.0, 0.05, 0.0);//set position of the pine tree trunk
        pineTree1Trunk.receiveShadow = true;

        //Create pine tree 1 group
        var pineTree1Group = new THREE.Group();
        pineTree1Group.add(pineTree1Crown);
        pineTree1Group.add(pineTree1Trunk);
        pineTree1Group.position.set(0.0, 0.0, -2.0); //set position of the tree
        //pineTree1Group.position.set(0.0, 1.0, 0.0);
        pineTree1Group.rotation.set(-1.4, 0.0, 0.0);//set rotation of the tree

        //Create pine tree 2
        //star
        //var starGeometry = new THREE.SphereGeometry( 0.05, 8, 8 );
        var starGeometry = new THREE.SphereGeometry( 0.06, 8, 2, 0, 6.3 ,3, 3.3 );
        var star = new THREE.Mesh( starGeometry , truffulaTreeCrownPinkMaterial );
        star.castShadow = true;
        star.position.set(0.0, 0.76, 0.0);//set position of the pine tree crown (0.0, 0.72, 0.0
        //star.rotation.set(2.0, 0.0, 0.0);
        //pineTree.setPineTreeCrown(0.3, 0.6, 10);
        var pineTree2Crown = new THREE.Mesh( pineTreeCrownGeometry, crownMaterial );
        pineTree2Crown.castShadow = true;
        pineTree2Crown.receiveShadow = true;
        pineTree2Crown.position.set(0.0, 0.4, 0.0);
        //pineTree.setPineTreeTrunk(0.06, 0.1, 0.2, 10 );
        var pineTree2Trunk = new THREE.Mesh( pineTreeTrunkGeometry, trunkMaterial );
        pineTree2Trunk.castShadow = true;
        pineTree2Trunk.receiveShadow = true;
        pineTree2Trunk.position.set(0.0, 0.05, 0.0);
        

        //Create pine tree 2 group
        var pineTree2Group = new THREE.Group();
        pineTree2Group.add(star);
        pineTree2Group.add(pineTree2Crown);//add tree crown
        pineTree2Group.add(pineTree2Trunk);//add tree trunk
        pineTree2Group.position.set(0.0, 2.0, 0.0);//position
        //rotate the pine tree
        //pineTree2Group.rotation.set(0.4, 0.0, 0.0);

//-------------------------------------------------------------------------------------------------
        //Create regular tree 1 
        //tree crown
        var regularTree1Crown = new THREE.Mesh( regularTreeCrownGeometry, crownMaterial );
        regularTree1Crown.castShadow = true;
        regularTree1Crown.receiveShadow = true;
        regularTree1Crown.position.set(0.0, 0.4, 0.0);//position
        //tree trunk
        var regularTree1Trunk = new THREE.Mesh( regularTreeTrunkGeometry, trunkMaterial );
        regularTree1Trunk.castShadow = true;
        regularTree1Trunk.receiveShadow = true;
        regularTree1Trunk.position.set(0.0, 0.0, 0.0);//position

        //Create regular tree 1 group
        var regularTree1Group = new THREE.Group();
        regularTree1Group.add(regularTree1Crown);
        regularTree1Group.add(regularTree1Trunk);
        //position
        regularTree1Group.position.set(-1.5, 1.5, 0.0);
        //rotate the buildings
        regularTree1Group.rotation.set(0.0, 0.1, 0.6);

        //Create regular tree 2 
        //tree crown
        var regularTree2Crown = new THREE.Mesh( regularTreeCrownGeometry, crownMaterial );
        regularTree2Crown.castShadow = true;
        regularTree2Crown.receiveShadow = true;
        regularTree2Crown.position.set(0.0, 0.4, 0.0);//position
        //tree trunk
        var regularTree2Trunk = new THREE.Mesh( regularTreeTrunkGeometry, trunkMaterial );
        regularTree2Trunk.castShadow = true;
        regularTree2Trunk.receiveShadow = true;
        regularTree2Trunk.position.set(0.0, 0.0, 0.0);//position

        //Create regular tree 2 group
        var regularTree2Group = new THREE.Group();
        regularTree2Group.add(regularTree2Crown);
        regularTree2Group.add(regularTree2Trunk);
        //position
        regularTree2Group.position.set(-1.6, 1.4, 0.4);
        //rotate tree
        regularTree2Group.rotation.set(0.3, 0.1, 0.6);

        //Create regular tree 3 
        //tree crown
        var regularTree3Crown = new THREE.Mesh( regularTreeCrownGeometry, crownMaterial );
        regularTree3Crown.castShadow = true;
        regularTree3Crown.receiveShadow = true;
        regularTree3Crown.position.set(0.0, 0.4, 0.0);//position
        //tree trunk
        var regularTree3Trunk = new THREE.Mesh( regularTreeTrunkGeometry, trunkMaterial );
        regularTree3Trunk.castShadow = true;
        regularTree3Trunk.receiveShadow = true;
        regularTree3Trunk.position.set(0.0, 0.0, 0.0);//position

        //Create regular tree 3 group
        var regularTree3Group = new THREE.Group();
        regularTree3Group.add(regularTree3Crown);
        regularTree3Group.add(regularTree3Trunk);
        //position
        regularTree3Group.position.set(-1.9, 1.0, 0.4);
        //rotate tree
        regularTree3Group.rotation.set(0.1, 0.3, 0.8);

        //Create regular tree 4 
        //tree crown
        var regularTree4Crown = new THREE.Mesh( regularTreeCrownGeometry, crownMaterial );
        regularTree4Crown.castShadow = true;
        regularTree4Crown.receiveShadow = true;
        regularTree4Crown.position.set(0.0, 0.4, 0.0);//position
        //tree trunk
        var regularTree4Trunk = new THREE.Mesh( regularTreeTrunkGeometry, trunkMaterial );
        regularTree4Trunk.castShadow = true;
        regularTree4Trunk.receiveShadow = true;
        regularTree4Trunk.position.set(0.0, 0.0, 0.0);//position

        //Create regular tree 4 group
        var regularTree4Group = new THREE.Group();
        regularTree4Group.add(regularTree4Crown);
        regularTree4Group.add(regularTree4Trunk);
        //position
        regularTree4Group.position.set(-2.1, 0.5, 0.15);
        //rotate tree
        regularTree4Group.rotation.set(0.0, 0.0, 1.2);


//--------------------------------------------------------------------------------------------
        //Create truffula tree 1
        var truffulaTree1Crown = new THREE.Mesh( truffulaTreeCrownGeometry, truffulaTreeCrownPinkMaterial );
        truffulaTree1Crown.castShadow = true;
        truffulaTree1Crown.receiveShadow = true;
        truffulaTree1Crown.position.set(1.0, 2.3, 0.0); //position
        //truffulaTree1Crown.rotation.set(0.0, 0.0, 0.0);//rotation of the truffula tree crown
        //tree trunk
        var truffulaTree1Trunk = new THREE.Mesh( truffulaTreeTrunkGeometry, truffulaTreeTrunkMaterial );
        truffulaTree1Trunk.castShadow = true;
        truffulaTree1Trunk.receiveShadow = true;
        truffulaTree1Trunk.position.set(1.0, 1.9, 0.0);//poition of the truffula tree trunk

        //Create truffula tree 1 group
        var truffulaTree1Group = new THREE.Group();
        truffulaTree1Group.add(truffulaTree1Crown);
        truffulaTree1Group.add(truffulaTree1Trunk);
        //positin of the truffula tree 1 group
        truffulaTree1Group.position.set(0.0, 0.0, 0.0);
        //rotation of the truffula tree 1 group
        truffulaTree1Group.rotation.set(0.4, 0.4, 0.4);

        //Create truffula tree 2
        var truffulaTree2Crown = new THREE.Mesh( truffulaTreeCrownGeometry, truffulaTreeCrownOrangeMaterial );
        truffulaTree2Crown.castShadow = true;
        truffulaTree2Crown.receiveShadow = true;
        truffulaTree2Crown.position.set(1.0, 2.3, 0.0); //position
        //truffulaTree1Crown.rotation.set(0.0, 0.0, 0.0);//rotation of the truffula tree crown
        //tree trunk
        var truffulaTree2Trunk = new THREE.Mesh( truffulaTreeTrunkGeometry, truffulaTreeTrunkMaterial );
        truffulaTree2Trunk.castShadow = true;
        truffulaTree2Trunk.receiveShadow = true;
        truffulaTree2Trunk.position.set(1.0, 1.9, 0.0);//poition of the truffula tree trunk

        //Create truffula tree 2 group
        var truffulaTree2Group = new THREE.Group();
        truffulaTree2Group.add(truffulaTree2Crown);
        truffulaTree2Group.add(truffulaTree2Trunk);
        //positin of the truffula tree 1 group
        truffulaTree2Group.position.set(0.5, 0.0, 0.1);
        //rotation of the truffula tree 1 group
        truffulaTree2Group.rotation.set(0.4, 0.4, 0.4);
//----------------------------------------------------------------------
        //Create a lake
        //Lake Base
        var lakeBase = new THREE.Mesh( lakeBaseGeometry, lakeBaseMaterial );
        lakeBase.receiveShadow = true;
        //lakeBase.castShadow = true;
        lakeBase.position.set(0.0, 0.0, 0.0);//position
        //Lake Top
        var lakeWater = new THREE.Mesh(lakeWaterGeometry, lakeWaterMaterial);
        lakeWater.receiveShadow = true;
        lakeWater.position.set(0.0, 0.295, 0.0);//position

        var lakeGroup = new THREE.Group();
        lakeGroup.add(lakeBase);
        lakeGroup.add(lakeWater);
        lakeGroup.position.set(0.0, 1.6, 0.0);//position 1.6, 0.0, 0.0

//-------------------------------------------------------------------------------------
        //Create mountians...
        //Mountain A
        var mountainA = new THREE.Mesh(mountainGeometry,mountainMaterial);
        mountainA.castShadow = true;
        mountainA.receiveShadow = true;
        mountainA.position.set(0.0, 1.0, 0.0);
        //Mountain B
        var mountainB = new THREE.Mesh(mountainGeometry,mountainMaterial);
        mountainB.castShadow = true;
        mountainB.receiveShadow = true;
        mountainB.position.set(0.6, 0.8, -0.3);
        mountainB.rotation.set(0.3, 0.8, 0.0);
        //Mountain C
        var mountainC = new THREE.Mesh(mountainGeometry,mountainMaterial);
        mountainC.castShadow = true;
        mountainC.receiveShadow = true;
        mountainC.position.set(-0.4, 0.8, -0.3);
        mountainC.rotation.set(0.5, 0.5, 0.6);
        //Mountain D
        var mountainD = new THREE.Mesh(mountainGeometry,mountainMaterial);
        mountainD.castShadow = true;
        mountainD.receiveShadow = true;
        mountainD.position.set(0.4, 0.5, 0.4);
        mountainD.rotation.set(0.5, 0.0, 0.5);
        //Mountain E
        var mountainE = new THREE.Mesh(mountainGeometry,mountainMaterial);
        mountainE.castShadow = true;
        mountainE.receiveShadow = true;
        mountainE.position.set(-0.2, -0.3, 0.2);
        mountainE.rotation.set(0.3, 0.3, 0.2);
        //Mountain F
        var mountainF = new THREE.Mesh(mountainGeometry,mountainMaterial);
        mountainF.castShadow = true;
        mountainF.receiveShadow = true;
        mountainF.position.set(0.0, 0.2, -1.3);
        mountainF.rotation.set(0.3, 0.7, 0.3);

        //Create mountain group
        var mountainGroup = new THREE.Group();
        mountainGroup.add(mountainA);
        mountainGroup.add(mountainB);
        mountainGroup.add(mountainC);
        mountainGroup.add(mountainD);
        mountainGroup.add(mountainE);
        mountainGroup.add(mountainF);
        mountainGroup.position.set(0.8, -1.0, 0.0);
        mountainGroup.rotation.set(0.0, 2.0, 2.0);


        
         //renderer.shadowMapEnabled = true;
        //then use the function below to add them to the planet.
        this.addObjectToGroup(pineTree1Group);
        this.addObjectToGroup(pineTree2Group);
        this.addObjectToGroup(regularTree1Group);
        this.addObjectToGroup(regularTree2Group);
        this.addObjectToGroup(regularTree3Group);
        this.addObjectToGroup(regularTree4Group);
        this.addObjectToGroup(truffulaTree1Group);
        this.addObjectToGroup(truffulaTree2Group);
        this.addObjectToGroup(lakeGroup);
        this.addObjectToGroup(mountainGroup);
    }
}
