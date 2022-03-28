const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');

const { Movie } = require('../models/movie.model');
const { Actor } = require('../models/actor.model');
const { Review } = require('../models/review.model');
const { ActorsInMovies } = require('../models/actorsInMovies');

const { AppError } = require('../utils/AppError');
const { catchAsync } = require('../utils/catchAsync');
const { filterObj } = require('../utils/filterObj');
const { storage } = require('../utils/fireBase');

exports.getAllMovies = catchAsync(async (req, res) => {
  const movies = await Movie.findAll({
    where: { status: 'active' },
    include: [{ model: Actor }, { model: Review }]
  });

  res.status(200).json({
    status: 'success',
    data: { movies }
  });
});

exports.getMovieById = catchAsync(async (req, res, next) => {
  const { movie } = req;

  res.status(200).json({
    status: 'success',
    data: { movie }
  });
});

exports.createMovie = catchAsync(async (req, res, next) => {
  const { title, description, duration, rating, genre, actors } = req.body;

  const imgRef = ref(storage, `apiMovie/imgMovies/${req.file.customName}`);
  await uploadBytes(imgRef, req.file.buffer);

  const imgDownloadImg = await getDownloadURL(imgRef);

  const movie = await Movie.create({
    title,
    description,
    duration,
    rating,
    image: imgDownloadImg,
    genre
  });

  actors.map(
    async (actor) =>
      await ActorsInMovies.create({ actorId: actor, movieId: movie.id })
  );

  res.status(201).json({
    status: 'success',
    data: { movie }
  });
});

exports.updateMovie = catchAsync(async (req, res, next) => {
  const { movie } = req;

  const dataMovie = filterObj(req.body, 'title', 'description', 'duration', 'genre');

  if (
    dataMovie['title'] === '' ||
    dataMovie['description'] === '' ||
    dataMovie['duration'] === '' ||
    dataMovie['score'] === ''
  ) {
    return next(new AppError(400, 'Some propertie is empty'));
  }
  await movie.update({ ...dataMovie });

  res.status(200).json({
    satus: 'success',
    data: { movie }
  });
});

exports.deleteMovie = catchAsync(async (req, res, next) => {
  const { movie } = req;

  await movie.update({ status: 'deleted' });

  res.status(200).json({
    status: 'Success'
  });
});
