/**
 * Class describing a dying planet.
 * @extends Planet
 * @author Andrew Alford (w16006135)
 */
class DyingPlanet extends Planet
{
    /**
     * Create the dying planet.
     * @param {ModelLoader} modelLoader - This is a model loader used to load 
     *                                    the model for the planet.
     * @param {number} rotationSpeed - How quickly the planet rotates.
     * @param {Vector3} initialPosition - The initial position of the planet.
     * @param {number} orbitSpeed - How quickly the planet orbits around other
     *                              objects.
     * @param {AssignmentObject} orbitingObject - This is the object that the 
     *                                            planet is orbiting.
     * @param {number} fullOrbitMs - How long it takes the planet to fully 
     *                               orbit around the orbiting object.
     * @param {boolean} orbitsClockwise - If true then the object orbits the
     *                                    other object clockwise.
     */
    constructor(modelLoader, rotationSpeed, initialPosition, orbitSpeed, 
        orbitingObject, fullOrbitMs, orbitsClockwise)
    {
        //Construct the superclass.
        super(rotationSpeed, initialPosition, orbitSpeed, orbitingObject, 
                fullOrbitMs, orbitsClockwise);

        //Set the name for this planet.
        this.getObject().name = 'Dying Planet';

        //Add the planet's base model.
        this.addObjectToGroup(
                modelLoader.loadModel(
                    'dying_planet',
                    new THREE.MeshStandardMaterial({
                        color: colours.BROWN, 
                        flatShading: THREE.FlatShading, 
                        metalness: 0, 
                        roughness: 1
                    })
                )
        );

        //Make the planet bigger.
        this.getObject().scale.set(3, 3, 3);
        
        //[SURFACE_MATERIAL] This is the material used for any details added to the planet.
        const SURFACE_MATERIAL = new THREE.MeshStandardMaterial( 
            {color: colours.BROWN, 
            flatShading: THREE.FlatShading, 
            metalness: 0, 
            roughness: 1, 
            side: THREE.DoubleSide}
        );

        //CREATE VOLCANOES...

        //Volcano modifiers.
        const RADIUS_TOP = 0.5;
        const RADIUS_BOTTOM = 1.5;
        const HEIGHT = 1.2;
        const RADIAL_SEGMENTS = 8;

        let volcanoA = new THREE.Mesh(
            new THREE.CylinderGeometry(RADIUS_TOP, RADIUS_BOTTOM, HEIGHT, RADIAL_SEGMENTS, 1, true, 0, 6.3), 
            SURFACE_MATERIAL
        );

        let lava = new THREE.Mesh(
            new THREE.CylinderGeometry(RADIUS_TOP + 0.05, RADIUS_TOP + 0.05, 1),
            new THREE.MeshStandardMaterial({
                color: colours.DARK_RED, 
                flatShading: THREE.FlatShading, 
                metalness: 0, 
                roughness: 1
            })
        );
        let volcanoB = new THREE.Mesh(
            new THREE.CylinderGeometry(RADIUS_TOP * 1.2, RADIUS_BOTTOM * 1.2, HEIGHT * 1.2, RADIAL_SEGMENTS), 
            SURFACE_MATERIAL
        ); 
        let volcanoC = new THREE.Mesh(
            new THREE.CylinderGeometry(RADIUS_TOP * 1.5, RADIUS_BOTTOM * 1.2, HEIGHT * 2, RADIAL_SEGMENTS), 
            SURFACE_MATERIAL
        ); 

        //Postion the volcanoes.
        volcanoA.position.set(0, 5.5, 0);
        lava.position.set(0, 5.5, 0);
        volcanoB.position.set(1, 1, 5);
        volcanoC.position.set(-0.3, -2.5, -4.5);

        //Rotate the volcanoes.
        volcanoB.rotation.set(Math.PI/2, 0, Math.PI * 1.9);
        volcanoC.rotation.set(-2.3, 0, 0);

        //Add the volcanoes to the planet.
        this.addObjectToGroup(volcanoA);
        this.addObjectToGroup(lava);
        this.addObjectToGroup(volcanoB);
        this.addObjectToGroup(volcanoC);

        //CREATE DEBRIS...

        //Debris modifiers.
        const RADIUS = 1;
        const SMOOTHNESS = 1;

        let debrisA = new THREE.Mesh(
            new THREE.OctahedronGeometry(RADIUS * 0.4, SMOOTHNESS),
            SURFACE_MATERIAL
        )
        let debrisB = new THREE.Mesh(
            new THREE.OctahedronGeometry(RADIUS * 0.2, SMOOTHNESS),
            SURFACE_MATERIAL
        )
        let debrisC = new THREE.Mesh(
            new THREE.OctahedronGeometry(RADIUS * 0.1, SMOOTHNESS),
            SURFACE_MATERIAL
        )
        let debrisD = new THREE.Mesh(
            new THREE.OctahedronGeometry(RADIUS * 0.25, SMOOTHNESS),
            SURFACE_MATERIAL
        )

        //Position the debris.
        debrisA.position.set(6, 2, 0.7);
        debrisB.position.set(7.5, 1, 0);
        debrisC.position.set(5, 2.5, 0.3);
        debrisD.position.set(4.5, 2, -1.2);

        //Group debris together and position them.
        let debris = new THREE.Group();
        debris.add(debrisA);
        debris.add(debrisB);
        debris.add(debrisC);
        debris.add(debrisD);
        debris.position.set(0, 1.75, 0);
        debris.scale.set(1.2, 1.2, 1.2);

        //Add the debris to the planet.
        this.addObjectToGroup(debris);
        
        //CREATE ROCK DETAIL...
        let rock = new THREE.Mesh(
            new THREE.OctahedronGeometry(RADIUS * 1.75, SMOOTHNESS),
            SURFACE_MATERIAL
        )

        //position the rock.
        rock.position.set(-3, 2.2, 2.2);

        //Add the rock to the planet.
        this.addObjectToGroup(rock);

        //CREATE THE PLANETS CORE...
        const CORE = new THREE.Mesh(
            new THREE.OctahedronBufferGeometry(4.75, 2),
            new THREE.MeshStandardMaterial({
                color: colours.DARK_RED, 
                flatShading: THREE.FlatShading, 
                metalness: 0, 
                roughness: 1
            })  
        );

        //Add the core to the planet.
        this.addObjectToGroup(CORE);

        //PARTICLE EFFECTS...
        const VOLCANO_ERUPTION = new Explosion(
            new THREE.Vector3(0, 6.25, 0),
            100,
            0.05,
            colours.LUMINOUSE_ORANGE,
            0.35,
            0,
            5,
            3,
            0.8,
            6.5,
            true
        );

        //Add the particle effects to the planet.
        this.addParticleEffect(VOLCANO_ERUPTION);
    }
}