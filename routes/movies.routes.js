const express = require('express');

//Movies Controllers
const {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
} = require('../controllers/movie.controller');

//Reviews Controllers
const {
  createReview,
  getAllReviews,
  updateReview,
  deleteReview,
  getAllReviewsFromMovie
} = require('../controllers/review.controller');

const { upload } = require('../utils/multer');

const { validationCreateMovie } = require('../validations/movies.validations');
const { validationCreateReview } = require('../validations/reviews.validations');

const { validateSession, onlyAdmin } = require('../middlewares/auth.middleware');
const { getMovie } = require('../middlewares/movies.middleware');

const route = express.Router();

route.use(validateSession);

//Routes Review
route
  .route('/reviews')
  .get(getAllReviews)
  .post(validationCreateReview, createReview);

// route.route('/reviews/:id').post(updateReview).delete(deleteReview);

route.get('/:id/reviews', getMovie, getAllReviewsFromMovie);

//Routes Movie
route.get('/', getAllMovies);

route.post(
  '/',
  onlyAdmin,
  upload.single('image'),
  validationCreateMovie,
  createMovie
);

route
  .use('/:id', getMovie)
  .route('/:id')
  .get(getMovieById)
  .patch(onlyAdmin, updateMovie)
  .delete(onlyAdmin, deleteMovie);

module.exports = { movieRoutes: route };
