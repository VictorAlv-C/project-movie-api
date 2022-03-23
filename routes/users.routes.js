const express = require('express');
const route = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser
} = require('../controllers/user.controller');

const { validateSession } = require('../middlewares/auth.middleware');

route.post('/login', loginUser);

route.post('/', createUser);

route.use(validateSession);

route.get('/', getAllUsers);

route.get('/:id', getUserById);

route.patch('/:id', updateUser);

route.delete('/:id', deleteUser);

module.exports = { userRoutes: route };
