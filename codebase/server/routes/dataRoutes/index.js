const express = require("express");
const router = express.Router();

const {
    listDoctors,
    getDoctor,
    listDoctorsNearby,
    listDoctorsBySpec
} = require("../../controllers/doctorControllers");

router.get("/doctors/list", listDoctors);
router.get("/doctors/get/:slug", getDoctor);
router.get("/doctors/nearby", listDoctorsNearby);
router.get("/doctors/list/by/:spec", listDoctorsBySpec);

module.exports = router;