var express = require("express");
const { isUser } = require("../../utils/jwt");
const { validate, isUserExisted } = require("../../utils/validate.util");
const { createOrder, getMyOrders, getMyOrderDetail } = require("./order.controller");
const { validateCreateOrder } = require("./orders.middleware");

var router = express.Router();

router.route("/").post(validateCreateOrder, validate, isUser, createOrder);

router.route("/").get(isUser, isUserExisted, getMyOrders);
router.route("/:orderId").get(isUser, isUserExisted, getMyOrderDetail);
module.exports = router;
