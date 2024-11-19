const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userID: { 
        type: String, 
        required: true, 
        unique: true 
    },
    method: { 
        type: Boolean, 
        required: true,
        default: true 
    },
    payed: { 
        type: Date, 
        required: true,
        default: "none" 
    },
    cron_num: { 
        type: Number, 
        default: 0 
    },
    followed: { 
        type: Date, 
        default: Date.now() 
    },
    unfollowd: { 
        type: Date, 
        default: Date.now() 
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;