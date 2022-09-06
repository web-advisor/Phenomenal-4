const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../../utils/passport");

// const {
//     listDoctors,
//     getDoctor,
//     listDoctorsBySpec,
//     listDoctorsByLocation
// } = require("../../controllers/dataControllers");

const {
    createDoctor,
    updateDoctor,
    deleteDoctor
} = require("../../controllers/doctorControllers");

router.post("/create", passport.authenticate("verifyToken", { session: false }), createDoctor);
// router.get("/list", listDoctors);
// router.get("/get/:id", getDoctor);
router.patch("/update/:id", passport.authenticate("verifyToken", { session: false }), updateDoctor);
router.delete("/delete/:id", passport.authenticate("verifyToken", { session: false }), deleteDoctor);

module.exports = router;