const { body, query } = require("express-validator");
const mongoose = require("mongoose");

exports.createReviewValidator = [
  // rating
  body("rating")
    .exists({ checkNull: true })
    .withMessage("rating is required")
    .isInt({ min: 1, max: 5 })
    .withMessage("rating must be an integer between 1 and 5"),

  // product (product_id)
  body("product")
    .exists({ checkNull: true })
    .withMessage("product is required")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("product must be a valid ObjectId"),

  // comment
  body("comment")
    .optional()
    .isString()
    .withMessage("comment must be a string")
    .isLength({ max: 1000 })
    .withMessage("comment must be at most 1000 characters")
    .trim(),
];

exports.validateQueryGetReviewsByProduct = [
  query("page").trim().notEmpty().withMessage("page is required"),
  query("size").trim().notEmpty().withMessage("size is required"),
  query("id")
    .trim()
    .notEmpty()
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("id is required on query and must be valid"),
];
