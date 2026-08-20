const { Editorial } = require('../models/Editorial');
const { Leader } = require('../models/Leader');
const { Partner } = require('../models/Partner');
const { Hero } = require('../models/Hero');
const { NextEvent } = require('../models/NextEvent');
const { Order } = require('../models/Order');
const { Schedule } = require('../models/Schedule');
const { SiteConfig } = require('../models/SiteConfig');
const { User } = require('../models/User');
const { sendTicketEmail, sendTicketWhatsApp } = require('../services/notificationService');

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

// --- ORDERS CRUD ---
const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email phone')
      .populate('event', 'title dateRange')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (error) { next(error); }
};

const updateOrder = async (req, res, next) => {
  try {
    const { status } = req.body;
    const originalOrder = await Order.findById(req.params.id);
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true })
      .populate('user', 'name email phone')
      .populate('event');
      
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    
    if (originalOrder && originalOrder.status !== 'COMPLETED' && status === 'COMPLETED') {
      const email = order.billingInfo?.email || (order.user && order.user.email);
      const phone = order.billingInfo?.phone || (order.user && order.user.phone);
      
      if (email) {
        sendTicketEmail(email, order, order.event).catch(err => console.error('Email send failed', err));
      }
      if (phone) {
        sendTicketWhatsApp(phone, order, order.event).catch(err => console.error('WhatsApp send failed', err));
      }
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) { next(error); }
};

const verifyOrder = async (req, res, next) => {
  try {
    const { ticketCode } = req.body;
    
    if (!ticketCode) {
      return res.status(400).json({ success: false, message: 'Ticket code is required' });
    }

    const order = await Order.findOne({ ticketCode })
      .populate('user', 'name email phone')
      .populate('event', 'title dateRange');

    if (!order) {
      return res.status(404).json({ success: false, message: 'Invalid Ticket Code' });
    }

    if (order.isScanned) {
      return res.status(400).json({ 
        success: false, 
        message: 'Ticket has already been scanned!', 
        data: order 
      });
    }

    if (order.status !== 'COMPLETED') {
      return res.status(400).json({ 
        success: false, 
        message: `Ticket is invalid. Order status is ${order.status}`,
        data: order
      });
    }

    order.isScanned = true;
    await order.save();

    res.status(200).json({ 
      success: true, 
      message: 'Ticket verified and marked as scanned successfully!',
      data: order 
    });
  } catch (error) { next(error); }
};


// --- SCHEDULE CRUD ---
const createSchedule = async (req, res, next) => {
  try {
    const schedule = await Schedule.create(req.body);
    res.status(201).json({ success: true, data: schedule });
  } catch (error) { next(error); }
};

const getSchedules = async (req, res, next) => {
  try {
    const schedules = await Schedule.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: schedules.length, data: schedules });
  } catch (error) { next(error); }
};

const updateSchedule = async (req, res, next) => {
  try {
    const schedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!schedule) return res.status(404).json({ success: false, message: 'Schedule not found' });
    res.status(200).json({ success: true, data: schedule });
  } catch (error) { next(error); }
};

const deleteSchedule = async (req, res, next) => {
  try {
    const schedule = await Schedule.findByIdAndDelete(req.params.id);
    if (!schedule) return res.status(404).json({ success: false, message: 'Schedule not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (error) { next(error); }
};

// --- UPLOAD IMAGE ---
const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file provided' });
    }
    res.status(200).json({ success: true, url: req.file.path });
  } catch (error) {
    next(error);
  }
};

// --- CONFIG ---
const getSiteConfig = async (req, res, next) => {
  try {
    let config = await SiteConfig.findOne();
    if (!config) {
      config = await SiteConfig.create({});
    }
    res.status(200).json({ success: true, data: config });
  } catch (error) { next(error); }
};

const updateSiteConfig = async (req, res, next) => {
  try {
    let config = await SiteConfig.findOne();
    if (!config) {
      config = await SiteConfig.create(req.body);
    } else {
      config = await SiteConfig.findByIdAndUpdate(config._id, req.body, { new: true, runValidators: true });
    }
    res.status(200).json({ success: true, data: config });
  } catch (error) { next(error); }
};

// --- USER CRUD ---
const createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (error) { next(error); }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (error) { next(error); }
};

const updateUser = async (req, res, next) => {
  try {
    if (req.body.password) {
      const user = await User.findById(req.params.id);
      if (user) {
        user.password = req.body.password;
        await user.save();
        delete req.body.password;
      }
    }
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.status(200).json({ success: true, data: user });
  } catch (error) { next(error); }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (error) { next(error); }
};

// --- LEADERBOARD ---
const getLeaderboard = async (req, res, next) => {
  try {
    const leaderboard = await Order.aggregate([
      { $match: { seller: { $ne: null }, status: 'COMPLETED' } },
      { $unwind: "$tickets" },
      { 
        $group: {
          _id: "$seller",
          totalTicketsSold: { $sum: "$tickets.quantity" },
          totalRevenue: { $sum: { $multiply: ["$tickets.price", "$tickets.quantity"] } },
          soldTickets: { $push: "$tickets" }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "sellerDetails"
        }
      },
      { $unwind: { path: "$sellerDetails", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 1,
          totalTicketsSold: 1,
          totalRevenue: 1,
          soldTickets: 1,
          name: "$sellerDetails.name",
          email: "$sellerDetails.email",
          phone: "$sellerDetails.phone",
          role: "$sellerDetails.role"
        }
      },
      { $sort: { totalTicketsSold: -1 } }
    ]);
    
    res.status(200).json({ success: true, data: leaderboard });
  } catch (error) { next(error); }
};

// --- WHATSAPP AUTH ---
const getWhatsAppStatus = (req, res) => {
  const whatsappService = require('../services/whatsappService');
  const status = whatsappService.getStatus();
  res.json({ success: true, ...status });
};

const logoutWhatsApp = async (req, res) => {
  const whatsappService = require('../services/whatsappService');
  await whatsappService.logout();
  res.json({ success: true, message: 'WhatsApp logged out' });
};

module.exports = {
  createEvent, getEvents, updateEvent, deleteEvent,
  createHero, getHeroes, updateHero, deleteHero,
  createPartner, getPartners, updatePartner, deletePartner,
  createLeader, getLeaders, updateLeader, deleteLeader,
  createEditorial, getEditorials, updateEditorial, deleteEditorial,
  createSchedule, getSchedules, updateSchedule, deleteSchedule,
  getUsers, createUser, updateUser, deleteUser,
  uploadImage, getSiteConfig, updateSiteConfig,
  getOrders, updateOrder, verifyOrder, getLeaderboard,
  getWhatsAppStatus, logoutWhatsApp
};
