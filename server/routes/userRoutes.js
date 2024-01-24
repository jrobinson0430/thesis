const express = require('express');
const userController = require('../controllers/userController');
const authentication = require('../controllers/auth/authentication');
const authorization = require('../controllers/auth/authorization');

const router = express.Router();

router.route('/logout').put(userController.logout_user);
router.route('/create_user').post(userController.create_user);

router.route('/update_account').post(
  authentication.verifyJWT,
  authorization.has_user_role,
  authentication.verify_password,
  userController.update_account,
);

router.route('/login').post(
  authentication.verify_password,
  authentication.set_user_token_cookie,
  userController.login_user,
);

module.exports = router;
