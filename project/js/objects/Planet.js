class Planet
{
    constructor(radius, smoothness, colour, rotationSpeed, initialX, initialY, initialZ)
    {
        //Create the planet's surface.
        const M_GEOMETRY = new THREE.OctahedronGeometry(radius, smoothness);
        const M_MATERIAL = new THREE.MeshStandardMaterial( {color: colour, flatShading: THREE.FlatShading, metalness: 0, roughness: 1} );
        const planetSurface = new THREE.Mesh(M_GEOMETRY, M_MATERIAL);

        //Set up shadows for the planet's surface.
        //Define shadow traits.
        planetSurface.castShadow = true;
        planetSurface.receiveShadow = true;

        //Create the planet's pole.
        const POLE_GEOMETRY = new THREE.CylinderGeometry( 0.1, 0.1, (radius * 2.5), 4 );
        const POLE_MESH = new THREE.MeshStandardMaterial( {color: colours.WHITE, flatShading: THREE.FlatShading, metalness: 0, roughness: 1} );
        const POLE = new THREE.Mesh(POLE_GEOMETRY, POLE_MESH);
        POLE.visible = false;

        var m_xPosition = initialX;
        var m_yPosition = initialY;
        var m_zPosition = initialZ;

        const PLANET = new THREE.Group();
        PLANET.add(planetSurface);
        PLANET.add(POLE);

        this.setPosition = function(x, y, z)
        {
            m_xPosition = x;
            m_yPosition = y;
            m_zPosition = z;
        }

        this.setXPosition = function(x)
        {
            m_xPosition = x;
        }

        this.setYPosition = function(y)
        {
            m_yPosition = y;
        }

        this.setZPosition = function(z)
        {
            m_zPosition = z;
        }

        this.getXPosition = function()
        {
            return m_xPosition;
        }

        this.getYPosition = function()
        {
            return m_yPosition;
        }

        this.getZPosition = function()
        {
            return m_zPosition;
        }

        this.showPole = function(visible)
        {
            POLE.visible = visible;
        }

        this.addToScene = function(scene)
        {
            scene.add(PLANET);
        }

        this.update = function()
        {
            PLANET.rotation.y += rotationSpeed;
        }
    }
}