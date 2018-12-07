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
        super(rotationSpeed, initialPosition, orbitSpeed, AssignmentObject, fullOrbitMs);

        //Set the name for this planet.
        this.getObject().name = 'Nature Planet';

        //Scale the planet.
        this.getObject().scale.set(3, 3, 3); 

        //Add the planets base.
        this.addObjectToGroup(this.createGenericPlanetBase(2, 2, colours.GREEN));

        //The material for tree crowns and trunks
        var crownMaterial = new THREE.MeshPhysicalMaterial( 
                            {color: colours.DARK_GREEN, flatShading: THREE.FlatShading, 
                            metalness: 0.0, roughness: 0.6, reflectivity: 0.5});
        var trunkMaterial = new THREE.MeshPhysicalMaterial( 
                            {color: colours.BROWN, flatShading: THREE.FlatShading, 
                            metalness: 0.0, roughness: 1, reflectivity: 0.5});
        var truffulaTreeCrownPinkMaterial = new THREE.MeshPhysicalMaterial( 
                            {color: colours.PINK, flatShading: THREE.FlatShading, 
                            metalness: 0.0, roughness: 0.8, reflectivity: 0.5});
        var truffulaTreeCrownOrangeMaterial = new THREE.MeshPhysicalMaterial( 
                            {color: colours.ORANGE, flatShading: THREE.FlatShading, 
                            metalness: 0.0, roughness: 0.8, reflectivity: 0.5});
        var truffulaTreeTrunkMaterial = new THREE.MeshPhysicalMaterial( 
                            {color: colours.BLACK, flatShading: THREE.FlatShading, 
                            metalness: 0.0, roughness: 1, reflectivity: 0.5});

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
        var lakeBaseMaterial =new THREE.MeshPhysicalMaterial( 
                              {color: colours.GREEN, flatShading: THREE.FlatShading,
                              metalness: 0.3, roughness: 2, side: THREE.DoubleSide} );
        var lakeWaterMaterial = new THREE.MeshPhysicalMaterial( 
                                { color: colours.LIGHT_BLUE, flatShading: THREE.FlatShading, 
                                metalness: 0.3, roughness: 0.8, reflectivity: 0.5, transparent: true, 
                                opacity: 0.9});
        
        //Mountain Geometry
        var mountainGeometry = new THREE.TetrahedronGeometry(1,1);
        //Mountain Material
        var mountainMaterial = new THREE.MeshPhysicalMaterial(
                               {color: colours.GREY, flatShading: THREE.FlatShading, 
                               metalness: 0, roughness: 1} );

        
