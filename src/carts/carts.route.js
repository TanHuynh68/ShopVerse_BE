var express = require("express");
const { createCart } = require("./carts.controller");
const { validateCreateCart } = require("./carts.middleware");
const { isUser } = require("../../utils/jwt");
const validate = require("../../utils/validate.util");

var router = express.Router();

router.route("/").post(validateCreateCart, validate, isUser, createCart);

module.exports = router;
