const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/line';
let client;

const connectToDatabase = async () => {
    try {
        const connect = mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}



module.exports = {
    connectToDatabase
}