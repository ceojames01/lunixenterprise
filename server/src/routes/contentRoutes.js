const express = require('express');
const router = express.Router();
const { getEditorsPicks, getLeadershipTeam, getGeneralContent, getPartners, getHero, getNextEvent, getAllEvents, getEventById, getSchedule, getConfig } = require('../controllers/contentController');

router.get('/editors-picks', getEditorsPicks);
router.get('/leadership', getLeadershipTeam);
router.get('/articles', getGeneralContent);
router.get('/partners', getPartners);
router.get('/hero', getHero);
router.get('/next-event', getNextEvent);
router.get('/events', getAllEvents);
router.get('/events/:id', getEventById);
router.get('/schedule', getSchedule);
router.get('/config', getConfig);

module.exports = router;