//------------------------------------------------------------------------------------------------------
          //Initialize pine trees variables
        var pineTreeCrownGeo = [];
        var pineTreeCrownMat = [];
        var pineTreeCrown = [];
        var pineTrunkGeo = [];
        var pineTrunkMat = [];
        var pineTreeTrunk = [];
        var pineTreeNumber = 11;
        //Create the pine trees
        for (var i = 0; i < pineTreeNumber; i++)
        {
        //pine tree crown       
        pineTreeCrownGeo.push( pineTreeCrownGeometry );
        pineTreeCrownMat.push( crownMaterial );
        pineTreeCrown.push( new THREE.Mesh(pineTreeCrownGeo[i], pineTreeCrownMat[i]));
        pineTreeCrown[i].position.set(0.0, 0.4, 0.0);
        pineTreeCrown[i].castShadow = true;
        pineTreeCrown[i].receiveShadow = true;
        //pine tree trunk
        pineTrunkGeo.push( pineTreeTrunkGeometry );
        pineTrunkMat.push( trunkMaterial );
        pineTreeTrunk.push( new THREE.Mesh(pineTrunkGeo[i], pineTrunkMat[i]));
        pineTreeTrunk[i].position.set(0.0, 0.05, 0.0);
        pineTreeTrunk[i].castShadow = true;
        pineTreeTrunk[i].receiveShadow = true;
        }

        //Create pine tree 0 group
        var pineTreeGroup = new THREE.Group();
        pineTreeGroup.add(pineTreeCrown[0]);
        pineTreeGroup.add(pineTreeTrunk[0]);
        pineTreeGroup.position.set(0.0, 0.0, -2.0); //set position of the tree
        pineTreeGroup.rotation.set(-1.4, 0.0, 0.0);//set rotation of the tree

        //Create star
        var starGeometry = new THREE.SphereGeometry( 0.05, 8, 2, 0, 6.3 ,3, 3.3 );
        var star = new THREE.Mesh( starGeometry , truffulaTreeCrownPinkMaterial );
        star.castShadow = true;
        star.position.set(0.0, 0.75, 0.0);

        //Create tinsels for the X-mas Tree
         var tinselSmallGeometry = new THREE.TorusGeometry( 0.1, 0.015, 10, 10 );
         var tinselA = new THREE.Mesh( tinselSmallGeometry , truffulaTreeCrownOrangeMaterial );
         tinselA.castShadow = true;
         tinselA.receiveShadow = true;
         tinselA.position.set(0.0, 0.55, 0.0);
         tinselA.rotation.set(1.6, 0.0 ,0.0);
        
         var tinselMediumGeometry = new THREE.TorusGeometry( 0.16, 0.02, 10, 10 );
         var tinselB = new THREE.Mesh( tinselMediumGeometry , truffulaTreeCrownOrangeMaterial );
         tinselB.castShadow = true;
         tinselB.receiveShadow = true;
         tinselB.position.set(0.0, 0.4, 0.0);
         tinselB.rotation.set(1.6, 0.0 ,0.0);

         var tinselLargeGeometry = new THREE.TorusGeometry( 0.25, 0.025, 10, 10 );
         var tinselC = new THREE.Mesh( tinselLargeGeometry , truffulaTreeCrownOrangeMaterial );
         tinselC.castShadow = true;
         tinselC.receiveShadow = true;
         tinselC.position.set(0.0, 0.25, 0.0);
         tinselC.rotation.set(1.6, 0.0 ,0.0);

        //Create pine tree 1 group
        var pineTreeGroup1 = new THREE.Group();
        pineTreeGroup1.add(star);
        pineTreeGroup1.add(tinselA);
        pineTreeGroup1.add(tinselB);
        pineTreeGroup1.add(tinselC);
        pineTreeGroup1.add(pineTreeCrown[1]);
        pineTreeGroup1.add(pineTreeTrunk[1]);
        pineTreeGroup1.position.set(0.0, 2.0, 0.0); //set position of the tree
        //pineTreeGroup1.rotation.set(0.4, 0.0, 0.0);//set rotation of the tree

        //Create pine tree 2 group
        var pineTreeGroup2 = new THREE.Group();
        pineTreeGroup2.add(pineTreeCrown[2]);
        pineTreeGroup2.add(pineTreeTrunk[2]);
        pineTreeGroup2.position.set(-0.75, -0.3, -1.8); //set position of the tree
        pineTreeGroup2.rotation.set(0.0, -0.9, 1.7);//set rotation of the tree
        
        //Create pine tree 3 group
        var pineTreeGroup3 = new THREE.Group();
        pineTreeGroup3.add(pineTreeCrown[3]);
        pineTreeGroup3.add(pineTreeTrunk[3]);
        pineTreeGroup3.position.set(-0.8, -0.4, 1.7); //set position of the tree
        pineTreeGroup3.rotation.set(1.7, 0.0, 0.6);//set rotation of the tree

        //Create pine tree 4 group 
        var pineTreeGroup4 = new THREE.Group();
        pineTreeGroup4.add(pineTreeCrown[4]);
        pineTreeGroup4.add(pineTreeTrunk[4]);
        pineTreeGroup4.position.set(0.2, 0.7, 1.8); //set position of the tree
        pineTreeGroup4.rotation.set(1.0, 0.0, -0.1);//set rotation of the tree

        //Create pine tree 5 group  ---> changing position
        var pineTreeGroup5 = new THREE.Group();
        pineTreeGroup5.add(pineTreeCrown[5]);
        pineTreeGroup5.add(pineTreeTrunk[5]);
        pineTreeGroup5.position.set(1.3, 0.9, 1.2); //set position of the tree
        pineTreeGroup5.rotation.set(1.0, 0.0, -0.7);//set rotation of the tree

        //Create pine tree 6 group 
        var pineTreeGroup6 = new THREE.Group();
        pineTreeGroup6.add(pineTreeCrown[6]);
        pineTreeGroup6.add(pineTreeTrunk[6]);
        pineTreeGroup6.position.set(-1.6, -0.9, 0.8); //set position of the tree
        pineTreeGroup6.rotation.set(2.5, 0.0, 0.8);//set rotation of the tree

        //Create pine tree 7 group
        var pineTreeGroup7 = new THREE.Group();
        pineTreeGroup7.add(pineTreeCrown[7]);
        pineTreeGroup7.add(pineTreeTrunk[7]);
        pineTreeGroup7.position.set(-2.0, 0.0, -0.2); //set position of the tree
        pineTreeGroup7.rotation.set(-0.8, 0.0, 1.3);//set rotation of the tree

        //Create pine tree 8 group 
        var pineTreeGroup8 = new THREE.Group();
        pineTreeGroup8.add(pineTreeCrown[8]);
        pineTreeGroup8.add(pineTreeTrunk[8]);
        pineTreeGroup8.position.set(-0.3, -1.1, -1.6); //set position of the tree
        pineTreeGroup8.rotation.set(-2.2, 0.0, 0.3);//set rotation of the tree

        //Create pine tree 9 group
        var pineTreeGroup9 = new THREE.Group();
        pineTreeGroup9.add(pineTreeCrown[9]);
        pineTreeGroup9.add(pineTreeTrunk[9]);
        pineTreeGroup9.position.set(0.4, -0.6, -1.8); //set position of the tree
        pineTreeGroup9.rotation.set(-1.8, 0.0, -0.2);//set rotation of the tree

        //Create pine tree 10 group
        var pineTreeGroup10 = new THREE.Group();
        pineTreeGroup10.add(pineTreeCrown[10]);
        pineTreeGroup10.add(pineTreeTrunk[10]);
        pineTreeGroup10.position.set(-0.2, -0.85, 1.7); //set position of the tree
        pineTreeGroup10.rotation.set(1.9, 0.0, 0.0);//set rotation of the tree
        
