var express = require("express");
var router = express.Router();
var authRoute = require("../src/auth/auth.route");
var emailRoute = require("../src/email/email.route");
var usersRoute = require("../src/users/users.route");
var brandsRoute = require("../src/brands/brands.route");
var categoriesRoute = require("../src/categories/categories.route");
var productsRoute = require("../src/products/product.route");
var cartsRoute = require("../src/carts/carts.route");
var paymentsRoute = require("../src/payment/payment.route");
var ordersRoute = require("../src/orders/orders.route");
var transactionRoute = require("../src/transaction/transaction.route");
var dashboardRoute = require("../src/dashboard/dashboard.route");
var reviewsRoute = require("../src/reviews/reviews.route");

router.use("/auth", authRoute);
router.use("/email", emailRoute);
router.use("/users", usersRoute);
router.use("/brands", brandsRoute);
router.use("/categories", categoriesRoute);
router.use("/products", productsRoute);
router.use("/carts", cartsRoute)
router.use("/payments", paymentsRoute)
router.use("/orders", ordersRoute)
router.use("/transactions", transactionRoute);
router.use("/dashboards", dashboardRoute);
router.use("/reviews", reviewsRoute);
module.exports = router;
