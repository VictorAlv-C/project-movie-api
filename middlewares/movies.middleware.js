const { Actor } = require('../models/actor.model');
const { Movie } = require('../models/movie.model');
const { AppError } = require('../utils/AppError');
const { catchAsync } = require('../utils/catchAsync');

exports.getMovie = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const movie = await Movie.findOne({
    where: { id, status: 'active' },
    include: [{ model: Actor }]
  });

  if (!movie) {
    return next(new AppError(404, 'Cant get movie with given Id'));
  }

  req.movie = movie;

  next();
});
