const { body } = require("express-validator");

exports.validateCreateTransaction = [
  body("link").notEmpty().withMessage("link is required"),
];
