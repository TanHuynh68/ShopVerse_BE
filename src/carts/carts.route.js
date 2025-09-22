var express = require("express");
const { createCart, getCarts, getCart } = require("./carts.controller");
const { validateCreateCart } = require("./carts.middleware");
const { isUser } = require("../../utils/jwt");
const validate = require("../../utils/validate.util");

var router = express.Router();

router.route("/").post(validateCreateCart, validate, isUser, createCart);
router.route("/my-carts").get(isUser, getCarts);
router.route("/").get(isUser, getCart);
module.exports = router;
