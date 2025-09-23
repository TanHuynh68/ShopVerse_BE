var express = require("express");
const { isUser } = require("../../utils/jwt");
const validate = require("../../utils/validate.util");
const { createOrder } = require("./order.controller");
const { validateCreateOrder } = require("./orders.middleware");

var router = express.Router();

router.route("/").post(validateCreateOrder, validate, isUser, createOrder);
module.exports = router;
