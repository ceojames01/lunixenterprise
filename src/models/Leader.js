const mongoose = require('mongoose');

const leaderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a name'],
      trim: true,
    },
    role: {
      type: String,
      required: [true, 'Please enter a role'],
      trim: true,
    },
    bio: {
      type: String,
      default: '',
    },
    imageUrl: {
      type: String,
      default: '',
    },
    instagramUrl: {
      type: String,
      default: '',
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = { Leader: mongoose.model('Leader', leaderSchema) };
