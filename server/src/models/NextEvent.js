const mongoose = require('mongoose');

const nextEventSchema = new mongoose.Schema(
  {
    eventCode: {
      type: String,
      required: [true, 'Please provide an event code (e.g. E 1)'],
      trim: true,
    },
    dateRange: {
      type: String,
      required: [true, 'Please provide a date range'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Please provide a location'],
      trim: true,
    },
    ticketLink: {
      type: String,
      default: '#',
      trim: true,
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

module.exports = { NextEvent: mongoose.model('NextEvent', nextEventSchema) };
