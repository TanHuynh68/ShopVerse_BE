const { body } = require("express-validator");

exports.validateCreateUpdateCategory = [
  body("name").notEmpty().withMessage("Name is required"),
  body("description").notEmpty().withMessage("Description is required"),
];

