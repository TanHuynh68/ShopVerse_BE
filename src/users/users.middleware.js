const { body } = require("express-validator");

exports.validateResetPassword = [
  body("oldPassword").trim().notEmpty().withMessage("oldPassword is required"),
  body("newPassword").trim().notEmpty().withMessage("newPassword is required"),
];

exports.validateUpdatePasswordForGoogleAccount = [
  body("newPassword").trim().notEmpty().withMessage("newPassword is required"),
];
