var express = require("express");
const authController = require("./auth.controller");
const { isUser } = require("./auth.middleware");
var router = express.Router();

router.route("/register").post(authController.register);
router.route("/verify").post(authController.verify);
router.route("/login").post(authController.login);

module.exports = router;
