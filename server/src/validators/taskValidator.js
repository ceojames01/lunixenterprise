const { body, param } = require('express-validator');

const taskValidator = [
  body('title').not().isEmpty().withMessage('Task title is required').trim().escape(),
  body('description').optional().trim().escape(),
  body('project').isMongoId().withMessage('Invalid project ID'),
  body('assignedTo').optional().isMongoId().withMessage('Invalid user ID'),
  body('status').optional().isIn(['todo', 'in_progress', 'review', 'done']),
  body('priority').optional().isIn(['low', 'medium', 'high', 'urgent']),
  body('dueDate').optional().isISO8601().toDate(),
];

const taskIdValidator = [param('id').isMongoId().withMessage('Invalid task ID')];

module.exports = { taskValidator, taskIdValidator };
