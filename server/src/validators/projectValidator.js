const { body, param } = require('express-validator');

const projectValidator = [
  body('name').not().isEmpty().withMessage('Project name is required').trim().escape(),
  body('description').optional().trim().escape(),
  body('status').optional().isIn(['active', 'completed', 'archived']),
  body('dueDate').optional().isISO8601().toDate(),
];

const projectIdValidator = [param('id').isMongoId().withMessage('Invalid project ID')];

module.exports = { projectValidator, projectIdValidator };
