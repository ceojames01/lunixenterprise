const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  createEvent, getEvents, updateEvent, deleteEvent,
  createHero, getHeroes, updateHero, deleteHero,
  createPartner, getPartners, updatePartner, deletePartner,
  createLeader, getLeaders, updateLeader, deleteLeader,
  createEditorial, getEditorials, updateEditorial, deleteEditorial,
  createSchedule, getSchedules, updateSchedule, deleteSchedule,
  getUsers, createUser, updateUser, deleteUser,
  uploadImage, getSiteConfig, updateSiteConfig
} = require('../controllers/adminController');
const { upload } = require('../config/cloudinary');

// All admin routes require authentication
router.use(auth);

// Upload
router.post('/upload', upload.single('image'), uploadImage);

// Config
router.route('/config').get(getSiteConfig).put(updateSiteConfig);

// Events
router.route('/event').post(createEvent).get(getEvents);
router.route('/event/:id').put(updateEvent).delete(deleteEvent);

// Hero
router.route('/hero').post(createHero).get(getHeroes);
router.route('/hero/:id').put(updateHero).delete(deleteHero);

// Partners
router.route('/partners').post(createPartner).get(getPartners);
router.route('/partners/:id').put(updatePartner).delete(deletePartner);

// Leaders
router.route('/leaders').post(createLeader).get(getLeaders);
router.route('/leaders/:id').put(updateLeader).delete(deleteLeader);

// Editorials
router.route('/editorials').post(createEditorial).get(getEditorials);
router.route('/editorials/:id').put(updateEditorial).delete(deleteEditorial);

// Schedule
router.route('/schedule').post(createSchedule).get(getSchedules);
router.route('/schedule/:id').put(updateSchedule).delete(deleteSchedule);

// Users
router.route('/users').get(getUsers).post(createUser);
router.route('/users/:id').put(updateUser).delete(deleteUser);

// Orders and Leaderboard
const { getOrders, updateOrder, verifyOrder, getLeaderboard, getWhatsAppStatus, logoutWhatsApp } = require('../controllers/adminController');
router.route('/orders').get(getOrders);
router.route('/orders/:id').put(updateOrder);
router.route('/orders/:id/verify').put(verifyOrder);
router.route('/leaderboard').get(getLeaderboard);

// --- WHATSAPP ROUTES ---
router.get('/whatsapp/status', getWhatsAppStatus);
router.post('/whatsapp/logout', logoutWhatsApp);

module.exports = router;
