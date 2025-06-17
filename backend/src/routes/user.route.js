const express = require("express");
const { Register, Login } = require("../controllers/user");

const UserRouter = express.Router();

UserRouter.post("/login", Login);

module.exports = UserRouter;
