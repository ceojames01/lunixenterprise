const express = require('express');
const router = express.Router();
const { getEditorsPicks, getLeadershipTeam, getGeneralContent, getPartners, getHero, getNextEvent } = require('../controllers/contentController');

router.get('/editors-picks', getEditorsPicks);
router.get('/leadership', getLeadershipTeam);
router.get('/articles', getGeneralContent);
router.get('/partners', getPartners);
router.get('/hero', getHero);
router.get('/next-event', getNextEvent);

module.exports = router;
