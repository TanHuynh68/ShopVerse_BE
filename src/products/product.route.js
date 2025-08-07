var express = require("express");
const productsController = require("./products.controller");
const { validateCreateProduct } = require("./products.middleware");
const validate = require("../../utils/validate.ultil");

var router = express.Router();

router
  .route("/")
  .post(validateCreateProduct, validate, productsController.createProduct);

router
  .route("/update/:id")
  .put(validateCreateProduct, validate, productsController.updateProduct);

router.route("/:id").put(productsController.restoreOrSoftDelete);
router.route("/toggle-active/:id").put(productsController.toggleActive);
router.route("/").get(productsController.getProducts);
router.route("/:id").get(productsController.getProduct);

module.exports = router;