//-------------------------------------------------------------------------------------------------
        //Initialize regular trees variables
        var regularTreeCrownGeo = [];
        var regularTreeCrownMat = [];
        var regularTreeCrown = [];
        var regularTrunkGeo = [];
        var regularTrunkMat = [];
        var regularTreeTrunk = [];
        var regularTreeNumber = 11;
        //Create the regular trees
        for (var i = 0; i < regularTreeNumber; i++)
        {
        //regular tree crown       
        regularTreeCrownGeo.push( regularTreeCrownGeometry );
        regularTreeCrownMat.push( crownMaterial );
        regularTreeCrown.push( new THREE.Mesh(regularTreeCrownGeo[i], regularTreeCrownMat[i]));
        regularTreeCrown[i].position.set(0.0, 0.4, 0.0);
        regularTreeCrown[i].castShadow = true;
        regularTreeCrown[i].receiveShadow = true;
        //regular tree trunk
        regularTrunkGeo.push( regularTreeTrunkGeometry );
        regularTrunkMat.push( trunkMaterial );
        regularTreeTrunk.push( new THREE.Mesh(regularTrunkGeo[i], regularTrunkMat[i]));
        regularTreeTrunk[i].position.set(0.0, 0.0, 0.0);
        regularTreeTrunk[i].castShadow = true;
        regularTreeTrunk[i].receiveShadow = true;
        }

        //Create regular tree 0 group
        var regularTreeGroup = new THREE.Group();
        regularTreeGroup.add(regularTreeCrown[0]);
        regularTreeGroup.add(regularTreeTrunk[0]);
        regularTreeGroup.position.set(-2.0, 0.7, -0.5); //set position of the tree
        regularTreeGroup.rotation.set(0.0, -0.2, 1.2);//set rotation of the tree

        //Create regular tree 1 group
        var regularTreeGroup1 = new THREE.Group();
        regularTreeGroup1.add(regularTreeCrown[1]);
        regularTreeGroup1.add(regularTreeTrunk[1]);
        regularTreeGroup1.position.set(-1.5, 0.4, -1.5); //set position of the tree
        regularTreeGroup1.rotation.set(-1.1, 0.0, 0.5);//set rotation of the tree
        
        //Create regular tree 2 group
        var regularTreeGroup2 = new THREE.Group();
        regularTreeGroup2.add(regularTreeCrown[2]);
        regularTreeGroup2.add(regularTreeTrunk[2]);
        regularTreeGroup2.position.set(-2.1, 0.5, 0.1); //set position of the tree
        regularTreeGroup2.rotation.set(-0.1, 0.0, 1.0);//set rotation of the tree

        //Create regular tree 3 group
        var regularTreeGroup3 = new THREE.Group();
        regularTreeGroup3.add(regularTreeCrown[3]);
        regularTreeGroup3.add(regularTreeTrunk[3]);
        regularTreeGroup3.position.set(-2.2, -0.1, 0.3); //set position of the tree
        regularTreeGroup3.rotation.set(-0.3, -0.1, 1.5);//set rotation of the tree

        //Create regular tree 4 group
        var regularTreeGroup4 = new THREE.Group();
        regularTreeGroup4.add(regularTreeCrown[4]);
        regularTreeGroup4.add(regularTreeTrunk[4]);
        regularTreeGroup4.position.set(-0.5, 0.0, 2.2); //set position of the tree
        regularTreeGroup4.rotation.set(1.5, 0.0, 0.1);//set rotation of the tree

        //Create regular tree 5 group
        var regularTreeGroup5 = new THREE.Group();
        regularTreeGroup5.add(regularTreeCrown[5]);
        regularTreeGroup5.add(regularTreeTrunk[5]);
        regularTreeGroup5.position.set(1.2, 1.4, 1.2); //set position of the tree
        regularTreeGroup5.rotation.set(0.7, 0.0, -0.6);//set rotation of the tree

        //Create regular tree 6 group 
        var regularTreeGroup6 = new THREE.Group();
        regularTreeGroup6.add(regularTreeCrown[6]);
        regularTreeGroup6.add(regularTreeTrunk[6]);
        regularTreeGroup6.position.set(-0.1, -0.7, -2.1); //set position of the tree
        regularTreeGroup6.rotation.set(-1.8, 0.0, 0.1);//set rotation of the tree

        //Create regular tree 7 group
        var regularTreeGroup7 = new THREE.Group();
        regularTreeGroup7.add(regularTreeCrown[7]);
        regularTreeGroup7.add(regularTreeTrunk[7]);
        regularTreeGroup7.position.set(-2.1, -0.7, 0.0); //set position of the tree
        regularTreeGroup7.rotation.set(2.6, 0.0, 1.3);//set rotation of the tree

        //Create regular tree 8 group
        var regularTreeGroup8 = new THREE.Group();
        regularTreeGroup8.add(regularTreeCrown[8]);
        regularTreeGroup8.add(regularTreeTrunk[8]);
        regularTreeGroup8.position.set(2.0, 0.8, 0.5); //set position of the tree
        regularTreeGroup8.rotation.set(0.6, 0.0, -1.1);//set rotation of the tree

         //Create regular tree 9 group
        var regularTreeGroup9 = new THREE.Group();
        regularTreeGroup9.add(regularTreeCrown[9]);
        regularTreeGroup9.add(regularTreeTrunk[9]);
        regularTreeGroup9.position.set(0.1, 1.2, 1.75); //set position of the tree
        regularTreeGroup9.rotation.set(0.9, 0.0, 0.0);//set rotation of the tree

        //Create regular tree 10 group
        var regularTreeGroup10 = new THREE.Group();
        regularTreeGroup10.add(regularTreeCrown[10]);
        regularTreeGroup10.add(regularTreeTrunk[10]);
        regularTreeGroup10.position.set(-2.1, -0.5, 0.5); //set position of the tree
        regularTreeGroup10.rotation.set(0.9, 0.0, 1.6);//set rotation of the tree

