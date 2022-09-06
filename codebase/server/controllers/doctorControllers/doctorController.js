const bcrypt = require("bcryptjs");
const opencage = require('opencage-api-client');
const { response } = require("../../utils/response");
const Doctor = require("../../models/doctorSchema");
const { checkNotNull, checkAccess } = require("../../utils/check");
// const { validAddress } = require("../../utils/geolocation");
const { slugify } = require("../../utils/slugify");
const { createTokenDoctor } = require("../../utils/token");


const createDoctor = async (req, res, next) => {
    var isVerified = false;
    if (req.user !== undefined && checkAccess(req.user, "createDoctor")) {
        isVerified = true;
    }
    const { name, email, clinic, phoneNo, address, profilePic, fees, degree, spec, status, openTime, closeTime, password } = req.body;
    if (!checkNotNull(name)) return next(response(400, "Name is Required."));
    if (!checkNotNull(email)) return next(response(400, "Email is Required"));
    if (!checkNotNull(phoneNo)) return next(response(400, "Phone Number is required."));
    if (!checkNotNull(degree)) return next(response(400, "DEGREE IS REQUIRED"));
    if (!checkNotNull(fees)) return next(response(400, "FEES IS REQUIRED"));
    if (!checkNotNull(password)) return next(response(400, "PASSWORD_IS_REQUIRED"));
    if (!checkNotNull(openTime) && !checkNotNull(closeTime)) return next(response(400, "Timings are required"));
    if (!checkNotNull(address)) return next(response(400, "Address is REQUIRED."));
    else {
        var location = {};
        var errorMessage = "";

        // ---- OpenCage GeoLocation API ---- //
        await opencage
            .geocode({ q: address })
            .then((data) => {
                if (data.results.length > 0) {
                    const place = data.results[0];
                    console.log(place.formatted);
                    console.log(place.geometry);
                    console.log(place.annotations.timezone.name);
                    location = {
                        type: "Point",
                        coordinates: [
                            place.geometry.lat,
                            place.geometry.lng
                        ]
                    }
                } else {
                    console.log('Status', data.status.message);
                    console.log('total_results', data.total_results);
                    errorMessage = "UNABLE_TO_LOCATE_ADDRESS";
                }
            })
            .catch((error) => {
                errorMessage = error.message;
            });



        if (errorMessage === "") {
            try {
                var doctorSlug = slugify(clinic + "-" + name);

                const existingDoctor = await Doctor.findOne({ email });
                if (!existingDoctor) {

                    const sameSlugDoctor = await Doctor.find({ name, clinic });
                    if (sameSlugDoctor) {
                        let counter = sameSlugDoctor + 1;
                        doctorSlug += "-" + counter;
                    }

                    let salt = bcrypt.genSaltSync(10);
                    let hash = bcrypt.hashSync(password, salt);

                    const newDoctor = new Doctor({
                        name,
                        email,
                        slug: doctorSlug,
                        clinic,
                        phoneNo,
                        degree,
                        fees,
                        address,
                        location,
                        profilePic: profilePic !== undefined ? profilePic : "",
                        spec: spec !== undefined ? spec : "",
                        status: status !== undefined ? status : false,
                        password: hash,
                        clinicTime: { openTime, closeTime },
                        lastAppointment: clinicTime.openTime,
                    });
                    const doctorInfo = await newDoctor.save();
                    if (isVerified) {
                        var token = createTokenDoctor(newDoctor);
                        await newDoctor
                            .updateOne({
                                jwtToken: token,
                                isVerified
                            })
                            .exec();
                        return next(response(200, "", { ...newDoctor._doc, jwtToken: token }));
                    }
                    return next(response(200, "", doctorInfo));
                } else {
                    return next(response(409, "CONFLICT"));
                }
            } catch (error) {
                return next(response(500, error.message));
            }
        } else {
            return next(response(404, errorMessage));
        }
    }
}


const updateDoctor = async (req, res, next) => {
    const id = req.user.id;
    if (checkNotNull(id) && checkAccess(req.user, "updateDoctor")) {
        const { name, clinic, profilePic, phoneNo, address, spec, openTime, closeTime, status } = req.body;
        try {
            const updateData = {};
            if (name !== undefined || clinic !== undefined) {
                if (name !== undefined) updateData.name = name;
                else updateData.name = req.user.name;
                if (clinic !== undefined) updateData.clinic = clinic;
                else updateData.clinic = req.user.clinic;

                var doctorSlug = slugify(updateData.clinic + "-" + updateData.name);
                const sameSlugDoctor = await Doctor.find({ name, clinic });
                if (sameSlugDoctor) {
                    let counter = sameSlugDoctor + 1;
                    doctorSlug += "-" + counter;
                }
                updateData.slug = doctorSlug;
            }
            if (profilePic !== undefined) updateData.profilePic = profilePic;
            if (phoneNo !== undefined) updateData.phoneNo = phoneNo;
            if (spec !== undefined) updateData.spec = spec;
            if (status !== undefined) updateData.status = status;
            if (openTime !== undefined) updateData.clinicTime.openTime = openTime;
            if (closeTime !== undefined) updateData.clinicTime.closeTime = closeTime;
            if (address !== undefined) {
                var location = {};
                var errorMessage = "";
                // ---- OpenCage GeoLocation API ---- //
                await opencage
                    .geocode({ q: address })
                    .then((data) => {
                        if (data.results.length > 0) {
                            const place = data.results[0];
                            console.log(place.formatted);
                            console.log(place.geometry);
                            console.log(place.annotations.timezone.name);
                            location = {
                                type: "Point",
                                coordinates: [
                                    place.geometry.lat,
                                    place.geometry.lng
                                ]
                            }
                        } else {
                            console.log('Status', data.status.message);
                            console.log('total_results', data.total_results);
                            errorMessage = "UNABLE_TO_LOCATE_ADDRESS";
                        }
                    })
                    .catch((error) => {
                        errorMessage = error.message;
                    });

                if (errorMessage !== "") {
                    updateData.address = address;
                    updateData.location = location;
                } else {
                    return next(response(404, errorMessage));
                }
            } d
            return next(response(200, "", await Doctor.findByIdAndUpdate(id, updateData)));
        } catch (error) {
            return next(response(404, error.message));
        }
    } else {
        return next(response(401, "UNAUTHORIZED_ACCESS"));
    }
}




const deleteDoctor = async (req, res, next) => {
    var id = "";
    if (req.params && req.params.id) {
        id = req.params.id;
    } else if (req.user && req.user.id) {
        id = req.user.id;
    }
    if (checkNotNull(id) && checkAccess(req.user, "deleteDoctor", id)) {
        try {
            return next(response(200, "", await Doctor.findByIdAndDelete(id)));
        } catch (error) {
            return next(response(404, error.message));
        }
    } else {
        return next(response(401, "UNAUTHORIZED_ACCESS"));
    }
}


module.exports = {
    createDoctor,
    updateDoctor,
    deleteDoctor
}