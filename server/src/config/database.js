const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error('MONGO_URI is not set. Please add it to your .env file.');
    process.exit(1);
  }

  const maxRetries = parseInt(process.env.MONGO_CONNECT_RETRIES) || 5;
  const retryDelay = parseInt(process.env.MONGO_CONNECT_RETRY_DELAY_MS) || 5000;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const conn = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 10000,
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return;
    } catch (error) {
      console.error(
        `MongoDB connection attempt ${attempt}/${maxRetries} failed: ${error.message}`
      );
      if (attempt === maxRetries) {
        console.error('Could not connect to MongoDB after multiple attempts. Exiting.');
        process.exit(1);
      }
      console.log(`Retrying in ${retryDelay / 1000}s...`);
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
    }
  }
};

module.exports = { connectDB };
