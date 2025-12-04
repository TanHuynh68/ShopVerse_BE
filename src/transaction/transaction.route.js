var express = require("express");
const { isUser } = require("../../utils/jwt");
const { validate } = require("../../utils/validate.util");
const { validateCreateTransaction } = require("./transaction.middleware");
const {
  createTransactionHistory,
  getMyTransaction,
} = require("./transaction.controller");

var router = express.Router();

router
  .route("/")
  .post(validateCreateTransaction, validate, isUser, createTransactionHistory);
router.route("/").get(isUser, getMyTransaction);

module.exports = router;
