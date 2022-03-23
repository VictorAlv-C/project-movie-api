const express = require('express');
const {
  createReview,
  deleteReview,
  getAllReviews,
  getReviewId,
  updateReview
} = require('../controllers/review.controller');

const route = express.Router();

route.get('/', getAllReviews);

route.get('/:id', getReviewId);

route.post('/', createReview);

route.patch('/:id', updateReview);

route.delete('/:id', deleteReview);

module.exports = { reviewRoutes: route };
