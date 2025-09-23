const { body } = require("express-validator");

exports.validateCreateOrder = [
  body("orderId").trim().notEmpty().withMessage("orderId is required"),
];
