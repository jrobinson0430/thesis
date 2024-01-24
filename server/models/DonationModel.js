const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const DonationSchema = new Schema({
  fullName: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cardNum: {
    type: String,
    required: true,
  },
  verificationNum: {
    type: String,
    required: true,
  },
  donation: {
    type: String,
    required: true,
  },
  confirmationNum: {
    type: String,
    required: true,
  },
  location: {
    address: {
      type: String,
      trim: true,
      required: true,
    },
    city: {
      type: String,
      trim: true,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },

  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('Donation', DonationSchema);
