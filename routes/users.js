// Paths to create users
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const { check } = require('express-validator');

// Create a user
// /api/users
router.post('/',
[
    check('firstName', 'The firstName is required.').not().isEmpty(),
    check('lastName', 'The lastName is required.').not().isEmpty(),
    check('email', 'Add a valid email').isEmail(),
    check('password', 'The password must be a minimum of 6 characters').isLength({ min:6 })
],
    userController.createUser
);

module.exports = router;