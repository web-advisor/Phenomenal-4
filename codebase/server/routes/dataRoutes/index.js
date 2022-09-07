const express = require("express");
const router = express.Router();

const {
    listDoctors,
    listDoctorsVerified,
    getDoctor,
    listDoctorsNearby,
    listDoctorsBySpec
} = require("../../controllers/doctorControllers/getDoctor");

router.get("/doctors/list", listDoctors);
router.get("/doctors/list/verified", listDoctorsVerified);
router.get("/doctors/get/:slug", getDoctor);
router.get("/doctors/nearby", listDoctorsNearby);
router.get("/doctors/list/by/:spec", listDoctorsBySpec);

module.exports = router;