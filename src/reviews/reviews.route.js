var express = require("express");
const { isUser } = require("../../utils/jwt");
const { validate } = require("../../utils/validate.util");
const { createReviewValidator, validateQueryGetReviewsByProduct, validateLikeReview } = require("./review.middleware");
const { createReview, getReviewsByProduct, likeReview } = require("./reviews.controller");

var router = express.Router();

router.route("/").post(isUser, createReviewValidator, validate, createReview);
router.route("/product").get(validateQueryGetReviewsByProduct, validate, getReviewsByProduct);
router.route("/update-like").patch(isUser, validateLikeReview, validate, likeReview);

module.exports = router;
