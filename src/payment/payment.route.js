var express = require("express");
const { paymentVnPay } = require("./payment.controller");
var router = express.Router();

router.post("/vn-pay", paymentVnPay);

module.exports = router;
