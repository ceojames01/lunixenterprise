const mongoose = require('mongoose');
const { logger } = require('../utils/logger');

// Setup connection event listeners
mongoose.connection.on('connected', () => {
  logger.info('MongoDB Connected successfully');
});

mongoose.connection.on('error', (err) => {
  logger.error(`MongoDB connection error: ${err.message}`);
});

mongoose.connection.on('disconnected', () => {
  logger.warn('MongoDB disconnected. Mongoose will attempt to reconnect...');
});

mongoose.connection.on('reconnected', () => {
  logger.info('MongoDB reconnected successfully');
});

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    logger.error('MONGO_URI is not set. Please add it to your .env file.');
    process.exit(1);
  }

  const maxRetries = parseInt(process.env.MONGO_CONNECT_RETRIES) || 5;
  const retryDelay = parseInt(process.env.MONGO_CONNECT_RETRY_DELAY_MS) || 5000;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const conn = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 15000,
        socketTimeoutMS: 45000,
        family: 4,
      });
      return conn;
    } catch (error) {
      logger.error(
        `MongoDB connection attempt ${attempt}/${maxRetries} failed: ${error.message}`
      );
      if (attempt === maxRetries) {
        logger.error('Could not connect to MongoDB after initial retries.');
        if (process.env.NODE_ENV === 'production') {
          process.exit(1);
        }
        return;
      }
      logger.info(`Retrying MongoDB connection in ${retryDelay / 1000}s...`);
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
    }
  }
};

module.exports = { connectDB };

