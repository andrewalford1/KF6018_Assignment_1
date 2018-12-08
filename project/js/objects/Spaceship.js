/**
 * Class represenyting a spaceship to fly around the scene.
 * @extends UpdateableObject
 * @author Andrew Alford (w16006135)
 */
 class Spaceship extends UpdateableObject
 {
     /**
      * Constructor for the Spaceship class.
      * @param {THREE.Vector3} initialPosition - The initial position
      *                                          of the spaceship.
      */
     constructor(initialPosition)
     {
        //Construct the superclass.
        super(initialPosition);         

        //INITIALISE MEMBER VARIABLES...

        //[m_speed] How fast the spaceship is travelling (World Units per Second).
        let m_speed = 25;

        //[m_currentCourse] Used to point to the current
        //course in the destinations array.
        let m_currentCourse = 0;

        //[m_destinations] An array containing all the 
        //destinations that the ship can travel to. //Will loop forever if the loop for ever if not (0, 0, 0).
        let m_destinations = [
            new THREE.Vector3(150, 0, 0),
            new THREE.Vector3(500, 0, 0)
        ];

        let m_distanceVectors =
        [
            this.getPosition().clone().sub(m_destinations[0]),
            this.getPosition().clone().sub(m_destinations[1])
        ]

        let m_timeToReachDestinations = [
            (this.getPosition().distanceTo(m_destinations[0])) / (m_speed / 1000),
            (this.getPosition().distanceTo(m_destinations[1])) / (m_speed / 1000)
        ]

        console.log('distance vector - ');
        console.log(m_distanceVectors[0]);

        //[m_elaspedMovementTime] Keeps track of how 
        //long the spaceship has been moving for.
        let m_elaspedMovementTime = 0;

        //CREATE SPACESHIP COMPONENTS...
        const BASE = new THREE.Mesh(
            new THREE.CylinderGeometry(5, 10, 2, 32),
            new THREE.MeshStandardMaterial({
                color: colours.SILVER,
                flatShading: THREE.FlatShading,
                metalness: 1,
                roughness: 1
            })
        );

        const DOME = new THREE.Mesh(
            new THREE.SphereGeometry(5, 32, 32),
            new THREE.MeshPhysicalMaterial({
                color: colours.LIGHT_BLUE,
                flatShading: THREE.FlatShading,
                metalness: 0,
                roughness: 0.5,
                reflectivity: 1,
                transparent: true,
                opacity: 0.5,
                side: THREE.DoubleSide
            })
        );

        //ADD COMPONENTS TO THE GROUP...
        this.addObjectToGroup(BASE);
        this.addObjectToGroup(DOME);

        //PRIVATE METHODS...

        //PUBLIC METHODS...

        //[m_previousDistance] Stores the last known distance between the spaceship and
        //it's destination.
        let m_previousDistance = this.getPosition().distanceTo(m_destinations[m_currentCourse]);

        let startingPosition = this.getPosition().clone();

        //[origin] Stores the centre of the scene. (Used for distance calculations).
        let origin = new THREE.Vector3(0, 0, 0);
        //[m_distanceToOriginFromDestination] Stores the distance between the current destination
        //and the center of the scene.
        let m_distanceToOriginFromDestination = origin.distanceTo(m_destinations[m_currentCourse]);
        //[m_distanceToOriginFromStartingPosition] Stores the distance between the starting position
        //of the spaceship and the center of the scene.
        let m_distanceToOriginFromStartingPosition = origin.distanceTo(this.getPosition().clone());



        /**
         * Moves the spaceship.
         * @param {number} frameTimeMs - The time in milliseconds it took to
         *                               compute the previous rendered frame.
         */
        this.move = function(frameTimeMs)
        {
            //Check if the current destination has been reached.
            if(this.getPosition().equals(m_destinations[m_currentCourse]))
            {
//                 console.log('Arrived at destination');
            }
            else
            {
                console.log('#################################');
                console.log('Begin movement loop:');

                //Increment the elasped time.
                m_elaspedMovementTime += frameTimeMs;

                //If the time taken to reach the destination so far is bigger
                //than the time required. Reset the elasped time.
                if(m_elaspedMovementTime >= m_timeToReachDestinations[m_currentCourse])
                {
                    m_elaspedMovementTime = 0;
                }

                //[increment] How far along is the spaceship on its course?
                //(0 = beginning, 1 = end).
                let increment = 1 / (m_timeToReachDestinations[m_currentCourse] / m_elaspedMovementTime);

                //If the increment is very close to 1, round it up.
                if(increment > 0.99)
                {
                    increment = 1;
                }               
                
                //[movementVector] Stores how far the spaceship is along it's path to it's destination.
                let movementVector = m_distanceVectors[m_currentCourse].clone().multiplyScalar(increment);

                //[currentDistance] Stores the currently known distance between the spaceship
                //and it's destination.
                let currentPosition = this.getPosition().distanceTo(m_destinations[m_currentCourse]);

                //If the spaceship has flown past its destination then clamp it
                //to the destination.
                if(currentPosition > m_previousDistance)
                {
                    this.setPosition(m_destinations[m_currentCourse]);
                }
                else
                {
                    //Check which direction the ship should be moving in.
                    if(m_distanceToOriginFromDestination > m_distanceToOriginFromStartingPosition)
                    {
                        //Move the ship backwards
                        this.setPosition(startingPosition.clone().sub(movementVector));
                    }
                    else
                    {
                        //Move the ship forwards.
                        this.setPosition(m_distanceVectors[m_currentCourse].clone().sub(movementVector));
                    }
                }

                //Update the previous distance.
                m_previousDistance = currentPosition;

                if(this.getPosition().equals(m_destinations[m_currentCourse]))
                {
                    m_elaspedMovementTime = 0;
                }

                console.log('Current Pos -');
                console.log(this.getPosition());
                console.log('#################################')
            }
        }

        /**
         * Updates the spaceship.
         * @param {number} frameTimeMs - The time in milliseconds it took to
         *                               compute the previous rendered frame.
         */
        this.update = function(frameTimeMs)
        {
            //Only update the spaceship if it is active.
            if(this.isActive())
            {
                //Move the spaceship.
                this.move(frameTimeMs);
            }
        }
     }

 }