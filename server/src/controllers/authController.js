const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');
const { logger } = require('../utils/logger');
const { generateToken } = require('../services/tokenService');

const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const user = await User.create({ name, email, password });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, wishlist: user.wishlist },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, wishlist: user.wishlist },
    });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({
      success: true,
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role,
        phone: user.phone,
        address: user.address,
        avatar: user.avatar,
        status: user.status,
        wishlist: user.wishlist,
        createdAt: user.createdAt
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { name, email, phone, address, avatar } = req.body;
    
    // Check if email is being updated to an existing one
    if (email) {
      const existing = await User.findOne({ email });
      if (existing && existing._id.toString() !== req.user._id.toString()) {
        return res.status(400).json({ success: false, message: 'Email already in use' });
      }
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, email, phone, address, avatar },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      user: {
        id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role,
        phone: user.phone,
        address: user.address,
        avatar: user.avatar,
        status: user.status,
        wishlist: user.wishlist,
        createdAt: user.createdAt
      },
    });
  } catch (error) {
    next(error);
  }
};

const toggleWishlist = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const index = user.wishlist.indexOf(eventId);
    if (index === -1) {
      user.wishlist.push(eventId);
    } else {
      user.wishlist.splice(index, 1);
    }
    await user.save();

    res.status(200).json({
      success: true,
      user: {
        id: user._id, name: user.name, email: user.email, role: user.role,
        phone: user.phone, address: user.address, avatar: user.avatar,
        status: user.status, wishlist: user.wishlist, createdAt: user.createdAt
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, getMe, updateProfile, toggleWishlist };
