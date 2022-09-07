const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../../utils/passport");

const {
    updatePatient,
    deletePatient
} = require("../../controllers/patientControllers");

router.patch("/update", passport.authenticate("verifyToken", { session: false }), updatePatient);
router.delete("/delete", passport.authenticate("verifyToken", { session: false }), deletePatient);

module.exports = router;