const express = require("express");
const router = express.Router();

const {
    listAllUsers, 
    getUser,
    createUser
} = require("../../controllers/userControllers");

router.get("/list", listAllUsers);
router.get("/get/:uid", getUser);
router.post("/create", createUser);

module.exports = router;