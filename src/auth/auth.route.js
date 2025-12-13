var express = require("express");
const authController = require("./auth.controller");
const { validateCreateUser, validateLogin, validateLoginGoogle } = require("./auth.middleware");
const { validate } = require("../../utils/validate.util");
var router = express.Router();

router
  .route("/register")
  .post(validateCreateUser, validate, authController.register);
router.route("/verify").post(authController.verify);
router.route("/resend-verify").post(authController.resendOtpVerity);
router.route("/login").post(validateLogin, validate, authController.login);
router.route("/login-google").post(validateLoginGoogle, validate, authController.requestLoginGoogle);
module.exports = router;
