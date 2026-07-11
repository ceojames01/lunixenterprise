const express = require('express');
const router = express.Router();
const { getEditorsPicks, getLeadershipTeam, getLatestNews } = require('../controllers/contentController');

router.get('/editors-picks', getEditorsPicks);
router.get('/leadership-team', getLeadershipTeam);
router.get('/latest-news', getLatestNews);

module.exports = router;
