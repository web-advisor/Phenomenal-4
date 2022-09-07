const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../../utils/passport");

const {
    listAppointments,
    getAppointment,
    createAppointment,
    updateAppointment
} = require("../../controllers/appointmentControllers");

router.post("/create", passport.authenticate("verifyToken", { session: false }), createAppointment);
router.get("/list", passport.authenticate("verifyToken", { session: false }), listAppointments);
router.get("/get/:id", passport.authenticate("verifyToken", { session: false }), getAppointment);
router.patch("/update/:id", passport.authenticate("verifyToken", { session: false }), updateAppointment);

module.exports = router;