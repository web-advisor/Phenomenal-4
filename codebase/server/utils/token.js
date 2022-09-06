const jwt = require("jsonwebtoken");

const createTokenAdmin = (admin, validity) => {
    return jwt.sign(
        {
            // exp: Math.floor(Date.now() / 1000) + 60 * 60,
            id: admin._id,
            role: admin.accessRole,
        },
        process.env.SECRET_KEY
    );
};

const createTokenDoctor = (doctor, validity) => {
    return jwt.sign(
        {
            // exp: Math.floor(Date.now() / 1000) + 60 * 60,
            id: doctor._id,
            role: "doctor",
        },
        process.env.SECRET_KEY
    );
};

const createTokenPatient = (patient, validity) => {
    return jwt.sign(
        {
            // exp: Math.floor(Date.now() / 1000) + 60 * 60,
            id: patient._id,
            role: "patient",
        },
        process.env.SECRET_KEY
    );
};



module.exports = {
    createTokenAdmin,
    createTokenDoctor,
    createTokenPatient
};