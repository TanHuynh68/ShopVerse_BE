var express = require("express");
const productsController = require("./products.controller");
const { validateCreateProduct, validateQueryGetProducts } = require("./products.middleware");
const { validate } = require("../../utils/validate.util");
const { isAdmin } = require("../../utils/jwt");
var router = express.Router();

router
  .route("/")
  .post(validateCreateProduct, validate, isAdmin, productsController.createProduct);

router
  .route("/update/:id")
  .put(validateCreateProduct, validate, productsController.updateProduct);

router.route("/:id").put(productsController.restoreOrSoftDelete);
router.route("/toggle-active/:id").put(productsController.toggleActive);
router.route("/").get(validateQueryGetProducts, validate, productsController.getProducts);
router.route("/best-selling").get(productsController.getBestSellingProduct);
router.route("/:id").get(productsController.getProduct);

module.exports = router;
