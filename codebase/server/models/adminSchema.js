const { isEmail } = require("validator");
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  accessRole: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    validate: [isEmail, 'INVALID_EMAIL'],
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  jwtToken: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Admin", adminSchema);