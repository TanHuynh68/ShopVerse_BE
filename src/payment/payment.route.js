var express = require("express");
const { paymentVnPay, vnPayReturn } = require("./payment.controller");
const { validateCreateOrder } = require("./payment.middleware");
const { validate } = require("../../utils/validate.util");
var router = express.Router();

router.post("/vnpay", validateCreateOrder, validate,  paymentVnPay);
router.get("/vnpay-return", vnPayReturn);
module.exports = router;
