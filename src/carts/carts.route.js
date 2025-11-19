var express = require("express");
const { createCart, getCarts, getCart, caculateTotalPriceOfCart, updateQuantity } = require("./carts.controller");
const { validateCreateCart, validateCaculateTotalPrice, validateUpdateQuantity } = require("./carts.middleware");
const { isUser } = require("../../utils/jwt");
const { validate } = require("../../utils/validate.util");

var router = express.Router();

router.route("/").post(validateCreateCart, validate, isUser, createCart);
router.route("/my-carts").get(isUser, getCarts);
router.route("/").get(isUser, getCart);
router.route("/caculate-total-price").post(validateCaculateTotalPrice, validate, isUser, caculateTotalPriceOfCart);
router.route("/update-quantity").patch(validateUpdateQuantity, validate, isUser, updateQuantity);

module.exports = router;
