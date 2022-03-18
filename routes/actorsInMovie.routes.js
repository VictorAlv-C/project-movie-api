const express = require('express');
const {
  createActorInMovie,
  getAllActorsInMovie
} = require('../controllers/actorInMovie.controller');

const route = express.Router();

route.get('/', getAllActorsInMovie);

route.post('/', createActorInMovie);

module.exports = { actorInMovieRoutes: route };
