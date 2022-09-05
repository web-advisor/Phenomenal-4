const { response } = require("../../utils/response");
const { checkNotNull } = require("../../utils/checkNotNull");
const Users = require("../../models/userSchema");



const listAllUsers = async (req, res, next) => {
    try {
        return next(response(200, "", await Users.find()));
    } catch (error) {
        return next(response(500, error.message));
    }
}


const getUser = async (req, res, next) => {
    const { uid } = req.params;
    try {
        return next(response(200, "", await Users.findById(uid)));
    } catch (error) {
        return next(response(404, error.message));
    }
}

const createUser = async (req, res, next) => {
    const { name, email } = req.body;
    if (checkNotNull(name) && checkNotNull(email)) {
        try {
            const newUser = new Users({
                name,
                email
            });
            return next(response(200, "", await newUser.save()));
        } catch (error) {
            return next(response(500, error.message));
        }
    } else {
        return next(response(403, "Bad Request"));
    }
}

module.exports = {
    listAllUsers,
    getUser,
    createUser
};