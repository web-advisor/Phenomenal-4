const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctorId: {
    type: String,
    required: true,
    trim: true
  },
  patientId: {
    type: String,
    trim: true
  },
  startTime: {
    type: String,
    // required: true,
  },
  tokenNo: {
    type: Number,
    required: true,
    unique : true
  },
  status: {
    type: String,
    default : "Pending"
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("appointment", appointmentSchema);