const { Order } = require('../models/Order');
const { NextEvent } = require('../models/NextEvent');

const createOrder = async (req, res, next) => {
  try {
    const { eventId, tickets, totalAmount, paymentMethod, billingInfo } = req.body;
    
    // Simple validation
    if (!eventId || !tickets || tickets.length === 0 || !totalAmount || !paymentMethod || !billingInfo) {
      return res.status(400).json({ success: false, message: 'Please provide all required order details' });
    }

    const event = await NextEvent.findById(eventId);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    const order = await Order.create({
      user: req.user._id, // Assuming req.user is populated by protect middleware
      event: eventId,
      tickets,
      totalAmount,
      paymentMethod,
      billingInfo,
      status: paymentMethod === 'MPESA' ? 'PENDING' : 'COMPLETED',
    });

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('event', 'title fullDate posterUrl location timeDetails dateRange eventCode')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getMyOrders,
};
