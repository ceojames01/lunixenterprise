const { body } = require('express-validator');

const registerValidator = [
  body('name').not().isEmpty().withMessage('Name is required').trim().escape(),
  body('email').isEmail().withMessage('Please provide a valid email').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

const loginValidator = [
  body('email').isEmail().withMessage('Please provide a valid email').normalizeEmail(),
  body('password').not().isEmpty().withMessage('Password is required'),
];

module.exports = { registerValidator, loginValidator };
