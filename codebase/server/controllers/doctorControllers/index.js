const {
    createDoctor,
    updateDoctor,
    deleteDoctor,
    doctorLogin,
    
} = require("./doctorController");

const {
    listDoctors,
    getDoctor,
    listDoctorsNearby,
    listDoctorsBySpec,
    listDoctorsVerified
} = require("./getDoctor");

const {
    verifyDoctor,
    removeDoctor
} = require("./accessController");

module.exports = {
    createDoctor,
    updateDoctor,
    deleteDoctor,
    doctorLogin,
    listDoctors,
    listDoctorsVerified,
    getDoctor,
    listDoctorsNearby,
    listDoctorsBySpec,
    verifyDoctor,
    removeDoctor
};  