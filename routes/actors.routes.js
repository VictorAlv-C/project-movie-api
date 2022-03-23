const express = require('express');
const {
  createActor,
  getAllActors,
  getActorById,
  deleteActor,
  updateActor
} = require('../controllers/actor.controller');

const { upload } = require('../utils/multer');

const routes = express.Router();

routes.get('/', getAllActors);

routes.post('/', upload.single('profilePic'), createActor);

routes.get('/:id', getActorById);

routes.patch('/:id', updateActor);

routes.delete('/:id', deleteActor);

module.exports = { actorRoutes: routes };
