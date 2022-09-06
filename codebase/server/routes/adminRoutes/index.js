const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../../utils/passport");

const {
    listAdmins,
    getAdmin,
    createAdmin,
    updateAdmin,
    deleteAdmin
} = require("../../controllers/adminControllers");

router.post("/create", passport.authenticate("verifyToken", { session: false }), createAdmin);
router.get("/list", passport.authenticate("verifyToken", { session: false }), listAdmins);
router.get("/get/:id", passport.authenticate("verifyToken", { session: false }), getAdmin);
router.patch("/update/:id", passport.authenticate("verifyToken", { session: false }), updateAdmin);
router.delete("/delete/:id", passport.authenticate("verifyToken", { session: false }), deleteAdmin);

module.exports = router;