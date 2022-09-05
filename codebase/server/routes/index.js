const express = require('express');
const router = express.Router();

const userRouter = require("./userRoutes");

module.exports = (app) => {
    app.use("/user", userRouter);
};
