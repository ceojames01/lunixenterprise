const { Editorial } = require('../models/Editorial');
const { Leader } = require('../models/Leader');
const { Partner } = require('../models/Partner');
const { Hero } = require('../models/Hero');
const { NextEvent } = require('../models/NextEvent');
const { Schedule } = require('../models/Schedule');
const { SiteConfig } = require('../models/SiteConfig');

const getEditorsPicks = async (req, res, next) => {
  try {
    const editorsPicks = await Editorial.find({ isEditorsPick: true })
      .sort({ createdAt: -1 })
      .limit(6)
      .lean();

    const config = await SiteConfig.findOne().lean();

    res.status(200).json({ 
      success: true, 
      count: editorsPicks.length, 
      data: editorsPicks,
      driveLink: config ? config.editorsPicksLink : ''
    });
  } catch (error) {
    next(error);
  }
};

const getLeadershipTeam = async (req, res, next) => {
  try {
    const leadership = await Leader.find().sort({ displayOrder: 1 }).lean();

    res.status(200).json({ success: true, count: leadership.length, data: leadership });
  } catch (error) {
    next(error);
  }
};

const getGeneralContent = async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};

    const articles = await Editorial.find(filter).sort({ createdAt: -1 }).lean();

    res.status(200).json({ success: true, count: articles.length, data: articles });
  } catch (error) {
    next(error);
  }
};

const getPartners = async (req, res, next) => {
  try {
    const partners = await Partner.find({ isActive: true }).sort({ displayOrder: 1 }).lean();

    res.status(200).json({ success: true, count: partners.length, data: partners });
  } catch (error) {
    next(error);
  }
};

const getHero = async (req, res, next) => {
  try {
    const hero = await Hero.findOne({ isActive: true }).sort({ createdAt: -1 }).lean();
    res.status(200).json({ success: true, data: hero });
  } catch (error) {
    next(error);
  }
};

const getNextEvent = async (req, res, next) => {
  try {
    const nextEvent = await NextEvent.findOne({ isActive: true }).sort({ createdAt: -1 }).lean();
    res.status(200).json({ success: true, data: nextEvent });
  } catch (error) {
    next(error);
  }
};

const getAllEvents = async (req, res, next) => {
  try {
    const events = await NextEvent.find({ isActive: true }).sort({ createdAt: -1 }).lean();
    res.status(200).json({ success: true, count: events.length, data: events });
  } catch (error) {
    next(error);
  }
};

const getEventById = async (req, res, next) => {
  try {
    const event = await NextEvent.findById(req.params.id).lean();
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
    res.status(200).json({ success: true, data: event });
  } catch (error) {
    next(error);
  }
};

const getSchedule = async (req, res, next) => {
  try {
    const schedule = await Schedule.findOne({ isActive: true }).sort({ createdAt: -1 }).lean();
    res.status(200).json({ success: true, data: schedule });
  } catch (error) {
    next(error);
  }
};

const getConfig = async (req, res, next) => {
  try {
    const config = await SiteConfig.findOne().lean();
    res.status(200).json({ success: true, data: config || {} });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEditorsPicks,
  getLeadershipTeam,
  getGeneralContent,
  getPartners,
  getHero,
  getNextEvent,
  getAllEvents,
  getEventById,
  getSchedule,
  getConfig
};
