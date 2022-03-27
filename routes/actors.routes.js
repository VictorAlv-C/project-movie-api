const express = require('express');
const { body } = require('express-validator');
const {
  createActor,
  getAllActors,
  getActorById,
  deleteActor,
  updateActor
} = require('../controllers/actor.controller');

const { upload } = require('../utils/multer');

const {
  validateSession,
  onlyAdmin
} = require('../middlewares/auth.middleware');

const { getActor } = require('../middlewares/actors.middleware');

const routes = express.Router();

routes.use(validateSession);

routes.get('/', getAllActors);

routes.post('/', onlyAdmin, upload.single('profilePic'), createActor);

routes
  .use('/:id', getActor)
  .route('/:id')
  .get(getActorById)
  .patch(onlyAdmin, updateActor)
  .delete(onlyAdmin, deleteActor);

module.exports = { actorRoutes: routes };
