const jwt = require('jsonwebtoken');
const Token = require('../models/Logout');

module.exports = async function(req, res, next) {

    //Read header token
    const token = req.header('x-auth-token');

    // Check if there is no token
    if(!token){
        return res.status(401).json({msg: 'No token, invalid permission'});
    }

    // validate the token
    try {
        let tokenExist = await Token.findOne( { token : token} );

        if(tokenExist){
            throw Error;
        }else{
            const cifrado = jwt.verify(token, process.env.SECRET);
            req.user = cifrado.user;
        }
        next();
    } catch (error) {
        res.status(401).json({msg: 'Invalid token'});
    }
}