const express = require('express');
const route = express.Router();
const {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
} = require('../controllers/movie.controller');

const { upload } = require('../utils/multer');
const {
  validateSession,
  onlyAdmin
} = require('../middlewares/auth.middleware');
const { getMovie } = require('../middlewares/movies.middleware');

route.use(validateSession);

route.get('/', getAllMovies);

route.post('/', onlyAdmin, upload.single('img'), createMovie);

route
  .use('/:id', getMovie)
  .route('/:id')
  .get(getMovieById)
  .patch(onlyAdmin, updateMovie)
  .delete(onlyAdmin, deleteMovie);

module.exports = { movieRoutes: route };
