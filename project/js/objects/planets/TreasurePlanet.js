/**
 * Class describing a treasure planet.
 * @extends Planet
 */
class TreasurePlanet extends Planet
{
    /**
     * Create the new born planet.
     * @param {number} rotationSpeed - How quickly the planet rotates.
     * @param {Vector3} initialPosition - The initial position of the planet.
     * @param {number} orbitSpeed - How quickly the planet orbits around other objects.
     * @param {AssignmentObject} orbitingObject - This is the object that the planet is orbiting.
     * @param {number} fullOrbitMs - How long it takes the planet to fully orbit around the orbiting object.
     * @param {boolean} orbitsClockwise - If true then the object orbits the other object clockwise.
     */
    constructor(rotationSpeed, initialPosition, orbitSpeed, orbitingObject, fullOrbitMs, orbitsClockwise)
    {
        //Construct the superclass.
        super(rotationSpeed, initialPosition, orbitSpeed, orbitingObject, fullOrbitMs, orbitsClockwise);

        //Set the name for this planet.
        this.getObject().name = 'Treasure Planet';

        //Load the dying planet's model and add it to the group.
        this.addObjectToGroup(this.createGenericPlanetBase(3, 2, colours.BLUE));

        //CREATE ISLAND...
        //[ISLAND_MESH] A mesh containing the planets island.
        const ISLAND_MESH = new THREE.Mesh(
            new THREE.OctahedronGeometry(1.75, 2),
            new THREE.MeshStandardMaterial({
                color: colours.SAND, 
                flatShading: THREE.FlatShading, 
                metalness: 0, 
                roughness: 1
            })
        );

        //Define shadows for the island.
        ISLAND_MESH.castShadow = true;
        ISLAND_MESH.receiveShadow = true;

        //Position the island.
        ISLAND_MESH.position.set(-0.5, 1.5, 0);

        //Add the island to the planet.
        this.addObjectToGroup(ISLAND_MESH);

        //CREATE PALM TREE...
        //[TRUNK_GEOMETRY] The geometry for the palm tree trunks.
        const TRUNK_GEOMETRY = new THREE.CylinderGeometry(0.35, 0.25, 0.5, 8);
        //[TRUNK_MATERIAL] The material for the palm tree trunks.
        const TRUNK_MATERIAL = new THREE.MeshStandardMaterial({
            color: colours.BROWN, 
            flatShading: THREE.FlatShading, 
            metalness: 0, 
            roughness: 1
        });

        //[TRUNK_MESH_A] A mesh containing the first part 
        //of the palm tree's trunk
        const TRUNK_MESH_A = new THREE.Mesh(
            TRUNK_GEOMETRY,
            TRUNK_MATERIAL
        );
        //[TRUNK_MESH_B] A mesh containing the second part 
        //of the palm tree's trunk
        const TRUNK_MESH_B = new THREE.Mesh(
            TRUNK_GEOMETRY,
            TRUNK_MATERIAL
        );
        //[TRUNK_MESH_C] A mesh containing the thrid part 
        //of the palm tree's trunk
        const TRUNK_MESH_C = new THREE.Mesh(
            TRUNK_GEOMETRY,
            TRUNK_MATERIAL
        );
        //[TRUNK_MESH_D] A mesh containing the fourth part 
        //of the palm tree's trunk
        const TRUNK_MESH_D = new THREE.Mesh(
            TRUNK_GEOMETRY,
            TRUNK_MATERIAL
        );

        //Define shadows for the trunks.
        TRUNK_MESH_A.castShadow = true;
        TRUNK_MESH_A.receiveShadow = true;
        TRUNK_MESH_B.castShadow = true;
        TRUNK_MESH_B.receiveShadow = true;
        TRUNK_MESH_C.castShadow = true;
        TRUNK_MESH_C.receiveShadow = true;
        TRUNK_MESH_D.castShadow = true;
        TRUNK_MESH_D.receiveShadow = true;

        //Position the trunks.
        TRUNK_MESH_A.position.set(-0.75, 3.25, -0.25);
        TRUNK_MESH_B.position.set(-0.90, 3.70, -0.25);
        TRUNK_MESH_C.position.set(-1.10, 4.10, -0.25);
        TRUNK_MESH_D.position.set(-1.35, 4.50, -0.25);

        //Rotate the trunks.
        TRUNK_MESH_A.rotation.set(0.00, 0.00, 0.25);
        TRUNK_MESH_B.rotation.set(0.00, 0.00, 0.40);
        TRUNK_MESH_C.rotation.set(0.00, 0.00, 0.55);
        TRUNK_MESH_D.rotation.set(0.00, 0.00, 0.70);

        //[LEAF_GEOMETRY] The geometry for the palm tree leafs.
        const LEAF_GEOMETRY = new THREE.ConeGeometry(0.25, 1.5, 3);
        //[LEAF_MATERIAL] The material for the paln tree leafs.
        const LEAF_MATERIAL = new THREE.MeshStandardMaterial({
            color: colours.GREEN, 
            flatShading: THREE.FlatShading, 
            metalness: 0, 
            roughness: 1
        });

        //[LEAF_MESH_A] The first leaf of the palm tree.
        const LEAF_MESH_A = new THREE.Mesh(
            LEAF_GEOMETRY,
            LEAF_MATERIAL
        );
        //[LEAF_MESH_B] The second leaf of the palm tree.
        const LEAF_MESH_B = new THREE.Mesh(
            LEAF_GEOMETRY,
            LEAF_MATERIAL
        );
        //[LEAF_MESH_C] The third leaf of the palm tree.
        const LEAF_MESH_C = new THREE.Mesh(
            LEAF_GEOMETRY,
            LEAF_MATERIAL
        );
        //[LEAF_MESH_D] The fourth leaf of the palm tree.
        const LEAF_MESH_D = new THREE.Mesh(
            LEAF_GEOMETRY,
            LEAF_MATERIAL
        );

        //Define shadows for the leafs.
        LEAF_MESH_A.castShadow = true;
        LEAF_MESH_A.receiveShadow = true;
        LEAF_MESH_B.castShadow = true;
        LEAF_MESH_B.receiveShadow = true;
        LEAF_MESH_C.castShadow = true;
        LEAF_MESH_C.receiveShadow = true;
        LEAF_MESH_D.castShadow = true;
        LEAF_MESH_D.receiveShadow = true;                        

        //Position the leafs.
        LEAF_MESH_A.position.set(0.00, 5.00, 0.00);
        LEAF_MESH_B.position.set(0.00, 5.00, -1.30);
        LEAF_MESH_C.position.set(0.00, 5.00, 0.00);
        LEAF_MESH_D.position.set(0.00, 5.00, -1.30);

        //Rotate the leafs.
        LEAF_MESH_A.rotation.set(Math.PI/1.75, 1.00, 0.00);
        LEAF_MESH_B.rotation.set(Math.PI/-1.75, 0.00, 0.00);
        LEAF_MESH_C.rotation.set(Math.PI/1.75, 1.00, 0.00);
        LEAF_MESH_D.rotation.set(Math.PI/-1.75, 0.00, 0.00);

        //Group together all leaf components.
        const LEAFS_GROUP_A = new THREE.Group();
        LEAFS_GROUP_A.add(LEAF_MESH_A);
        LEAFS_GROUP_A.add(LEAF_MESH_B);

        const LEAFS_GROUP_B = new THREE.Group();
        LEAFS_GROUP_B.add(LEAF_MESH_C);
        LEAFS_GROUP_B.add(LEAF_MESH_D);

        LEAFS_GROUP_B.position.set(0.70, 0, -0.70);
        LEAFS_GROUP_B.rotation.set(0.00, Math.PI / 2.00, 0.00);

        const LEAFS = new THREE.Group();
        LEAFS.add(LEAFS_GROUP_A);
        LEAFS.add(LEAFS_GROUP_B);

        //Position the leafs. (as a group).
        LEAFS.position.set(2.25, 1.35, 0.5);
        LEAFS.rotation.set(0, 0, Math.PI + 4);

        //Group all palm tree components into a single object.
        const PALM_TREE = new THREE.Group();
        PALM_TREE.add(TRUNK_MESH_A);
        PALM_TREE.add(TRUNK_MESH_B);
        PALM_TREE.add(TRUNK_MESH_C);
        PALM_TREE.add(TRUNK_MESH_D);
        PALM_TREE.add(LEAFS);

        //Add the palm tree to the planet.
        this.addObjectToGroup(PALM_TREE);

        //Make the planet bigger.
        this.getObject().scale.set(5, 5, 5);
    }
}
