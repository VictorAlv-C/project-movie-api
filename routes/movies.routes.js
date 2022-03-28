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
  deleteReview
} = require('../controllers/review.controller');

const { upload } = require('../utils/multer');

const { validationCreateMovie } = require('../validations/movies.validations');
const { validationCreateReview } = require('../validations/reviews.validations');

const { validateSession, onlyAdmin } = require('../middlewares/auth.middleware');
const { getMovie } = require('../middlewares/movies.middleware');

const route = express.Router();

route.use(validateSession);

//Routes Movie
route.get('/', getAllMovies);

route.post(
  '/',
  onlyAdmin,
  upload.single('image'),
  validationCreateMovie,
  createMovie
);

route.patch('/reviews/:id', updateReview);

route
  .use('/:id', getMovie)
  .route('/:id')
  .get(getMovieById)
  .patch(onlyAdmin, updateMovie)
  .delete(onlyAdmin, deleteMovie);

//Routes Review

route
  .route('/:movieId/reviews')
  .post(validationCreateReview, createReview)
  .get(getAllReviews);

route.route('/:movieId/reviews/:reviewId').patch(updateReview);

module.exports = { movieRoutes: route };
