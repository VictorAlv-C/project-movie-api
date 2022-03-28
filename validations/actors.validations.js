const { body } = require('express-validator');
const { validationResults } = require('../utils/validationResult');

const validationCreateActor = [
  body('name')
    .notEmpty()
    .withMessage('Property name is empty')
    .isString()
    .withMessage('Property name must be string'),
  body('country')
    .notEmpty()
    .withMessage('Property country is empty')
    .isString()
    .withMessage('Property country must be string'),
  body('age')
    .notEmpty()
    .withMessage('Property age is empty')
    .isNumeric()
    .withMessage('Property age must be number')
    .custom((value) => value > 0)
    .withMessage('Property age must be greater than 0'),
  validationResults
];

module.exports = { validationCreateActor };
