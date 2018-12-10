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
            new THREE.Vector3(500, 0, 0),
            new THREE.Vector3(150, 0, 0)
        ];

        //[m_startingPosition] The starting position of the spaceship.
        let m_startingPosition = this.getPosition().clone();

        //[startingDistance] The starting distance vector between the ship and it's destination.
        let m_startingDistanceVector = this.getPosition().clone().sub(m_destinations[m_currentCourse]);

        //[m_previousDistance] Stores the last known distance between the spaceship and
        //it's destination.
        let m_previousDistance = this.getPosition().distanceTo(m_destinations[m_currentCourse]);

        //[m_timeToReachDestination] The time it wil take to reach the destination.
        let m_timeToReachDestination = m_startingPosition.distanceTo(m_destinations[m_currentCourse]) / (m_speed / 1000);

        //[m_origin] Stores the centre of the scene. (Used for distance calculations).
        let m_origin = new THREE.Vector3(0, 0, 0);

        //[m_distanceToOriginFromDestination] Stores the distance between the current destination
        //and the center of the scene.
        let m_distanceToOriginFromDestination = m_origin.distanceTo(m_destinations[m_currentCourse]);

        //[m_distanceToOriginFromStartingPosition] Stores the distance between the starting position
        //of the spaceship and the center of the scene.
        let m_distanceToOriginFromStartingPosition = m_origin.distanceTo(this.getPosition().clone());

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

        //PUBLIC METHODS...

        this.plotCourse = function()
        {
            //Re-initialise movement variables.
            m_startingPosition = this.getPosition().clone();
            m_startingDistanceVector = this.getPosition().clone().sub(m_destinations[m_currentCourse]);
            m_previousDistance = this.getPosition().distanceTo(m_destinations[m_currentCourse]);
            m_timeToReachDestination = m_startingPosition.distanceTo(m_destinations[m_currentCourse]) / (m_speed / 1000);
            m_distanceToOriginFromDestination = m_origin.distanceTo(m_destinations[m_currentCourse]);
            m_distanceToOriginFromStartingPosition = m_origin.distanceTo(this.getPosition().clone());
            m_elaspedMovementTime = 0;

            console.log('$$$$$$$$$$$$$$$$$$$$$$$$');
            console.log('NEW COURSE PLOTTED');
            console.log('Starting position: ');
            console.log(m_startingPosition);
            console.log('m_startingDistanceVector:');
            console.log(m_startingDistanceVector);
            console.log('Prevois distance');
            console.log(m_previousDistance);
            console.log('distance to origin (from dest): ' + m_distanceToOriginFromDestination);
            console.log('distance to origin (from ship): ' + m_distanceToOriginFromStartingPosition);
            console.log('$$$$$$$$$$$$$$$$$$$$$$$$');
        }

        let loopOnce = true;

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

                if(loopOnce)
                {
                    loopOnce = false;
                    m_currentCourse = 1;
                    this.plotCourse();
                }
            }
            else
            {
                console.log('#################################');
                console.log('Begin movement loop:');
                
                //Increment the elasped time.
                m_elaspedMovementTime += frameTimeMs;

                //If the time taken to reach the destination so far is bigger
                //than the time required. Reset the elasped time.
                if(m_elaspedMovementTime >= m_timeToReachDestination)
                {
                    m_elaspedMovementTime = 0;
                }

                //[increment] How far along is the spaceship on its course?
                //(0 = beginning, 1 = end).
                let increment = 1 / (m_timeToReachDestination / m_elaspedMovementTime);

                //If the increment is very close to 1, round it up.
                if(increment > 0.99)
                {
                    increment = 1;
                }               
                
                //[movementVector] Stores how far the spaceship is along it's path to it's destination.
                let movementVector = m_startingDistanceVector.clone().multiplyScalar(increment);

                console.log('Mv:');
                console.log(movementVector);

                //[currentDistance] Stores the currently known distance between the spaceship
                //and it's destination.
                let currentDistance = this.getPosition().distanceTo(m_destinations[m_currentCourse]);

                //If the spaceship has flown past its destination then clamp it
                //to the destination.
                if(currentDistance > m_previousDistance)
                {
                    this.setPosition(m_destinations[m_currentCourse]);
                }
                else
                {
                    //Check which direction the ship should be moving in.
                    if(m_distanceToOriginFromDestination > m_distanceToOriginFromStartingPosition)
                    {
                        //Move the ship backwards
                        this.setPosition(m_startingPosition.clone().sub(movementVector));
                    }
                    else
                    {
                        //Move the ship forwards.
                        //THIS SHOULD NOT BE DISTANCE VEC
                        this.setPosition(m_startingDistanceVector.clone().sub(movementVector));
                    }
                }

                //Update the previous distance.
                m_previousDistance = currentDistance;

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