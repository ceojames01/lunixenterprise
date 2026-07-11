const express = require('express');
const router = express.Router();
const { getEditorsPicks, getLeadershipTeam, getGeneralContent } = require('../controllers/contentController');

router.get('/editors-picks', getEditorsPicks);
router.get('/leadership', getLeadershipTeam);
router.get('/articles', getGeneralContent);

module.exports = router;
