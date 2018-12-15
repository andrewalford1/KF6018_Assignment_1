/**
 * Class representing a moon.
 * @extends UpdateableObject
 * @author Andrew Alford (w16006135)
 */
class Moon extends OrbitingObject
{
    /**
     * Constructor for a Moon object.
     * @param {THREE.Vector3} initialPosition - The initial position 
     *                                          of the moon.
     * @param {number} orbitSpeed - How quickly the moon orbits around
     *                              its planet.    
     * @param {AssignmentObject} orbitingObject - This is the planet that the
     *                                            moon is orbiting.
     * @param {number} fullOrbitMs - How long it takes the moon to fully orbit
     *                               around the planet.
     * @param {boolean} spinsClockwise - If 'true' then the moon rotates 
     *                                   clockwise.
     */
    constructor(initialPosition, orbitSpeed, orbitingObject, fullOrbitMs, spinsClockwise)
    {
        //Construct the superclass.
        super(initialPosition, orbitSpeed, orbitingObject, fullOrbitMs, spinsClockwise);

        //Set the name for the moon.
        this.getObject().name = 'Moon';

        //INITIALISE MEMBER VARIABLES...

        //[M_WIND_SPEED] How fast the wind is (affects the waving of the flag). 
        const M_WIND_SPEED = 50;
        //[M_WIND_SPEED] How fast the moon is spinning.
        const M_ROTATION_SPEED = 0.01;
        //[m_updateCounter] Tracks how many times this class has been updated.
        let m_updateCounter = 0;
        //[m_spinsClockwise] If 'true' then the moon spins clockwise.
        let m_spinsClockwise = spinsClockwise;

        //CREATE THE MOONS SURFACE.
        const SURFACE_MATERIAL = new THREE.MeshStandardMaterial({
            color: colours.GREY,   
            flatShading: THREE.FlatShading,
            metalness: 0,
            roughness: 1
        });

        let SURFACE_MESH = new THREE.Mesh(
                new THREE.DodecahedronGeometry(10, 1), 
                SURFACE_MATERIAL
        );

        //Add the surface to the group.
        this.addObjectToGroup(SURFACE_MESH);

        //CREATE FLAG...
        const POLE_MATERIAL = new THREE.MeshStandardMaterial({
            color: colours.BROWN,   
            flatShading: THREE.FlatShading,
            metalness: 0,
            roughness: 1
        });
        //Create the flag pole.
        const FLAG_POLE_MESH = new THREE.Mesh(
            new THREE.CylinderGeometry(0.25, 0.25, 10, 32),
            POLE_MATERIAL
        );

        const FLAG_MATERIAL = new THREE.MeshStandardMaterial({
            color: colours.BLUE,
            side: THREE.DoubleSide,   
            flatShading: THREE.FlatShading,
            metalness: 0,
            roughness: 1
        });

        const FLAG_GEOMETRY = new THREE.PlaneGeometry(3, 2.5, 30, 30);

        const FLAG_MESH = new THREE.Mesh(        
            FLAG_GEOMETRY,
            FLAG_MATERIAL    
        );

        //Position the flag components.
        FLAG_POLE_MESH.position.set(-5, 7, 0);
        FLAG_MESH.position.set(-6.25, 10.75, 0);
        
        const FLAG = new THREE.Group();
        FLAG.add(FLAG_POLE_MESH);
        FLAG.add(FLAG_MESH);

        //Set the flag at an angle.
        FLAG_POLE_MESH.rotation.z = -15;
        FLAG_MESH.rotation.z = -15;


        //Add the flag to the object.
        this.addObjectToGroup(FLAG);

        //Scale the moon.
        this.getObject().scale.set(0.25, 0.25, 0.25);

        //PRIVATE METHODS...

        /**
         * Uses triggernometry to wave the flag.
         * @param {THREE.PlaneGeometry} geometry - The collection of vertices
         *                                         to be manipulated.
         * @param {number} cycle - How many waves should there be computed.
         * @param {number} height - How high the flags waves should be.
         * @param {number} frameOffset - Where to start the wave.
         */
        function waveFlag(geometry, cycle, height, frameOffset)
        {
            const WIDTH = geometry.parameters.width/2;
            let xPosition;
            let zPosition;

            //Loop through all vertices.
            for(let i = 0; i < geometry.vertices.length; i++)
            {
                //If the vertice should be part of the wave.
                if (geometry.vertices[i].x < - WIDTH + 2.75 ) 
                {
                    //Calculate the x position.
                    xPosition = (((geometry.vertices[i].x + frameOffset) *cycle) / WIDTH) * (Math.PI);

                    //Calculate the z-pos using the sine function.
                    zPosition = Math.sin(xPosition) * height;

                    //Update the z position of the vertice.
                    geometry.vertices[i].z = zPosition;
                }
            }

            //Update the geometries vertices.
            geometry.verticesNeedUpdate = true;
            geometry.computeVertexNormals();
        }

        //PUBLIC METHODS...

        /**
          * Updates the moon.
          * @param {number} frameTimeMs - The time in milliseconds it took to compute the previous rendered frame.
          */
        this.update = function(frameTimeMs)
        {
            //Check if the planet is active.
            if(this.isActive())
            {
                //Move the moon along it's orbiting path.
                this.moveAlongOrbitingPath(frameTimeMs);

                //Check which direction the planet is moving in, then spin the planet on it's axis.
                if(m_spinsClockwise)
                {
                    this.getObject().rotation.y -= M_ROTATION_SPEED;
                }                
                else
                {
                    this.getObject().rotation.y += M_ROTATION_SPEED;
                }

                //wave the flag.
                let frameOffset = m_updateCounter % (FLAG_GEOMETRY.parameters.width*M_WIND_SPEED);
                waveFlag(FLAG_GEOMETRY, 1, 0.5, frameOffset/M_WIND_SPEED);

                //Reset the counter if it has gotten too big (save memory),
                //otherwise increment it by 1.
                if(m_updateCounter >= 999)
                {
                    m_updateCounter = 0;
                }
                else
                {
                    m_updateCounter++;
                }
            }
        }        
    }
}