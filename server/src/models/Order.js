const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'NextEvent',
      required: true,
    },
    tickets: [orderItemSchema],
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ['MPESA', 'CARDS', 'CASH'],
      required: true,
    },
    billingInfo: {
      firstName: String,
      lastName: String,
      email: String,
      phone: String,
      state: String,
      city: String,
      address: String,
      postalCode: String,
      country: String,
    },
    status: {
      type: String,
      enum: ['PENDING', 'COMPLETED', 'FAILED'],
      default: 'COMPLETED', // Default to completed since we mock payment for now
    },
    isScanned: {
      type: Boolean,
      default: false
    },
    qrCodeData: {
      type: String,
      unique: true
    },
    ticketCode: {
      type: String,
      unique: true
    }
  },
  {
    timestamps: true,
  }
);

const { v4: uuidv4 } = require('uuid');

// Auto-generate QR code data before saving if it doesn't exist
orderSchema.pre('save', function (next) {
  if (!this.qrCodeData || !this.ticketCode) {
    const randomHex = uuidv4().split('-')[0].toUpperCase();
    const randomHex2 = uuidv4().split('-')[1].toUpperCase();
    this.ticketCode = `${randomHex}-${randomHex2}`;
    this.qrCodeData = `LUNIX-TKT-${this.ticketCode}`;
  }
  next();
});

module.exports = { Order: mongoose.model('Order', orderSchema) };