//--------------------------------------------------------------------------------------------
        //Initialize orange truffula trees variables
        //truffula tree crown
        var orangeTruffulaCrownGeometry = [];
        var orangeTruffulaCrownMaterial = [];
        var truffulaTreeOrangeCrown = [];
        //truffula tree trunk
        var orangeTruffulaTrunkGeometry = [];
        var orangeTruffulaTrunkMaterial = [];
        var truffulaTreeOrangeTrunk = [];
        var orangeTruffulaNumber = 11;
        //Create the truffula trees
        for (var i = 0; i < orangeTruffulaNumber; i++)
        {
        //truffula tree crown       
        orangeTruffulaCrownGeometry.push( truffulaTreeCrownGeometry );
        orangeTruffulaCrownMaterial.push( truffulaTreeCrownOrangeMaterial );
        truffulaTreeOrangeCrown.push( new THREE.Mesh(orangeTruffulaCrownGeometry[i], orangeTruffulaCrownMaterial[i]));
        truffulaTreeOrangeCrown[i].position.set(0.0, 0.4, 0.0);
        truffulaTreeOrangeCrown[i].castShadow = true;
        truffulaTreeOrangeCrown[i].receiveShadow = true;
        //truffula tree trunk
        orangeTruffulaTrunkGeometry.push( truffulaTreeTrunkGeometry );
        orangeTruffulaTrunkMaterial.push( truffulaTreeTrunkMaterial );
        truffulaTreeOrangeTrunk.push( new THREE.Mesh(orangeTruffulaTrunkGeometry[i], orangeTruffulaTrunkMaterial[i]));
        truffulaTreeOrangeTrunk[i].position.set(0.0, 0.0, 0.0);
        truffulaTreeOrangeTrunk[i].castShadow = true;
        truffulaTreeOrangeTrunk[i].receiveShadow = true;
        }

        //Create orange truffula tree group 0
        var orangeTruffulaTreeGroup = new THREE.Group();
        orangeTruffulaTreeGroup.add(truffulaTreeOrangeCrown[0]);
        orangeTruffulaTreeGroup.add(truffulaTreeOrangeTrunk[0]);
        orangeTruffulaTreeGroup.position.set(-0.4, 0.8, 2.0);
        orangeTruffulaTreeGroup.rotation.set(1.0, 0.0, 0.3);

        //Create orange truffula tree group 1
        var orangeTruffulaTreeGroup1 = new THREE.Group();
        orangeTruffulaTreeGroup1.add(truffulaTreeOrangeCrown[1]);
        orangeTruffulaTreeGroup1.add(truffulaTreeOrangeTrunk[1]);
        orangeTruffulaTreeGroup1.position.set(-0.6, 0.3, 2.1);
        orangeTruffulaTreeGroup1.rotation.set(1.2, 0.0, 0.4);

        //Create orange truffula tree group 2
        var orangeTruffulaTreeGroup2 = new THREE.Group();
        orangeTruffulaTreeGroup2.add(truffulaTreeOrangeCrown[2]);
        orangeTruffulaTreeGroup2.add(truffulaTreeOrangeTrunk[2]);
        orangeTruffulaTreeGroup2.position.set(-0.6, -0.8, 1.9);//-1.1, -1.1, 1.6
        orangeTruffulaTreeGroup2.rotation.set(2.0, 0.0, 0.4);

        //Create orange truffula tree group 3
        var orangeTruffulaTreeGroup3 = new THREE.Group();
        orangeTruffulaTreeGroup3.add(truffulaTreeOrangeCrown[3]);
        orangeTruffulaTreeGroup3.add(truffulaTreeOrangeTrunk[3]);
        orangeTruffulaTreeGroup3.position.set(1.55, 1.2, 1.0);
        orangeTruffulaTreeGroup3.rotation.set(0.6, 0.0, -0.6);

        //Create orange truffula tree group 4
        var orangeTruffulaTreeGroup4 = new THREE.Group();
        orangeTruffulaTreeGroup4.add(truffulaTreeOrangeCrown[4]);
        orangeTruffulaTreeGroup4.add(truffulaTreeOrangeTrunk[4]);
        orangeTruffulaTreeGroup4.position.set(-1.7, 0.6, -1.1);
        orangeTruffulaTreeGroup4.rotation.set(-0.3, -0.3, 0.7);

        //Create orange truffula tree group 5 ----->changed position
        var orangeTruffulaTreeGroup5 = new THREE.Group();
        orangeTruffulaTreeGroup5.add(truffulaTreeOrangeCrown[5]);
        orangeTruffulaTreeGroup5.add(truffulaTreeOrangeTrunk[5]);
        orangeTruffulaTreeGroup5.position.set(-0.4, -0.4, -2.1);
        orangeTruffulaTreeGroup5.rotation.set(-1.6, 0.0, 0.2); 

        //Create orange truffula tree group 6 ------> added position
        var orangeTruffulaTreeGroup6 = new THREE.Group();
        orangeTruffulaTreeGroup6.add(truffulaTreeOrangeCrown[6]);
        orangeTruffulaTreeGroup6.add(truffulaTreeOrangeTrunk[6]);
        orangeTruffulaTreeGroup6.position.set(-0.6, 0.2, -2.1);//-0.6, 0.3, -2.2
        orangeTruffulaTreeGroup6.rotation.set(-1.5, 0.0, 0.4); 

        //Create orange truffula tree group 7 ------> added position
        var orangeTruffulaTreeGroup7 = new THREE.Group();
        orangeTruffulaTreeGroup7.add(truffulaTreeOrangeCrown[7]);
        orangeTruffulaTreeGroup7.add(truffulaTreeOrangeTrunk[7]);
        orangeTruffulaTreeGroup7.position.set(-1.2, 0.05, -1.84);
        orangeTruffulaTreeGroup7.rotation.set(-1.6, 0.0, 0.5);   

        //Create orange truffula tree group 8 ------> added position
        var orangeTruffulaTreeGroup8 = new THREE.Group();
        orangeTruffulaTreeGroup8.add(truffulaTreeOrangeCrown[8]);
        orangeTruffulaTreeGroup8.add(truffulaTreeOrangeTrunk[8]);
        orangeTruffulaTreeGroup8.position.set(-1.7, -0.3, 1.5);
        orangeTruffulaTreeGroup8.rotation.set(1.8, 0.0, 1.0);  

        //Create orange truffula tree group 9 ------> added position
        var orangeTruffulaTreeGroup9 = new THREE.Group();
        orangeTruffulaTreeGroup9.add(truffulaTreeOrangeCrown[9]);
        orangeTruffulaTreeGroup9.add(truffulaTreeOrangeTrunk[9]);
        orangeTruffulaTreeGroup9.position.set(-2.16, 0.3, 0.5);
        orangeTruffulaTreeGroup9.rotation.set(0.5, 0.0, 1.2);  

        //Create orange truffula tree group 10 ------> added position
        var orangeTruffulaTreeGroup10 = new THREE.Group();
        orangeTruffulaTreeGroup10.add(truffulaTreeOrangeCrown[10]);
        orangeTruffulaTreeGroup10.add(truffulaTreeOrangeTrunk[10]);
        orangeTruffulaTreeGroup10.position.set(-1.4, 0.8, -1.4);
        orangeTruffulaTreeGroup10.rotation.set(-0.8, 0.0, 0.6);  
             
