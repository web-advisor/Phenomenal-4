const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../../utils/passport");

const {
    createPatient
} = require("../../controllers/patientControllers");

const { 
    createDoctor
} = require("../../controllers/doctorControllers");

router.post("/doctor", createDoctor);
router.post("/patient", createPatient);

module.exports = router;