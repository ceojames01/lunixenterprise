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
    googleMapsLink: {
      type: String,
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
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    posterUrl: {
      type: String,
      trim: true,
    },
    eventType: {
      type: String,
      trim: true,
    },
    fullDate: {
      type: String,
      trim: true,
    },
    timeDetails: {
      type: String,
      trim: true,
    },
    ticketTiers: [{
      name: { type: String, trim: true },
      price: { type: Number, default: 0 }
    }],
  },
  {
    timestamps: true,
  }
);

module.exports = { NextEvent: mongoose.model('NextEvent', nextEventSchema) };
