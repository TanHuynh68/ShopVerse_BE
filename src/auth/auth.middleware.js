const { body } = require("express-validator");

exports.validateCreateUser = [
  body("name").trim().notEmpty().withMessage("Name is required"),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required"),
    // .isLength({ min: 6 })
    // .withMessage("Password must be at least 6 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid"),

  body("role")
    .trim()
    .notEmpty()
    .withMessage("Role is required")
    .isIn(Object.values(ROLE))
    .withMessage(`Role must be one of: ${Object.values(ROLE).join(", ")}`),
];
