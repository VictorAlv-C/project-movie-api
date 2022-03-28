const express = require('express');

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

const { validationCreateActor } = require('../validations/actors.validations');

const routes = express.Router();

routes.use(validateSession);

routes.get('/', getAllActors);

routes.post(
  '/',
  onlyAdmin,
  upload.single('profilePic'),
  validationCreateActor,
  createActor
);

routes
  .use('/:id', getActor)
  .route('/:id')
  .get(getActorById)
  .patch(onlyAdmin, updateActor)
  .delete(onlyAdmin, deleteActor);

module.exports = { actorRoutes: routes };
