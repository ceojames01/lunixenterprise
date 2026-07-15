const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  createEvent, getEvents, updateEvent, deleteEvent,
  createHero, getHeroes, updateHero, deleteHero,
  createPartner, getPartners, updatePartner, deletePartner,
  createLeader, getLeaders, updateLeader, deleteLeader,
  createEditorial, getEditorials, updateEditorial, deleteEditorial
} = require('../controllers/adminController');

// All admin routes require authentication
router.use(auth);

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

module.exports = router;
