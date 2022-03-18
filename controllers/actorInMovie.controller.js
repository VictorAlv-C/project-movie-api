const { ActorsInMovies } = require('../models/actorsInMovies');
const { catchAsync } = require('../utils/catchAsync');

exports.getAllActorsInMovie = catchAsync(async (req, res, next) => {
  const actorInMovies = await ActorsInMovies.findAll();

  res.status(200).json({
    status: 'Success',
    data: { actorInMovies }
  });
});

exports.createActorInMovie = catchAsync(async (req, res, next) => {
  const { actorId, movieId } = req.body;

  const actorInMovie = await ActorsInMovies.create({ actorId, movieId });

  res.status(200).json({
    status: 'success',
    data: { actorInMovie }
  });
});
