const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Replace the placeholder URI below with your actual MongoDB connection URI
const mongoUri = 'mongodb+srv://siva90balan:Sivaurl123@url0.thcw82s.mongodb.net/?retryWrites=true&w=majority';

const connectDB = async () => {
    try {
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database Connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
