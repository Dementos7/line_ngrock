const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    method: {
        type: String,
        default: "standard"
    },
    payed: {
        type: String,
        default: null
    },
    last_asked: {
        type: {
            date: { type: Date, default: Date.now }, // Ensure this default is a date
            num: { type: Number, default: 0 }
        },
        default: {} // Default to an empty object
    },
    cron_num: {
        type: Number,
        default: 0
    },
    history: {
        type: [Object],
        default: []
    },
    followed: {
        type: Date,
        default: Date.now
    },
    unfollowed: {
        type: Date,
        default: null
    }
});

const User = new mongoose.model('User', userSchema);

module.exports = User;