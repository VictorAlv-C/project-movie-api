const { Review } = require('../models/review.model');
const { User } = require('../models/user.model');
const { Movie } = require('../models/movie.model');

const { AppError } = require('../utils/AppError');
const { catchAsync } = require('../utils/catchAsync');
const { filterObj } = require('../utils/filterObj');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.findAll({
    where: { status: 'active' },
    include: [{ model: User }]
  });

  res.status(200).json({
    status: 'success',
    data: { reviews }
  });
});

exports.getReviewId = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const review = await Review.findOne({
    where: { id, status: 'active' },
    include: [{ model: User }]
  });
  if (!review) return next(new AppError(401, 'Cant get review with given Id'));

  res.status(200).json({
    status: 'success',
    data: { review }
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const { title, comments, rating, userId, movieId } = req.body;
  if (
    !title ||
    !comments ||
    !rating ||
    !userId ||
    !movieId ||
    title.length === 0 ||
    comments.length === 0 ||
    rating.length === 0 ||
    userId.length === 0 ||
    movieId.length === 0
  ) {
    return next(new AppError(400, 'Some propertie is missing or empty'));
  }

  const review = await Review.create({
    title,
    comments,
    rating,
    userId,
    movieId
  });

  res.status(201).json({
    status: 'success',
    data: { review }
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const data = await Review.findOne({ where: { id, status: 'active' } });

  if (!data) return next(new AppError(400, 'Cant update review with given Id'));

  dataReview = filterObj(data, 'title', 'comments', 'rating');

  if (
    dataReview['title'].length === 0 ||
    dataReview['comments'].length === 0 ||
    dataReview['rating'].length === 0
  ) {
    return next(new AppError(401, 'Some propertie is emprty'));
  }

  const review = await data.update({ ...dataReview });

  res.json(200).json({
    status: 'success',
    data: { review }
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const review = await Review.findOne({ where: { id, status: 'active' } });

  if (!review)
    return next(new AppError(401, 'Cant delete review with given Id'));

  await review.update({ status: 'deleted' });

  res.status(200).json({ status: 'success' });
});
