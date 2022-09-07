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
    listDoctorsBySpec
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
    getDoctor,
    listDoctorsNearby,
    listDoctorsBySpec,
    verifyDoctor,
    removeDoctor
};  