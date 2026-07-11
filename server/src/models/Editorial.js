const mongoose = require('mongoose');

const editorialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please enter a title'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    excerpt: {
      type: String,
      maxlength: [500, 'Excerpt cannot exceed 500 characters'],
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    imageUrl: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      enum: ['Ticketing', 'Betting', 'Corporate', 'General'],
      default: 'Corporate',
    },
    author: {
      type: String,
      default: '',
    },
    isEditorsPick: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = { Editorial: mongoose.model('Editorial', editorialSchema) };
