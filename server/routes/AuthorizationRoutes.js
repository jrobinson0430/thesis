const express = require('express');

const authorization = require('../controllers/auth/authorization');
const authentication = require('../controllers/auth/authentication');

const router = express.Router();

router.route('/user').post(
  authentication.verifyJWT,
  authorization.has_user_role,
);

router.route('/store_manager').post(
  authentication.verifyJWT,
  authorization.has_manager_role,
);

module.exports = router;
