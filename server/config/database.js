const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env.local') });

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI_DEV || process.env.DATABASE_URL || 'mongodb://localhost:27017/SubManageAI';
    console.log('Attempting to connect to MongoDB with URI:', mongoUri);
    
    const conn = await mongoose.connect(mongoUri);

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Error handling after initial connection
    mongoose.connection.on('error', err => {
      console.error(`MongoDB connection error: ${err}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected. Attempting to reconnect...');
    });

    mongoose.connection.on('reconnected', () => {
      console.info('MongoDB reconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      try {
        await mongoose.connection.close();
        console.log('MongoDB connection closed through app termination');
        process.exit(0);
      } catch (err) {
        console.error('Error during MongoDB shutdown:', err);
        process.exit(1);
      }
    });

    return conn;

  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    console.error('Please ensure MongoDB is running on port 27017');
    console.error('You can start MongoDB with: mongod --dbpath /path/to/your/db');
    throw error;
  }
};

module.exports = {
  connectDB,
};