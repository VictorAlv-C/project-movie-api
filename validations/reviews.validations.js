const { body } = require('express-validator');
const { validationResults } = require('../utils/validationResult');

const validationCreateReview = [
  body('title')
    .notEmpty()
    .withMessage('Property title is empty')
    .isString()
    .withMessage('Property title must be string'),
  body('comments')
    .notEmpty()
    .withMessage('Property comments is empty')
    .isString()
    .withMessage('Property comments must be string'),
  body('rating')
    .notEmpty()
    .withMessage('Property rating is empty')
    .isNumeric()
    .withMessage('Property rating must be number')
    .custom((value) => value > 0 && value <= 5)
    .withMessage('Property rating must be between 1 and 5'),
  body('movieId')
    .notEmpty()
    .withMessage('Property movieId is empty')
    .isNumeric()
    .withMessage('Property movieId mut be an Id numeric from Movie'),
  validationResults
];

module.exports = { validationCreateReview };
