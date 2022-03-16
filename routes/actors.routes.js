const express = require('express');
const {createActor,getAllActors} = require('../controllers/actor.controller');

const routes = express.Router();

routes.get('/', getAllActors);

routes.post('/', createActor);

module.exports = {actorRoutes: routes}