const mongoose = require('mongoose');

const siteConfigSchema = new mongoose.Schema(
  {
    editorsPicksLink: {
      type: String,
      default: '',
    },
    showExecutiveBoard: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = { SiteConfig: mongoose.model('SiteConfig', siteConfigSchema) };
