const express = require('express');
const authorization = require('../controllers/auth/authorization');
const authentication = require('../controllers/auth/authentication');
const animalController = require('../controllers/animalController');

const router = express.Router();

router.route('/get_animals').get(animalController.get_animals);

router.route('/add_new_animal').post(
  authentication.verifyJWT,
  authorization.has_manager_role,
  animalController.add_new_animal,
);

router.route('/delete_animal/:_id')
  .post(authentication.verifyJWT, authorization.has_manager_role)
  .delete(animalController.delete_animal);

router.route('/update_animal/:_id')
  .post(authentication.verifyJWT, authorization.has_manager_role)
  .put(animalController.update_animal);

module.exports = router;
