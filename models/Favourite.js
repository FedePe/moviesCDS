const mongoose = require('mongoose');

const FavoritesSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    score: {
        type: Number,
        required: true,
        trim: true
    },
    suggestionForTodayScore: {
        type: Number,
        default: (() => {
            return Math.floor(Math.random() * 99)
        })
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    addedAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Favourite', FavoritesSchema);