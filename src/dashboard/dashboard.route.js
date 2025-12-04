var express = require("express");
const { isAdmin } = require("../../utils/jwt");
const { getDashboard, getOrders, getCategories, getTransactions, getBrands, getProducts } = require("./dashboard.controller");

var router = express.Router();

router.route("/").post(isAdmin, getDashboard);
router.route("/orders").post(isAdmin, getOrders);
router.route("/categories").post(isAdmin, getCategories);
router.route("/transactions").post(isAdmin, getTransactions);
router.route("/brands").post(isAdmin, getBrands);
router.route("/products").post(isAdmin, getProducts);

module.exports = router;
