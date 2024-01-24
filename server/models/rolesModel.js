const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const RoleSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
});

module.exports = model('role', RoleSchema);
