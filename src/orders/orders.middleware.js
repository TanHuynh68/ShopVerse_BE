const { body } = require("express-validator");

exports.validateCreateOrder = [
  body("cartId").trim().notEmpty().withMessage("cartId is required"),
];
