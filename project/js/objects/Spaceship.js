/**
 * Class representing a spaceship to fly around the scene.
 * @extends Updateable Object
 * @author Andrew Alford (w16006135)
 */
class Spaceship extends UpdateableObject
{
    /**
     * Constructor for the Spaceship class.
     * @param {THREE.Vector3} initialPosition - The initial position of the
     *                                          spaceship.
     */
    constructor(initialPosition)
    {
        //Construct the superclass.
        super(initialPosition);

        //INITIALISE MEMBER VARIABLES...

        //MOVEMENT VARIABLES...

        //[moving] Whilst true the spaceship will be making its
        //way towards its current destination.
        let moving = false;

        //[m_destination] Will store the destination that 
        //the spaceship is moving towards.
        let m_destination;
        //[m_distanceToDestination] Will store the distance
        //between the spaceship and its destination.
        let m_distanceToDestination;
        //[m_speed] How fast the spaceship is travelling 
        //(world units per second).
        let m_speed = 10;
        //[m_timeToReach] How long it will take the ship to reach
        //a specified destination.
        let m_timeToReach = 0;
        //[m_elaspedMovementTime] Stores the amount of time 
        //(in milliseconds) that the ship has been moving for.
        let m_elaspedMovementTime = 0;
         //[m_distanceVector] Vector containing information on
         //how far the ship is away from its set destination.
        let m_distanceVector = new THREE.Vector3(0, 0, 0);

        //CREATE SHIP COMPONENTS...

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
            new THREE.MeshPhysicalMaterial(
            {color: colours.LIGHT_BLUE, flatShading: THREE.FlatShading, metalness: 0, roughness: 1,
            roughness: 0.5, reflectivity: 1, transparent: true, opacity: 0.5, side: THREE.DoubleSide} ) 
        );


        //ADD COMPONENTS TO THE GROUP...
        this.addObjectToGroup(DOME);
        this.addObjectToGroup(BASE);

        //Scale the spaceship.
        this.getObject().scale.set(0.5, 0.5, 0.5);   

        //PUBLIC METHODS...

        this.plotCourse = function(destination)
        {
            //Check that the ship is not already on a course.
            if(!moving)
            {
                //Assign the new destination.
                m_destination = destination;

                //Calculate the distance vector between the spaceship 
                //and its destination.
                m_distanceVector = this.getPosition().clone().sub(m_destination);
                m_distanceToDestination = this.getPosition().distanceTo(m_destination);

                //Calculate the time it will take the ship to reach its 
                //destination. (Based on its speed).
                m_timeToReach = m_distanceToDestination / (m_speed / 1000);

                console.log('It will take ' + m_timeToReach + 'ms to reach your destination.');

                //Start moving the spaceship.
                moving = true;
            }
        }

        this.move = function(frameTimeMs)
        {
            //Don't move the spaceship if there 
            //is no destination to move towards.
            if(m_destination == null)
            {
                moving = false;
                console.log('No destination');
            }
            else
            {
                //If the ship has already arrived 
                //at its destination.
                if(m_destination.equals(this.getPosition()))
                {
                    moving = false;
                    m_destination = null;
                    console.log('Arrived at destination');

                    //Reset timing variables.
                    m_elaspedMovementTime = 0;
                    m_timeToReach = 0;
                }
                else
                {
                    //Incrmeent the elasped time.
                    m_elaspedMovementTime += frameTimeMs;                   

                    if(m_elaspedMovementTime < m_timeToReach)
                    {
                        //[increment] How far to move the ship along its set path.
                        let increment = 1 - (Math.round((1 / (m_timeToReach / m_elaspedMovementTime)) * 10000) / 10000);

                        //[movementVector] The vector that will be applied to the ships position
                        //in order to move it.
                        let movementVector = m_distanceVector.clone().multiply(new THREE.Vector3(
                            increment,
                            increment,
                            increment
                        ));

                        //[newPosition] Calculate the new position for the ship.
                        let newPosition = this.getPosition().clone().lerp(movementVector, increment);

                        //If the ship has passed its destination, clamp it.
                        if(newPosition.x < m_destination.x)
                        {
                           this.setPosition(m_destination);     
                        }
                        else
                        {
                            //Move the ship as normal.  
                            this.setPosition(newPosition);    
                        }
                    }
                }  
            }
        }

        /**
         * Updates the spaceship.
         * @param {number} frameTimeMs - The time in milliseconds it took to 
         *                               compute the previous rendered frame.
         */
        this.update = function(frameTimeMs)
        {
            
            //Check if the spaceship is active.
            if(this.isActive())
            {
                //Move the ship if it should be moved.
                if(moving)
                {
                    this.move(frameTimeMs);
                }
            }
        }
    }
}