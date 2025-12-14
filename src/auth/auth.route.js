var express = require("express");
const authController = require("./auth.controller");
const {
  validateCreateUser,
  validateLogin,
  validateLoginGoogle,
  validateLForgotPassword,
  validateLResetNewPassword,
} = require("./auth.middleware");
const { validate } = require("../../utils/validate.util");
var router = express.Router();

router
  .route("/register")
  .post(validateCreateUser, validate, authController.register);
router.route("/verify").post(authController.verify);
router.route("/resend-verify").post(authController.resendOtpVerity);
router.route("/login").post(validateLogin, validate, authController.login);
router
  .route("/login-google")
  .post(validateLoginGoogle, validate, authController.requestLoginGoogle);
router
  .route("/forgot-password")
  .post(
    validateLForgotPassword,
    validate,
    authController.requestForgotPassword
  );
// call this api after call forgot password
router
  .route("/reset-new-password")
  .patch(
    validateLResetNewPassword,
    validate,
    authController.resetNewPassword
  );

module.exports = router;
