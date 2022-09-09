const bcrypt = require("bcryptjs");
const { response } = require("../../utils/response");
const Appointment = require("../../models/appointmentSchema");
const { checkNotNull, checkAccess } = require("../../utils/check");
const Doctor = require("../../models/doctorSchema");
const { timing, computeCurrMinutes, computeAppointment } = require("../../utils/time");

const listAppointments = async (req, res, next) => {
    if (checkAccess(req.user, "listAppointments")) {
        try {
            if (req.user.role === "doctor") {
                return next(response(200, "", await Appointment.find({ doctorId: req.user._id })));
            }
            return next(response(200, "", await Appointment.find({ patientId: req.user._id })));
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
            const checkAppointment = await Appointment.findById(id);
            if (!checkAppointment) {
                return next(response(404, "APPOINTMENT_NOT_FOUND"));
            } else if (checkAppointment.doctorId == req.user._id || checkAppointment.patientId == req.user._id || req.user.role == "admin" || req.user.role == "superadmin") {
                return next(response(200, "", await Appointment.findById(id)));
            } else {
                return next(response(403, "FORBIDDEN"));
            }
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
                    const curr = computeCurrMinutes();
                    const lower = timing(doctorData?.clinicTime?.openTime);
                    const upper = timing(doctorData?.clinicTime?.closeTime);
                    const latest = doctorData?.lastAppointment;
                    const appointmentTime = computeAppointment(curr, lower, upper, latest);
                    var max = 0;
                    const maxToken = await Appointment.find({ doctorId: doctorData?._id }).sort({ startTime: -1 }).limit(1);
                    if (maxToken.length > 0) max = maxToken[0].tokenNo;
                    console.log(appointmentTime, max+1);
                    const newAppointment = new Appointment({
                        doctorId: doctorData._id,
                        doctorName : doctorData?.name,
                        clinicName : doctorData?.clinic,
                        address: doctorData?.address,
                        location: doctorData?.location,
                        patientName : req.user.name,
                        patientId: req.user._id,
                        tokenNo: max + 1,
                        modeOfBooking : "Online",
                        startTime: appointmentTime,
                    });
                    await Doctor.updateOne({ slug }, { $set: { lastAppointment: appointmentTime } });
                    return next(response(200, "", await newAppointment.save()));
                } else {
                    return next(response(404, "DOCTOR_NOT_FOUND"));
                }
            } catch (error) {
                return next(response(500, error.message));
            }
        } else {
            // Clinic Staff Booking Appointment
            const { startTime, patientName } = req.body;
            if (checkNotNull(startTime) && checkNotNull(patientName)) {
                startTime = computeCurrMinutes(startTime);
                try {
                    var max = 0;
                    const maxToken = await Appointment.find({ doctorId: doctorData?._id }).sort({ startTime: -1 }).limit(1);
                    if (maxToken.length > 0) max = maxToken[0].tokenNo;
                    const newAppointment = new Appointment({
                        doctorId: req.user._id,
                        tokenNo: max + 1,
                        startTime,
                        doctorName : req.user?.name,
                        clinicName : req.user?.clinic,
                        address: req.user?.address,
                        location: req.user?.location,
                        patientName,
                        modeOfBooking : "Offline",
                    });
                    await Doctor.updateOne({ slug }, { $set: { lastAppointment: startTime } });
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
        const { status } = req.body;
        try {
            const checkAppointment = await Appointment.findById(id);
            if (checkAppointment) {
                const updateData = {};
                if (status !== undefined) updateData.status = status;
                return next(response(200, "", await Appointment.findByIdAndUpdate(id, updateData)));
            } else {
                return next(response(404, "APPOINTMENT_NOT_FOUND"));
            }
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