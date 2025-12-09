const { body, query } = require("express-validator");

exports.validateCreateProduct = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("name is required"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("description is required"),

  body("stock")
    .isInt({ min: 0 })
    .withMessage("stock must be an integer ≥ 0"),

  body("sku")
    .trim()
    .notEmpty()
    .withMessage("sku is required"),

  body("price")
    .isFloat({ min: 0 })
    .withMessage("price must be a number ≥ 0"),

  body("category_id")
    .notEmpty()
    .withMessage("category_id is required"),

  body("brand_id")
    .notEmpty()
    .withMessage("brand_id is required"),

  body("discount")
    .isFloat({ min: 0, max: 100 })
    .withMessage("discount must be between 0 and 100"),
];

exports.validateImages = (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      errors: ["At least one image is required"]
    });
  }
  next();
};

exports.validateQueryGetProducts = [
  query("category_id")
    .trim()
    .notEmpty()
    .withMessage("category_id is required on query"),

  query("sort").trim().notEmpty().withMessage("sort is required on query"),
];
