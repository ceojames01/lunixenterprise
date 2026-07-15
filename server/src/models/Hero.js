const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please enter a title'],
      trim: true,
    },
    badgeText: {
      type: String,
      default: 'UNLOCKED',
      trim: true,
    },
    mediaUrl: {
      type: String,
      required: [true, 'Please provide a media URL'],
    },
    mediaType: {
      type: String,
      enum: ['image', 'video'],
      default: 'image',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = { Hero: mongoose.model('Hero', heroSchema) };
