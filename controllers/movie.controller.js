const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');

const { Movie } = require('../models/movie.model');
const { Actor } = require('../models/actor.model');

const { AppError } = require('../utils/AppError');
const { catchAsync } = require('../utils/catchAsync');
const { filterObj } = require('../utils/filterObj');
const { storage } = require('../utils/fireBase');

exports.getAllMovies = catchAsync(async (req, res) => {
  const movies = await Movie.findAll({
    where: { status: 'active' },
    include: [{ model: Actor }]
  });

  res.status(200).json({
    status: 'success',
    data: { movies }
  });
});

exports.getMovieById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const movie = await Movie.findOne({
    where: { id, status: 'active' },
    include: [{ model: Actor }]
  });

  if (!movie) {
    return next(new AppError(404, 'Cant get movie with given Id'));
  }

  res.status(200).json({
    status: 'success',
    data: { movie }
  });
});

exports.createMovie = catchAsync(async (req, res, next) => {
  const { title, description, duration, rating, genre } = req.body;
  if (
    !title ||
    !description ||
    !duration ||
    !rating ||
    !genre ||
    title.length === 0 ||
    description.length === 0 ||
    duration.length === 0 ||
    rating.length === 0 ||
    genre.length === 0
  ) {
    return next(new AppError(404, 'Some property is missing or empty'));
  }

  const arrName = req.file.originalname.split('.');
  const ext = arrName.pop();
  const name = arrName.join('-');

  const imgRef = ref(storage, `imgs/${name}-${Date.now()}.${ext}`);
  const upload = await uploadBytes(imgRef, req.file.buffer);

  const url = await getDownloadURL(imgRef);

  const movie = await Movie.create({
    title,
    description,
    duration,
    rating,
    image: upload.metadata.fullPath,
    genre
  });

  res.status(201).json({
    status: 'success',
    data: { movie }
  });
});

exports.updateMovie = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const movie = await Movie.findOne({
    where: { id, status: 'active' }
  });

  if (!movie) {
    return next(new AppError(404, 'Cant update movie with given ID'));
  }

  const updateMovie = filterObj(
    req.body,
    'title',
    'description',
    'duration',
    'genre'
  );

  if (
    updateMovie['title'] === '' ||
    updateMovie['description'] === '' ||
    updateMovie['duration'] === '' ||
    updateMovie['score'] === ''
  ) {
    return next(new AppError(400, 'Some propertie is empty'));
  }
  await movie.update({ ...updateMovie });

  res.status(200).json({
    satus: 'success',
    data: { movie }
  });
});

exports.deleteMovie = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const movie = await Movie.findOne({
    where: { id, status: 'active' }
  });

  if (!movie) return next(new AppError(404, 'Cant delete movie with given ID'));

  await movie.update({ status: 'deleted' });

  res.status(200).json({
    status: 'Success'
  });
});
