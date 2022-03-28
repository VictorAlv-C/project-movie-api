const { Review } = require('../models/review.model');
const { User } = require('../models/user.model');
const { Movie } = require('../models/movie.model');

const { AppError } = require('../utils/AppError');
const { catchAsync } = require('../utils/catchAsync');
const { filterObj } = require('../utils/filterObj');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const { movieId } = req.params;
  const Movie_Reviews = await Movie.findOne({
    where: { id: movieId, status: 'active' },
    include: [
      {
        model: Review,
        include: [{ model: User, attributes: { exclude: ['password', 'role'] } }]
      }
    ]
  });

  res.status(200).json({
    status: 'success',
    data: { Movie_Reviews }
  });
  // const reviews = await Review.findAll({
  //   where: { status: 'active' },
  //   include: [{ model: Movie }, { model: User }]
  // });

  // res.status(200).json({
  //   status: 'success',
  //   data: { reviews }
  // });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const { movieId } = req.params;
  const { title, comments, rating } = req.body;

  const review = await Review.create({
    title,
    comments,
    rating,
    userId: req.currentUser.id,
    movieId
  });

  res.status(201).json({
    status: 'success',
    data: { review }
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const { reviewId } = req.params;
  const data = await Review.findOne({ where: { id: reviewId, status: 'active' } });

  if (!data) return next(new AppError(400, 'Cant update review with given Id'));

  dataReview = filterObj(data, 'title', 'comments', 'rating');

  if (
    dataReview['title'] === '' ||
    dataReview['comments'] === '' ||
    dataReview['rating'] === ''
  ) {
    return next(new AppError(401, 'Some property is empty'));
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

  if (!review) return next(new AppError(401, 'Cant delete review with given Id'));

  await review.update({ status: 'deleted' });

  res.status(200).json({ status: 'success' });
});
