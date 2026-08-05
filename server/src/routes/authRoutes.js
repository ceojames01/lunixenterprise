const express = require('express');
const router = express.Router();
const { register, login, getMe, updateProfile, toggleWishlist } = require('../controllers/authController');
const { registerValidator, loginValidator } = require('../validators/authValidator');
const { auth } = require('../middleware/auth');

router.post('/register', registerValidator, register);
router.post('/login', loginValidator, login);
router.get('/me', auth, getMe);
router.put('/profile', auth, updateProfile);
router.put('/wishlist/:eventId', auth, toggleWishlist);

module.exports = router;
