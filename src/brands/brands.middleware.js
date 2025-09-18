const { body } = require("express-validator");

exports.validateCreateBrand = [
  body("name").notEmpty().withMessage("name is required"),
  body("description").notEmpty().withMessage("description is required"),
  body("category_id").notEmpty().withMessage("category_id is required"),
  body("img").notEmpty().withMessage("img is required"),
];
