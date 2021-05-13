// Paths to authenticate users
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');

// api/auth
router.post('/',
[
    check('email', 'Add a valid email').isEmail(),
    check('password', 'The password must be a minimum of 6 characters').isLength({ min:6 })
],
authController.authenticateUser
);

module.exports = router;