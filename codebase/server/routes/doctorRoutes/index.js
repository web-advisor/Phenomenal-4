const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../../utils/passport");

const {
    createDoctor,
    updateDoctor,
    deleteDoctor
} = require("../../controllers/doctorControllers");

router.post("/create", createDoctor);
router.patch("/update", passport.authenticate("verifyToken", { session: false }), updateDoctor);
router.delete("/delete", passport.authenticate("verifyToken", { session: false }), deleteDoctor);

module.exports = router;