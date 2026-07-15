const { Editorial } = require('../models/Editorial');
const { Leader } = require('../models/Leader');
const { Partner } = require('../models/Partner');
const { Hero } = require('../models/Hero');
const { NextEvent } = require('../models/NextEvent');

// --- EVENT CRUD ---
const createEvent = async (req, res, next) => {
  try {
    const event = await NextEvent.create(req.body);
    res.status(201).json({ success: true, data: event });
  } catch (error) { next(error); }
};

const getEvents = async (req, res, next) => {
  try {
    const events = await NextEvent.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: events.length, data: events });
  } catch (error) { next(error); }
};

const updateEvent = async (req, res, next) => {
  try {
    const event = await NextEvent.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
    res.status(200).json({ success: true, data: event });
  } catch (error) { next(error); }
};

const deleteEvent = async (req, res, next) => {
  try {
    const event = await NextEvent.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (error) { next(error); }
};

// --- HERO CRUD ---
const createHero = async (req, res, next) => {
  try {
    const hero = await Hero.create(req.body);
    res.status(201).json({ success: true, data: hero });
  } catch (error) { next(error); }
};

const getHeroes = async (req, res, next) => {
  try {
    const heroes = await Hero.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: heroes.length, data: heroes });
  } catch (error) { next(error); }
};

const updateHero = async (req, res, next) => {
  try {
    const hero = await Hero.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!hero) return res.status(404).json({ success: false, message: 'Hero not found' });
    res.status(200).json({ success: true, data: hero });
  } catch (error) { next(error); }
};

const deleteHero = async (req, res, next) => {
  try {
    const hero = await Hero.findByIdAndDelete(req.params.id);
    if (!hero) return res.status(404).json({ success: false, message: 'Hero not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (error) { next(error); }
};

// --- PARTNERS CRUD ---
const createPartner = async (req, res, next) => {
  try {
    const partner = await Partner.create(req.body);
    res.status(201).json({ success: true, data: partner });
  } catch (error) { next(error); }
};

const getPartners = async (req, res, next) => {
  try {
    const partners = await Partner.find().sort({ displayOrder: 1 });
    res.status(200).json({ success: true, count: partners.length, data: partners });
  } catch (error) { next(error); }
};

const updatePartner = async (req, res, next) => {
  try {
    const partner = await Partner.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!partner) return res.status(404).json({ success: false, message: 'Partner not found' });
    res.status(200).json({ success: true, data: partner });
  } catch (error) { next(error); }
};

const deletePartner = async (req, res, next) => {
  try {
    const partner = await Partner.findByIdAndDelete(req.params.id);
    if (!partner) return res.status(404).json({ success: false, message: 'Partner not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (error) { next(error); }
};

// --- LEADERS CRUD ---
const createLeader = async (req, res, next) => {
  try {
    const leader = await Leader.create(req.body);
    res.status(201).json({ success: true, data: leader });
  } catch (error) { next(error); }
};

const getLeaders = async (req, res, next) => {
  try {
    const leaders = await Leader.find().sort({ displayOrder: 1 });
    res.status(200).json({ success: true, count: leaders.length, data: leaders });
  } catch (error) { next(error); }
};

const updateLeader = async (req, res, next) => {
  try {
    const leader = await Leader.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!leader) return res.status(404).json({ success: false, message: 'Leader not found' });
    res.status(200).json({ success: true, data: leader });
  } catch (error) { next(error); }
};

const deleteLeader = async (req, res, next) => {
  try {
    const leader = await Leader.findByIdAndDelete(req.params.id);
    if (!leader) return res.status(404).json({ success: false, message: 'Leader not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (error) { next(error); }
};

// --- EDITORIALS CRUD ---
const createEditorial = async (req, res, next) => {
  try {
    const editorial = await Editorial.create(req.body);
    res.status(201).json({ success: true, data: editorial });
  } catch (error) { next(error); }
};

const getEditorials = async (req, res, next) => {
  try {
    const editorials = await Editorial.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: editorials.length, data: editorials });
  } catch (error) { next(error); }
};

const updateEditorial = async (req, res, next) => {
  try {
    const editorial = await Editorial.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!editorial) return res.status(404).json({ success: false, message: 'Editorial not found' });
    res.status(200).json({ success: true, data: editorial });
  } catch (error) { next(error); }
};

const deleteEditorial = async (req, res, next) => {
  try {
    const editorial = await Editorial.findByIdAndDelete(req.params.id);
    if (!editorial) return res.status(404).json({ success: false, message: 'Editorial not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (error) { next(error); }
};

module.exports = {
  createEvent, getEvents, updateEvent, deleteEvent,
  createHero, getHeroes, updateHero, deleteHero,
  createPartner, getPartners, updatePartner, deletePartner,
  createLeader, getLeaders, updateLeader, deleteLeader,
  createEditorial, getEditorials, updateEditorial, deleteEditorial
};
