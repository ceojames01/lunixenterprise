const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  date: { type: String, required: true, trim: true },
  month: { type: String, required: true, trim: true },
  title: { type: String, required: true, trim: true },
  time: { type: String, trim: true }
});

const resultSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  registrationNumber: { type: String, trim: true },
  phoneNumber: { type: String, trim: true }
});

const scheduleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    bannerImage: {
      type: String,
      trim: true,
    },
    mediaUrl: {
      type: String,
      trim: true,
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
      default: 'Large (Default)',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    locationName: {
      type: String,
      trim: true,
    },
    locationLink: {
      type: String,
      trim: true,
    },
    sessions: [sessionSchema],
    results: [resultSchema]
  },
  {
    timestamps: true,
  }
);

module.exports = { Schedule: mongoose.model('Schedule', scheduleSchema) };
