var express = require("express");
const { isUser } = require("../../utils/jwt");
const { validate } = require("../../utils/validate.util");
const { createReviewValidator, validateQueryGetReviewsByProduct } = require("./review.middleware");
const { createReview, getReviewsByProduct } = require("./reviews.controller");

var router = express.Router();

router.route("/").post(isUser, createReviewValidator, validate, createReview);
router.route("/product").get(validateQueryGetReviewsByProduct, validate, getReviewsByProduct);

module.exports = router;
