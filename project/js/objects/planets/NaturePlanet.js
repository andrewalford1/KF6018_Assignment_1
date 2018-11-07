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

        //Create the asteroids surface.
        var crownMaterial = new THREE.MeshPhysicalMaterial( {color: colours.DARK_GREEN, flatShading: THREE.FlatShading, metalness: 0.3, roughness: 0.6, reflectivity: 0.5});
        var trunkMaterial = new THREE.MeshPhysicalMaterial( {color: colours.BROWN, flatShading: THREE.FlatShading, metalness: 0.3, roughness: 1, reflectivity: 0.5});

        //Create pine trees....
        //Create the pine tree similar to any other object,
        //Set their position (relative to the planet).
       
        //PineTree A
        //pine tree crown
        var geometry2 = new THREE.ConeGeometry( 0.3, 0.6, 10 );
        var pineTreeCrown = new THREE.Mesh( geometry2, crownMaterial );
        //position
        pineTreeCrown.position.set(0.0, 1.4, 0.0);
        //pine tree trunk
        var geometry2trunk = new THREE.CylinderGeometry( 0.06, 0.1, 0.2, 10 );
        var pineTreeTrunk = new THREE.Mesh( geometry2trunk, trunkMaterial );
        //position
        pineTreeTrunk.position.set(0.0, 1.05, 0.0);

        //tree A group
        var treeA = new THREE.Group();
        treeA.add(pineTreeCrown);
        treeA.add(pineTreeTrunk);
        //position
        treeA.position.set(0.0, -1.0, 0.0);
        //rotate the buildings
        treeA.rotation.set(-1.4, 0.0, 0.0);

        //Tree B
        //tree crown
        var geometry3 = new THREE.TetrahedronGeometry( 0.2, 2 );
        var treeCrown = new THREE.Mesh( geometry3, crownMaterial );
        //position
        treeCrown.position.set(0.0, 2.4, 0.0);
        //tree trunk
        var geometry3trunk = new THREE.CylinderGeometry( 0.03, 0.06, 0.6, 10 );
        var treeTrunk = new THREE.Mesh( geometry3trunk, trunkMaterial );
        treeTrunk.position.set(0.0, 2.0, 0.0);

        //tree B group
        var treeB = new THREE.Group();
        treeB.add(treeCrown);
        treeB.add(treeTrunk);
        //position
        treeA.position.set(0.0, 0.0, 0.0);
        //rotate the buildings
        treeA.rotation.set(0.4, 0.0, 0.0);

        //Tree C truffula

        //Create lake...

        //Create mountians...

         //then use the function below to add them to the planet.
        this.addObjectToGroup(treeA);
        this.addObjectToGroup(treeB);
        //this.addObjectToGroup(pineTree_C);
    }
}