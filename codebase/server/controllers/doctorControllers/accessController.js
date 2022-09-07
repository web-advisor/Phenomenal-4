const { response } = require("../../utils/response");
const { checkNotNull, checkAccess } = require("../../utils/check");
const Doctor = require("../../models/doctorSchema");

const verifyDoctor = async (req, res, next) => {
    const { slug } = req.params;
    if (checkNotNull(slug) && checkAccess(req.user, "verifyDoctor")) {
        const doctorData = await Doctor.findOne({ slug });
        if (doctorData) {
            return next(response(200, "", await Doctor.updateOne({ slug }, { $set: { isVerified: true } })));
        } else {
            return next(response(404, "DOCTOR_NOT_FOUND"));
        }
    } else {
        return next(response(400, "BAD_REQUEST"));
    }
}

const removeDoctor = async (req, res, next) => {
    const { slug } = req.params;
    if (checkNotNull(slug) && checkAccess(req.user, "verifyDoctor")) {
        const doctorData = await Doctor.findOne({ slug });
        if (doctorData) {
            return next(response(200, "", await Doctor.updateOne({ slug }, { $set: { isVerified: false } })));
        } else {
            return next(response(404, "DOCTOR_NOT_FOUND"));
        }
    } else {
        return next(response(400, "BAD_REQUEST"));
    }
}

module.exports = {
    verifyDoctor,
    removeDoctor
}