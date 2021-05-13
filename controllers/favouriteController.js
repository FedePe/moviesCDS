const Favourite = require('../models/Favourite');
const { validationResult } = require('express-validator');

exports.addFav = async (req, res) => {

    // Check for errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    // extract id
    const { id } = req.body;

    try {
        // Check that the favorite to register is not in the fav list of that user
        let favourite = await Favourite.findOne( {id, author : req.user.id} );

        if(favourite){
            res.status(400).json({ msg: 'Favourite already exists' });
        } else {

            // create the new fav
            favourite = new Favourite(req.body);

            favourite.author = req.user.id;

            // save fav
            await favourite.save();
            
            // Confirmation message
            res.json({ msg: 'Was successfully added to favorites' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({msg: 'An error occurred' });
    }
}

exports.getFav = async (req, res) => {

    try {
        // Get user favorites
        const favorites = await Favourite.find( {author : req.user.id} ).sort({suggestionForTodayScore: -1});
        
        // Confirmation message
        res.json(favorites);

    } catch (error) {
        console.log(error);
        res.status(500).send({msg: 'An error occurred' });
    }
}