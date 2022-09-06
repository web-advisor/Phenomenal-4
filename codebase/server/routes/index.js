const express = require('express');
const router = express.Router();

const adminRouter = require("./adminRoutes");
const doctorRouter = require("./doctorRoutes");
const adminDoctorManagementRouter = require("./adminRoutes/doctorRoutes");
const signUpAuthRouter = require("./authRoutes/signup");
const loginAuhtRouter = require("./authRoutes/login");
const dataRouter = require("./dataRoutes");
// const appointmentRouter = require("./appointmentRoutes");
// const paymentRouter = require("./paymentRoutes");

module.exports = (app) => {
    app.use("/admin", adminRouter);
    app.use("/doctor", doctorRouter);
    app.use("/admin/manage/doctor", adminDoctorManagementRouter);
    app.use("/auth/signup", signUpAuthRouter);
    app.use("/auth/login", loginAuhtRouter);
    app.use("/data", dataRouter);
    // app.use("/appointment", appointmentRouter);
    // app.use("/payment", paymentRouter);
};
