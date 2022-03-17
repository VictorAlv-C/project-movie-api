const { Actor } = require('../models/actor.model');
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/AppError');
const { filterObj } = require('../utils/filterObj');

exports.getAllActors = catchAsync(async (req, res, next) => {
  const actors = await Actor.findAll({
    where: { status: 'active' }
  });

  res.status(200).json({
    status: 'success',
    data: { actors }
  });
});

exports.getActorById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const actor = await Actor.findOne({
    where: { id, status: 'active' }
  });

  if (!actor) {
    return next(new AppError(400, 'Cant get the actor with given Id'));
  }

  res.status(200).json({
    status: 'success',
    data: { actor }
  });
});

exports.createActor = catchAsync(async (req, res, next) => {
  const { name, country, age, profilePic } = req.body;

  if (
    !name ||
    !country ||
    !age ||
    !profilePic ||
    name.length === 0 ||
    country.length === 0 ||
    age.length === 0 ||
    profilePic.length === 0
  ) {
    return next(new AppError(401, 'Some property is missing or is empty'));
  }

  const actor = await Actor.create({
    name,
    country,
    age,
    profilePic
  });

  res.status(200).json({
    status: 'success',
    data: { actor }
  });
});

exports.updateActor = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const actor = await Actor.findOne({
    where: { id, status: 'active' }
  });

  if (!actor) return next(new AppError(400, 'Catn update actor with given Id'));

  const actorUpdate = filterObj(
    actor,
    'name',
    'country',
    'age',
    'profilePic',
    'movieId'
  );

  if (
    actorUpdate.name === '' ||
    actorUpdate.country === '' ||
    actorUpdate.age === '' ||
    actorUpdate.profilePic === ''
  ) {
    return next(new AppError(400, 'Some propertie is empty'));
  }

  await actor.update({ ...actorUpdate });

  res.status(200).json({
    status: 'success',
    data: { actor }
  });
});

exports.deleteActor = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const actor = await Actor.findOne({ where: { id, status: 'active' } });

  if (!actor) return next(new AppError(400, 'Cant delete actor with given Id'));

  await actor.update({ status: 'deleted' });
  res.status(200).json({
    status: 'success',
    message: 'Deleted Successfully'
  });
});
