const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017/line';
let client;

const connectToDatabase = async () => {
    try {
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}


const disconnectFromDatabase = async () => {
    try {
        await client.close();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error disconnecting from MongoDB:', error);
    }
}

module.exports = {
    connectToDatabase,
    disconnectFromDatabase
}