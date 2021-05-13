// Paths to favorites movies
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const favoritesController = require('../controllers/favouriteController');
const auth = require('../middleware/auth');

// api/favorites
router.post('/',
    auth,
    [
        check('id', 'The id is required.').not().isEmpty(),
        check('title', 'The title is required.').not().isEmpty(),
        check('score', 'The score is required.').not().isEmpty()
    ],
    favoritesController.addFav
);
router.get('/',
    auth,
    favoritesController.getFav
);

module.exports = router;