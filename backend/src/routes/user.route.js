const express = require("express");
const { Login, Logout } = require("../controllers/user");

const UserRouter = express.Router();

UserRouter.post("/login", Login);
UserRouter.post("/logout", Logout);

module.exports = UserRouter;
