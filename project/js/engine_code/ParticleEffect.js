/**
 * Abstract class representing a particle effect.
 * @extends UpdateableObject
 * @author Andrew Alford (w16006135)
 */
class ParticleEffect extends UpdateableObject
{
    /**
     * Constructor for a Particle Effect.
     * @param {THREE.Vector3} initialPosition - The location of the
     *                                          particle effect.
     * @param {number} numParticles - the number of particles to include
     *                                in the explosion.
     * @param {THREE.Mesh} particleMesh - The mesh used for each particle.
     * @param {number} maxHeight - The maximum height of the explosion.
     * @param {number} minHeight - The minimim height of the explosion.
     * @param {number} duration - The amount of time (in milliseconds) that
     *                            the particle effect lasts for.
     * @param {number} lifeSpan - How long the particles last for.
     * @param {number} speed - How fast do the particles travel.
     * @param {number} dispertion - How far out from the origin will the 
     *                              particles travel.
     * @param {boolean} loop - If true then this effect will loop.
     */
    constructor(initialPosition, numParticles, particleMesh, 
        maxHeight, minHeight, duration, lifeSpan, speed, dispertion, loop)
    {
        //Construct the superclass.
        super(initialPosition)

        //INITIALISE MEMBER VARIABLES.

        //[M_NUM_PARTICLES] the number of particles to include in the efect.
        const M_NUM_PARTICLES = numParticles;

        //[M_DURATION] The amount of time (in seconds) that the
        //effect lasts for.
        const M_DURATION = duration * 1000;

        //[M_LIFESPAN] The amount of time (in seconds) that each 
        //particle lasts for.
        const M_LIFESPAN = 1000;

        //[M_DISPERTION] How fare out from the origin will the particles travel.
        const M_DISPERTION = dispertion;

        //[M_SPEED] How fast the particles travel.
        const M_SPEED = speed;

        //[m_elaspedTime] Keeps track of how long a particle effect
        //has lasted.
        let m_elaspedTime = 0;

        //[m_looping] If true then the effect will repeat.
        let m_looping = loop;

        let particles = [];        
        let directions = [];

        for(let i = 0; i < M_NUM_PARTICLES; i++)
        {
            //Create the particles.
            particles.push(particleMesh.clone());
            this.addObjectToGroup(particles[i]);

            //Set a direction vector for each particle.
            directions.push(new THREE.Vector3());
            directions[i].set(
                Math.random() * 0.65 - 0.4,
                Math.random() * (maxHeight - minHeight) + minHeight,
                Math.random() * 0.65 - 0.4
            );
        }

        //PUBLIC METHODS...

        /**
         * Allows the caller to see if this effect is looping.
         * @return If 'true' then the effect is looping.
         */
        this.getLooping = function()
        {
            return m_looping;
        }

        /**
         * Tells the effect whether or not to loop.
         * @param {boolean} looping - If 'true' then the effect 
         *                            should loop.
         */
        this.setLooping = function(looping)
        {
            m_looping = looping;
            m_elaspedTime = 0;
            //Ensure that the object is active for it to loop again.
            this.setActive(true);
        }

        /**
         * Updates the particle effect. (Overridden from the superclass).
         * @param {number} frameTimeMs - The time in milliseconds it took to 
         *                               compute the previous rendered frame.
         */
        this.update = function(frameTimeMs)
        {
            //Only update the effect if it is active.
            if(this.isActive())
            {
                //Increment the elasped time.
                m_elaspedTime += frameTimeMs;

                //Perform the particle effect.
                for(let i = 0; i < M_NUM_PARTICLES; i++)
                {
                    //Only move the particles if they are within
                    //the dispertion range.
                    if(m_elaspedTime <= M_LIFESPAN)
                    {
                        particles[i].position.add(directions[i].clone().multiplyScalar(M_SPEED));
                    }
                    else
                    {
                        particles[i].visible = false;
                    }
                }

                //Check if the effect should be reset.
                if(m_elaspedTime >= M_DURATION)
                {
                    for(let i = 0; i < M_NUM_PARTICLES; i++)
                    {
                        //Reset the position of the particles.
                        particles[i].position.set(0, 0, 0);

                        particles[i].visible = true;                        
                    }

                    //Reset the elasped time.
                    m_elaspedTime = 0;

                    //If the effect shouldn't loop, make it inactive.
                    if(!m_looping)
                    {
                        this.setActive(false);
                    }
                }
            }
        }
    }
}