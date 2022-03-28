const express = require('express');

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser
} = require('../controllers/user.controller');

const {
  validateSession,
  onlyAdmin
} = require('../middlewares/auth.middleware');
const { getUser, isAccountOwner } = require('../middlewares/users.middleware');

const { validationCreateUser } = require('../validations/users.validations');

const route = express.Router();

route.post('/login', loginUser);

route.post('/', validationCreateUser, createUser);

route.use(validateSession);

route.get('/', onlyAdmin, getAllUsers);

route
  .use('/:id', getUser)
  .route('/:id')
  .get(getUserById)
  .patch(isAccountOwner, updateUser)
  .delete(isAccountOwner, deleteUser);

module.exports = { userRoutes: route };
