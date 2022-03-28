const { body } = require('express-validator');
const { validationResults } = require('../utils/validationResult');

const validationCreateMovie = [
  body('title')
    .notEmpty()
    .withMessage('Property title is empty')
    .isString()
    .withMessage('Property title must be string'),
  body('description')
    .notEmpty()
    .withMessage('Property description is empty')
    .isString()
    .withMessage('Property description must be string'),
  body('duration')
    .notEmpty()
    .withMessage('Property duration is empty')
    .isNumeric()
    .withMessage('Property duration must be number')
    .custom((value) => value > 0)
    .withMessage('Property duration must be greater than 0'),
  body('rating')
    .notEmpty()
    .withMessage('Property rating is empty')
    .isNumeric()
    .withMessage('Property rating must be number')
    .custom((value) => value > 0 && value <= 5)
    .withMessage('Property rating must be between 1 and 5'),
  body('actors')
    .notEmpty()
    .withMessage('Property actors is empty')
    .isArray()
    .withMessage('Property actors must be an array from actors Id'),
  validationResults
];

module.exports = { validationCreateMovie };
