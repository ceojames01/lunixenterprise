const express = require('express');
const { createOrder, getMyOrders } = require('../controllers/orderController');
const { auth } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(auth);

router.post('/', createOrder);
router.get('/my-orders', getMyOrders);

module.exports = router;
