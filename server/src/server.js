require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');
const { connectDB } = require('./config/database');
const { logger } = require('./utils/logger');

const PORT = process.env.PORT || 5000;

connectDB();

const server = app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  logger.error(`Unhandled Rejection: ${err && err.stack ? err.stack : err}`);
  if (process.env.NODE_ENV === 'production') {
    server.close(() => process.exit(1));
  }
});

process.on('uncaughtException', (err) => {
  logger.error(`Uncaught Exception: ${err && err.stack ? err.stack : err}`);
  if (process.env.NODE_ENV === 'production') {
    server.close(() => process.exit(1));
  }
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  server.close(() => {
    mongoose.connection.close();
    process.exit(0);
  });
});

