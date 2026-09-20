const express = require('express');
const { createOrder, getMyOrders } = require('../controllers/orderController');
const { bulkGenerateTickets } = require('../controllers/adminController');
const { auth } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(auth);

router.post('/', createOrder);
router.post('/bulk-generate', bulkGenerateTickets);
router.get('/my-orders', getMyOrders);

module.exports = router;
