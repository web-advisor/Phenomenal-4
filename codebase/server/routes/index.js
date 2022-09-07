const express = require('express');
const router = express.Router();

const adminRouter = require("./adminRoutes");
const doctorRouter = require("./doctorRoutes");
const adminDoctorManagementRouter = require("./adminRoutes/doctorRoutes");
const signUpAuthRouter = require("./authRoutes/signup");
const loginAuhtRouter = require("./authRoutes/login");
const dataRouter = require("./dataRoutes");
const patientRouter = require("./patientRoutes");
const patientAppointmentRouter = require("./patientRoutes/appointmentRoutes");
const doctorAppointmentRouter = require("./doctorRoutes/appointmentRoutes");
// const paymentRouter = require("./paymentRoutes");

module.exports = (app) => {
    app.use("/admin", adminRouter);
    app.use("/doctor", doctorRouter);
    app.use("/doctor/appointments", doctorAppointmentRouter);
    app.use("/admin/manage/doctor", adminDoctorManagementRouter);
    app.use("/auth/signup", signUpAuthRouter);
    app.use("/auth/login", loginAuhtRouter);
    app.use("/data", dataRouter);
    app.use("/patient", patientRouter);
    app.use("/patient/appointments", patientAppointmentRouter);
    // app.use("/payment", paymentRouter);
};
