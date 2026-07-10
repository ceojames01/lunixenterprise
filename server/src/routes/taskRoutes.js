const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const { taskValidator, taskIdValidator } = require('../validators/taskValidator');
const { auth } = require('../middleware/auth');

router.use(auth);

router.post('/', taskValidator, createTask);
router.get('/', getTasks);
router.get('/:id', taskIdValidator, getTask);
router.put('/:id', taskIdValidator, taskValidator, updateTask);
router.delete('/:id', taskIdValidator, deleteTask);

module.exports = router;
