const { ref, uploadBytes } = require('firebase/storage');

const { Actor } = require('../models/actor.model');
const { Movie } = require('../models/movie.model');

const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/AppError');
const { filterObj } = require('../utils/filterObj');
const { storage } = require('../utils/fireBase');

exports.getAllActors = catchAsync(async (req, res, next) => {
  const actors = await Actor.findAll({
    where: { status: 'active' },
    include: [{ model: Movie }]
  });

  res.status(200).json({
    status: 'success',
    data: { actors }
  });
});

exports.getActorById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const actor = await Actor.findOne({
    where: { id, status: 'active' },
    include: [{ model: Movie }]
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
  const { name, country, age } = req.body;

  if (
    !name ||
    !country ||
    !age ||
    name.length === 0 ||
    country.length === 0 ||
    age.length === 0
  ) {
    return next(new AppError(401, 'Some property is missing or is empty'));
  }
  const arrName = req.file.originalname.split('.');
  const ext = arrName.pop();
  const nameImg = arrName.join('-');

  const imgRef = ref(storage, `imgs/${nameImg}-${Date.now()}.${ext}`);
  const upload = await uploadBytes(imgRef, req.file.buffer);

  const actor = await Actor.create({
    name,
    country,
    age,
    profilePic: upload.metadata.fullPath
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

  const actorUpdate = filterObj(req.body, 'name', 'country', 'age');

  if (
    actorUpdate.name === '' ||
    actorUpdate.country === '' ||
    actorUpdate.age === ''
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
