
class Timer
{
    constructor()
    {
        //Timing variables...
        //[frameTime] The amount of time taken to compute and render a frame of animation in milliseconds.
        let m_frameTimeMs = 0;
        //[previousTime] The amount of time taken to compute and render the previous frame in milliseconds.
        let m_previousTimeMs = 0;
        //[currentTime] Stores the current time in milliseconds.
        let m_currentTimeMs = 0;

        this.getFrameTimeMs = function()
        {
            return m_frameTimeMs;
        }

        this.update = function()
        {
            //Update timing variables.
            m_currentTimeMs = performance.now();
            m_frameTimeMs = m_currentTimeMs - m_previousTimeMs;
            m_previousTimeMs = m_currentTimeMs;
        }
    }
}