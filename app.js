const express = require('express');

const { globalErrorController } = require('./controllers/appError.controller');

const { movieRoutes } = require('./routes/movies.routes');
const { actorRoutes } = require('./routes/actors.routes');
const { userRoutes } = require('./routes/users.routes');
const { actorInMovieRoutes } = require('./routes/actorsInMovie.routes');
const { reviewRoutes } = require('./routes/reviews.routes');

const { AppError } = require('./utils/AppError');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/movies', movieRoutes);
app.use('/api/v1/actors', actorRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/actorInMovie', actorInMovieRoutes);
app.use('/api/v1/reviews', reviewRoutes);

app.use('*', (req, res, next) => {
  next(new AppError(404, `${req.originalUrl} is not found in this server`));
});

app.use(globalErrorController);

module.exports = { app };
