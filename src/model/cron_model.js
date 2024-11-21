const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userID: { 
        type: String, 
        required: true, 
        unique: true 
    },
    job: {
        type: String,
        required: true,
    }, 
    cron: {
        type: String,
        required: true
    }
});

const Cron = mongoose.model('Cron', userSchema);

module.exports = Cron;