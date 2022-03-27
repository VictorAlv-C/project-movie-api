const { Actor } = require('../models/actor.model');
const { Movie } = require('../models/movie.model');
const { AppError } = require('../utils/AppError');
const { catchAsync } = require('../utils/catchAsync');

exports.getActor = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const actor = await Actor.findOne({
    where: { id, status: 'active' },
    include: [{ model: Movie }]
  });

  if (!actor) {
    return next(new AppError(400, 'Cant get the actor with given Id'));
  }

  req.actor = actor;

  next();
});
