const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  Address: {
    type: String,
    required: true,
  },
  pinCode: {
    type: Number,
    min: [100000, "Zip code too short"],
    max: 999999
  },
  password: {
    type: String, 
    required: true
  },
  phoneNo: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /\d{10}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Patient", patientSchema);