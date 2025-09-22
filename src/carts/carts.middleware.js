const { body } = require("express-validator");

exports.validateCreateCart = [
  body("productId")
    .notEmpty()
    .withMessage("productId is required"),
    // .isMongoId()
    // .withMessage("productId must be a valid MongoDB ObjectId"),

  body("name").trim().notEmpty().withMessage("name is required"),

  body("price").isFloat({ min: 0 }).withMessage("price be a positive number"),

  body("quantity").isInt({ min: 1 }).withMessage("quantity must be at least 1"),

  body("image").optional().isURL().withMessage("image must be a valid URL"),
];
