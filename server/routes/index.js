const express = require('express');

const router = express.Router();

const userRoutes = require('./userRoutes');
const authorizationRoutes = require('./authorizationRoutes');
const animalRoutes = require('./animalRoutes');
const donationRoutes = require('./donationRoutes');
const adoptionRoutes = require('./adoptionRoutes');

router.use('/user', userRoutes);

router.use('/access', authorizationRoutes);

router.use('/animal', animalRoutes);

router.use('/donate', donationRoutes);

router.use('/adopt', adoptionRoutes);

module.exports = router;
