var express = require("express");
const { paymentVnPay, vnPayReturn } = require("./payment.controller");
var router = express.Router();

router.post("/vnpay", paymentVnPay);
router.get("/vnpay-return", vnPayReturn);
module.exports = router;
