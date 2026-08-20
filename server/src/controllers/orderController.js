const { Order } = require('../models/Order');
const { NextEvent } = require('../models/NextEvent');
const { sendTicketEmail, sendTicketWhatsApp, notifyAdminCashOrder } = require('../services/notificationService');

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

    let sellerId = null;
    if (req.user && ['admin', 'scanner'].includes(req.user.role)) {
      sellerId = req.user._id;
    }

    const order = await Order.create({
      user: req.user._id, // The account making the purchase
      seller: sellerId,
      event: eventId,
      tickets,
      totalAmount,
      paymentMethod,
      billingInfo,
      status: ['MPESA', 'CASH'].includes(paymentMethod) ? 'PENDING' : 'COMPLETED',
    });

    // Send notifications if completed
    if (order.status === 'COMPLETED') {
      const email = billingInfo.email || (req.user && req.user.email);
      const phone = billingInfo.phone || (req.user && req.user.phone);
      
      if (email) {
        sendTicketEmail(email, order, event).catch(err => console.error('Email send failed', err));
      }
      if (phone) {
        sendTicketWhatsApp(phone, order, event).catch(err => console.error('WhatsApp send failed', err));
      }
    } else if (order.status === 'PENDING' && paymentMethod === 'CASH') {
      const scannerName = req.user.name || req.user.email;
      notifyAdminCashOrder(scannerName, order, event).catch(err => console.error('Cash alert failed', err));
    }

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
