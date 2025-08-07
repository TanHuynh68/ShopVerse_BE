const { body } = require("express-validator");

exports.validateCreateProduct = [
  body("name").trim().notEmpty().withMessage("Product name is required"),

  body("description").trim().notEmpty().withMessage("Description is required"),

  body("stock")
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative integer"),

  body("sku").trim().notEmpty().withMessage("SKU is required"),

  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  body("category_id").notEmpty().withMessage("Category ID is required"),

  body("brand_id").notEmpty().withMessage("Brand ID is required"),

  body("discount")
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage("Discount must be between 0 and 100"),

  body("images")
    .isArray({ min: 1 })
    .withMessage("At least one image is required"),

  body("images.*").isURL().withMessage("Each image must be a valid URL"),
];
