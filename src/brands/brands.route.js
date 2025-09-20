var express = require("express");
const brandController = require("./brand.controller");
const { validateCreateBrand } = require("./brands.middleware");
const validate = require("../../utils/validate.util");
var router = express.Router();

router
  .route("/")
  .post(validateCreateBrand, validate, brandController.createBrand);
router
  .route("/update/:id")
  .put(validateCreateBrand, validate, brandController.updateBrand);
router.route("/:id").put(brandController.restoreOrSoftDelete);
router.route("/").get(brandController.getBrands);
router.route("/:id").get(brandController.getBrand);

module.exports = router;
