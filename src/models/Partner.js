const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a partner name'],
      trim: true,
    },
    imageUrl: {
      type: String,
      required: [true, 'Please provide an image URL or SVG link'],
    },
    link: {
      type: String,
      default: '#',
    },
    isActive: {
      type: Boolean,
      default: true,
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

module.exports = { Partner: mongoose.model('Partner', partnerSchema) };
