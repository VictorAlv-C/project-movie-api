//Models
const { User } = require('../models/user.model');
const { Movie } = require('../models/movie.model');
const { Actor } = require('../models/actor.model');
const { Review } = require('../models/review.model');
const {
  ActorsInMovies
} = require('../models/actorsInMovies');

exports.initModels = () => {
  User.hasMany(Review);
  Review.belongsTo(User);

  Movie.hasMany(Review);
  Review.belongsTo(Movie);

  Movie.hasMany(Actor);
  Actor.belongsTo(Movie);
};
