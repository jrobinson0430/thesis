const express = require('express');
const adoptionController = require('../controllers/adoptionController');
const authorization = require('../controllers/auth/authorization');
const authentication = require('../controllers/auth/authentication');

const router = express.Router();

router.route('/create_adoption').post(adoptionController.create_adoption);

router.route('/get_all_adoptions')
  .post(authentication.verifyJWT, authorization.has_manager_role)
  .get(adoptionController.get_all_adoptions);

router.route('/get_user_adoptions')
  .post(
    authentication.verifyJWT,
    authorization.has_user_role,
    adoptionController.get_user_adoptions,
  );

router.route('/update_status/:_id')
  .post(authentication.verifyJWT, authorization.has_manager_role)
  .put(adoptionController.update_status);

module.exports = router;
