const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');

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
  const { actor } = req;

  res.status(200).json({
    status: 'success',
    data: { actor }
  });
});

exports.createActor = catchAsync(async (req, res, next) => {
  const { name, country, age } = req.body;

  const imgRef = ref(storage, `apiMovie/imgActors/${req.file.customName}`);
  await uploadBytes(imgRef, req.file.buffer);
  const imgDownloadImg = await getDownloadURL(imgRef);

  const actor = await Actor.create({
    name,
    country,
    age,
    profilePic: imgDownloadImg
  });

  res.status(200).json({
    status: 'success',
    data: { actor }
  });
});

exports.updateActor = catchAsync(async (req, res, next) => {
  const { actor } = req;

  const dataActor = filterObj(req.body, 'name', 'country', 'age');

  if (dataActor.name === '' || dataActor.country === '' || dataActor.age === '') {
    return next(new AppError(400, 'Some property is empty'));
  }

  await actor.update({ ...dataActor });

  res.status(200).json({
    status: 'success',
    data: { actor }
  });
});

exports.deleteActor = catchAsync(async (req, res, next) => {
  const { actor } = req;

  await actor.update({ status: 'deleted' });
  res.status(200).json({
    status: 'success',
    message: 'Deleted Successfully'
  });
});
