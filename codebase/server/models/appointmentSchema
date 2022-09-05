const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  appointmentId: {
    type: String,
    required: true,
    unique: true
  },
  doctorId: {
    type: String,
    required: true,
    trim: true
  },
  patientId: {
    type: String,
    required: true,
    trim: true
  },
  startTime: {
    type: mongoose.Schema.Types.Long,
    required: true,
  },
  tokenNo: {
    type: Number,
    required: true,
  },
  appointmentStatus: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("appointment", appointmentSchema);