const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const auth = require('../middleware/auth');


// api/movies
router.get('/',
    auth,
    movieController.getMovies
)

module.exports = router;