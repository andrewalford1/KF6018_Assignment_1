/**
 * Class representing an explosion particle effect.
 * @extends ParticleEffect
 * @author Andrew Alford (w16006135)
 */
class Explosion extends ParticleEffect
{
    /**
     * @brief Construct the Explosion Particle.
     * @param {THREE.Vector3} initialPosition - The location of the 
     *                                          particle effect.
     * @param {number} numParticles - the number of particles to include in
     *                                the explosion.
     * @param {number} particleSize - How big each individual particle
     *                                should be.
     * @param {color} colour - What colour the particles should be.
     * @param {number} maxHeight - The maximum height of the explosion.
     * @param {number} minHeight - The minimim height of the explosion.
     * @param {number} duration - The amount of time (in milliseconds) that
     *                            the explosion lasts for.
     * @param {number} lifeSpan - How long the particles last for.
     * @param {number} speed - How fast do the particles travel.
     * @param {number} dispertion - How far out from the origin will the 
     *                              particles travel.
     * @param {boolean} loop - If true then this effect will loop.
     */
    constructor(initialPosition, numParticles, particleSize, colour, 
        maxHeight, minHeight, duration, lifeSpan, speed, dispertion, loop)
    {
        //Construct the superclass.
        super(
            initialPosition,
            numParticles,
            new THREE.Mesh(
                new THREE.SphereGeometry(particleSize, 8, 8),
                new THREE.MeshStandardMaterial({
                    color: colour, 
                    flatShading: THREE.FlatShading, 
                })
            ),
            maxHeight,
            minHeight,
            duration,
            lifeSpan,
            speed,
            dispertion,
            loop
        );
    }
}