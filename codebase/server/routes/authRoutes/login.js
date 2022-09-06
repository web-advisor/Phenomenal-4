const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../../utils/passport");

const {
    patientLogin
} = require("../../controllers/patientControllers");

const { 
    doctorLogin
} = require("../../controllers/doctorControllers");

const {
    adminLogin
} = require("../../controllers/adminControllers");


router.post("/patient", patientLogin);
router.post("/doctor", doctorLogin);
router.post("/admin", adminLogin);

module.exports = router;