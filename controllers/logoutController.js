const Logout = require('../models/Logout');
const { validationResult } = require('express-validator');

exports.logOut = async (req, res) => {

    // extract token
    const { token } = req.body;

    try {
        
        // Check for errors
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
     
        // Check that the token is not in the Logouts list
        let logout = await Logout.findOne( {token : token} );

        if(logout){
            res.status(400).json({ msg: 'Logout already exists' });
        } else {
            // create the new logout
            logout = new Logout();
            
            logout.token = token;

            // save logout
            await logout.save();
            
            // Confirmation message
            res.json({ msg: 'Logged out successfully' });
        }
    
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: 'An error occurred' });
    }
}