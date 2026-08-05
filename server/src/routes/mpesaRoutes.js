const express = require('express');
const { generateToken, initiateSTKPush, mpesaCallback } = require('../controllers/mpesaController');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Route to manually trigger STK push (requires auth)
router.post('/stk-push', auth, generateToken, initiateSTKPush);

// Webhook for Safaricom to post back results (public, no auth)
router.post('/callback', mpesaCallback);

module.exports = router;
