const express = require('express');
const route = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/user.controller');

route.get('/', getAllUsers);

route.get('/:id', getUserById);

route.post('/', createUser);

route.patch('/:id', updateUser);

route.delete('/:id', deleteUser);

module.exports = { userRoutes: route };
