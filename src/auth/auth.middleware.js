const { body, query } = require("express-validator");


exports.validateCreateUser = [
  body("name").trim().notEmpty().withMessage("Name is required"),

  body("password").trim().notEmpty().withMessage("Password is required"),
  // .isLength({ min: 6 })
  // .withMessage("Password must be at least 6 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid"),
];

exports.validateLogin = [
  body("password").trim().notEmpty().withMessage("password is required"),
  // .isLength({ min: 6 })
  // .withMessage("Password must be at least 6 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
];

exports.validateLoginGoogle = [
  body("token").trim().notEmpty().withMessage("token is required"),
];

exports.validateLForgotPassword = [
  body("email").trim().notEmpty().withMessage("email is required"),
];

exports.validateLResetNewPassword = [
  body("newPassword").trim().notEmpty().withMessage("newPassword is required"),
  query("token").trim().notEmpty().withMessage("token is required"),
];
