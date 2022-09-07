const bcrypt = require("bcryptjs");
const { response } = require("../../utils/response");
const Appointment = require("../../models/appointmentSchema");
const { checkNotNull, checkAccess } = require("../../utils/check");
const Doctor = require("../../models/doctorSchema");
const { timing, computeMinutes, computeAppointment } = require("../../utils/time");

const listAppointments = async (req, res, next) => {
    if (checkAccess(req.user, "listAppointments")) {
        try {
            if (req.user.role === "doctor") {
                return next(response(200, "", await Appointment.find({ doctorId: req.user.id })));
            }
            return next(response(200, "", await Appointment.find({ patientId: req.user.id })));
        } catch (error) {
            return next(response(500, error.message));
        }
    } else {
        return next(response(401, "UNAUTHORIZED_ACCESS"));
    }
}


const getAppointment = async (req, res, next) => {
    const { id } = req.params;
    if (checkNotNull(id) && checkAccess(req.user, "getAppointment", id)) {
        try {
            return next(response(200, "", await Appointment.findById(id)));
        } catch (error) {
            return next(response(404, error.message));
        }
    } else {
        return next(response(401, "UNAUTHORIZED_ACCESS"));
    }
}



const createAppointment = async (req, res, next) => {
    if (checkAccess(req.user, "createAppointment")) {
        const { slug } = req.params;
        if (checkNotNull(slug)) {
            // Patient Booking Appointment
            try {
                const doctorData = await Doctor.findOne({ slug });
                if (doctorData) {
                    const curr = computeMinutes();
                    const lower = timing(doctorData?.clinicTime?.openTime);
                    const upper = timing(doctorData?.clinicTime?.closeTime);
                    const latest = timing(doctorData?.lastAppointment);
                    const appointmentTime = computeAppointment(curr, lower, upper, latest);
                    var max = 0;
                    await Doctor.findOne({ tokenNo: 1 }).sort(last_mod, 1).run(function (err, doc) {
                        max = doc.last_mod;
                    });
                    const newAppointment = new Appointment({
                        patientId: req.user.id,
                        doctorId: doctorData._id,
                        tokenNo : max+1,
                        startTime : appointmentTime
                    });
                    return next(response(200, "", await newAppointment.save()));
                } else {
                    return next(response(404, "DOCTOR_NOT_FOUND"));
                }
            } catch (error) {
                return next(response(500, error.message));
            }

        } else {
            // Clinic Staff Booking Appointment
            const { startTime } = req.body;
            if (checkNotNull(startTime)) {
                try {
                    var max = 0;
                    await Doctor.findOne({ tokenNo: 1 }).sort(last_mod, 1).run(function (err, doc) {
                        max = doc.last_mod;
                    });
                    const newAppointment = new Appointment({ 
                        tokenNo : max+1,
                        doctorId : req.user.id,
                        startTime
                    });
                    return next(response(200, "", await newAppointment.save()));
                } catch (error) {
                    return next(response(500, error.message));
                }
            } else {
                return next(response(400, "BAD_REQUEST"));
            }
        }
    } else {
        return next(response(404, "UNAUTHORIZED_ACCESS"))
    }
}



const updateAppointment = async (req, res, next) => {
    const { id } = req.params;
    if (checkNotNull(id) && checkAccess(req.user, "updateAppointment")) {
        const { username, email, accessRole } = req.body;
        try {
            const updateData = {};
            if (username !== undefined) updateData.username = username;
            if (email !== undefined) updateData.email = email;
            if (accessRole !== undefined) {
                updateData.accessRole = accessRole;
                const appointmentData = await Appointment.findById(id);
                createTokenAppointment(appointmentData, accessRole);
            }
            return next(response(200, "", await Appointment.findByIdAndUpdate(id, updateData)));
        } catch (error) {
            return next(response(404, error.message));
        }
    } else {
        return next(response(401, "UNAUTHORIZED_ACCESS"));
    }
}




module.exports = {
    listAppointments,
    getAppointment,
    createAppointment,
    updateAppointment
}