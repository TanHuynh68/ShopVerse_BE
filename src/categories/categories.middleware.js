const { body } = require("express-validator");

exports.validateCreateUpdateCategory = [
  body("name").notEmpty().withMessage("name is required"),
  body("description").notEmpty().withMessage("description is required"),
  body("brand_id").notEmpty().withMessage("brand_id is required"),
];
