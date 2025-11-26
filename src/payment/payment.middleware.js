const { body } = require("express-validator");

exports.validateCreateOrder = [
  body("orderId").trim().notEmpty().withMessage("orderId is required"),
  body("returnUrl").trim().notEmpty().withMessage("returnUrl is required"),
  body("amount").trim().notEmpty().withMessage("amount is required"),
];
