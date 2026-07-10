const express = require('express');
const router = express.Router();
const {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
const { projectValidator, projectIdValidator } = require('../validators/projectValidator');
const { auth } = require('../middleware/auth');

router.use(auth);

router.post('/', projectValidator, createProject);
router.get('/', getProjects);
router.get('/:id', projectIdValidator, getProject);
router.put('/:id', projectIdValidator, projectValidator, updateProject);
router.delete('/:id', projectIdValidator, deleteProject);

module.exports = router;