//-----------------------------------------------------------------------------------
        //Initialize pink truffula trees variables
        //truffula tree crown
        var pinkTruffulaCrownGeometry = [];
        var pinkTruffulaCrownMaterial = [];
        var truffulaTreePinkCrown = [];
        //truffula tree trunk
        var pinkTruffulaTrunkGeometry = [];
        var pinkTruffulaTrunkMaterial = [];
        var truffulaTreePinkTrunk = [];
        var pinkTruffulaNumber = 11;
        //Create the truffula trees
        for (var i = 0; i < pinkTruffulaNumber; i++)
        {
        //truffula tree crown       
        pinkTruffulaCrownGeometry.push( truffulaTreeCrownGeometry );
        pinkTruffulaCrownMaterial.push( truffulaTreeCrownPinkMaterial );
        truffulaTreePinkCrown.push( new THREE.Mesh(pinkTruffulaCrownGeometry[i], pinkTruffulaCrownMaterial[i]));
        truffulaTreePinkCrown[i].position.set(0.0, 0.4, 0.0);
        truffulaTreePinkCrown[i].castShadow = true;
        truffulaTreePinkCrown[i].receiveShadow = true;
        //truffula tree trunk
        pinkTruffulaTrunkGeometry.push( truffulaTreeTrunkGeometry );
        pinkTruffulaTrunkMaterial.push( truffulaTreeTrunkMaterial );
        truffulaTreePinkTrunk.push( new THREE.Mesh(pinkTruffulaTrunkGeometry[i], pinkTruffulaTrunkMaterial[i]));
        truffulaTreePinkTrunk[i].position.set(0.0, 0.0, 0.0);
        truffulaTreePinkTrunk[i].castShadow = true;
        truffulaTreePinkTrunk[i].receiveShadow = true;
        }

        //Create pink truffula tree group 0
        var pinkTruffulaTreeGroup = new THREE.Group();
        pinkTruffulaTreeGroup.add(truffulaTreePinkCrown[0]);
        pinkTruffulaTreeGroup.add(truffulaTreePinkTrunk[0]);
        pinkTruffulaTreeGroup.position.set(-0.3, 0.5, 2.1);
        pinkTruffulaTreeGroup.rotation.set(1.3, 0.0, 0.1);

        //Create pink truffula tree group 1
        var pinkTruffulaTreeGroup1 = new THREE.Group();
        pinkTruffulaTreeGroup1.add(truffulaTreePinkCrown[1]);
        pinkTruffulaTreeGroup1.add(truffulaTreePinkTrunk[1]);
        pinkTruffulaTreeGroup1.position.set(-2.0, 0.3, -0.8);
        pinkTruffulaTreeGroup1.rotation.set(0.4, -0.3, 1.3);

        //Create pink truffula tree group 2 
        var pinkTruffulaTreeGroup2 = new THREE.Group();
        pinkTruffulaTreeGroup2.add(truffulaTreePinkCrown[2]);
        pinkTruffulaTreeGroup2.add(truffulaTreePinkTrunk[2]);
        pinkTruffulaTreeGroup2.position.set(-0.8, 0.5, -2.0);
        pinkTruffulaTreeGroup2.rotation.set(-1.3, 0.0, 0.4);

        //Create pink truffula tree group 3
        var pinkTruffulaTreeGroup3 = new THREE.Group();
        pinkTruffulaTreeGroup3.add(truffulaTreePinkCrown[3]);
        pinkTruffulaTreeGroup3.add(truffulaTreePinkTrunk[3]);
        pinkTruffulaTreeGroup3.position.set(-0.4, -0.4, 2.1);
        pinkTruffulaTreeGroup3.rotation.set(1.8, 0.0, 0.2);

        //Create pink truffula tree group 4
        var pinkTruffulaTreeGroup4 = new THREE.Group();
        pinkTruffulaTreeGroup4.add(truffulaTreePinkCrown[4]);
        pinkTruffulaTreeGroup4.add(truffulaTreePinkTrunk[4]);
        pinkTruffulaTreeGroup4.position.set(-1.0, -0.9, 1.7);
        pinkTruffulaTreeGroup4.rotation.set(2.1, 0.0, 0.5);

        //Create pink truffula tree group 5
        var pinkTruffulaTreeGroup5 = new THREE.Group();
        pinkTruffulaTreeGroup5.add(truffulaTreePinkCrown[5]);
        pinkTruffulaTreeGroup5.add(truffulaTreePinkTrunk[5]);
        pinkTruffulaTreeGroup5.position.set(1.0, -0.5, -1.9);
        pinkTruffulaTreeGroup5.rotation.set(-1.8, 0.0, -0.5);

        //Create pink truffula tree group 6
        var pinkTruffulaTreeGroup6 = new THREE.Group();
        pinkTruffulaTreeGroup6.add(truffulaTreePinkCrown[6]);
        pinkTruffulaTreeGroup6.add(truffulaTreePinkTrunk[6]);
        pinkTruffulaTreeGroup6.position.set(-1.9, -1.0, 0.3);
        pinkTruffulaTreeGroup6.rotation.set(2.2, 0.0, 0.9);

        //Create pink truffula tree group 7
        var pinkTruffulaTreeGroup7 = new THREE.Group();
        pinkTruffulaTreeGroup7.add(truffulaTreePinkCrown[7]);
        pinkTruffulaTreeGroup7.add(truffulaTreePinkTrunk[7]);
        pinkTruffulaTreeGroup7.position.set(0.8, 0.9, 1.9);
        pinkTruffulaTreeGroup7.rotation.set(1.2, 0.0, -0.4);

        //Create pink truffula tree group 8
        var pinkTruffulaTreeGroup8 = new THREE.Group();
        pinkTruffulaTreeGroup8.add(truffulaTreePinkCrown[8]);
        pinkTruffulaTreeGroup8.add(truffulaTreePinkTrunk[8]);
        pinkTruffulaTreeGroup8.position.set(-1.4, -0.7, 1.5);
        pinkTruffulaTreeGroup8.rotation.set(1.8, 0.0, 0.9);

        //Create pink truffula tree group 9
        var pinkTruffulaTreeGroup9 = new THREE.Group();
        pinkTruffulaTreeGroup9.add(truffulaTreePinkCrown[9]);
        pinkTruffulaTreeGroup9.add(truffulaTreePinkTrunk[9]);
        pinkTruffulaTreeGroup9.position.set(-1.1, 0.5, -1.7);
        pinkTruffulaTreeGroup9.rotation.set(-1.3, 0.0, 0.6);

        //Create pink truffula tree group 10
        var pinkTruffulaTreeGroup10 = new THREE.Group();
        pinkTruffulaTreeGroup10.add(truffulaTreePinkCrown[10]);
        pinkTruffulaTreeGroup10.add(truffulaTreePinkTrunk[10]);
        pinkTruffulaTreeGroup10.position.set(1.0, 1.2, 1.5);
        pinkTruffulaTreeGroup10.rotation.set(0.6, 0.0, -0.4);
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
        this.addObjectToGroup(pineTreeGroup);
        this.addObjectToGroup(pineTreeGroup1);
        this.addObjectToGroup(pineTreeGroup2);
        this.addObjectToGroup(pineTreeGroup3);
        this.addObjectToGroup(pineTreeGroup4);
        this.addObjectToGroup(pineTreeGroup5);
        this.addObjectToGroup(pineTreeGroup6);
        this.addObjectToGroup(pineTreeGroup7);
        this.addObjectToGroup(pineTreeGroup8);
        this.addObjectToGroup(pineTreeGroup9);
        this.addObjectToGroup(pineTreeGroup10);
        this.addObjectToGroup(regularTreeGroup);
        this.addObjectToGroup(regularTreeGroup1);
        this.addObjectToGroup(regularTreeGroup2);
        this.addObjectToGroup(regularTreeGroup3);
        this.addObjectToGroup(regularTreeGroup4);
        this.addObjectToGroup(regularTreeGroup5);
        this.addObjectToGroup(regularTreeGroup6);
        this.addObjectToGroup(regularTreeGroup7);
        this.addObjectToGroup(regularTreeGroup8);
        this.addObjectToGroup(regularTreeGroup9);
        this.addObjectToGroup(regularTreeGroup10);
        this.addObjectToGroup(orangeTruffulaTreeGroup);
        this.addObjectToGroup(orangeTruffulaTreeGroup1);
        this.addObjectToGroup(orangeTruffulaTreeGroup2);
        this.addObjectToGroup(orangeTruffulaTreeGroup3);
        this.addObjectToGroup(orangeTruffulaTreeGroup4);
        this.addObjectToGroup(orangeTruffulaTreeGroup5);
        this.addObjectToGroup(orangeTruffulaTreeGroup6);
        this.addObjectToGroup(orangeTruffulaTreeGroup7);
        this.addObjectToGroup(orangeTruffulaTreeGroup8);
        this.addObjectToGroup(orangeTruffulaTreeGroup9);
        this.addObjectToGroup(orangeTruffulaTreeGroup10);
        this.addObjectToGroup(pinkTruffulaTreeGroup);
        this.addObjectToGroup(pinkTruffulaTreeGroup1);
        this.addObjectToGroup(pinkTruffulaTreeGroup2);
        this.addObjectToGroup(pinkTruffulaTreeGroup3);
        this.addObjectToGroup(pinkTruffulaTreeGroup4);
        this.addObjectToGroup(pinkTruffulaTreeGroup5);
        this.addObjectToGroup(pinkTruffulaTreeGroup6);
        this.addObjectToGroup(pinkTruffulaTreeGroup7);
        this.addObjectToGroup(pinkTruffulaTreeGroup8);
        this.addObjectToGroup(pinkTruffulaTreeGroup9);
        this.addObjectToGroup(pinkTruffulaTreeGroup10);
        this.addObjectToGroup(lakeGroup);
        this.addObjectToGroup(mountainGroup);
    }
}
