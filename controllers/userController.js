const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
    
    // Check for errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    // extract email and password
    const { email, password } = req.body;

    try {
        // Check that the user to register is unique
        let user = await User.findOne( {email} );

        if(user){
            res.status(400).json({ msg: 'User already exists' });
        } else {

            // create the new user
            user = new User(req.body);

            // Hash the password
            const salt = await bcryptjs.genSalt(10);
            user.password = await bcryptjs.hash(password, salt);

            // save usuario
            await user.save();

            // Create the JWT
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
        }

    } catch (error) {
        console.log(error);
        res.status(400).send({msg: 'An error occurred' });
    }
}