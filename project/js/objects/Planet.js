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

        //[PLANET] Groups all items that make up the planet.
        const PLANET = new THREE.Group();
        PLANET.add(planetSurface);
        PLANET.add(POLE);

        //Set the initial position of the planet.
        PLANET.position.set(initialX, initialY, initialZ);

        /**
         * @brief Allows the full position of the planet to be set.
         * @param position - A Vector3 containing the new 'X', 'Y', & 'Z' coordinates for the planet.
         */
        this.setPosition = function(position)
        {
            PLANET.position.set(position.x, position.y, position.z);
        }

        /**
         * @brief Allows the 'X' coordinate of the planet to be set.
         * @param x - This is the new 'X' coordinate for the planet.
         */
        this.setXPosition = function(x)
        {
            PLANET.position.setX(x);
        }

        /**
         * @brief Allows the 'Y' coordinate of the planet to be set.
         * @param y - This is the new 'Y' coordinate for the planet.
         */
        this.setYPosition = function(y)
        {
            PLANET.position.setY(y);
        }

        /**
         * @brief Allows the 'Z' coordinate of the planet to be set.
         * @param z - This is the new 'Z' coordinate for the plaent.
         */
        this.setZPosition = function(z)
        {
            PLANET.position.setZ(z);
        }

        /**
         * @return Returns the planet's 'X' coordinate.
         */
        this.getXPosition = function()
        {
            return PLANET.position.x;
        }

        /**
         * @return Returns the planet's 'Y' coordinate.
         */
        this.getYPosition = function()
        {
            return PLANET.position.y;
        }

        /**
         * @return Returns the planet's 'Z' coordinate.
         */
        this.getZPosition = function()
        {
            return PLANET.position.z;
        }

        this.getPosition = function()
        {
            return PLANET.position;
        }

        /**
         * @brief Sets the visibility of the planet's pole.
         * @param visible - If true the the planet's pole will be visible,
         *                  otherwise the pole will be invisible.
         */
        this.showPole = function(visible)
        {
            POLE.visible = visible;
        }

        /**
         * @brief Adds the planet to the scene.
         */
        this.addToScene = function(scene)
        {
            scene.add(PLANET);
        }

        /**
         * @brief Allows an object to be added to the planet.
         * @param object - This is the object to be added to the planet.
         */
        this.addObjectToGroup = function(object)
        {
            PLANET.add(object);
        }

        /**
         * @brief Updates the planet.
         */
        this.update = function()
        {
            PLANET.rotation.y += rotationSpeed;
        }

        this.test = function()
        {
            var newX = 0 + 8 * Math.cos(Math.PI);
            var newY = 0 + 8 * Math.sin(Math.PI);

            this.setXPosition(newX);
            this.setYPosition(newY);

        }

        this.orbit = function(p, increment)
        {
            var p2Location = new THREE.Vector3();
            p2Location = p.getPosition();

            var distanceVector = new THREE.Vector3();
            distanceVector =  p2Location.distanceTo(this.getPosition());
            
            //alert(distanceVector);

            this.setPosition(new THREE.Vector3(
                0 + distanceVector * Math.sin(Math.PI + increment),
                0,
                0 + distanceVector * Math.cos(Math.PI + increment)
            ));
        }
    }
}

class NewBornPlanet extends Planet
{
    constructor(radius, smoothness, colour, rotationSpeed, initialX, initialY, initialZ)
    {
        //Construct the superclass.
        super(radius, smoothness, colour, rotationSpeed, initialX, initialY, initialZ);

        this.addMountians = function()
        {
            //Create the mountians.
            var geometry = new THREE.ConeGeometry( 5, 5, 3 );
            var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
            var cone = new THREE.Mesh( geometry, material );

            //Set position relative to the planet.
            cone.position.set(-10,0,0);
            
            //Add the mountians to the planet.
            //this.addObjectToGroup(cone);
        }

        this.addMountians();
    }
}