// Paths to logout
const express = require('express');
const router = express.Router();
const logoutController = require('../controllers/logoutController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// api/logout
router.post('/',
    auth,
    [
        check('token', 'The token is required.').not().isEmpty()
    ],
    logoutController.logOut
);

module.exports = router;