/**
 * Utility class which recieves user input from the keyboard.
 * @author Andrew Alford
 */
class KeyboardInput
{
    constructor()
    {
        //MEMBER VARIABLES...
        //[m_keyPressed] Holds the keycode the most recently pressed key.
        let m_keyPressed;

        //EVENT LISTENERS...
        document.addEventListener('keyup', function(event) 
        {
            m_keyPressed = event.which;
        }); 
        
        //PUBLIC METHODS...

        /**
         * Checks if a key has been pressed.
         * @param {number} key - This is a reference to the key 
         *                       being checked.
         * @return Returns 'true' if the key has been pressed.
         *         Otherwise 'false' is returned.
         */       
        this.isPressed = function(key)
        {
            if(!(typeof key === 'number' || Number.isInteger(key)))
            {
                throw new Error('KeyboardInput: key ' +
                    'must be an integer.');
            }

            if(key == m_keyPressed)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        /**
         * Updates the Keyboard Input class.
         */
        this.update = function()
        {
            //Resets the previous key pressed.
            m_keyPressed = null;
        }
    }
}

//[keys] Global enum holding a reference to each key.
const keys = {
    W:              87,
    A:              65,
    S:              83,
    D:              68,
    I:              73,
    LEFT_ARROW:     37,
    UP_ARROW:       38,
    RIGHT_ARROW:    39,
    DOWN_ARROW:     40
};

