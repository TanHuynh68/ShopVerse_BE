var express = require("express");
const authController = require("./auth.controller");
const { validateCreateUser } = require("./auth.middleware");
const { validate } = require("../users/users.schema");
var router = express.Router();

router
  .route("/register")
  .post(validateCreateUser, validate, authController.register);
router.route("/verify").post(authController.verify);
router.route("/login").post(authController.login);

module.exports = router;
