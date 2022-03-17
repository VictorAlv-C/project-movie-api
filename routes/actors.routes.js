const express = require('express');
const {
  createActor,
  getAllActors,
  getActorById,
  deleteActor,
  updateActor
} = require('../controllers/actor.controller');

const routes = express.Router();

routes.get('/', getAllActors);

routes.post('/', createActor);

routes.get('/:id', getActorById);

routes.patch('/:id', updateActor);

routes.delete('/:id', deleteActor);

module.exports = { actorRoutes: routes };
