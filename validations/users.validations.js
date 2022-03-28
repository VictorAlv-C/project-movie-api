const { body } = require('express-validator');
const { User } = require('../models/user.model');
const { validationResults } = require('../utils/validationResult');

const validationCreateUser = [
  body('userName')
    .notEmpty()
    .withMessage('Property userName is empty')
    .isString()
    .withMessage('Property userName must be string'),
  body('email')
    .notEmpty()
    .withMessage('Property email is empty')
    .custom(async (value) => {
      const user = await User.findOne({
        where: { email: value, status: 'active' }
      });
      if (user) {
        return Promise.reject('E-mail already in use');
      }
    })
    .isEmail()
    .withMessage('Property email must be E-mail'),
  body('password')
    .notEmpty()
    .withMessage('Property password is empty')
    .isString()
    .withMessage('Property age must be string'),
  validationResults
];

module.exports = { validationCreateUser };
