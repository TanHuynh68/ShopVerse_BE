var express = require("express");
var router = express.Router();
var authRoute = require("../src/auth/auth.route");
var emailRoute = require("../src/email/email.route");
var usersRoute = require("../src/users/users.route");
var brandsRoute = require("../src/brands/brands.route");
var categoriesRoute = require("../src/categories/categories.route");
var productsRoute = require("../src/products/product.route");
router.use("/auth", authRoute);
router.use("/email", emailRoute);
router.use("/users", usersRoute);
router.use("/brands", brandsRoute);
router.use("/categories", categoriesRoute);
router.use("/products", productsRoute);

module.exports = router;
