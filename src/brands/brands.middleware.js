const { body } = require("express-validator");

exports.validateCreateBrand = [
  body("name").notEmpty().withMessage("Name is required"),
  body("description").notEmpty().withMessage("Description is required"),
];
