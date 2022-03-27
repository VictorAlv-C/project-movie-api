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

const {
  validateSession,
  onlyAdmin
} = require('../middlewares/auth.middleware');

const { getUser, isAccountOwner } = require('../middlewares/users.middleware');

route.post('/login', loginUser);

route.post('/', createUser);

route.use(validateSession);

route.get('/', onlyAdmin, getAllUsers);

route
  .use('/:id', getUser)
  .route('/:id')
  .get(getUserById)
  .patch(isAccountOwner, updateUser)
  .delete(isAccountOwner, deleteUser);

module.exports = { userRoutes: route };
