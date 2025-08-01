// db.js
const mongoose = require('mongoose');
const ENV = require('./env.config');
const uri = `mongodb+srv://ShopVerse:${ENV.DB_PASSWORD}@shopverse.lntzu70.mongodb.net/?retryWrites=true&w=majority&appName=ShopVerse`;
const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
