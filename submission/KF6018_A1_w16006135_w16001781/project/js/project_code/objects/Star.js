/**
 * Class representing a star.
 * @extends UpdateableObject
 * @author Andrew Alford (w16006135) & Sabina Irimia (w16001781)
 */
class Star extends UpdateableObject
{
    /**
     * Create a star.
     * @param {number} radius - The radius of the planet.
     * @param {number} smoothness - How smooth the surface of the planet will be.
     * @param {number} rotationSpeed - How quickly the planet rotates.
     * @param {Vector3} initialPosition - The initial position of the planet.
     * @param {boolean} spinsClockwise - If 'true' then the star rotates clockwise.
     */
    constructor(radius, smoothness, rotationSpeed, initialPosition, spinsClockwise)
    {
        //Construct the superclass.
        super(initialPosition);

        //Set the name for this planet.
        this.getObject().name = 'Star';       

        //Scale the star.
        this.getObject().scale.set(3, 3, 3); 

        //Create the planet's surface.
        const M_GEOMETRY = new THREE.OctahedronGeometry(radius, smoothness);
        const M_MATERIAL = new THREE.MeshPhysicalMaterial( {emissive: colours.DARK_YELLOW, emissiveIntensity: 1, 
                           color: colours.DARK_BEIGE, flatShading: THREE.FlatShading,
                           metalness: 0.0, roughness: 0.0, reflectivity: 0.0} );
        const STAR = new THREE.PointLight( colours.WHITE, 2, 1000, 4);
        STAR.add( new THREE.Mesh(M_GEOMETRY, M_MATERIAL) );
        
        //Set up shadows for the planet's surface.
        //Define shadow traits.
        STAR.castShadow = false;
        STAR.receiveShadow = false;
        STAR.shadow.mapSize.width = 1024;
        STAR.shadow.mapSize.height = 1024;
        
        this.addObjectToGroup(STAR);

        let m_spinsClockwise = spinsClockwise;

        //PUBLIC METHODS...

        /**
         * @return Returns whether or not the star is spinning clockwise.
         */
        this.getSpinsClockwise = function()
        {
            return m_spinsClockwise;
        }

        /**
         * Allows the spin direction of the star to be set.
         * @param {boolean} spinsClockwise - If true then the star will spin clockwise.
         */
        this.setSpinsClockwise = function(spinsClockwise)
        {
            m_spinsClockwise = spinsClockwise;
        }

        /**
         * Implementation of abstract method in superclass UpdateableObject.
         * Updates the star.
         * @param {number} frameTimeMs - The time in milliseconds it took to compute the previous rendered frame.
         */
        this.update = function(frameTimeMs)
        {
            //Check if the star is active.
            if(this.isActive())
            {
                if(m_spinsClockwise)
                {
                    STAR.rotation.y -= rotationSpeed;
                }
                else
                {
                    STAR.rotation.y += rotationSpeed;
                }
            }
        }
    }
}
