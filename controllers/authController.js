const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.authenticateUser = async (req, res) => {
    // check for errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    // extract email and password
    const { email, password } = req.body;

    try {
        // Check that you are a registered user
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({msg: 'User does not exist'});
        }

        // Check the password
        const correctPassword = await bcryptjs.compare(password, user.password);
        if(!correctPassword){
            return res.status(400).json({ msg: 'Incorrect Password'})
        }

        // If everything is correct the JWT is created
        const payload = {
            user:{
                id: user.id
            }
        };
        
        // Sign the JWT
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600 // expires in an hour
        }, (error, token) => {
            if(error){
                throw error;
            }
                    
            // Confirmation message
            res.json({ token });
        });

    } catch (error) {
        console.log(error);
    }
   
}