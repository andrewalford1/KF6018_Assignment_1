class AssignmentObject
{
    constructor(initialPosition)
    {
        const OBJECT = new THREE.Group();
        OBJECT.position.copy(initialPosition);

        /**
         * @brief Allows the full position of the planet to be set.
         * @param position - A Vector3 containing the new 'X', 'Y', & 'Z' coordinates for the planet.
         */
        this.setPosition = function(position)
        {
            OBJECT.position.copy(position);
        }

        /**
         * @brief Allows the 'X' coordinate of the planet to be set.
         * @param x - This is the new 'X' coordinate for the planet.
         */
        this.setXPosition = function(x)
        {
            OBJECT.position.setX(x);
        }

        /**
         * @brief Allows the 'Y' coordinate of the planet to be set.
         * @param y - This is the new 'Y' coordinate for the planet.
         */
        this.setYPosition = function(y)
        {
            OBJECT.position.setY(y);
        }

        /**
         * @brief Allows the 'Z' coordinate of the planet to be set.
         * @param z - This is the new 'Z' coordinate for the plaent.
         */
        this.setZPosition = function(z)
        {
            OBJECT.position.setZ(z);
        }

        /**
         * @return Returns the planets position as a Vector3.
         */
        this.getPosition = function()
        {
            return OBJECT.position;
        }

        /**
         * @return Returns the planet's 'X' coordinate.
         */
        this.getXPosition = function()
        {
            return OBJECT.position.x;
        }

        /**
         * @return Returns the planet's 'Y' coordinate.
         */
        this.getYPosition = function()
        {
            return OBJECT.position.y;
        }

        /**
         * @return Returns the planet's 'Z' coordinate.
         */
        this.getZPosition = function()
        {
            return OBJECT.position.z;
        }

        /**
         * @brief Adds the planet to the scene.
         */
        this.addToScene = function(scene)
        {
            scene.add(OBJECT);
        }

        /**
         * @brief Allows an object to be added to the main object.
         * @param object - This is the object to be added to the main object.
         */
        this.addObjectToGroup = function(object)
        {
            OBJECT.add(object);
        }

        this.getObject = function()
        {
            return OBJECT;
        }
    }
}