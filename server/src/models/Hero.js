const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please enter a title'],
      trim: true,
    },
    subtitle: {
      type: String,
      trim: true,
    },
    badgeText: {
      type: String,
      default: 'UNLOCKED',
      trim: true,
    },
    showBadge: {
      type: Boolean,
      default: true,
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
    overlayOpacity: {
      type: Number,
      default: 50,
    },
    sectionHeight: {
      type: String,
      default: '85vh',
    },
    headingSize: {
      type: String,
      enum: ['Small', 'Medium', 'Large (Default)', 'Extra Large'],
      default: 'Large (Default)',
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
