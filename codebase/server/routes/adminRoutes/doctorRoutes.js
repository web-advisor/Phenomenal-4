const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../../utils/passport");

const {
    createDoctor,
    updateDoctor,
    deleteDoctor,
    verifyDoctor,
    removeDoctor
} = require("../../controllers/doctorControllers");

router.post("/create", passport.authenticate("verifyToken", { session: false }), createDoctor);
router.patch("/update/:slug", passport.authenticate("verifyToken", { session: false }), updateDoctor);
router.patch("/verify/:slug", passport.authenticate("verifyToken", { session: false }), verifyDoctor);
router.patch("/remove/:slug", passport.authenticate("verifyToken", { session: false }), removeDoctor);
router.delete("/delete/:slug", passport.authenticate("verifyToken", { session: false }), deleteDoctor);

module.exports = router;