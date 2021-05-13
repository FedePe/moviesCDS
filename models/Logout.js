const mongoose = require('mongoose');

const LogoutSchema = mongoose.Schema({
    token: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
});

module.exports = mongoose.model('Logout', LogoutSchema);