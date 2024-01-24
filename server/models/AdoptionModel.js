const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const AdoptionSchema = new Schema({
  fullName: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
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
  comments: {
    type: String,
    trim: true,
    default: '',
  },
  confirmationNum: {
    type: String,
    required: true,
  },
  animalId: {
    type: String,
    required: true,
  },
  animalName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'closed'],
    default: 'pending',
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('Adoption', AdoptionSchema);
