const bcrypt = require("bcryptjs");
const { response } = require("../../utils/response");
const Admin = require("../../models/adminSchema");
const { checkNotNull, checkAccess } = require("../../utils/check");
const { createTokenAdmin } = require("../../utils/token");


const listAdmins = async (req, res, next) => {
    if (checkAccess(req.user, "listAdmins")) {
        try {
            return next(response(200, "", await Admin.find()));
        } catch (error) {
            return next(response(500, error.message));
        }
    } else {
        return next(response(401, "UNAUTHORIZED_ACCESS"));
    }
}


const getAdmin = async (req, res, next) => {
    const { id } = req.params;
    if (checkNotNull(id) && checkAccess(req.user, "getAdmin", id)) {
        try {
            return next(response(200, "", await Admin.findById(id)));
        } catch (error) {
            return next(response(404, error.message));
        }
    } else {
        return next(response(401, "UNAUTHORIZED_ACCESS"));
    }
}



const createAdmin = async (req, res, next) => {
    if (checkAccess(req.user, "createAdmin")) {
        const { username, email, password, accessRole } = req.body;
        if (checkNotNull(username) && checkNotNull(email) && checkNotNull(password) && checkNotNull(accessRole)) {
            try {
                const existingAdmin = await Admin.find({ $or: [{ username }, { email }] });
                if (existingAdmin.length == 0) {

                    let salt = bcrypt.genSaltSync(10);
                    let hash = bcrypt.hashSync(password, salt);

                    const newAdmin = new Admin({
                        username,
                        email,
                        password: hash,
                        accessRole
                    });
                    await newAdmin.save()
                    var token = createTokenAdmin(newAdmin);
                    await newAdmin
                        .updateOne({
                            jwtToken: token,
                        })
                        .exec();
                    return next(response(200, "", { ...newAdmin._doc, jwtToken: token }));
                } else {
                    return next(response(409, "CONFLICT"));
                }
            } catch (error) {
                return next(response(500, error.message));
            }
        } else {
            return next(response(400, "BAD_REQUEST"));
        }
    } else {
        return next(response(404, "UNAUTHORIZED_ACCESS"))
    }
}


const updateAdmin = async (req, res, next) => {
    const { id } = req.params;
    if (checkNotNull(id) && checkAccess(req.user, "updateAdmin")) {
        const { username, email, accessRole } = req.body;
        try {
            const updateData = {};
            if (username !== undefined) updateData.username = username;
            if (email !== undefined) updateData.email = email;
            if (accessRole !== undefined) { 
                updateData.accessRole = accessRole;
                const adminData = await Admin.findById(id);
                createTokenAdmin(adminData, accessRole);
            }
            return next(response(200, "", await Admin.findByIdAndUpdate(id, updateData)));
        } catch (error) {
            return next(response(404, error.message));
        }
    } else {
        return next(response(401, "UNAUTHORIZED_ACCESS"));
    }
}




const deleteAdmin = async (req, res, next) => {
    const { id } = req.params;
    if (checkNotNull(id) && checkAccess(req.user, "deleteAdmin", id)) {
        try {
            return next(response(200, "", await Admin.findByIdAndDelete(id)));
        } catch (error) {
            return next(response(404, error.message));
        }
    } else {
        return next(response(401, "UNAUTHORIZED_ACCESS"));
    }
}


module.exports = {
    listAdmins,
    getAdmin,
    createAdmin,
    updateAdmin,
    deleteAdmin
}