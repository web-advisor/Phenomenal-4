const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { response } = require("../../utils/response");
const Patient = require("../../models/patientSchema");
const { checkNotNull, checkAccess } = require("../../utils/check");
const { createTokenPatient } = require("../../utils/token");

const createPatient = async (req, res, next) => {
    const { name, email, phoneNo, password } = req.body;
    if (!checkNotNull(name)) return next(response(400, "Name is Required."));
    if (!checkNotNull(email)) return next(response(400, "Email is Required"));
    if (!checkNotNull(phoneNo)) return next(response(400, "Phone Number is required."));
    if (!checkNotNull(password)) return next(response(400, "PASSWORD_IS_REQUIRED"));
    try {

        const existingPatient = await Patient.find({ $or: [{ email }, { phoneNo }] });
        if (existingPatient.length == 0) {

            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(password, salt);

            const newPatient = new Patient({
                name,
                email,
                phoneNo,
                password: hash,
            });
            await newPatient.save()
            var token = createTokenPatient(newPatient);
            await newPatient
                .updateOne({
                    jwtToken: token,
                })
                .exec();
            return next(response(200, "", { ...newPatient._doc, jwtToken: token }));
        } else {
            return next(response(409, "CONFLICT"));
        }
    } catch (error) {
        return next(response(500, error.message));
    }
}


const patientLogin = async (req, res, next) => {
    const { email, password } = req.body;
    if (checkNotNull(email) && checkNotNull(password)) {
        try {
            const existingPatient = await Patient.findOne({ email });
            if (existingPatient) {
                const passwordCheck = await bcrypt.compare(password, existingPatient.password);
                if (passwordCheck) {
                    const token = createTokenPatient(existingPatient);
                    await Patient.updateOne({ email }, { jwtToken: token }).exec();
                    return next(response(200, "", { ...existingPatient._doc, jwtToken : token }));
                } else {
                    return next(response(400, "INCORRECT_PASSWORD"));
                }
            } else {
                return next(response(404, "NO USER FOUND"));
            }
        } catch (error) {
            return next(response(500, error.message));
        }
    } else {
        return next(response(400, "BAD_REQUEST"));
    }
}



const updatePatient = async (req, res, next) => {
    const id = req.user.id;
    if (checkNotNull(id) && checkAccess(req.user, "updatePatient")) {
        const { name, clinic, profilePic, phoneNo, address, spec, openTime, closeTime, status } = req.body;
        try {
            const updateData = {};
            if (name !== undefined || clinic !== undefined) {
                if (name !== undefined) updateData.name = name;
                else updateData.name = req.user.name;
                if (clinic !== undefined) updateData.clinic = clinic;
                else updateData.clinic = req.user.clinic;

                var PatientSlug = slugify(updateData.clinic + "-" + updateData.name);
                const sameSlugPatient = await Patient.find({ name, clinic });
                if (sameSlugPatient) {
                    let counter = sameSlugPatient + 1;
                    PatientSlug += "-" + counter;
                }
                updateData.slug = PatientSlug;
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
            return next(response(200, "", await Patient.findByIdAndUpdate(id, updateData)));
        } catch (error) {
            return next(response(404, error.message));
        }
    } else {
        return next(response(401, "UNAUTHORIZED_ACCESS"));
    }
}




const deletePatient = async (req, res, next) => {
    var id = "";
    if (req.params && req.params.id) {
        id = req.params.id;
    } else if (req.user && req.user.id) {
        id = req.user.id;
    }
    if (checkNotNull(id) && checkAccess(req.user, "deletePatient", id)) {
        try {
            return next(response(200, "", await Patient.findByIdAndDelete(id)));
        } catch (error) {
            return next(response(404, error.message));
        }
    } else {
        return next(response(401, "UNAUTHORIZED_ACCESS"));
    }
}


module.exports = {
    createPatient,
    updatePatient,
    deletePatient,
    patientLogin
}