var express = require("express");
const { isUser } = require("../../utils/jwt");
const validate = require("../../utils/validate.util");
const { createOrder } = require("./order.controller");

var router = express.Router();

router.route("/").post(isUser, createOrder);
module.exports = router;
