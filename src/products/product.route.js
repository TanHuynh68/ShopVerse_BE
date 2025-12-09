var express = require("express");
const productsController = require("./products.controller");
const { validateCreateProduct, validateQueryGetProducts, validateImages } = require("./products.middleware");
const { validate } = require("../../utils/validate.util");
const { isAdmin } = require("../../utils/jwt");
var router = express.Router();
const multer  = require('multer')

const upload = multer({
  storage: multer.memoryStorage(),
});

router
  .route("/")
  .post(isAdmin, upload.array("images"), validateImages, validateCreateProduct, validate, productsController.createProduct);

router
  .route("/update/:id")
  .put(validateCreateProduct, validate, productsController.updateProduct);

router.route("/:id").put(productsController.restoreOrSoftDelete);
router.route("/toggle-active/:id").put(productsController.toggleActive);
router.route("/").get(validateQueryGetProducts, validate, productsController.getProducts);
router.route("/best-selling").get(productsController.getBestSellingProduct);
router.route("/:id").get(productsController.getProduct);

module.exports = router;
