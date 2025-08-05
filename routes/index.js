var express = require("express");
var router = express.Router();
var authRoute = require("../src/auth/auth.route");
var emailRoute = require("../src/email/email.route");
var usersRoute = require("../src/users/users.route");
router.use("/auth", authRoute);
router.use("/email", emailRoute);
router.use("/users", usersRoute);
module.exports = router;
