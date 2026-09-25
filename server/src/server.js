require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');
const { connectDB } = require('./config/database');
const { logger } = require('./utils/logger');

const PORT = parseInt(process.env.PORT, 10) || 5000;

console.log(`[BOOT] Initializing database connection...`);
connectDB();

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`[BOOT] HTTP server listening on 0.0.0.0:${PORT}`);
  logger.info(`Server running in ${process.env.NODE_ENV || 'production'} mode on port ${PORT}`);

  // Safely initialize WhatsApp background service after web server is open
  try {
    const { initWhatsApp } = require('./services/whatsappService');
    initWhatsApp().catch(err => {
      console.warn('[WhatsApp] Background initialization skipped or failed:', err.message || err);
    });
  } catch (err) {
    console.warn('[WhatsApp] Could not load WhatsApp module:', err.message || err);
  }
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

