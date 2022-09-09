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
  doctorName: {
    type: String,
    trim: true,
    required: true
  },
  clinicName: {
    type: String,
    trim: true,
    required: true
  },
  address: {
    type: String,
    trim: true,
    required: true
  },
  modeOfBooking: {
    type: String,
    trim: true,
    required: true
  },
  patientName: {
    type: String,
    trim: true,
    required: true
  },
  location: {
    type: {
      type: String, 
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  startTime: {
    type: String,
    // required: true,
  },
  tokenNo: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "Pending"
  }
}, {
  timestamps: true
});
appointmentSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("appointment", appointmentSchema);