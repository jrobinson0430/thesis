const express = require('express');
const donationController = require('../controllers/donationController');
const authorization = require('../controllers/auth/authorization');
const authentication = require('../controllers/auth/authentication');

const router = express.Router();

router.route('/create_donation').post(donationController.create_donation);

router.route('/get_all_donations')
  .post(authentication.verifyJWT, authorization.has_manager_role)
  .get(donationController.get_all_donations);

router.route('/get_user_donations')
  .post(
    authentication.verifyJWT,
    authorization.has_user_role,
    donationController.get_user_donations,
  );

module.exports = router;
